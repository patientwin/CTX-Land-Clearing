import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';

const OLD_SITE_URL = 'https://ctxlandclearing.com';
const MAX_PAGES = 200;

const parser = new XMLParser({ ignoreAttributes: false });

const ensureDir = (dir) => fs.mkdir(dir, { recursive: true });
const safeName = (url) => {
  const u = new URL(url);
  let slug = u.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  if (!slug) slug = 'home';
  return `${slug}.html`;
};

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'CTXMigrationBot/1.0 (+https://ctxlandclearing.com)'
    }
  });
  return { status: res.status, text: await res.text(), headers: res.headers };
}

function normalizeUrl(url) {
  const u = new URL(url);
  u.hash = '';
  if (!u.pathname.endsWith('/')) u.pathname += '/';
  return u.toString();
}

function isInternal(url) {
  const u = new URL(url);
  return u.hostname === new URL(OLD_SITE_URL).hostname;
}

function parseRobots(content) {
  const lines = content.split(/\r?\n/);
  const disallow = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [k, ...rest] = line.split(':');
    if (!k || !rest.length) continue;
    if (k.trim().toLowerCase() === 'disallow') {
      disallow.push(rest.join(':').trim());
    }
  }
  return disallow;
}

function blocked(pathname, rules) {
  return rules.some((rule) => rule && pathname.startsWith(rule));
}

function textLength($) {
  const main = $('main').text() || $('body').text() || '';
  return main.replace(/\s+/g, ' ').trim().length;
}

function headingText($, tag) {
  return $(tag)
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean);
}

function detectSchemaTypes($) {
  const types = new Set();
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text();
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const queue = Array.isArray(data) ? [...data] : [data];
      while (queue.length) {
        const node = queue.shift();
        if (!node || typeof node !== 'object') continue;
        if (node['@type']) {
          if (Array.isArray(node['@type'])) node['@type'].forEach((t) => types.add(String(t)));
          else types.add(String(node['@type']));
        }
        for (const value of Object.values(node)) {
          if (value && typeof value === 'object') queue.push(value);
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });
  return [...types];
}

async function parseSitemap() {
  const candidates = [`${OLD_SITE_URL}/sitemap.xml`, `${OLD_SITE_URL}/sitemap_index.xml`];
  const urls = new Set();
  for (const candidate of candidates) {
    try {
      const { status, text } = await fetchText(candidate);
      if (status >= 400) continue;
      const data = parser.parse(text);
      const sitemapNodes = data?.sitemapindex?.sitemap;
      const urlNodes = data?.urlset?.url;

      const normalizedSitemapNodes = Array.isArray(sitemapNodes) ? sitemapNodes : sitemapNodes ? [sitemapNodes] : [];
      for (const node of normalizedSitemapNodes) {
        if (!node?.loc) continue;
        try {
          const { status: subStatus, text: subText } = await fetchText(node.loc);
          if (subStatus >= 400) continue;
          const subData = parser.parse(subText);
          const subUrls = subData?.urlset?.url;
          const normalized = Array.isArray(subUrls) ? subUrls : subUrls ? [subUrls] : [];
          normalized.forEach((u) => u?.loc && urls.add(normalizeUrl(u.loc)));
        } catch {
          // continue best effort
        }
      }

      const normalizedUrlNodes = Array.isArray(urlNodes) ? urlNodes : urlNodes ? [urlNodes] : [];
      normalizedUrlNodes.forEach((u) => u?.loc && urls.add(normalizeUrl(u.loc)));
    } catch {
      // continue best effort
    }
  }
  return [...urls];
}

function toMarkdownTable(rows, headers) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${headers.map((h) => String(r[h] ?? '')).join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

async function main() {
  await ensureDir('audit');
  await ensureDir('audit/raw-html');
  await ensureDir('docs');

  const visited = new Set();
  const queue = [normalizeUrl(OLD_SITE_URL)];
  const sitemapUrls = await parseSitemap();
  sitemapUrls.forEach((u) => queue.push(u));

  let robotRules = [];
  try {
    const robots = await fetchText(`${OLD_SITE_URL}/robots.txt`);
    if (robots.status < 400) robotRules = parseRobots(robots.text);
  } catch {
    // continue best effort
  }

  const results = [];

  while (queue.length && visited.size < MAX_PAGES) {
    const url = normalizeUrl(queue.shift());
    if (visited.has(url)) continue;
    visited.add(url);

    const pathname = new URL(url).pathname;
    if (blocked(pathname, robotRules)) {
      results.push({ url, status: 'blocked-by-robots' });
      continue;
    }

    try {
      const { status, text, headers } = await fetchText(url);
      const contentType = headers.get('content-type') || '';
      if (!contentType.includes('text/html')) {
        results.push({ url, status, contentType });
        continue;
      }

      await fs.writeFile(path.join('audit/raw-html', safeName(url)), text, 'utf8');
      const $ = load(text);

      const canonical = $('link[rel="canonical"]').attr('href') || '';
      const title = $('title').first().text().replace(/\s+/g, ' ').trim();
      const metaDescription = $('meta[name="description"]').attr('content') || '';
      const h1 = headingText($, 'h1');
      const h2 = headingText($, 'h2');
      const h3 = headingText($, 'h3');
      const internalLinks = $('a[href]')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter(Boolean)
        .map((href) => {
          try {
            return normalizeUrl(new URL(href, url).toString());
          } catch {
            return null;
          }
        })
        .filter((href) => href && isInternal(href));
      const images = $('img[src]')
        .map((_, el) => ({ src: $(el).attr('src') || '', alt: $(el).attr('alt') || '' }))
        .get();

      const forms = $('form')
        .map((_, form) => {
          const fields = $(form)
            .find('input,select,textarea')
            .map((__, field) => ({
              name: $(field).attr('name') || '',
              type: $(field).attr('type') || field.tagName,
              required: $(field).is('[required]')
            }))
            .get();
          return {
            action: $(form).attr('action') || '',
            method: ($(form).attr('method') || 'GET').toUpperCase(),
            fields
          };
        })
        .get();

      const record = {
        url,
        status,
        canonical,
        title,
        metaDescription,
        h1,
        h2,
        h3,
        textLength: textLength($),
        internalLinks: [...new Set(internalLinks)],
        images,
        schemaTypes: detectSchemaTypes($),
        forms
      };

      results.push(record);
      record.internalLinks.forEach((href) => {
        if (!visited.has(href)) queue.push(href);
      });
    } catch (err) {
      results.push({ url, status: 'error', error: err instanceof Error ? err.message : String(err) });
    }
  }

  await fs.writeFile('audit/url-inventory.json', JSON.stringify(results, null, 2));

  const inventoryRows = results.map((r) => ({
    URL: r.url,
    Status: r.status,
    Canonical: r.canonical || '',
    Title: (r.title || '').replace(/\|/g, '\\|'),
    'Meta Description': (r.metaDescription || '').replace(/\|/g, '\\|')
  }));

  const contentMap = results
    .filter((r) => r.url && r.h1)
    .map((r) => {
      const h2 = (r.h2 || []).join(' ; ').replace(/\|/g, '\\|');
      const h3 = (r.h3 || []).join(' ; ').replace(/\|/g, '\\|');
      return `## ${r.url}\n- Status: ${r.status}\n- H1: ${(r.h1 || []).join(' | ')}\n- H2: ${h2 || 'None captured'}\n- H3: ${h3 || 'None captured'}\n- Text length: ${r.textLength || 0}\n- Internal links discovered: ${(r.internalLinks || []).length}\n- Images: ${(r.images || []).length}\n- Schema types: ${(r.schemaTypes || []).join(', ') || 'None detected'}\n- Forms: ${(r.forms || []).length}\n`;
    })
    .join('\n');

  await fs.writeFile(
    'docs/URL_INVENTORY.md',
    `# URL Inventory\n\nSource: ${OLD_SITE_URL}\n\nCrawled URLs: ${results.length}\n\n${toMarkdownTable(inventoryRows, ['URL', 'Status', 'Canonical', 'Title', 'Meta Description'])}\n`
  );

  await fs.writeFile(
    'docs/CONTENT_INVENTORY.md',
    `# Content Inventory\n\nGenerated from crawl snapshots. Coverage is best-effort if origin blocks bot requests.\n\n${contentMap || 'No HTML pages captured.'}\n`
  );

  await fs.writeFile(
    'docs/META_PARITY_REPORT.md',
    `# Meta Parity Report\n\nOld-site baseline metadata extracted by crawler.\n\n${toMarkdownTable(inventoryRows, ['URL', 'Title', 'Meta Description'])}\n`
  );

  console.log(`Crawl complete. URLs processed: ${results.length}`);
}

main();

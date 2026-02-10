import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const dist = 'dist';

async function readHtmlFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await readHtmlFiles(full)));
    if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveHref(fromFile, href) {
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return null;
  }
  if (href.startsWith('/')) {
    const withIndex = href.endsWith('/') ? `${href}index.html` : href;
    return path.join(dist, withIndex.replace(/^\//, ''));
  }
  return path.resolve(path.dirname(fromFile), href);
}

async function main() {
  const files = await readHtmlFiles(dist).catch(() => []);
  if (!files.length) {
    console.log('No dist HTML files found. Run build first.');
    return;
  }

  const broken = [];
  for (const file of files) {
    const html = await fs.readFile(file, 'utf8');
    const $ = load(html);
    const hrefs = $('a[href]')
      .map((_, el) => $(el).attr('href'))
      .get();

    for (const href of hrefs) {
      const target = resolveHref(file, href);
      if (!target) continue;
      try {
        await fs.access(target);
      } catch {
        broken.push({ file, href, target });
      }
    }
  }

  if (!broken.length) {
    console.log('No broken internal links found.');
    return;
  }

  console.log('Broken links found:');
  broken.forEach((b) => console.log(`${b.file} -> ${b.href} (${b.target})`));
  process.exitCode = 1;
}

main();

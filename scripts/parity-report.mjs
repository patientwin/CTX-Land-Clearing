import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const oldDataPath = 'audit/url-inventory.json';
const distDir = 'dist';

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((x) => x.length > 2);
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  const intersection = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union ? intersection / union : 0;
}

function pathToDist(url) {
  const u = new URL(url);
  const local = u.pathname.replace(/^\//, '');
  if (!local) return path.join(distDir, 'index.html');
  return path.join(distDir, local, 'index.html');
}

async function main() {
  let oldData = [];
  try {
    oldData = JSON.parse(await fs.readFile(oldDataPath, 'utf8'));
  } catch {
    await fs.writeFile('docs/PARITY_DIFF_REPORT.md', '# Parity Diff Report\n\nOld crawl baseline not found. Run `npm run crawl:old` first.\n');
    return;
  }

  const rows = [];
  for (const oldPage of oldData) {
    if (!oldPage?.url || !oldPage?.h1) continue;

    const filePath = pathToDist(oldPage.url);
    try {
      const html = await fs.readFile(filePath, 'utf8');
      const $ = load(html);
      const newH1 = $('h1')
        .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
        .get();
      const oldHeadingTokens = tokenize([...(oldPage.h1 || []), ...(oldPage.h2 || [])].join(' '));
      const newHeadingTokens = tokenize([
        ...newH1,
        ...$('h2')
          .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
          .get()
      ].join(' '));

      const oldTextTokens = tokenize(`${oldPage.title || ''} ${oldPage.metaDescription || ''}`);
      const newTextTokens = tokenize(($('main').text() || '').slice(0, 6000));

      const headingScore = jaccard(oldHeadingTokens, newHeadingTokens);
      const textScore = jaccard(oldTextTokens, newTextTokens);
      const parityScore = ((headingScore * 0.6) + (textScore * 0.4)) * 100;

      rows.push({
        url: oldPage.url,
        headingScore: (headingScore * 100).toFixed(1),
        textScore: (textScore * 100).toFixed(1),
        parityScore: parityScore.toFixed(1),
        oldH1: (oldPage.h1 || []).join(' | '),
        newH1: newH1.join(' | ')
      });
    } catch {
      rows.push({
        url: oldPage.url,
        headingScore: '0.0',
        textScore: '0.0',
        parityScore: '0.0',
        oldH1: (oldPage.h1 || []).join(' | '),
        newH1: 'Not generated'
      });
    }
  }

  const avg = rows.length
    ? (rows.reduce((sum, r) => sum + Number(r.parityScore), 0) / rows.length).toFixed(1)
    : '0.0';

  const table = [
    '| URL | Heading Similarity | Text Similarity | Parity Score | Old H1 | New H1 |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows.map((r) => `| ${r.url} | ${r.headingScore}% | ${r.textScore}% | ${r.parityScore}% | ${r.oldH1.replace(/\|/g, '\\|')} | ${r.newH1.replace(/\|/g, '\\|')} |`)
  ].join('\n');

  await fs.writeFile('docs/PARITY_DIFF_REPORT.md', `# Parity Diff Report\n\nAverage parity score: **${avg}%**\n\n${table}\n`);
  console.log(`Parity report generated. Average score: ${avg}%`);
}

main();

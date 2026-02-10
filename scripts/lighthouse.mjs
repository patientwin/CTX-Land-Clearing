import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const url = process.env.LIGHTHOUSE_URL || 'http://127.0.0.1:4321/';

async function run() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);
  const categories = runnerResult?.lhr?.categories || {};

  const report = {
    performance: Math.round((categories.performance?.score || 0) * 100),
    accessibility: Math.round((categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    seo: Math.round((categories.seo?.score || 0) * 100)
  };

  console.log(JSON.stringify(report, null, 2));
  await chrome.kill();

  const pass = report.performance >= 90 && report.accessibility >= 95 && report.bestPractices >= 95 && report.seo >= 95;
  if (!pass) process.exitCode = 1;
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

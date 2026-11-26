#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { parseCatalog, buildIndex } = require('./catalog');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs', 'skills.json');

function main() {
  const english = parseCatalog(fs.readFileSync(path.join(root, 'README.md'), 'utf8'), 'en');
  const chinese = parseCatalog(fs.readFileSync(path.join(root, 'README_ZH.md'), 'utf8'), 'zh');
  const index = buildIndex(english, chinese);
  const next = `${JSON.stringify(index, null, 2)}\n`;

  if (process.argv.includes('--check')) {
    if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== next) {
      throw new Error('docs/skills.json is out of sync. Run: npm run sync:search');
    }
    console.log('docs/skills.json is up to date.');
  } else if (process.argv.includes('--validate')) {
    console.log(`README tables are valid; generated ${index.length} search entries.`);
  } else {
    fs.writeFileSync(output, next);
    console.log(`Wrote docs/skills.json with ${index.length} entries.`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

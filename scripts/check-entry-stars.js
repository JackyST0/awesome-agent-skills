#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { parseEnglish, sourceRepository } = require('./sync-search-index');

const root = path.resolve(__dirname, '..');
const minimumStars = 512;

function main() {
  const previousUrls = new Set();
  if (process.env.BASE_SHA) {
    const previous = execFileSync('git', ['show', `${process.env.BASE_SHA}:README.md`], { cwd: root, encoding: 'utf8' });
    for (const entry of parseEnglish(previous)) previousUrls.add(entry.url);
  }

  const entries = parseEnglish(fs.readFileSync(path.join(root, 'README.md'), 'utf8'));
  const repositories = new Set(entries.filter(entry => !previousUrls.has(entry.url)).map(entry => sourceRepository(entry.url)));

  for (const repository of repositories) {
    const metadata = JSON.parse(execFileSync('gh', ['api', `repos/${repository}`], { encoding: 'utf8' }));
    if (metadata.visibility !== 'public' || !Number.isSafeInteger(metadata.stargazers_count)) {
      throw new Error(`Cannot verify a public GitHub star count for ${repository}.`);
    }
    if (metadata.stargazers_count < minimumStars) {
      throw new Error(`${repository} has ${metadata.stargazers_count} stars; at least ${minimumStars} are required.`);
    }
  }

  console.log(`Verified ${repositories.size} source repositories against the ${minimumStars}-star minimum.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

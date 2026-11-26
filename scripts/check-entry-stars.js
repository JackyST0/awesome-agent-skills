#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { formats, parseCatalog, sourceRepository } = require('./catalog');

const root = path.resolve(__dirname, '..');
const minimumStars = 512;

function previousSourceUrls(markdown) {
  if (markdown.split(/\r?\n/).includes(`## ${formats.en.heading}`)) {
    return new Set(parseCatalog(markdown, 'en').map(entry => entry.url));
  }
  return new Set(Array.from(markdown.matchAll(/^- \[[^\]]+\]\((https:\/\/github\.com\/[^)\s]+)\) - /gm), match => match[1].replace(/\/$/, '')));
}

function main() {
  let previousUrls = new Set();
  if (process.env.BASE_SHA) {
    const previous = execFileSync('git', ['show', `${process.env.BASE_SHA}:README.md`], { cwd: root, encoding: 'utf8' });
    previousUrls = previousSourceUrls(previous);
  }

  const entries = parseCatalog(fs.readFileSync(path.join(root, 'README.md'), 'utf8'), 'en');
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

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { previousSourceUrls };

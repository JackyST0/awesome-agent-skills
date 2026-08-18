#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { isHttpUrl } = require('./sync-search-index');

const page = fs.readFileSync(path.resolve(__dirname, '..', 'docs', 'index.html'), 'utf8');
const requiredSnippets = [
  'function safeUrl(value)',
  "['http:', 'https:'].includes(url.protocol)",
  'link.textContent = text;',
  'description.textContent = desc;',
  'grid.replaceChildren(...cards);',
];

for (const snippet of requiredSnippets) {
  if (!page.includes(snippet)) {
    throw new Error(`Search-page security regression: missing ${snippet}`);
  }
}

if (page.includes('innerHTML')) {
  throw new Error('Search-page security regression: innerHTML must not render index data.');
}

for (const url of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>']) {
  if (isHttpUrl(url)) {
    throw new Error(`Search-index URL validation accepted an unsafe URL: ${url}`);
  }
}

console.log('Search-page security checks passed.');

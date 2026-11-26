#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const { sourceRepository } = require('./catalog');

const page = fs.readFileSync(path.resolve(__dirname, '..', 'docs', 'index.html'), 'utf8');
const requiredSnippets = [
  'function safeUrl(value)',
  "['http:', 'https:'].includes(url.protocol)",
  'link.textContent = text;',
  'description.textContent = desc;',
  'grid.replaceChildren(...cards);',
  's.platform.toLowerCase().includes(query)',
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
  assert.throws(() => sourceRepository(url), /GitHub source repository/);
}

console.log('Search-page security checks passed.');

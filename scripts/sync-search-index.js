#!/usr/bin/env node

/**
 * Generate the GitHub Pages search index from README.md and README_ZH.md.
 *
 * Both READMEs must describe the same entries. README.md supplies the entry
 * order; README_ZH.md supplies Chinese descriptions, platforms, and stars.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const README_EN = path.join(ROOT, 'README.md');
const README_ZH = path.join(ROOT, 'README_ZH.md');
const OUTPUT = path.join(ROOT, 'docs', 'skills.json');
const REPOSITORY_TREE_URL = 'https://github.com/JackyST0/awesome-agent-skills/tree/main';

const CATEGORIES = [
  { id: 'official', en: 'Official Resources', zh: '官方资源' },
  { id: 'collection', en: 'Skills Collections', zh: 'Skills 合集' },
  { id: 'devtools', en: 'Development Tools', zh: '开发工具' },
  { id: 'productivity', en: 'Productivity', zh: '效率提升' },
  { id: 'devops', en: 'DevOps', zh: 'DevOps' },
  { id: 'data', en: 'Data Processing', zh: '数据处理' },
  { id: 'writing', en: 'Writing', zh: '写作创作' },
  { id: 'design', en: 'Design', zh: '设计相关' },
];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalizeUrl(url) {
  const value = url.trim();
  const absolute = /^https?:\/\//i.test(value)
    ? value
    : value.startsWith('examples/')
      ? `${REPOSITORY_TREE_URL}/${value}`
      : value;

  return absolute.replace(/\/$/, '');
}

function isHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function sectionContent(markdown, heading) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*$`, 'm');
  const match = markdown.match(pattern);
  if (!match) return '';

  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = rest.search(/^##\s+/m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimSentence(value) {
  return value.replace(/[。.]$/, '').trim();
}

function parseEnglish(readme) {
  const entries = [];

  for (const category of CATEGORIES) {
    const body = sectionContent(readme, category.en);
    const lines = body.split('\n');

    for (const line of lines) {
      const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\) - (.+)$/);
      if (!match) continue;

      const [, name, url, descEn] = match;
      const normalizedUrl = normalizeUrl(url);
      if (!isHttpUrl(normalizedUrl)) {
        throw new Error(`Invalid URL in README.md (${category.en}): ${url}`);
      }
      entries.push({
        name: name.trim(),
        url: normalizedUrl,
        descEn: trimSentence(stripMarkdown(descEn)),
        category: category.id,
      });
    }
  }

  return entries;
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function extractLink(cell) {
  const match = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return match ? normalizeUrl(match[2]) : '';
}

function parseChinese(readme) {
  const byUrl = new Map();

  for (const category of CATEGORIES) {
    const body = sectionContent(readme, category.zh);
    const lines = body.split('\n');

    for (const line of lines) {
      if (!line.trim().startsWith('|')) continue;
      if (/^\|\s*-+/.test(line) || /\|\s*名称\s*\|/.test(line)) continue;

      const cells = splitTableRow(line);
      if (cells.length < 4) continue;

      const [name, rawDesc, third, linkCell] = cells;
      const url = extractLink(linkCell);
      if (!url) continue;
      if (!isHttpUrl(url)) {
        throw new Error(`Invalid URL in README_ZH.md (${category.zh}): ${url}`);
      }

      const { desc, stars: starsFromDesc } = cleanChineseDescription(rawDesc);
      const starOrPlatform = third.replace(/—/g, '-').trim();
      const usesStarsColumn = category.id === 'official' || category.id === 'collection';

      const key = keyFor(category.id, url);
      if (byUrl.has(key)) {
        throw new Error(`Duplicate Chinese entry: ${key}`);
      }
      byUrl.set(key, {
        name: stripMarkdown(name),
        desc,
        stars: usesStarsColumn ? starOrPlatform : starsFromDesc,
        platform: usesStarsColumn ? '' : normalizePlatform(starOrPlatform),
      });
    }
  }

  return byUrl;
}

function cleanChineseDescription(value) {
  let desc = stripMarkdown(value).replace(/^⭐\s*/, '').trim();
  let stars = '-';

  const starMatch = desc.match(/[（(]\s*([\d.,]+k?)\s*⭐\s*[）)]/i);
  if (starMatch) {
    stars = starMatch[1].replace(/,/g, '');
    desc = desc.replace(starMatch[0], '').trim();
  }

  return { desc: trimSentence(desc), stars };
}

function normalizePlatform(value) {
  if (!value || value === '-') return 'all';
  return value.toLowerCase().replace(/\s+/g, '').replace(/\//g, '/');
}

function inferPlatform(entry) {
  const text = `${entry.name} ${entry.descEn} ${entry.url}`.toLowerCase();

  if (text.includes('cursor') && !text.includes('claude')) return 'cursor';
  if (text.includes('copilot') && !text.includes('claude')) return 'copilot';
  if (text.includes('windsurf') && !text.includes('claude')) return 'windsurf';
  if (text.includes('codex') && !text.includes('claude')) return 'codex';
  if (text.includes('opencode')) return 'opencode';
  if (text.includes('openclaw') || text.includes('clawhub')) return 'openclaw';
  if (text.includes('claude')) return 'claude';
  return 'all';
}

function buildIndex(enEntries, zhByUrl) {
  return enEntries.map((entry) => {
    const zh = zhByUrl.get(keyFor(entry.category, entry.url));
    const platform = zh?.platform || inferPlatform(entry);

    return {
      name: entry.name,
      nameZh: zh?.name || entry.name,
      desc: zh?.desc || entry.descEn,
      descEn: entry.descEn,
      stars: normalizeStars(zh?.stars),
      platform,
      category: entry.category,
      url: entry.url,
    };
  });
}

function keyFor(category, url) {
  return `${category}::${url}`;
}

function assertBilingualConsistency(enEntries, zhByUrl) {
  const englishKeys = new Set();
  const errors = [];

  for (const entry of enEntries) {
    const key = keyFor(entry.category, entry.url);
    if (englishKeys.has(key)) {
      errors.push(`Duplicate English entry: ${key}`);
    }
    englishKeys.add(key);
    if (!zhByUrl.has(key)) {
      errors.push(`Missing Chinese entry: ${key}`);
    }
  }

  for (const key of zhByUrl.keys()) {
    if (!englishKeys.has(key)) {
      errors.push(`Missing English entry: ${key}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`README entries are not bilingual equivalents:\n- ${errors.join('\n- ')}`);
  }
}

function normalizeStars(value) {
  if (!value || value === '-') return '-';
  return value;
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function main() {
  const check = process.argv.includes('--check');
  const enEntries = parseEnglish(read(README_EN));
  const zhByUrl = parseChinese(read(README_ZH));
  assertBilingualConsistency(enEntries, zhByUrl);
  const index = buildIndex(enEntries, zhByUrl);
  const next = `${JSON.stringify(index, null, 2)}\n`;

  if (check) {
    const current = fs.existsSync(OUTPUT) ? read(OUTPUT) : '';
    if (current !== next) {
      console.error('docs/skills.json is out of sync. Run: node scripts/sync-search-index.js');
      process.exit(1);
    }
    console.log('docs/skills.json is up to date.');
    return;
  }

  writeJson(OUTPUT, index);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)} with ${index.length} entries.`);
}

if (require.main === module) {
  main();
}

module.exports = { isHttpUrl };

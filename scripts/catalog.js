const purposes = [
  ['devtools', 'Development and Testing', '开发与测试'],
  ['productivity', 'Tasks and Productivity', '任务与效率'],
  ['devops', 'Deployment and Operations', '部署运维'],
  ['data', 'Data Processing', '数据处理'],
  ['writing', 'Writing', '写作'],
  ['design', 'Design', '设计'],
];

const formats = {
  en: {
    file: 'README.md', heading: 'Skills by Use Case', headings: purposes.map(([id, en]) => [en, id]),
    columns: ['Name', 'Type', 'Description', 'Platforms', 'Stars', 'Source'],
    types: new Map([['Single Skill', 'single-skill'], ['Skills Collection', 'collection']]),
    retired: ['Official Resources', 'Skills Collections', 'Development Tools', 'Productivity', 'DevOps', 'Data Processing', 'Writing', 'Design'],
  },
  zh: {
    file: 'README_ZH.md', heading: '按用途浏览 Skills', headings: purposes.map(([id, , zh]) => [zh, id]),
    columns: ['名称', '类型', '描述', '平台', 'Stars', '源码'],
    types: new Map([['单个 Skill', 'single-skill'], ['Skills 合集', 'collection']]),
    retired: ['官方资源', 'Skills 合集', '开发工具', '效率提升', 'DevOps', '数据处理', '写作创作', '设计相关'],
  },
};

const platformLabels = ['Cursor', 'Claude', 'Copilot', 'Windsurf', 'Codex', 'OpenCode', 'OpenClaw'];

function sourceRepository(url) {
  const match = /^https:\/\/github\.com\/([A-Za-z0-9-]+\/[A-Za-z0-9_.-]+)(?:\/tree\/[^?#\s]+)?$/.exec(url);
  if (!match) throw new Error(`Catalog entries must link to a GitHub source repository or skill directory: ${url}`);
  return match[1];
}

function splitTableLine(line) {
  return line.split(/(?<!\\)\|/);
}

function plainText(value) {
  return value.replace(/\\\|/g, '|').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
}

function normalizePlatform(value, location) {
  if (value === '—') return 'unspecified';
  if (value === 'All') return 'all';
  const labels = value.split('/');
  if (labels.some(label => !platformLabels.includes(label)) || new Set(labels).size !== labels.length) {
    throw new Error(`${location}: invalid platform list: ${value}`);
  }
  return platformLabels.filter(label => labels.includes(label)).map(label => label.toLowerCase()).join('/');
}

function parseCatalog(markdown, language) {
  const format = formats[language];
  const headings = new Map(format.headings);
  const lines = markdown.split(/\r?\n/);
  const start = lines.indexOf(`## ${format.heading}`);
  if (start === -1 || start !== lines.lastIndexOf(`## ${format.heading}`)) {
    throw new Error(`${format.file}: expected exactly one "${format.heading}" section.`);
  }
  for (const title of format.retired) {
    if (lines.includes(`## ${title}`)) throw new Error(`${format.file}: retired catalog heading "${title}".`);
  }

  const seen = new Set();
  const urls = new Set();
  const names = new Set();
  const entries = [];
  let category;
  let tableLine = 0;
  for (let lineIndex = start + 1; lineIndex <= lines.length; lineIndex++) {
    const line = (lines[lineIndex] || '').trim();
    const location = `${format.file}:${lineIndex + 1}`;
    const end = lineIndex === lines.length || line.startsWith('## ');
    if (end || line.startsWith('### ')) {
      if (category && tableLine < 2) throw new Error(`${location}: incomplete table for ${category}.`);
      if (end) break;
      category = headings.get(line.slice(4));
      if (!category || seen.has(category)) throw new Error(`${location}: unknown or repeated use case: ${line}`);
      seen.add(category);
      tableLine = 0;
      continue;
    }
    if (!line || (!category && !line.startsWith('|') && !line.startsWith('- ['))) continue;
    if (!category || !line.startsWith('|') || !line.endsWith('|')) throw new Error(`${location}: expected a catalog table row.`);
    const cells = splitTableLine(line).slice(1, -1).map(cell => cell.trim());
    if (cells.length !== format.columns.length) throw new Error(`${location}: expected ${format.columns.length} columns; escape literal pipes as \\|.`);
    tableLine++;
    if (tableLine === 1) {
      if (cells.some((cell, index) => cell !== format.columns[index])) throw new Error(`${location}: expected header ${format.columns.join(' | ')}.`);
      continue;
    }
    if (tableLine === 2) {
      if (!cells.every(cell => /^:?-{3,}:?$/.test(cell))) throw new Error(`${location}: invalid table separator.`);
      continue;
    }

    const [rawName, type, description, platforms, stars, source] = cells;
    const name = plainText(rawName);
    const desc = plainText(description).replace(/[。.]$/, '').trim();
    const entryType = format.types.get(type);
    if (!name || !desc || !entryType) throw new Error(`${location}: name, description and a valid type are required.`);
    if (!/^(?:\d+|\d+(?:\.\d+)?k)$/.test(stars)) throw new Error(`${location}: invalid Stars value: ${stars}`);
    const link = /^\[[^\]]+\]\(([^\s)]+)\)$/.exec(source);
    if (!link) throw new Error(`${location}: expected one Markdown source link.`);
    const url = link[1].replace(/\/$/, '');
    sourceRepository(url);
    if (urls.has(url) || names.has(name.toLowerCase())) throw new Error(`${location}: duplicate catalog entry: ${name} (${url}).`);
    urls.add(url);
    names.add(name.toLowerCase());
    entries.push({ name, desc, entryType, category, platform: normalizePlatform(platforms, location), stars, url, lineIndex });
  }
  for (const [heading, id] of headings) {
    if (!seen.has(id)) throw new Error(`${format.file}: missing use case: ${heading}.`);
  }
  if (!entries.length) throw new Error(`${format.file}: empty catalog.`);
  return entries;
}

function buildIndex(english, chinese) {
  const translations = new Map(chinese.map(entry => [entry.url, entry]));
  const index = english.map(entry => {
    const translated = translations.get(entry.url);
    if (!translated) throw new Error(`Missing Chinese entry: ${entry.url}`);
    translations.delete(entry.url);
    for (const field of ['entryType', 'category', 'platform', 'stars']) {
      if (entry[field] !== translated[field]) throw new Error(`Bilingual ${field} mismatch for ${entry.url}: ${entry[field]} / ${translated[field]}`);
    }
    return {
      name: entry.name, nameZh: translated.name, desc: translated.desc, descEn: entry.desc,
      stars: entry.stars, platform: entry.platform, category: entry.category, entryType: entry.entryType, url: entry.url,
    };
  });
  if (translations.size) throw new Error(`Missing English entry: ${[...translations.keys()].join(', ')}`);
  return index;
}

module.exports = { formats, parseCatalog, buildIndex, sourceRepository, splitTableLine };

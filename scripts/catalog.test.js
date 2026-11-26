const assert = require('node:assert/strict');
const test = require('node:test');
const { formats, parseCatalog, buildIndex } = require('./catalog');
const { previousSourceUrls } = require('./check-entry-stars');
const { updateStarColumn } = require('./update-stars');

const source = 'https://github.com/example/skill/tree/main/skills/tool';
const other = 'https://github.com/example/skill-pack';
const enRow = `| Tool | Single Skill | Render A \\| B with [docs](${other}). | Claude/Codex |  512  | [GitHub](${source}) |`;
const zhRow = `| 工具 | 单个 Skill | 渲染 A \\| B。 | Codex/Claude | 512 | [GitHub](${source}) |`;

function fixture(language, rows) {
  const format = formats[language];
  const sections = format.headings.flatMap(([heading], index) => [
    `### ${heading}`, `| ${format.columns.join(' | ')} |`, '| --- | --- | --- | --- | --- | --- |',
    ...(index === 0 ? rows : []), '',
  ]);
  return [`## ${format.heading}`, '', ...sections, '## Footnotes', `[reference](${other})`].join('\n');
}

test('type and use case are independent, and the platform field is explicit', () => {
  const enCollection = enRow.replace('Tool | Single Skill', 'Packs | Skills Collection').replace(source, other).replace('Claude/Codex', '—');
  const zhCollection = zhRow.replace('工具 | 单个 Skill', '工具包 | Skills 合集').replace(source, other).replace('Codex/Claude', '—');
  const index = buildIndex(parseCatalog(fixture('en', [enRow, enCollection]), 'en'), parseCatalog(fixture('zh', [zhRow, zhCollection]), 'zh'));
  assert.deepEqual(index.map(entry => [entry.category, entry.entryType, entry.platform]), [
    ['devtools', 'single-skill', 'claude/codex'], ['devtools', 'collection', 'unspecified'],
  ]);
  assert.equal(index[0].descEn, 'Render A | B with docs');
});

test('rejects malformed table headers, old list rows and duplicate sources', () => {
  const english = fixture('en', [enRow]);
  assert.throws(() => parseCatalog(english.replace('Platforms | Stars', 'Stars | Platforms'), 'en'), /expected header/);
  assert.throws(() => parseCatalog(english.replace(enRow, '- [Tool](URL) - Old row'), 'en'), /expected a catalog table row/);
  assert.throws(() => parseCatalog(fixture('en', [enRow, enRow]), 'en'), /duplicate catalog entry/);
});

test('translations must agree on the source, use case, type, platforms and stars', () => {
  const english = parseCatalog(fixture('en', [enRow]), 'en');
  const check = markdown => buildIndex(english, parseCatalog(markdown, 'zh'));
  const chinese = fixture('zh', [zhRow]);
  assert.throws(() => check(chinese.replace(source, other)), /Missing Chinese entry/);
  assert.throws(() => check(chinese.replace(zhRow, '').replace('\n## Footnotes', `\n${zhRow}\n## Footnotes`)), /category mismatch/);
  assert.throws(() => check(chinese.replace('单个 Skill', 'Skills 合集')), /entryType mismatch/);
  assert.throws(() => check(chinese.replace('Codex/Claude', 'All')), /platform mismatch/);
  assert.throws(() => check(chinese.replace('512', '513')), /stars mismatch/);
});

test('star refresh only changes the Stars cell for the exact source repository', () => {
  for (const [language, row] of [['en', enRow], ['zh', zhRow]]) {
    const otherRow = row.replace(source, other).replace(/^\| [^|]+/, '| Other ');
    const markdown = fixture(language, [row, otherRow]).replaceAll('\n', '\r\n');
    const updated = updateStarColumn(markdown, parseCatalog(markdown, language), new Map([['example/skill', '1.2k']]), language);
    assert.equal(updated, markdown.replace(row, row.replace('512', '1.2k')));
  }
});

test('a format-only migration does not count existing URLs as new submissions', () => {
  const legacy = `## Development Tools\n\n- [Tool](${source}) - 512 ⭐ - Example.`;
  assert.deepEqual(previousSourceUrls(legacy), previousSourceUrls(fixture('en', [enRow])));
});

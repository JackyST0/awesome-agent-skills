#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { parseDocument } = require('yaml');

const ROOT = path.resolve(__dirname, '..');
const EXAMPLES_DIR = path.join(ROOT, 'examples');
const ALLOWED_FRONTMATTER_FIELDS = new Set([
  'name',
  'description',
  'license',
  'compatibility',
  'metadata',
  'allowed-tools',
]);
const RELEASE_REF_PATTERN = /^v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z][0-9A-Za-z.-]*)?(?:\+[0-9A-Za-z][0-9A-Za-z.-]*)?$/;

const errors = [];

function report(message) {
  errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function sameValues(actual, expected) {
  return JSON.stringify(sorted(actual)) === JSON.stringify(sorted(expected));
}

function parseFrontmatter(content, relativePath) {
  if (!/^---\r?\n/.test(content)) {
    report(`${relativePath}: SKILL.md must start with YAML frontmatter.`);
    return new Map();
  }

  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    report(`${relativePath}: YAML frontmatter is not closed.`);
    return new Map();
  }

  const document = parseDocument(match[1], {
    prettyErrors: false,
    uniqueKeys: true,
  });
  if (document.errors.length > 0) {
    for (const error of document.errors) {
      report(`${relativePath}: invalid YAML frontmatter (${error.message.replace(/\s+/g, ' ')}).`);
    }
    return new Map();
  }

  try {
    const fields = document.toJS({ mapAsMap: true });
    if (!(fields instanceof Map)) {
      report(`${relativePath}: YAML frontmatter must be a mapping.`);
      return new Map();
    }
    return fields;
  } catch (error) {
    report(`${relativePath}: unable to read YAML frontmatter (${error.message}).`);
    return new Map();
  }
}

function collectExampleSkills() {
  return sorted(
    fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  );
}

function validateSkills(skillNames) {
  const referencedTemplates = new Map();

  for (const skillName of skillNames) {
    const relativePath = path.join('examples', skillName, 'SKILL.md');
    const absolutePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
      report(`${relativePath}: missing SKILL.md.`);
      continue;
    }

    const content = fs.readFileSync(absolutePath, 'utf8');
    const fields = parseFrontmatter(content, relativePath);
    const name = fields.get('name');
    const description = fields.get('description');

    if (typeof name !== 'string') {
      report(`${relativePath}: frontmatter name must be a string.`);
    } else {
      if (name !== skillName) {
        report(`${relativePath}: frontmatter name must exactly match directory '${skillName}'.`);
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) {
        report(`${relativePath}: frontmatter name violates the Agent Skills naming rules.`);
      }
    }

    if (typeof description !== 'string') {
      report(`${relativePath}: description must be a string.`);
    } else if (description.length < 1 || description.length > 1024) {
      report(`${relativePath}: description must contain 1-1024 characters.`);
    }

    for (const field of fields.keys()) {
      if (typeof field !== 'string') {
        report(`${relativePath}: top-level frontmatter keys must be strings.`);
        continue;
      }
      if (!ALLOWED_FRONTMATTER_FIELDS.has(field)) {
        report(`${relativePath}: unsupported top-level frontmatter field '${field}'.`);
      }
    }

    if (fields.has('license') && typeof fields.get('license') !== 'string') {
      report(`${relativePath}: license must be a string.`);
    }

    if (fields.has('compatibility')) {
      const compatibility = fields.get('compatibility');
      if (typeof compatibility !== 'string') {
        report(`${relativePath}: compatibility must be a string.`);
      } else if (compatibility.length < 1 || compatibility.length > 500) {
        report(`${relativePath}: compatibility must contain 1-500 characters.`);
      }
    }

    if (fields.has('metadata')) {
      const metadata = fields.get('metadata');
      if (!(metadata instanceof Map)) {
        report(`${relativePath}: metadata must be a mapping of string keys to string values.`);
      } else {
        for (const [key, value] of metadata) {
          if (typeof key !== 'string' || typeof value !== 'string') {
            report(`${relativePath}: metadata must contain only string keys and string values.`);
            break;
          }
        }
      }
    }

    if (fields.has('allowed-tools') && typeof fields.get('allowed-tools') !== 'string') {
      report(`${relativePath}: allowed-tools must be a string.`);
    }

    const templates = new Set();
    for (const match of content.matchAll(/`(templates\/[^`]+)`/g)) {
      const referencedPath = match[1];
      if (!fs.existsSync(path.join(ROOT, 'examples', skillName, referencedPath))) {
        report(`${relativePath}: referenced file does not exist: ${referencedPath}`);
      }
      templates.add(path.basename(referencedPath));
    }
    referencedTemplates.set(skillName, sorted(templates));
  }

  return referencedTemplates;
}

function parseBashSkills(content) {
  const match = content.match(/^SKILLS="([^"]+)"$/m);
  if (!match) {
    report('install.sh: unable to read SKILLS.');
    return [];
  }
  return match[1].trim().split(/\s+/);
}

function parsePowerShellSkills(content) {
  const match = content.match(/^\$SKILLS\s*=\s*@\(([^\n]+)\)$/m);
  if (!match) {
    report('install.ps1: unable to read $SKILLS.');
    return [];
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function parseBashTemplates(content) {
  const block = content.match(/get_skill_templates\(\) \{([\s\S]*?)\n\}/);
  const templates = new Map();
  if (!block) {
    report('install.sh: unable to read template mappings.');
    return templates;
  }

  for (const match of block[1].matchAll(/^\s*([a-z0-9-]+)\)\s+echo\s+"([^"]*)"\s+;;/gm)) {
    templates.set(match[1], match[2].trim() ? match[2].trim().split(/\s+/) : []);
  }
  return templates;
}

function parsePowerShellTemplates(content) {
  const block = content.match(/\$SKILL_TEMPLATES\s*=\s*@\{([\s\S]*?)\n\}/);
  const templates = new Map();
  if (!block) {
    report('install.ps1: unable to read template mappings.');
    return templates;
  }

  for (const match of block[1].matchAll(/^\s*"([a-z0-9-]+)"\s*=\s*@\(([^)]*)\)/gm)) {
    templates.set(match[1], [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]));
  }
  return templates;
}

function validateInstallers(skillNames, referencedTemplates) {
  const bash = read('install.sh');
  const powershell = read('install.ps1');
  const bashSkills = parseBashSkills(bash);
  const powershellSkills = parsePowerShellSkills(powershell);

  if (!sameValues(bashSkills, skillNames)) {
    report(`install.sh: SKILLS must match examples directories (${skillNames.join(', ')}).`);
  }
  if (!sameValues(powershellSkills, skillNames)) {
    report(`install.ps1: $SKILLS must match examples directories (${skillNames.join(', ')}).`);
  }

  const bashTemplates = parseBashTemplates(bash);
  const powershellTemplates = parsePowerShellTemplates(powershell);
  for (const skillName of skillNames) {
    const expected = referencedTemplates.get(skillName) || [];
    const bashActual = bashTemplates.get(skillName) || [];
    const powershellActual = powershellTemplates.get(skillName) || [];
    if (!sameValues(bashActual, expected)) {
      report(`install.sh: template mapping for ${skillName} must be ${expected.join(', ') || '(empty)'}.`);
    }
    if (!sameValues(powershellActual, expected)) {
      report(`install.ps1: template mapping for ${skillName} must be ${expected.join(', ') || '(empty)'}.`);
    }
  }
}

function validateChecksums() {
  const entries = new Map();
  for (const line of read('checksums.txt').trim().split('\n')) {
    const match = line.match(/^([a-f0-9]{64})\s+(.+)$/);
    if (!match) {
      report(`checksums.txt: invalid line: ${line}`);
      continue;
    }
    entries.set(match[2], match[1]);
  }

  const expectedFiles = ['install.sh', 'install.ps1'];
  if (!sameValues(entries.keys(), expectedFiles)) {
    report('checksums.txt: entries must exactly cover install.sh and install.ps1.');
  }

  for (const file of expectedFiles) {
    if (!entries.has(file)) continue;
    const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex');
    if (entries.get(file) !== digest) {
      report(`checksums.txt: ${file} checksum is out of date.`);
    }
  }
}

function validateKnownRegressions() {
  const files = [
    'README.md',
    'README_ZH.md',
    'docs/how-to-use.md',
    'docs/skill-spec.md',
    'install.sh',
    'install.ps1',
  ];
  const forbidden = ['~/.windsurf/skills/', 'codex skill install'];

  for (const file of files) {
    const content = read(file);
    for (const snippet of forbidden) {
      if (content.includes(snippet)) {
        report(`${file}: contains obsolete text '${snippet}'.`);
      }
    }
  }
}

function validateReleaseReferences() {
  const sources = [
    {
      file: 'README.md',
      patterns: [
        /^(?:export AAS_REF=|\$AAS_REF\s*=\s*)"([^"]+)"$/gm,
        /raw\.githubusercontent\.com\/JackyST0\/awesome-agent-skills\/(v[0-9A-Za-z.+-]+)\//g,
      ],
    },
    {
      file: 'README_ZH.md',
      patterns: [
        /^(?:export AAS_REF=|\$AAS_REF\s*=\s*)"([^"]+)"$/gm,
        /raw\.githubusercontent\.com\/JackyST0\/awesome-agent-skills\/(v[0-9A-Za-z.+-]+)\//g,
      ],
    },
    {
      file: 'install.sh',
      patterns: [/^DEFAULT_REPOSITORY_REF="([^"]+)"$/gm],
    },
    {
      file: 'install.ps1',
      patterns: [/^\$DEFAULT_REPOSITORY_REF\s*=\s*"([^"]+)"$/gm],
    },
  ];
  const references = new Set();

  for (const source of sources) {
    const content = read(source.file);
    const matches = source.patterns.flatMap((pattern) => [...content.matchAll(pattern)].map((match) => match[1]));
    if (matches.length === 0) {
      report(`${source.file}: unable to find the documented release reference.`);
      continue;
    }

    for (const reference of matches) {
      if (!RELEASE_REF_PATTERN.test(reference)) {
        report(`${source.file}: invalid documented release reference '${reference}'.`);
      }
      references.add(reference);
    }
  }

  if (references.size > 1) {
    report(`Release references must match across documentation and installers (${sorted(references).join(', ')}).`);
  }
}

function validateJsonFiles() {
  for (const file of ['docs/skills.json', 'docs/registry.example.json', 'package.json', 'package-lock.json']) {
    try {
      JSON.parse(read(file));
    } catch (error) {
      report(`${file}: invalid JSON (${error.message}).`);
    }
  }
}

function collectMarkdownFiles(directory = ROOT) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(absolutePath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(absolutePath);
    }
  }
  return files;
}

function validateMarkdownFiles() {
  for (const absolutePath of collectMarkdownFiles()) {
    const relativePath = path.relative(ROOT, absolutePath);
    const lines = fs.readFileSync(absolutePath, 'utf8').split('\n');
    let fence = null;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
      if (fenceMatch) {
        const marker = fenceMatch[1];
        if (!fence) {
          fence = { character: marker[0], length: marker.length, line: index + 1 };
        } else if (
          marker[0] === fence.character &&
          marker.length >= fence.length &&
          fenceMatch[2].trim() === ''
        ) {
          fence = null;
        }
        continue;
      }

      if (fence) continue;

      for (const match of line.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
        let target = match[1].trim().replace(/^<|>$/g, '');
        if (!target || target.startsWith('#') || target.includes('{{')) continue;
        if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;

        target = target.split('#', 1)[0];
        if (!target || target === 'URL') continue;

        try {
          target = decodeURIComponent(target);
        } catch {
          report(`${relativePath}:${index + 1}: invalid URL encoding in relative link '${target}'.`);
          continue;
        }

        const resolved = path.resolve(path.dirname(absolutePath), target);
        if (!fs.existsSync(resolved)) {
          report(`${relativePath}:${index + 1}: broken relative link '${target}'.`);
        }
      }
    }

    if (fence) {
      report(`${relativePath}:${fence.line}: unclosed Markdown code fence.`);
    }
  }
}

function main() {
  const skillNames = collectExampleSkills();
  const referencedTemplates = validateSkills(skillNames);
  validateInstallers(skillNames, referencedTemplates);
  validateChecksums();
  validateKnownRegressions();
  validateReleaseReferences();
  validateJsonFiles();
  validateMarkdownFiles();

  if (errors.length > 0) {
    console.error(`Repository validation failed:\n- ${errors.join('\n- ')}`);
    process.exit(1);
  }

  console.log(`Repository validation passed for ${skillNames.length} bundled skills.`);
}

main();

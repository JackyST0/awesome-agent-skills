#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FULL_SHA = '0123456789012345678901234567890123456789';

function fail(message, result) {
  const details = result
    ? `\nstdout:\n${result.stdout || ''}\nstderr:\n${result.stderr || ''}`
    : '';
  throw new Error(`${message}${details}`);
}

function assert(condition, message, result) {
  if (!condition) fail(message, result);
}

function run(command, args, env) {
  return spawnSync(command, args, {
    cwd: ROOT,
    env,
    encoding: 'utf8',
  });
}

function writeMockCurl(binDir) {
  const mockPath = path.join(binDir, 'curl');
  const source = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
let output = '';
let url = '';
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '-o') {
    output = args[index + 1];
    index += 1;
  } else if (/^https:\\/\\//.test(args[index])) {
    url = args[index];
  }
}
if (!output || !url) process.exit(2);
const isSkill = url.endsWith('/SKILL.md');
const isTemplate = url.includes('/templates/');
if ((process.env.MOCK_FAIL_SKILL === '1' && isSkill) || (process.env.MOCK_FAIL_TEMPLATE === '1' && isTemplate)) {
  fs.writeFileSync(output, 'partial');
  process.exit(22);
}
const marker = '/examples/';
const markerIndex = url.indexOf(marker);
if (markerIndex === -1) process.exit(3);
const relative = url.slice(markerIndex + marker.length);
fs.copyFileSync(path.join(process.env.MOCK_SOURCE_ROOT, relative), output);
`;
  fs.writeFileSync(mockPath, source, { mode: 0o755 });
}

function writePowerShellWrapper(tempRoot) {
  const wrapperPath = path.join(tempRoot, 'mock-installer.ps1');
  const source = `function Invoke-WebRequest {
    [CmdletBinding()]
    param(
        [string]$Uri,
        [string]$OutFile,
        [switch]$UseBasicParsing
    )

    $isSkill = $Uri.EndsWith('/SKILL.md')
    $isTemplate = $Uri.Contains('/templates/')
    if (($env:MOCK_FAIL_SKILL -eq '1' -and $isSkill) -or ($env:MOCK_FAIL_TEMPLATE -eq '1' -and $isTemplate)) {
        [System.IO.File]::WriteAllText($OutFile, 'partial')
        throw 'mock download failure'
    }

    $marker = '/examples/'
    $markerIndex = $Uri.IndexOf($marker)
    if ($markerIndex -lt 0) {
        throw 'unexpected URL'
    }
    $relative = $Uri.Substring($markerIndex + $marker.Length).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
    Copy-Item -Path (Join-Path $env:MOCK_SOURCE_ROOT $relative) -Destination $OutFile -Force
}

$installerParameters = @{}
$parsedParameters = ConvertFrom-Json $env:AAS_INSTALLER_PARAMETERS
foreach ($property in $parsedParameters.PSObject.Properties) {
    $installerParameters[$property.Name] = $property.Value
}
& $env:AAS_INSTALLER_PATH @installerParameters
if ($null -ne $LASTEXITCODE) {
    exit $LASTEXITCODE
}
if (-not $?) {
    exit 1
}
`;
  fs.writeFileSync(wrapperPath, source);
  return wrapperPath;
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function prepareExistingSkill(home, platformPath, skillName) {
  const skillDir = path.join(home, platformPath, skillName);
  const templatesDir = path.join(skillDir, 'templates');
  fs.mkdirSync(templatesDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), 'original skill\n');
  fs.writeFileSync(path.join(templatesDir, 'test-report.md'), 'original template\n');
  return skillDir;
}

function validateBashPlatformSelection(baseEnv) {
  const platforms = ['cursor', 'claude', 'copilot', 'windsurf', 'codex', 'opencode', 'openclaw'];

  for (let index = 0; index < platforms.length; index += 1) {
    const result = run(
      'bash',
      ['-c', '. ./install.sh; get_platform_by_index "$1"', 'bash', String(index + 1)],
      baseEnv
    );
    assert(result.status === 0, `install.sh should resolve platform selection ${index + 1}.`, result);
    assert(result.stdout.trim() === platforms[index], `install.sh resolved platform selection ${index + 1} incorrectly.`, result);
  }

  for (const invalidIndex of ['0', '8', 'invalid']) {
    const result = run(
      'bash',
      ['-c', '. ./install.sh; get_platform_by_index "$1"', 'bash', invalidIndex],
      baseEnv
    );
    assert(result.status !== 0, `install.sh should reject platform selection '${invalidIndex}'.`, result);
  }
}

function validateBash(tempRoot, mockBin) {
  const baseEnv = {
    ...process.env,
    PATH: `${mockBin}${path.delimiter}${process.env.PATH || ''}`,
    MOCK_SOURCE_ROOT: path.join(ROOT, 'examples'),
  };

  validateBashPlatformSelection(baseEnv);

  let home = fs.mkdtempSync(path.join(tempRoot, 'bash-success-'));
  let result = run('bash', ['install.sh', '-p', 'codex', '-s', 'unit-test-generator'], {
    ...baseEnv,
    HOME: home,
    AAS_REPOSITORY_REF: '',
  });
  assert(result.status === 0, 'install.sh should install a skill and its template.', result);
  assert(
    readFile(path.join(home, '.codex/skills/unit-test-generator/SKILL.md')) === readFile(path.join(ROOT, 'examples/unit-test-generator/SKILL.md')),
    'install.sh installed SKILL.md content does not match the source.'
  );
  assert(
    readFile(path.join(home, '.codex/skills/unit-test-generator/templates/test-report.md')) === readFile(path.join(ROOT, 'examples/unit-test-generator/templates/test-report.md')),
    'install.sh installed template content does not match the source.'
  );

  home = fs.mkdtempSync(path.join(tempRoot, 'bash-windsurf-'));
  result = run('bash', ['install.sh', '-p', 'windsurf', '-s', 'code-review'], {
    ...baseEnv,
    HOME: home,
    AAS_REPOSITORY_REF: FULL_SHA,
  });
  assert(result.status === 0, 'install.sh should install to the Windsurf directory.', result);
  assert(
    fs.existsSync(path.join(home, '.codeium/windsurf/skills/code-review/SKILL.md')),
    'install.sh used the wrong Windsurf directory.'
  );

  home = fs.mkdtempSync(path.join(tempRoot, 'bash-list-'));
  result = run('bash', ['install.sh', '-p', 'codex', '--list-installed'], { ...baseEnv, HOME: home });
  assert(result.status === 0, 'install.sh list-installed should not require AAS_REPOSITORY_REF.', result);

  const uninstallDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = run('bash', ['install.sh', '-p', 'codex', '-u', '-s', 'unit-test-generator'], { ...baseEnv, HOME: home });
  assert(result.status === 0 && !fs.existsSync(uninstallDir), 'install.sh uninstall should not require AAS_REPOSITORY_REF.', result);

  result = run('bash', ['install.sh', '-p', 'codex', '-s', 'code-review'], {
    ...baseEnv,
    HOME: home,
    AAS_REPOSITORY_REF: 'main',
  });
  assert(result.status !== 0, 'install.sh must reject moving branch names.', result);

  home = fs.mkdtempSync(path.join(tempRoot, 'bash-skill-failure-'));
  let skillDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = run('bash', ['install.sh', '-p', 'codex', '-s', 'unit-test-generator'], {
    ...baseEnv,
    HOME: home,
    AAS_REPOSITORY_REF: FULL_SHA,
    MOCK_FAIL_SKILL: '1',
  });
  assert(result.status !== 0, 'install.sh must fail when SKILL.md download fails.', result);
  assert(readFile(path.join(skillDir, 'SKILL.md')) === 'original skill\n', 'install.sh replaced an existing SKILL.md after a failed download.');

  home = fs.mkdtempSync(path.join(tempRoot, 'bash-template-failure-'));
  skillDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = run('bash', ['install.sh', '-p', 'codex', '-s', 'unit-test-generator'], {
    ...baseEnv,
    HOME: home,
    AAS_REPOSITORY_REF: FULL_SHA,
    MOCK_FAIL_TEMPLATE: '1',
  });
  assert(result.status !== 0, 'install.sh must fail when a required template download fails.', result);
  assert(readFile(path.join(skillDir, 'SKILL.md')) === 'original skill\n', 'install.sh changed SKILL.md after a template failure.');
  assert(readFile(path.join(skillDir, 'templates/test-report.md')) === 'original template\n', 'install.sh changed a template after a failed download.');
}

function validatePowerShell(tempRoot, wrapperPath) {
  const probe = run('pwsh', ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.ToString()'], process.env);
  if (probe.error && probe.error.code === 'ENOENT') {
    if (process.env.CI === 'true') {
      fail('pwsh is required for installer checks in CI.', probe);
    }
    console.warn('Skipping PowerShell installer checks because pwsh is not installed.');
    return;
  }
  assert(probe.status === 0, 'Unable to start pwsh.', probe);

  const baseEnv = {
    ...process.env,
    AAS_INSTALLER_PATH: path.join(ROOT, 'install.ps1'),
    MOCK_SOURCE_ROOT: path.join(ROOT, 'examples'),
  };

  function runInstaller(parameters, env) {
    return run('pwsh', ['-NoProfile', '-File', wrapperPath], {
      ...baseEnv,
      ...env,
      AAS_INSTALLER_PARAMETERS: JSON.stringify(parameters),
    });
  }

  let home = fs.mkdtempSync(path.join(tempRoot, 'pwsh-success-'));
  let result = runInstaller(
    { Platform: 'codex', Skill: 'unit-test-generator' },
    { USERPROFILE: home, HOME: home, AAS_REPOSITORY_REF: '' }
  );
  assert(result.status === 0, 'install.ps1 should install a skill and its template.', result);
  assert(
    fs.existsSync(path.join(home, '.codex/skills/unit-test-generator/SKILL.md')),
    'install.ps1 did not create SKILL.md in the expected directory.',
    result
  );
  assert(
    readFile(path.join(home, '.codex/skills/unit-test-generator/SKILL.md')) === readFile(path.join(ROOT, 'examples/unit-test-generator/SKILL.md')),
    'install.ps1 installed SKILL.md content does not match the source.'
  );
  assert(
    readFile(path.join(home, '.codex/skills/unit-test-generator/templates/test-report.md')) === readFile(path.join(ROOT, 'examples/unit-test-generator/templates/test-report.md')),
    'install.ps1 installed template content does not match the source.'
  );

  home = fs.mkdtempSync(path.join(tempRoot, 'pwsh-windsurf-'));
  result = runInstaller({ RepositoryRef: FULL_SHA, Platform: 'windsurf', Skill: 'code-review' }, { USERPROFILE: home, HOME: home });
  assert(result.status === 0, 'install.ps1 should install to the Windsurf directory.', result);
  assert(
    fs.existsSync(path.join(home, '.codeium/windsurf/skills/code-review/SKILL.md')),
    'install.ps1 used the wrong Windsurf directory.'
  );

  home = fs.mkdtempSync(path.join(tempRoot, 'pwsh-list-'));
  result = runInstaller({ Platform: 'codex', ListInstalled: true }, { USERPROFILE: home, HOME: home });
  assert(result.status === 0, 'install.ps1 ListInstalled should not require RepositoryRef.', result);

  const uninstallDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = runInstaller({ Platform: 'codex', Uninstall: true, Skill: 'unit-test-generator' }, { USERPROFILE: home, HOME: home });
  assert(result.status === 0 && !fs.existsSync(uninstallDir), 'install.ps1 uninstall should not require RepositoryRef.', result);

  result = runInstaller({ RepositoryRef: 'main', Platform: 'codex', Skill: 'code-review' }, { USERPROFILE: home, HOME: home });
  assert(result.status !== 0, 'install.ps1 must reject moving branch names.', result);

  home = fs.mkdtempSync(path.join(tempRoot, 'pwsh-skill-failure-'));
  let skillDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = runInstaller({ RepositoryRef: FULL_SHA, Platform: 'codex', Skill: 'unit-test-generator' }, {
    USERPROFILE: home,
    HOME: home,
    MOCK_FAIL_SKILL: '1',
  });
  assert(result.status !== 0, 'install.ps1 must fail when SKILL.md download fails.', result);
  assert(readFile(path.join(skillDir, 'SKILL.md')) === 'original skill\n', 'install.ps1 replaced an existing SKILL.md after a failed download.');

  home = fs.mkdtempSync(path.join(tempRoot, 'pwsh-template-failure-'));
  skillDir = prepareExistingSkill(home, '.codex/skills', 'unit-test-generator');
  result = runInstaller({ RepositoryRef: FULL_SHA, Platform: 'codex', Skill: 'unit-test-generator' }, {
    USERPROFILE: home,
    HOME: home,
    MOCK_FAIL_TEMPLATE: '1',
  });
  assert(result.status !== 0, 'install.ps1 must fail when a required template download fails.', result);
  assert(readFile(path.join(skillDir, 'SKILL.md')) === 'original skill\n', 'install.ps1 changed SKILL.md after a template failure.');
  assert(readFile(path.join(skillDir, 'templates/test-report.md')) === 'original template\n', 'install.ps1 changed a template after a failed download.');
}

function main() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-agent-skills-'));
  try {
    const mockBin = path.join(tempRoot, 'bin');
    fs.mkdirSync(mockBin);
    writeMockCurl(mockBin);
    const wrapperPath = writePowerShellWrapper(tempRoot);

    const syntax = run('bash', ['-n', 'install.sh'], process.env);
    assert(syntax.status === 0, 'install.sh has a syntax error.', syntax);

    validateBash(tempRoot, mockBin);
    validatePowerShell(tempRoot, wrapperPath);
    console.log('Installer checks passed.');
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

main();

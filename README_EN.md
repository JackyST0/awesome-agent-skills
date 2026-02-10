<p align="center">
  <img src="assets/banner.svg" alt="Awesome Agent Skills" width="100%">
</p>

<p align="center">
  <a href="https://awesome.re"><img src="https://awesome.re/badge.svg" alt="Awesome"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://creativecommons.org/publicdomain/zero/1.0/"><img src="https://img.shields.io/badge/License-CC0-lightgrey.svg" alt="License: CC0"></a>
  <img src="https://img.shields.io/github/stars/JackyST0/awesome-agent-skills?style=social" alt="GitHub Stars">
</p>

<p align="center">
  <a href="https://jackyst0.github.io/awesome-agent-skills/"><b>🔍 Search Skills Online</b></a>
</p>

# Awesome Agent Skills

> 🤖 A curated list of awesome AI Agent Skills for Cursor, Claude Code, GitHub Copilot, and other AI-powered tools.
>
> Agent Skills are instructions, scripts, and resources that AI Agents can discover and use to better accomplish specific tasks.

[English](README_EN.md) | [简体中文](README.md)

---

## Quick Start

### One-Click Install (Recommended)

**macOS / Linux:**

```bash
# Interactive mode - install, uninstall, or list
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash

# Or install all skills to a specific platform
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -a

# Uninstall skills
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -u -s code-review

# List installed skills
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor --list-installed
```

**Windows (PowerShell):**

```powershell
# Download and run the install script
irm https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1 | iex

# Or download first then run (recommended)
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1" -OutFile "install.ps1"
.\install.ps1                                    # Interactive mode
.\install.ps1 -Platform cursor -All              # Install all skills
.\install.ps1 -Platform cursor -Uninstall -All   # Uninstall all skills
.\install.ps1 -Platform cursor -ListInstalled    # List installed
```

### Manual Install

```bash
# Clone examples from this repository
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/

# Or clone official skills
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics
```

---

## Online Search

Don't want to scroll through long lists? Try the **[Online Search Tool](https://jackyst0.github.io/awesome-agent-skills/)** to quickly filter by name, description, or platform!

---

## Table of Contents

- [What are Agent Skills](#what-are-agent-skills)
- [How to Use](#how-to-use)
- [Skills List](#skills-list)
  - [Official Resources](#official-resources)
  - [Skills Collections](#skills-collections)
  - [Development Tools](#development-tools)
  - [Productivity](#productivity)
  - [DevOps](#devops)
  - [Data Processing](#data-processing)
  - [Writing](#writing)
  - [Design](#design)
- [Contributing](#contributing)
- [Create Your Own Skill](#create-your-own-skill)

## What are Agent Skills

Agent Skills are instruction sets, scripts, and resources that AI agents can discover and use to perform specific tasks. Each skill contains a `SKILL.md` file that tells the AI how to use it.

**A skill typically includes:**
- `SKILL.md` - Core instruction file (required)
- `scripts/` - Automation scripts (optional)
- `templates/` - Output templates (optional)
- `resources/` - Other resource files (optional)

Skills work across multiple platforms:

| Platform | Global Directory | Project Directory |
|----------|------------------|-------------------|
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| Windsurf | `~/.windsurf/skills/` | `.windsurf/skills/` |
| OpenAI Codex | `~/.codex/skills/` | `.codex/skills/` |
| OpenCode | `~/.config/opencode/skills/` | `.opencode/skills/` |

## How to Use

### Option 1: Manual Copy

```bash
# Cursor
cp -r my-skill ~/.cursor/skills/

# Claude Code
cp -r my-skill ~/.claude/skills/

# GitHub Copilot
cp -r my-skill ~/.copilot/skills/
# Or project-level
cp -r my-skill .github/skills/
```

### Option 2: Git Clone

```bash
# Clone to global directory
git clone https://github.com/example/my-skill.git ~/.cursor/skills/my-skill
```

> 💡 **Tip**: Global skills apply to all projects, project-level skills only apply to the current project.
> 
> 📖 **Detailed Guide**: See [How to Use Agent Skills](docs/how-to-use.md)

## Skills List

### Official Resources

| Name | Description | Stars | Link |
|------|-------------|-------|------|
| Agent Skills Open Standard | Official Agent Skills specification | - | [skill.md](https://skill.md/) |
| Agent Skills Specification | SKILL.md format specification | - | [agentskills.io](https://agentskills.io/specification) |
| anthropics/skills | ⭐ Official Anthropic Agent Skills repository | 65.9k | [GitHub](https://github.com/anthropics/skills) |
| vercel-labs/skills | ⭐ Vercel official Skills CLI tool (`npx skills add`) | 5.4k | [GitHub](https://github.com/vercel-labs/add-skill) |
| microsoft/skills | ⭐ Microsoft official 131 Azure SDK Skills | 1.2k | [GitHub](https://github.com/microsoft/agent-skills) |
| github/awesome-copilot | GitHub official Copilot resources | - | [GitHub](https://github.com/github/awesome-copilot) |
| Agent Skills Index | Community Skills search engine | - | [agent-skills.md](https://agent-skills.md/) |
| Skills Leaderboard | Open Agent Skills ecosystem directory | - | [skills.sh](https://skills.sh) |

### Skills Collections

| Name | Description | Stars | Link |
|------|-------------|-------|------|
| awesome-cursorrules | ⭐ The most comprehensive Cursor Rules collection | 37.7k | [GitHub](https://github.com/PatrickJS/awesome-cursorrules) |
| everything-claude-code | ⭐ Complete Claude Code configs (agents/skills/hooks) | 42.4k | [GitHub](https://github.com/affaan-m/everything-claude-code) |
| awesome-claude-skills | ⭐ Claude Skills collection by Composio | 32.7k | [GitHub](https://github.com/ComposioHQ/awesome-claude-skills) |
| awesome-claude-code | ⭐ Claude Code skills/hooks/plugins collection | 23.2k | [GitHub](https://github.com/hesreallyhim/awesome-claude-code) |
| openskills | ⭐ Universal Skills loader (npm install) | 8.0k | [GitHub](https://github.com/numman-ali/openskills) |
| awesome-claude-skills | Claude Skills collection by VoltAgent | 4.4k | [GitHub](https://github.com/VoltAgent/awesome-claude-skills) |
| claude-skills | Claude Skills documentation by Simon Willison | 915 | [GitHub](https://github.com/simonw/claude-skills) |
| claude-skills-collection | Curated official and community Skills | 426 | [GitHub](https://github.com/abubakarsiddik31/claude-skills-collection) |
| cursor-rules-and-prompts | Cursor rules and prompts collection | 203 | [GitHub](https://github.com/thehimel/cursor-rules-and-prompts) |
| Ai-Agent-Skills | ⭐ Universal AI Skills installer (Homebrew for Skills) | 774 | [GitHub](https://github.com/skillcreatorai/Ai-Agent-Skills) |
| claude-code-kit | Claude Code toolkit with auto-activating skills | 60 | [GitHub](https://github.com/blencorp/claude-code-kit) |

### Development Tools

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| claude-code-security-review | ⭐ AI security review GitHub Action (Official) | Claude | [GitHub](https://github.com/anthropics/claude-code-security-review) |
| trailofbits/skills | ⭐ Trail of Bits security research & audit Skills | Claude | [GitHub](https://github.com/trailofbits/skills) |
| playwright-skill | Playwright browser automation testing Skill | Claude | [GitHub](https://github.com/lackeyjb/playwright-skill) |
| gh-code-review | GitHub PR code review Skill | Copilot | [GitHub](https://github.com/bkircher/skills) |
| skill-codex | Delegate tasks to Codex Skill | Claude | [GitHub](https://github.com/skills-directory/skill-codex) |
| claude-code-skills | Professional Skills marketplace | Claude | [GitHub](https://github.com/daymade/claude-code-skills) |
| skillset-example | GitHub Copilot extension example | Copilot | [GitHub](https://github.com/copilot-extensions/skillset-example) |
| vercel-labs/agent-skills | ⭐ Vercel React/Web design best practices Skills (19.7k ⭐) | All | [GitHub](https://github.com/vercel-labs/agent-skills) |
| antfu/skills | ⭐ Vue/Vite/Vitest development Skills (3.2k ⭐) | All | [GitHub](https://github.com/antfu/skills) |
| supabase/agent-skills | ⭐ Supabase Postgres best practices Skill (1.2k ⭐) | All | [GitHub](https://github.com/supabase/agent-skills) |
| expo/skills | ⭐ Expo/React Native development Skills (931 ⭐) | All | [GitHub](https://github.com/expo/skills) |
| browser-use/browser-use | Browser automation Skill (78.1k ⭐) | All | [GitHub](https://github.com/browser-use/browser-use) |
| code-review | Smart code review example Skill | All | [Example](examples/code-review/) |
| git-commit | Git commit message generator Skill | All | [Example](examples/git-commit/) |
| unit-test-generator | Unit test auto-generator Skill | All | [Example](examples/unit-test-generator/) |
| api-doc-generator | API documentation generator Skill | All | [Example](examples/api-doc-generator/) |
| debug-helper | Code debugging assistant Skill | All | [Example](examples/debug-helper/) |

### Productivity

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| claude-code-workflows | Production-grade dev workflows with quality checks | Claude | [GitHub](https://github.com/shinpr/claude-code-workflows) |
| claude-skills | 20+ productivity tools with 8 expert Agents | Claude | [GitHub](https://github.com/alirezarezvani/claude-skills) |
| claude-code-skill-factory | Skills factory for batch generation and deployment | Claude | [GitHub](https://github.com/alirezarezvani/claude-code-skill-factory) |
| obra/superpowers | ⭐ Complete dev workflow (Debug/TDD/Code Review/Planning) (48.8k ⭐) | All | [GitHub](https://github.com/obra/superpowers) |
| coreyhaines31/marketingskills | ⭐ Marketing Skills (SEO/Copywriting/CRO/Ads) (7.1k ⭐) | All | [GitHub](https://github.com/coreyhaines31/marketingskills) |

### DevOps

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| devops-claude-skills | DevOps workflow marketplace with Terraform/K8s | Claude | [GitHub](https://github.com/ahmedasmar/devops-claude-skills) |
| claudekit-skills | Docker/GCP/Cloudflare deployment and management | Claude | [GitHub](https://github.com/mrgoonie/claudekit-skills) |
| claudebox | Dockerized Claude Code dev environment | Claude | [GitHub](https://github.com/RchGrav/claudebox) |

### Data Processing

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| d3-visualization | D3.js data visualization Skill | Claude | [ComposioHQ](https://github.com/ComposioHQ/awesome-claude-skills) |
| context-engineering | Context engineering and multi-Agent architecture | All | [GitHub](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) |

### Writing

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| doc-coauthoring | ⭐ Document co-authoring Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) |
| internal-comms | ⭐ Internal communications generation Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/internal-comms) |
| docx | ⭐ Word document processing Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/docx) |
| pdf | ⭐ PDF document processing Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/pdf) |
| pptx | ⭐ PowerPoint presentation generator Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/pptx) |
| xlsx | ⭐ Excel spreadsheet processing Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/xlsx) |

### Design

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| frontend-design | ⭐ Frontend UI design Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| brand-guidelines | ⭐ Brand design guidelines Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) |
| canvas-design | ⭐ Canvas design Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/canvas-design) |
| theme-factory | ⭐ Theme style factory Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/theme-factory) |
| algorithmic-art | ⭐ Algorithmic art generation Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) |
| slack-gif-creator | ⭐ Slack GIF creator Skill | Claude | [Official](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) |

---

> 🚧 Found more awesome Skills? [Submit your discovery →](CONTRIBUTING.md)

## Contributing

We welcome contributions! Here's how:

1. Fork this repository
2. Add your skill to the appropriate category
3. Ensure complete information (name, description, platform, link)
4. Submit a Pull Request

### Guidelines

- Each skill must have a clear description
- Links must be valid and accessible
- Open source projects preferred
- Please sort alphabetically

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Create Your Own Skill

Basic structure:

```
my-skill/
├── SKILL.md          # Required: instruction file
├── scripts/          # Optional: scripts
├── templates/        # Optional: templates
└── examples/         # Optional: examples
```

📁 **Examples**: Check out [examples/](examples/) for 5 ready-to-use skill templates.

📖 **Guide**: See [How to Create a Skill](docs/how-to-create.md) for the complete guide.

📋 **Specification**: See [SKILL.md Specification](docs/skill-spec.md) for format standards and best practices.

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.com/#JackyST0/awesome-agent-skills&Date)

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.

# Awesome Agent Skills

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![License: CC0](https://img.shields.io/badge/License-CC0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

> 🤖 A curated list of awesome AI Agent Skills for Cursor, Claude Code, GitHub Copilot, and other AI-powered tools.

[English](README_EN.md) | [简体中文](README.md)

---

## Quick Start

```bash
# Clone example skills to Cursor
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics

# Or copy examples from this repository
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/
```

---

## Table of Contents

- [What are Agent Skills](#what-are-agent-skills)
- [How to Use](#how-to-use)
- [Skills List](#skills-list)
  - [Official Resources](#official-resources)
  - [Skills Collections](#skills-collections)
  - [Development Tools](#development-tools)
  - [More Categories](#more-categories-contributions-welcome)
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
| anthropics/skills | ⭐ Official Anthropic Agent Skills repository | 54.9k | [GitHub](https://github.com/anthropics/skills) |
| github/awesome-copilot | GitHub official Copilot resources | - | [GitHub](https://github.com/github/awesome-copilot) |
| Agent Skills Index | Community Skills search engine | - | [agent-skills.md](https://agent-skills.md/) |

### Skills Collections

| Name | Description | Stars | Link |
|------|-------------|-------|------|
| awesome-cursorrules | ⭐ The most comprehensive Cursor Rules collection | 37.3k | [GitHub](https://github.com/PatrickJS/awesome-cursorrules) |
| awesome-claude-skills | ⭐ Claude Skills collection by Composio | 25.7k | [GitHub](https://github.com/ComposioHQ/awesome-claude-skills) |
| everything-claude-code | ⭐ Complete Claude Code configs (agents/skills/hooks) | 25.5k | [GitHub](https://github.com/affaan-m/everything-claude-code) |
| awesome-claude-skills | Claude Skills collection by VoltAgent | 4.3k | [GitHub](https://github.com/VoltAgent/awesome-claude-skills) |
| claude-skills | Claude Skills documentation by Simon Willison | 906 | [GitHub](https://github.com/simonw/claude-skills) |
| claude-skills-collection | Curated official and community Skills | 402 | [GitHub](https://github.com/abubakarsiddik31/claude-skills-collection) |
| cursor-automator | Cursor automation Rules collection | - | [GitHub](https://github.com/ShalevAri/cursor-automator) |
| cursor-rules-and-prompts | Cursor rules and prompts collection | 112 | [GitHub](https://github.com/thehimel/cursor-rules-and-prompts) |
| claude-code-central | Shared Claude Code agents, skills, and templates | - | [GitHub](https://github.com/grandinh/claude-code-central) |
| claude-code-kit | Claude Code toolkit with auto-activating skills | 58 | [GitHub](https://github.com/blencorp/claude-code-kit) |

### Development Tools

| Name | Description | Platform | Link |
|------|-------------|----------|------|
| gh-code-review | GitHub PR code review Skill | Copilot | [GitHub](https://github.com/bkircher/skills) |
| skill-codex | Delegate tasks to Codex Skill | Claude | [GitHub](https://github.com/skills-directory/skill-codex) |
| skillset-example | GitHub Copilot extension example | Copilot | [GitHub](https://github.com/copilot-extensions/skillset-example) |
| code-review | Smart code review example Skill | All | [Example](examples/code-review/) |
| git-commit | Git commit message generator Skill | All | [Example](examples/git-commit/) |
| unit-test-generator | Unit test auto-generator Skill | All | [Example](examples/unit-test-generator/) |
| api-doc-generator | API documentation generator Skill | All | [Example](examples/api-doc-generator/) |
| debug-helper | Code debugging assistant Skill | All | [Example](examples/debug-helper/) |

### More Categories (Contributions Welcome)

The following categories are open for submissions:

| Category | Description |
|----------|-------------|
| Productivity | Workflow automation, time management, task planning |
| Writing | Content generation, documentation, translation |
| Data Processing | Data analysis, format conversion, visualization |
| DevOps | CI/CD, containerization, monitoring |
| Design | UI/UX assistance, design guidelines, image processing |

> 🚧 [Submit your Skill →](CONTRIBUTING.md)

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

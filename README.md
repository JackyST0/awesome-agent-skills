# Awesome Agent Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Modular instruction packages that give AI coding assistants on-demand capabilities for specific tasks, working across Cursor, Claude Code, GitHub Copilot, and more.

[English](README.md) | [简体中文](README_ZH.md)

<p align="center">
  <a href="https://jackyst0.github.io/awesome-agent-skills/"><b>🔍 Search Skills Online</b></a>
</p>

## Contents

- [Quick Start](#quick-start)
- [What Are Agent Skills](#what-are-agent-skills)
- [Official Resources](#official-resources)
- [Skills Collections](#skills-collections)
- [Development Tools](#development-tools)
- [Productivity](#productivity)
- [DevOps](#devops)
- [Data Processing](#data-processing)
- [Writing](#writing)
- [Design](#design)

## Quick Start

### One-Click Install (Recommended)

**macOS / Linux:**

```bash
# Interactive mode - install, uninstall, or list
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash

# Or install all skills to a specific platform
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -a
```

**Windows (PowerShell):**

```powershell
# Download and run the install script
irm https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1 | iex
```

### Manual Install

```bash
# Clone examples from this repository
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/

# Or clone official skills
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics
```

> 📖 See [How to Use Agent Skills](docs/how-to-use.md) for the complete guide.

## What Are Agent Skills

Agent Skills are instruction sets, scripts, and resources that AI agents can discover and use to perform specific tasks. Each skill contains a `SKILL.md` file that tells the AI how to use it.

Skills work across multiple platforms:

|Platform   |Global Directory             |Project Directory   |
|-----------|-----------------------------|--------------------|
|Cursor     |`~/.cursor/skills/`          |`.cursor/skills/`   |
|Claude Code|`~/.claude/skills/`          |`.claude/skills/`   |
|Copilot    |`~/.copilot/skills/`         |`.github/skills/`   |
|Windsurf   |`~/.windsurf/skills/`        |`.windsurf/skills/` |
|Codex      |`~/.codex/skills/`           |`.codex/skills/`    |
|OpenCode   |`~/.config/opencode/skills/` |`.opencode/skills/` |

## Official Resources

- [Agent Skills Open Standard](https://skill.md/) - Official Agent Skills specification.
- [Agent Skills Specification](https://agentskills.io/specification) - SKILL.md format specification.
- [anthropics/skills](https://github.com/anthropics/skills) - Official Anthropic Agent Skills repository.
- [vercel-labs/skills](https://github.com/vercel-labs/add-skill) - Vercel official Skills CLI tool.
- [microsoft/skills](https://github.com/microsoft/agent-skills) - Microsoft official 131 Azure SDK Skills.
- [GitHub Awesome Copilot](https://github.com/github/awesome-copilot) - Official Copilot resources collection.
- [Agent Skills Index](https://agent-skills.md/) - Community Skills search engine.
- [Skills Leaderboard](https://skills.sh) - Open Agent Skills ecosystem directory.

## Skills Collections

- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) - The most comprehensive Cursor Rules collection.
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Complete Claude Code configs (agents/skills/hooks).
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills collection by Composio.
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Claude Code skills/hooks/plugins collection.
- [openskills](https://github.com/numman-ali/openskills) - Universal Skills loader (npm install).
- [awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills) - Claude Skills collection by VoltAgent.
- [claude-skills](https://github.com/simonw/claude-skills) - Claude Skills documentation by Simon Willison.
- [claude-skills-collection](https://github.com/abubakarsiddik31/claude-skills-collection) - Curated official and community Skills.
- [cursor-rules-and-prompts](https://github.com/thehimel/cursor-rules-and-prompts) - Cursor rules and prompts collection.
- [Ai-Agent-Skills](https://github.com/skillcreatorai/Ai-Agent-Skills) - Universal AI Skills installer (Homebrew for Skills).
- [claude-code-kit](https://github.com/blencorp/claude-code-kit) - Claude Code toolkit with auto-activating skills.

## Development Tools

- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) - AI security review GitHub Action (Official).
- [trailofbits/skills](https://github.com/trailofbits/skills) - Trail of Bits security research and audit Skills.
- [playwright-skill](https://github.com/lackeyjb/playwright-skill) - Playwright browser automation testing Skill.
- [gh-code-review](https://github.com/bkircher/skills) - PR code review Skill for GitHub.
- [skill-codex](https://github.com/skills-directory/skill-codex) - Delegate tasks to Codex Skill.
- [claude-code-skills](https://github.com/daymade/claude-code-skills) - Professional Skills marketplace.
- [skillset-example](https://github.com/copilot-extensions/skillset-example) - GitHub Copilot extension example.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel React/Web design best practices Skills.
- [antfu/skills](https://github.com/antfu/skills) - Vue/Vite/Vitest development Skills.
- [Supabase Agent Skills](https://github.com/supabase/agent-skills) - PostgreSQL best practices Skill by Supabase.
- [Expo Skills](https://github.com/expo/skills) - Expo/React Native development Skills.
- [browser-use/browser-use](https://github.com/browser-use/browser-use) - Browser automation Skill.
- [code-review](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/code-review) - Smart code review example Skill.
- [git-commit](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/git-commit) - Git commit message generator Skill.
- [unit-test-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/unit-test-generator) - Unit test auto-generator Skill.
- [api-doc-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/api-doc-generator) - API documentation generator Skill.
- [debug-helper](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/debug-helper) - Code debugging assistant Skill.

## Productivity

- [claude-code-workflows](https://github.com/shinpr/claude-code-workflows) - Production-grade dev workflows with quality checks.
- [claude-skills](https://github.com/alirezarezvani/claude-skills) - 20+ productivity tools with 8 expert Agents.
- [claude-code-skill-factory](https://github.com/alirezarezvani/claude-code-skill-factory) - Skills factory for batch generation and deployment.
- [obra/superpowers](https://github.com/obra/superpowers) - Complete dev workflow (Debug/TDD/Code Review/Planning).
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) - Marketing Skills (SEO/Copywriting/CRO/Ads).

## DevOps

- [devops-claude-skills](https://github.com/ahmedasmar/devops-claude-skills) - DevOps workflow marketplace with Terraform/K8s.
- [claudekit-skills](https://github.com/mrgoonie/claudekit-skills) - Docker/GCP/Cloudflare deployment and management.
- [claudebox](https://github.com/RchGrav/claudebox) - Dockerized Claude Code dev environment.

## Data Processing

- [d3-visualization](https://github.com/ComposioHQ/awesome-claude-skills#data-visualization) - D3.js data visualization Skill.
- [context-engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) - Context engineering and multi-Agent architecture.

## Writing

- [doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) - Document co-authoring Skill.
- [internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) - Internal communications generation Skill.
- [docx](https://github.com/anthropics/skills/tree/main/skills/docx) - Word document processing Skill.
- [pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) - Portable document format processing Skill.
- [pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) - PowerPoint presentation generator Skill.
- [xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) - Excel spreadsheet processing Skill.

## Design

- [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) - Frontend UI design Skill.
- [brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) - Brand design guidelines Skill.
- [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) - Canvas design Skill.
- [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) - Theme style factory Skill.
- [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) - Algorithmic art generation Skill.
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - Slack GIF creator Skill.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Footnotes

### Create Your Own Skill

📁 **Examples**: Check out [examples/](examples/) for 5 ready-to-use skill templates.

📖 **Guide**: See [How to Create a Skill](docs/how-to-create.md) for the complete guide.

📋 **Specification**: See [SKILL.md Specification](docs/skill-spec.md) for format standards and best practices.

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.com/#JackyST0/awesome-agent-skills&Date)

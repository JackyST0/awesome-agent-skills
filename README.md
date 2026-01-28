# Awesome Agent Skills

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![License: CC0](https://img.shields.io/badge/License-CC0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

> 🤖 A curated list of awesome AI Agent Skills for Cursor, Claude Code, GitHub Copilot, and other AI-powered tools.
>
> Agent Skills 是 AI Agent 可以发现和使用的指令、脚本和资源包，让 AI 更好地完成特定任务。

<p align="center">
  <a href="#quick-start--快速开始">Quick Start</a> •
  <a href="#skills-列表">Skills 列表</a> •
  <a href="#如何贡献">贡献</a> •
  <a href="#english">English</a>
</p>

---

## Quick Start / 快速开始

```bash
# 克隆示例 skill 到 Cursor
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics

# 或复制本仓库的示例
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/
```

---

## 中文

### 目录

- [什么是 Agent Skills](#什么是-agent-skills)
- [如何使用](#如何使用)
- [Skills 列表](#skills-列表)
  - [官方资源](#官方资源)
  - [Skills 合集](#skills-合集)
  - [开发工具](#开发工具)
  - [效率提升](#效率提升)
  - [写作创作](#写作创作)
  - [数据处理](#数据处理)
  - [DevOps](#devops)
  - [设计相关](#设计相关)
- [如何贡献](#如何贡献)
- [创建你自己的 Skill](#创建你自己的-skill)

### 什么是 Agent Skills

Agent Skills 是一种让 AI Agent 更智能的方式。每个 Skill 包含：

- `SKILL.md` - 核心说明文件，告诉 AI 如何使用这个技能
- `scripts/` - 可选的脚本文件
- `templates/` - 可选的模板文件
- `resources/` - 其他资源文件

Skills 可在多个平台使用：

| 平台 | 全局目录 | 项目目录 |
|------|----------|----------|
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| Windsurf | `~/.windsurf/skills/` | `.windsurf/skills/` |
| OpenAI Codex | `~/.codex/skills/` | `.codex/skills/` |

### 如何使用

#### 方式一：手动复制

```bash
# Cursor
cp -r my-skill ~/.cursor/skills/

# Claude Code
cp -r my-skill ~/.claude/skills/

# GitHub Copilot
cp -r my-skill ~/.copilot/skills/
# 或项目级
cp -r my-skill .github/skills/
```

#### 方式二：Git Clone

```bash
# 克隆到全局目录
git clone https://github.com/example/my-skill.git ~/.cursor/skills/my-skill
```

> 💡 **提示**：全局 skills 对所有项目生效，项目级 skills 仅对当前项目生效。
> 
> 📖 **详细指南**：查看 [如何使用 Agent Skills](docs/how-to-use.md)

### Skills 列表

#### 官方资源

| 名称 | 描述 | Stars | 链接 |
|------|------|-------|------|
| Agent Skills 开放标准 | Agent Skills 官方规范文档 | - | [skill.md](https://skill.md/) |
| anthropics/skills | Anthropic 官方 Agent Skills 仓库 | 54.9k | [GitHub](https://github.com/anthropics/skills) |
| agentskills/agentskills | Agent Skills 标准参考实现 | - | [GitHub](https://github.com/agentskills/agentskills) |
| github/awesome-copilot | GitHub 官方 Copilot 资源合集 | - | [GitHub](https://github.com/github/awesome-copilot) |

#### Skills 合集

| 名称 | 描述 | Stars | 链接 |
|------|------|-------|------|
| awesome-cursorrules | 最全面的 Cursor Rules 合集 | 37.3k | [GitHub](https://github.com/PatrickJS/awesome-cursorrules) |
| cursor-skills | Cursor Skills 示例集合 | - | [GitHub](https://github.com/daniel-scrivner/cursor-skills) |
| cursor-rules-and-prompts | Cursor 规则与提示词集合 | 112 | [GitHub](https://github.com/thehimel/cursor-rules-and-prompts) |
| claude-code-central | Claude Code 共享 agents、skills 和模板 | - | [GitHub](https://github.com/grandinh/claude-code-central) |
| claude-code-kit | Claude Code 工具包，自动激活 skills | 58 | [GitHub](https://github.com/blencorp/claude-code-kit) |

#### 开发工具

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| skill-codex | 将任务委派给 Codex 的 Claude Code Skill | Claude | [GitHub](https://github.com/skills-directory/skill-codex) |
| code-review | 智能代码审查示例 Skill | All | [示例](examples/code-review/) |
| git-commit | Git 提交信息生成示例 Skill | All | [示例](examples/git-commit/) |

#### 效率提升

> 🚧 等待收录中... [提交你的第一个 Skill →](CONTRIBUTING.md)

#### 写作创作

> 🚧 等待收录中... [提交你的第一个 Skill →](CONTRIBUTING.md)

#### 数据处理

> 🚧 等待收录中... [提交你的第一个 Skill →](CONTRIBUTING.md)

#### DevOps

> 🚧 等待收录中... [提交你的第一个 Skill →](CONTRIBUTING.md)

#### 设计相关

> 🚧 等待收录中... [提交你的第一个 Skill →](CONTRIBUTING.md)

### 如何贡献

欢迎提交 PR！请遵循以下步骤：

1. Fork 这个仓库
2. 添加你的 skill 到对应分类
3. 确保填写完整信息（名称、描述、平台、链接）
4. 提交 Pull Request

#### 贡献规范

- 每个 skill 必须有清晰的描述
- 链接必须有效且可访问
- 优先收录开源项目
- 请按字母顺序排列

### 创建你自己的 Skill

查看 [Skill 创建指南](docs/how-to-create.md) 学习如何创建一个标准的 Agent Skill。

基本结构：

```
my-skill/
├── SKILL.md          # 必需：说明文件
├── scripts/          # 可选：脚本
├── templates/        # 可选：模板
└── examples/         # 可选：示例
```

📁 **查看示例**：本仓库的 [examples/](examples/) 目录包含可直接使用的示例 Skills。

---

## English

### What are Agent Skills

Agent Skills are instruction sets, scripts, and resources that AI agents can discover and use to perform specific tasks. Each skill contains a `SKILL.md` file that tells the AI how to use it.

**A skill typically includes:**
- `SKILL.md` - Core instruction file (required)
- `scripts/` - Automation scripts (optional)
- `templates/` - Output templates (optional)

### How to Use

| Platform | Global Directory | Project Directory |
|----------|------------------|-------------------|
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| Windsurf | `~/.windsurf/skills/` | `.windsurf/skills/` |

```bash
# Quick install example
cp -r my-skill ~/.cursor/skills/
```

> 📖 See [How to Use Guide](docs/how-to-use.md) for detailed instructions.

### Skills List

See the [中文 Skills 列表](#skills-列表) above for the complete categorized list, including:
- **Official Resources** - Official repositories from Anthropic, GitHub, etc.
- **Skills Collections** - Curated collections like awesome-cursorrules (37.3k⭐)
- **Development Tools** - Code review, git commit, debugging skills
- **And more categories** - Productivity, Writing, Data, DevOps, Design

### Contributing

We welcome contributions! Here's how:

1. Fork this repository
2. Add your skill to the appropriate category in README.md
3. Ensure complete information (name, description, platform, link)
4. Submit a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Create Your Own Skill

```
my-skill/
├── SKILL.md          # Required: instruction file
├── scripts/          # Optional: scripts
├── templates/        # Optional: templates
└── examples/         # Optional: examples
```

📁 Check out [examples/](examples/) for ready-to-use skill templates.

📖 See [How to Create a Skill](docs/how-to-create.md) for the complete guide.

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.com/#JackyST0/awesome-agent-skills&Date)

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.

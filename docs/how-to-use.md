# 如何使用 Agent Skills

本指南介绍如何在不同平台上安装和使用 Agent Skills。

## 支持的平台

| 平台 | 支持状态 | 全局目录 | 项目目录 |
|------|---------|---------|---------|
| [Cursor](https://cursor.com/docs/context/skills) | ✅ | `~/.cursor/skills/` | `.cursor/skills/` |
| [Claude Code](https://code.claude.com/docs/en/skills) | ✅ | `~/.claude/skills/` | `.claude/skills/` |
| [GitHub Copilot](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | ✅ | `~/.copilot/skills/` | `.github/skills/` |
| [Windsurf](https://docs.windsurf.com/windsurf/cascade/skills) | ✅ | `~/.codeium/windsurf/skills/` | `.devin/skills/` |
| [OpenAI Codex](https://developers.openai.com/codex/skills) | ✅ | `~/.codex/skills/` | `.codex/skills/` |
| [OpenCode](https://opencode.ai/docs/skills/) | ✅ | `~/.config/opencode/skills/` | `.opencode/skills/` |
| [OpenClaw](https://docs.openclaw.ai/tools/skills) | ✅ | `~/.openclaw/skills/` | `skills/` |

> Windsurf 仍兼容旧项目目录 `.windsurf/skills/`，新项目应使用官方当前推荐的 `.devin/skills/`。

## 安装方式

### 方式一：手动安装

1. 下载或克隆 skill 仓库
2. 将 skill 文件夹复制到对应目录

```bash
# 示例：安装 code-review skill 到 Cursor
git clone https://github.com/example/code-review-skill.git
cp -r code-review-skill ~/.cursor/skills/
```

### 方式二：使用 Git 子模块

适合项目级别的 skills：

```bash
# 在项目根目录
mkdir -p .cursor/skills
cd .cursor/skills
git submodule add https://github.com/example/code-review-skill.git
```

### 方式三：使用本仓库安装器

先按照仓库首页的快速开始说明下载安装脚本。当前稳定版本可直接写在同一条命令中，无需提前设置环境变量：

```bash
AAS_REPOSITORY_REF="v1.0.1" bash install.sh -p codex -s code-review
```

需要测试其他已审核版本时，替换对应的 tag 或完整 commit SHA：

```bash
AAS_REPOSITORY_REF="<release-tag-or-full-commit-sha>" bash install.sh -p codex -s code-review
```

## 全局 vs 项目级别

### 全局 Skills

- 位置：`~/.cursor/skills/` 或 `~/.codex/skills/`
- 对所有项目生效
- 适合通用工具类 skills

### 项目级 Skills

- 位置：`.cursor/skills/` 或 `.codex/skills/`（在项目根目录）
- 仅对当前项目生效
- 适合项目特定的 skills
- 可以提交到 Git，与团队共享

## 验证安装

安装后，可以通过以下方式验证：

### 1. 检查目录

```bash
ls ~/.cursor/skills/
# 应该看到你安装的 skill 文件夹
```

### 2. 测试使用

在 AI 对话中尝试触发 skill：

```
用户：请帮我审查这段代码
AI：[如果 code-review skill 安装正确，会按照 skill 的格式输出]
```

## 管理 Skills

### 查看已安装的 Skills

```bash
# Cursor
ls ~/.cursor/skills/

# Codex
ls ~/.codex/skills/
```

### 更新 Skill

```bash
cd ~/.cursor/skills/code-review-skill
git pull
```

### 删除 Skill

```bash
rm -rf ~/.cursor/skills/code-review-skill
```

## 优先级说明

同名 Skill 同时存在于全局和项目目录时，各平台的加载与优先级规则并不完全相同。为避免加载结果不明确，应避免重复命名，并以本页“支持的平台”表格链接到的官方文档为准。

## 常见问题

### Q: Skill 安装后没有生效？

检查以下几点：
1. 目录名称是否正确
2. SKILL.md 文件是否存在
3. 文件权限是否正确
4. 重启 IDE 试试

### Q: 如何知道 skill 被正确识别？

尝试在对话中询问：
```
你能使用 [skill-name] 吗？
```

### Q: 多个 skill 冲突怎么办？

- 检查 skill 的触发条件是否重叠
- 在请求时明确指定要使用的 skill
- 调整 skill 的 "When to Use" 部分

## 推荐的目录结构

```
~/.cursor/
└── skills/
    ├── code-review/
    │   ├── SKILL.md
    │   └── templates/
    ├── git-workflow/
    │   └── SKILL.md
    └── doc-generator/
        ├── SKILL.md
        └── scripts/
```

---

## 下一步

- [创建你自己的 Skill](how-to-create.md)
- [浏览 Skills 列表](../README.md#contents)

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

以给 Cursor 安装本仓库的 `code-review` 为例。已有本地副本时，直接在仓库根目录运行对应终端的命令；否则先执行：

```text
git clone https://github.com/JackyST0/awesome-agent-skills.git
cd awesome-agent-skills
```

**Bash（macOS / Linux / Windows 上的 Git Bash）：**

```bash
dest="$HOME/.cursor/skills"
mkdir -p "$dest"
cp -R examples/code-review "$dest/"
```

**Windows PowerShell：**

```powershell
$dest = Join-Path $HOME '.cursor\skills'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
Copy-Item -LiteralPath '.\examples\code-review' -Destination $dest -Recurse -Force
```

重复安装会覆盖同名文件，不会清理旧版本独有的文件。如果改过已安装的 Skill，请先备份。

使用其他工具时，按[平台表](#支持的平台)替换目标目录；项目级安装请使用目标项目内 skills 目录的完整路径。从合集安装时，只复制包含 `SKILL.md` 的单个技能文件夹。

> WSL 中的 `~` 默认是 Linux 家目录。如果工具运行在 Windows 本机，请用 Windows PowerShell 安装到 Windows 用户目录。

### 方式二：使用 Git 子模块

如果技能仓库的根目录就有 `SKILL.md`，可以把它作为子模块加入项目。在目标项目的 Git 根目录运行以下命令（Bash 和 PowerShell 通用）。先把 `REPO_URL` 换成仓库地址，`SKILL_NAME` 换成技能名：

```text
git submodule add REPO_URL .cursor/skills/SKILL_NAME
```

### 方式三：使用本仓库安装器

按[快速开始](../README_ZH.md#快速开始)下载并校验对应的安装脚本。要把内置的 `code-review` 安装到 Codex，可在脚本所在目录运行：

**Bash（macOS / Linux）：**

```bash
bash install.sh -p codex -s code-review
```

**Windows PowerShell：**

```powershell
.\install.ps1 -Platform codex -Skill code-review
```

默认使用安装器内置的稳定版本。要指定其他已审核的 tag 或完整 commit SHA，Bash 设置 `AAS_REPOSITORY_REF`，PowerShell 使用 `-RepositoryRef`。

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

以手动安装的 Cursor 示例为例，检查 `SKILL.md` 是否在 `code-review` 子目录中：

**Bash：**

```bash
ls "$HOME/.cursor/skills/code-review/SKILL.md"
```

**Windows PowerShell（应返回 `True`）：**

```powershell
Test-Path -LiteralPath (Join-Path $HOME '.cursor\skills\code-review\SKILL.md') -PathType Leaf
```

### 2. 测试使用

在 AI 对话中尝试触发 skill：

```
用户：请帮我审查这段代码
AI：[如果 code-review skill 安装正确，会按照 skill 的格式输出]
```

## 管理 Skills

### 查看已安装的 Skills

以 Cursor 为例：Bash 运行 `ls "$HOME/.cursor/skills"`，Windows PowerShell 运行 `Get-ChildItem -LiteralPath (Join-Path $HOME '.cursor\skills')`。其他工具请替换为平台表中对应的目录。

### 更新 Skill

手动复制的 Skill 不会随源仓库自动更新。先备份自己的改动，再从更新后的源仓库重新复制技能文件夹。只有技能本身是独立的 Git 克隆时，才在安装后的技能文件夹中运行 `git pull --ff-only`。

### 删除 Skill

手动安装的示例只需删除 skills 目录下的 `code-review` 文件夹。不要删除整个 skills 目录，以免移除其他技能。

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

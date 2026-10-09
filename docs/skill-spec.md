# SKILL.md 规范文档 / SKILL.md Specification

本文档是与 Agent Skills 官方规范对齐的兼容性指南，帮助开发者创建可移植的 Skills。

This document is a compatibility guide aligned with the official Agent Skills specification.

---

## 目录 / Table of Contents

- [文件结构](#文件结构--file-structure)
- [Frontmatter 规范](#frontmatter-规范--frontmatter-specification)
- [内容结构](#内容结构--content-structure)
- [命名规范](#命名规范--naming-conventions)
- [平台兼容性](#平台兼容性--platform-compatibility)
- [最佳实践](#最佳实践--best-practices)

---

## 文件结构 / File Structure

一个标准的 Skill 目录结构如下：

```
my-skill/
├── SKILL.md              # 必需 / Required
├── README.md             # 可选 / Optional - 人类可读的说明
├── scripts/              # 可选 / Optional
│   ├── analyze.py
│   └── helper.sh
├── references/           # 可选 / Optional - 按需加载的参考资料
│   └── api-guide.md
├── assets/               # 可选 / Optional - 模板、图片和静态资源
│   └── output-template.md
└── templates/            # 可选 / Optional - 本仓库示例使用的模板目录
    └── report.md
```

### 文件说明 / File Descriptions

| 文件/目录 | 必需 | 说明 |
|-----------|------|------|
| `SKILL.md` | ✅ | 核心指令文件，AI Agent 读取此文件了解如何使用 Skill |
| `README.md` | ❌ | 人类可读的使用说明和安装指南 |
| `scripts/` | ❌ | 可执行脚本，供 AI Agent 调用 |
| `references/` | ❌ | 按需加载的参考资料与详细文档 |
| `assets/` | ❌ | 模板、图片和其他静态资源 |
| `templates/` | ❌ | 本仓库使用的可选约定，不是官方强制目录 |

---

## Frontmatter 规范 / Frontmatter Specification

SKILL.md 文件必须以 YAML frontmatter 开头，定义 Skill 的元数据。

### 必需字段 / Required Fields

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `name` | string | 1-64 个字符；小写字母、数字和单连字符；必须与父目录同名 | `code-review` |
| `description` | string | 1-1024 个字符；说明 Skill 做什么以及何时使用 | `Review code for correctness and security when a user requests a code review.` |

### 可选字段 / Optional Fields

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `license` | string | 许可证标识符 | `MIT`, `CC0-1.0`, `Apache-2.0` |
| `compatibility` | string | 环境、产品或依赖要求，最多 500 个字符 | `Requires git and a POSIX shell.` |
| `metadata` | map | 字符串键值元数据；自定义信息应放在此对象内 | `{ author: "your-name", version: "1.0.0" }` |
| `allowed-tools` | string | 预批准工具列表；属于实验字段，客户端支持情况不同 | `Bash(git:*) Read` |

不要把 `version`、`author`、`homepage`、`tags`、`platforms` 或 `requires` 作为自定义顶层字段；需要时将其编码到 `metadata` 中，并确认目标客户端支持。

### 完整示例 / Complete Example

```yaml
---
name: code-review
description: Smart code review skill that helps review code quality and provide improvement suggestions.
license: MIT
compatibility: Requires git and a POSIX shell.
metadata:
  author: your-name
  version: "1.0.0"
allowed-tools: Bash(git:*) Read
---
```

---

## 内容结构 / Content Structure

官方规范不强制 Markdown 正文使用固定标题。以下结构是本仓库为了可读性和可维护性给出的建议。

### 建议的核心章节 / Recommended Core Sections

#### 1. 标题和描述 / Title and Description

```markdown
# Skill Name

> 简短描述（中英双语更佳）
>
> Short description in English
```

#### 2. When to Use

描述 AI Agent 应该在什么情况下激活此 Skill：

```markdown
## When to Use

当用户请求以下操作时使用此 skill：
- 触发条件 1
- 触发条件 2
- 触发条件 3
```

#### 3. Instructions

详细的使用说明，告诉 AI Agent 如何执行任务：

```markdown
## Instructions

### 步骤 1
详细说明...

### 步骤 2
详细说明...
```

### 可选补充章节 / Optional Sections

#### 4. Examples

输入输出示例，帮助 AI 理解预期行为：

```markdown
## Examples

### 输入 / Input
[示例输入]

### 输出 / Output
[示例输出]
```

#### 5. Configuration（如需要）

```markdown
## Configuration

可配置的选项和参数...
```

---

## 命名规范 / Naming Conventions

### Skill 名称

- 只使用小写字母、数字和连字符
- 长度为 1-64 个字符
- 不能以连字符开头或结尾，也不能包含连续连字符
- 必须与包含 `SKILL.md` 的父目录同名
- 简洁且描述性强
- 避免使用通用词汇

✅ 正确示例：
- `code-review`
- `git-commit-helper`
- `api-doc-generator`
- `unit-test-generator`

❌ 错误示例：
- `CodeReview`（不要使用驼峰命名）
- `code_review`（不要使用下划线）
- `my-skill`（太通用）
- `helper`（不够描述性）

### 文件命名

- Skill 核心文件必须命名为 `SKILL.md`（大写）
- 脚本文件使用小写字母和连字符或下划线
- 模板文件使用描述性名称

---

## 平台兼容性 / Platform Compatibility

### 目录位置 / Directory Locations

| 平台 | 全局目录 | 项目目录 |
|------|----------|----------|
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| Windsurf | `~/.codeium/windsurf/skills/` | `.devin/skills/` |
| OpenAI Codex | `~/.codex/skills/` | `.codex/skills/` |
| OpenCode | `~/.config/opencode/skills/` | `.opencode/skills/` |
| OpenClaw | `~/.openclaw/skills/` | `skills/` |

平台目录和优先级可能变化，安装前请核对[平台使用指南](how-to-use.md#支持的平台)中的官方文档链接。

### 兼容性注意事项

1. **文件编码**: 使用 UTF-8 编码
2. **换行符**: 使用 LF（`\n`），避免 CRLF
3. **脚本权限**: 确保脚本有执行权限（`chmod +x`）
4. **路径引用**: 使用相对路径引用 Skill 内的文件

---

## 最佳实践 / Best Practices

### 1. 清晰的触发条件

明确定义何时使用此 Skill，避免模糊的描述：

```markdown
## When to Use

✅ 好的示例：
- 当用户说 "审查这段代码" 时
- 当用户请求 "帮我检查代码质量" 时

❌ 不好的示例：
- 当需要帮助时
- 在编程时
```

### 2. 分步骤的指令

将复杂任务分解为清晰的步骤：

```markdown
## Instructions

### 第一步：分析输入
- 确定编程语言
- 识别代码结构

### 第二步：执行检查
- 检查语法错误
- 检查逻辑问题

### 第三步：生成报告
- 使用标准格式
- 包含所有发现
```

### 3. 提供示例

示例帮助 AI 理解预期的输入和输出格式：

````markdown
## Examples

### 示例 1：简单函数
**输入**:
```python
def add(a, b):
    return a + b
```

**输出**:
[预期的审查结果]
````

### 4. 使用模板

如果输出有固定格式，提供模板文件并在 Instructions 中引用：

```markdown
## Instructions

使用 `templates/report.md` 中的模板格式化输出。
```

### 5. 支持双语

为了获得更广泛的用户群，建议提供中英双语内容：

```markdown
# Code Review / 代码审查

> 智能代码审查技能
>
> Smart code review skill
```

---

## 规范兼容性 / Specification Compatibility

本文档不定义独立标准。字段约束与兼容性以 [agentskills.io 规范](https://agentskills.io/specification)为准；平台特有扩展只有在目标客户端官方文档明确支持时才应使用。

---

## 参考资源 / References

- [Agent Skills 官方规范](https://skill.md/)
- [agentskills.io 规范文档](https://agentskills.io/specification)
- [Anthropic Skills 仓库](https://github.com/anthropics/skills)
- [如何创建 Skill](how-to-create.md)

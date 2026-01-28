# 示例 Skills / Example Skills

本目录包含可直接使用的示例 Agent Skills。

This directory contains ready-to-use example Agent Skills.

## 可用示例 / Available Examples

| 名称 / Name | 描述 / Description |
|-------------|---------------------|
| [code-review](code-review/) | 智能代码审查 / Smart code review |
| [git-commit](git-commit/) | Git 提交信息生成 / Git commit message generator |
| [unit-test-generator](unit-test-generator/) | 单元测试生成 / Unit test generator |
| [api-doc-generator](api-doc-generator/) | API 文档生成 / API documentation generator |
| [debug-helper](debug-helper/) | 调试助手 / Debug helper |

## 如何使用 / How to Use

### Cursor

```bash
cp -r code-review ~/.cursor/skills/
```

### Claude Code

```bash
cp -r code-review ~/.claude/skills/
```

### OpenAI Codex

```bash
cp -r code-review ~/.codex/skills/
```

### GitHub Copilot

```bash
cp -r code-review ~/.copilot/skills/
# 或放入项目目录 / Or place in project directory
cp -r code-review .github/skills/
```

## 创建你自己的 / Create Your Own

参考这些示例创建你自己的 Skills！查看 [创建指南](../docs/how-to-create.md)。

Use these examples as reference to create your own Skills! See the [creation guide](../docs/how-to-create.md).

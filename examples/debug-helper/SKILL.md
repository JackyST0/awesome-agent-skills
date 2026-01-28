---
name: debug-helper
description: Help debug code by analyzing error messages, identifying root causes, and providing fix suggestions.
license: CC0-1.0
---

# Debug Helper

> 帮助调试代码，分析错误信息，定位问题根源，提供修复建议。
>
> Help debug code by analyzing error messages, identifying root causes, and providing fix suggestions.

## When to Use

当用户请求以下操作时使用此 skill：
- 调试代码 / Debug code
- 分析错误信息 / Analyze error messages
- 修复 bug / Fix bugs
- 理解异常原因 / Understand exception causes
- 排查问题 / Troubleshoot issues

## Instructions

### 调试步骤 / Debugging Steps

1. **收集信息** - 获取错误信息、堆栈跟踪、相关代码
2. **分析错误** - 理解错误类型和消息含义
3. **定位根源** - 找到导致问题的代码位置
4. **提供解决方案** - 给出具体的修复建议
5. **预防建议** - 提供避免类似问题的建议

### 常见错误类型 / Common Error Types

| 错误类型 | 可能原因 |
|----------|----------|
| TypeError | 类型不匹配、空值操作 |
| ReferenceError | 未定义变量、作用域问题 |
| SyntaxError | 语法错误、缺少括号/引号 |
| RuntimeError | 运行时逻辑错误 |
| NetworkError | 网络请求失败、超时 |

### 分析框架 / Analysis Framework

对于每个错误，需要分析：
- **What**: 发生了什么错误
- **Where**: 错误发生在哪里
- **Why**: 为什么会发生
- **How**: 如何修复

### 输出格式 / Output Format

使用 `templates/debug-report.md` 模板格式化输出。

Use the `templates/debug-report.md` template to format output.

```markdown
## 调试分析报告 / Debug Analysis Report

### 错误概述 / Error Summary
[错误类型和简要描述]

### 根本原因 / Root Cause
[详细分析]

### 修复方案 / Fix
[具体代码修改]

### 预防建议 / Prevention
[如何避免类似问题]
```

## Examples

### 输入 / Input

错误信息：
```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (UserList.jsx:15:23)
    at renderWithHooks (react-dom.development.js:14985:18)
```

相关代码：
```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 输出 / Output

## 调试分析报告

### 错误概述
`TypeError: Cannot read properties of undefined (reading 'map')`

在 `UserList` 组件第 15 行调用 `.map()` 时，`users` 变量为 `undefined`。

### 根本原因

1. **直接原因**: 尝试在 `undefined` 上调用 `.map()` 方法
2. **深层原因**:
   - 父组件可能没有传递 `users` prop
   - 数据获取尚未完成时组件已渲染
   - API 返回格式与预期不符

### 修复方案

**方案 1: 添加默认值（推荐）**
```jsx
function UserList({ users = [] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**方案 2: 条件渲染**
```jsx
function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**方案 3: 可选链操作符**
```jsx
function UserList({ users }) {
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 预防建议

1. **使用 TypeScript** - 添加类型检查
   ```typescript
   interface Props {
     users: User[];
   }
   ```

2. **添加 PropTypes** - 运行时类型检查
   ```jsx
   UserList.propTypes = {
     users: PropTypes.array.isRequired
   };
   ```

3. **检查数据源** - 确保父组件正确传递数据
4. **处理加载状态** - 在数据获取期间显示加载指示器

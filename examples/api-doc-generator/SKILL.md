---
name: api-doc-generator
description: Generate API documentation from source code, supporting REST APIs, GraphQL, and various documentation formats.
license: CC0-1.0
---

# API Doc Generator

> 根据代码生成 API 文档，支持 REST API、GraphQL 及多种文档格式。
>
> Generate API documentation from source code, supporting REST APIs, GraphQL, and various documentation formats.

## When to Use

当用户请求以下操作时使用此 skill：
- 生成 API 文档 / Generate API documentation
- 创建接口文档 / Create interface documentation
- 编写 API 说明 / Write API descriptions
- 生成 OpenAPI/Swagger 规范 / Generate OpenAPI/Swagger specs

## Instructions

### 分析步骤 / Analysis Steps

1. **识别 API 类型** - REST、GraphQL、RPC 等
2. **提取端点信息** - URL、方法、参数
3. **分析数据结构** - 请求/响应格式
4. **识别认证方式** - API Key、OAuth、JWT 等
5. **生成文档** - 按照标准格式输出

### 文档内容 / Documentation Content

每个 API 端点应包含：
- **端点路径** - URL 和 HTTP 方法
- **描述** - 功能说明
- **参数** - 路径参数、查询参数、请求体
- **响应** - 成功和错误响应示例
- **认证** - 认证要求

### 输出格式 / Output Formats

支持以下文档格式：
- Markdown（默认）- 使用 `templates/api-doc.md` 模板
- OpenAPI 3.0 YAML
- API Blueprint

Use `templates/api-doc.md` for Markdown output format.

### 标准模板 / Standard Template

```markdown
## API 文档 / API Documentation

### 端点概览 / Endpoint Overview

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/resource | 获取资源列表 |

### 详细说明 / Details

#### [方法] /path

**描述**: ...

**请求参数**:
| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|

**请求示例**:
```json
{}
```

**响应示例**:
```json
{}
```
```

## Examples

### 输入 / Input

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    email: str

@app.get("/users/{user_id}")
async def get_user(user_id: int) -> User:
    """Get a user by ID."""
    if user_id <= 0:
        raise HTTPException(status_code=404, detail="User not found")
    return User(id=user_id, name="John", email="john@example.com")

@app.post("/users")
async def create_user(user: User) -> User:
    """Create a new user."""
    return user
```

### 输出 / Output

## API 文档

### 端点概览

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /users/{user_id} | 根据 ID 获取用户信息 |
| POST | /users | 创建新用户 |

---

### GET /users/{user_id}

**描述**: 根据用户 ID 获取用户信息

**路径参数**:
| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| user_id | integer | ✅ | 用户唯一标识符 |

**响应 200 - 成功**:
```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

**响应 404 - 未找到**:
```json
{
  "detail": "User not found"
}
```

---

### POST /users

**描述**: 创建新用户

**请求体**:
| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| id | integer | ✅ | 用户 ID |
| name | string | ✅ | 用户姓名 |
| email | string | ✅ | 用户邮箱 |

**请求示例**:
```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

**响应 200 - 成功**:
```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

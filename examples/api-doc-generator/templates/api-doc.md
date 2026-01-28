# {{api_name}} API Documentation

> {{api_description}}

**Version**: {{version}}
**Base URL**: `{{base_url}}`

---

## Table of Contents

{{#each endpoints}}
- [{{method}} {{path}}](#{{anchor}})
{{/each}}

---

## Authentication

{{authentication_description}}

| Method | Header | Format |
|--------|--------|--------|
| {{auth_method}} | `{{auth_header}}` | `{{auth_format}}` |

---

## Endpoints

{{#each endpoints}}

### {{method}} {{path}}

**Description**: {{description}}

{{#if path_params}}
#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
{{#each path_params}}
| `{{name}}` | {{type}} | {{required}} | {{description}} |
{{/each}}
{{/if}}

{{#if query_params}}
#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
{{#each query_params}}
| `{{name}}` | {{type}} | {{required}} | {{default}} | {{description}} |
{{/each}}
{{/if}}

{{#if request_body}}
#### Request Body

**Content-Type**: `application/json`

```json
{{request_body_example}}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
{{#each request_body_fields}}
| `{{name}}` | {{type}} | {{required}} | {{description}} |
{{/each}}
{{/if}}

#### Response

**Success ({{success_code}})**:
```json
{{success_example}}
```

{{#each error_responses}}
**Error ({{code}})**:
```json
{{example}}
```
{{/each}}

---

{{/each}}

## Error Codes

| Code | Description |
|------|-------------|
{{#each error_codes}}
| {{code}} | {{description}} |
{{/each}}

---

## Rate Limiting

| Limit | Window | Description |
|-------|--------|-------------|
| {{rate_limit}} | {{rate_window}} | {{rate_description}} |

---

*Generated on {{generated_date}}*

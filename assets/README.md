# Assets / 资源文件

本目录包含项目的视觉资源。

## 文件说明

| 文件 | 用途 | 尺寸 |
|------|------|------|
| `logo.svg` | 项目 Logo | 200x200 |
| `banner.svg` | README 顶部 Banner | 1200x300 |
| `social-preview.html` | GitHub Social Preview 模板 | 1280x640 |

## 生成 Social Preview 图片

GitHub 的 Social Preview 需要 PNG/JPG 格式。使用以下方法生成：

### 方法 1：浏览器截图

1. 用浏览器打开 `social-preview.html`
2. 使用开发者工具调整窗口大小为 1280x640
3. 截图保存为 `social-preview.png`

### 方法 2：命令行工具

```bash
# 使用 Playwright
npx playwright screenshot social-preview.html social-preview.png --viewport-size=1280,640

# 或使用 Puppeteer
npx capture-website social-preview.html --width=1280 --height=640 --output=social-preview.png
```

### 方法 3：在线工具

1. 访问 [Carbon](https://carbon.now.sh/) 或 [Ray.so](https://ray.so/)
2. 自定义设计
3. 导出为图片

## 设置 GitHub Social Preview

1. 进入仓库 Settings
2. 点击 "Social preview" 区域
3. 上传 `social-preview.png`
4. 保存

## 自定义

所有 SVG 文件都可以用文本编辑器修改。主要颜色变量：

```
主色调: #667eea (蓝紫色)
辅助色: #764ba2 (紫色)
强调色: #f093fb (粉色)
高亮色: #f5576c (红粉色)
背景色: #0f0c29, #302b63, #24243e (深色渐变)
```

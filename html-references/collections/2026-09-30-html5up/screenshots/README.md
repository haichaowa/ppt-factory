# 代表性截图索引

- **捕获日期**：2026-09-30
- **浏览器**：本地静态服务器 + Playwright / Chromium
- **视口**：1440 × 900，普通桌面视口截图（非整页长图）
- **打开方式**：截图对应 `../source/<模板>/<页面>`，可直接用浏览器打开原文件复核。

| 截图 | 对应源文件 | 选取原因 |
|---|---|---|
| `massively-index-1440x900.png` | `../source/massively/index.html` | 杂志式首页：大图首屏、文章卡片流、分页与页脚联系区。 |
| `massively-elements-1440x900.png` | `../source/massively/elements.html` | 组件参考页：标题、列表、表格、按钮、表单、图片、盒子、代码块。 |
| `dimension-index-1440x900.png` | `../source/dimension/index.html` | 沉浸式全屏封面：背景、遮罩、居中标题与锚点导航。 |
| `editorial-index-1440x900.png` | `../source/editorial/index.html` | 侧栏导航 + 长文/文档型信息架构。 |
| `forty-landing-1440x900.png` | `../source/forty/landing.html` | 商业落地页：页头、主 CTA、分栏内容与区块节奏。 |
| `story-index-1440x900.png` | `../source/story/index.html` | 长滚动叙事、全幅图像、画廊与响应式留白体系。 |

## 质量检查

- 6 张均为 1440×900 PNG，文件可读。
- 截图前页面均返回 200，并完成 DOM 加载；Playwright 可见标题分别为：
  - Massively by HTML5 UP
  - Elements Reference - Massively by HTML5 UP
  - Dimension by HTML5 UP
  - Editorial by HTML5 UP
  - Landing - Forty by HTML5 UP
  - Story by HTML5 UP
- Massively 首页存在 `/favicon.ico` 404，不影响版式渲染；其他截图页面未见阻断性错误。

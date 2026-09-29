# 本地预览与验证记录

## 打开方式

在 collection 目录执行：

```bash
python3 -m http.server 8766 --bind 127.0.0.1 --directory source
```

然后访问：

- Massively 首页：<http://127.0.0.1:8766/massively/>
- Massively 组件参考页：<http://127.0.0.1:8766/massively/elements.html>
- Dimension 全屏单页：<http://127.0.0.1:8766/dimension/>

## 2026-09-30 本地验证

使用本地静态服务器 + 无头 Chromium（1440×900）实际打开以下页面：

| 页面 | 标题 | 浏览结论 |
|---|---|---|
| `source/massively/index.html` | Massively by HTML5 UP | 可浏览。首屏大图、正文卡片、分页、页脚联系表单与署名完整；唯一控制台错误为 `/favicon.ico` 404，不影响页面渲染。 |
| `source/massively/elements.html` | Elements Reference - Massively by HTML5 UP | 可浏览。标题层级、列表、表格、表单、按钮、引用、代码块等组件参考完整，导航可用。 |
| `source/dimension/index.html` | Dimension by HTML5 UP | 可浏览。全屏背景、居中标题、四项锚点导航与页脚署名正常显示。 |

## 已生成代表截图

| 截图 | 对应页面 |
|---|---|
| [`massively-index-1440x900.png`](screenshots/massively-index-1440x900.png) | `source/massively/index.html` |
| [`massively-elements-1440x900.png`](screenshots/massively-elements-1440x900.png) | `source/massively/elements.html` |
| [`dimension-index-1440x900.png`](screenshots/dimension-index-1440x900.png) | `source/dimension/index.html` |
| [`editorial-index-1440x900.png`](screenshots/editorial-index-1440x900.png) | `source/editorial/index.html` |
| [`forty-landing-1440x900.png`](screenshots/forty-landing-1440x900.png) | `source/forty/landing.html` |
| [`story-index-1440x900.png`](screenshots/story-index-1440x900.png) | `source/story/index.html` |

## 建议先看的页面

1. `source/massively/index.html` — 杂志式首页、卡片列表、分页与联系区。
2. `source/massively/elements.html` — 单套模板内最完整的组件规范样张。
3. `source/dimension/index.html` — 全屏沉浸式封面与锚点导航。
4. `source/editorial/index.html` — 侧栏导航 + 正文编辑型版式。
5. `source/forty/landing.html` — 商业落地页的区块节奏与 CTA 层级。
6. `source/twenty/index.html` — 响应式网格 / 双栏页面族。

## 常见问题

| 现象 | 判断 | 处理 |
|---|---|---|
| `Address already in use` | 8766 端口被占用。 | 换任意空闲端口，并同步替换预览 URL。 |
| Google Fonts fallback 提示 | 官方模板引用外部字体，网络慢时先回退。 | 仅影响首屏字体加载，不等同页面不可浏览。 |
| `/favicon.ico` 404 | 官方包未包含 favicon。 | 非阻断问题，不影响 HTML/CSS/图片渲染。 |
| 图片未显示 | 未从 `source/` 根目录启动服务器，或直接打开了错误层级的 HTML。 | 必须以 `source/` 为服务器根目录，保证相对路径可达。 |

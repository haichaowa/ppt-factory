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

## 文件校验

| 截图 | SHA-256 |
|---|---|
| `dimension-index-1440x900.png` | `7359c171f795f0dba94b85b1c5226b769f9a78fccfd6ae5ca363665fbe1d4185` |
| `editorial-index-1440x900.png` | `131c930d48a2b422282a8fa94ed02f2090171cdd8e3cccb72b020c611212caaf` |
| `forty-landing-1440x900.png` | `0ca791353e531eaef7dd475a57e837d00458e4c668b6eba4ceb1de67a96d917a` |
| `massively-elements-1440x900.png` | `d882a878b4fc66425b5b467defe75a50a0217cb9dcdf75a1232d7ff08cf319c1` |
| `massively-index-1440x900.png` | `3742e742cbb57a081f9ea0eb8ac16a94a6beaca3b29f3ff1b1700635ea0d7d20` |
| `story-index-1440x900.png` | `bbc0b49ac0654136ed8405e2b8438770bb9dd208a6dceba38efa9fdb11f101db` |

## 复现方式

```bash
python3 -m http.server 8766 --bind 127.0.0.1 --directory source
export PWCLI="$HOME/.codex/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" resize 1440 900
"$PWCLI" goto http://127.0.0.1:8766/massively/
"$PWCLI" screenshot --filename screenshots/massively-index-1440x900.png
```

其余页面按上表替换 `goto` URL 与输出文件名即可。

## 目检要点

- **Massively 首页**：确认大图首屏、日期/标题/摘要卡片、分页和页脚联系区同时可见或可滚动到达。
- **Massively 组件页**：确认标题、列表、表格、按钮、表单、图片和代码块没有互相重叠。
- **Dimension**：确认全屏背景、遮罩、白色标题和四项导航可读。
- **Editorial**：确认左侧导航宽度稳定，正文列不被侧栏挤压。
- **Forty landing**：确认页头、主标题、CTA 与下方分栏有清晰层级。
- **Story**：确认全幅图像与文字区块的留白节奏，不要求首屏展示全部内容。

截图为 1440×900 视口图，不代表移动端或整页长图；移动端表现需直接打开源码复测。

# Jev / System One · 官方 Starter 风格版

## 这次重制的依据

这套 deck 不使用自定义 Geist 深色样式，而是直接基于 Slidev 官方仓库的 Starter Template 重制：

```text
style-library/examples/official-slidev-demos/starter
```

保留的官方模板要素：

- `@slidev/theme-seriph`
- 官方远程封面图 `https://cover.sli.dev`
- 官方 Starter 的 headmatter 配置
- 官方 `<Toc>` 目录写法
- 官方 `two-cols` / `image-right` / `center` layout 用法
- 官方代码高亮和 Mermaid 图表模式
- `style.css` 保持官方空样式入口，不额外自定义视觉系统

## 内容来源

- `projects/2026-09-jev-system-one/project.md`
- `projects/2026-09-jev-system-one/research.md`
- `projects/2026-09-jev-system-one/source.md`

## 交付物

- 源稿：`slides.md`，23 页，每页均有演讲备注
- PDF：可导出为 `jev-system-one-official-starter.pdf`（构建产物，不入库）
- PPTX：可导出为 `jev-system-one-official-starter.pptx`（构建产物，不入库）
- 静态网页：可构建为 `dist/index.html`（构建产物，不入库）
- 浏览器 QA 截图：`qa/`

## HyperFrames 风格动效

这版没有直接把 HyperFrames runtime 嵌进 Slidev，而是把 HyperFrames 的动效语法移植为 Slidev 原生 Vue / CSS 组件，避免两个时间轴模型互相抢状态。

## 高对比暗色界面

为避免浅色背景与浅色代码 / 图表文字互相冲突，deck 已强制 `colorSchema: dark`：

- 背景改为深蓝黑多层渐变
- 正文改为高亮度浅色
- 代码块强制深色底、浅色字
- 表格、引用、行内代码、卡片边框均改为暗色高对比方案
- 封面增加深色遮罩，避免远程图片造成标题可读性波动
- Shiki 的低亮度标点 token 单独提亮
- 已用浏览器逐页计算可见文本对比度，低对比文本页面为 0

新增动效：

- `global-top.vue`：全局微网格、低亮度环境光、进度条和一次过光
- `FlowDiagram.vue`：System One 流程图节点 stagger 入场与虚线流动
- `AnimatedNumber.vue`：官方规格数字 count-up
- `ConfidenceMeter.vue`：示例输出置信度 / 分数字段的动画条
- 封面 title-card reveal、身份卡和三原语卡的 stagger 入场
- 代码与卡片上的低干扰 sheen 扫光

## 从个人案例中吸收的效果

| 个人案例 | 吸收方式 | 落点 |
| --- | --- | --- |
| `2026-09-rising-bars` / `2026-09-bar-styles` | 前后对比条、数字落定、官方 Cookbook 数据可视化 | 第 14 页「官方 Cookbook 示例」 |
| `2026-09-common-effects` 的 macOS notification | 转成 Slidev 原生业务通知卡 | 第 18 页「把判断变成业务动作」 |

有意不直接嵌入：

- `money-explosion-overlay.webm`：营销感过强，与 Jev 的技术调研口径不匹配
- `x-post` / `spotify-card`：当前调研没有真实社交证明或音乐场景
- `gallery-tunnel` / `transitions-3d`：空间转场很精彩，但会压过 API 与决策层的信息密度
- `style-flash`：白闪转场有可读性 / 光敏感风险

动效参考来自 personal-video-workflow 内的 HyperFrames animation rules：

- `titlecard-reveal`
- `ambient-glow-bloom`
- `grid-card-assemble`
- `dataviz-countup`

所有动效都保留 `prefers-reduced-motion` 降级。

## QA

- `npm run build` 成功
- PDF 使用 `--per-slide` 导出，页数 23 = Slidev 解析页数 23
- PPTX 页数 23
- Playwright 检查 23 页，全局动效层存在，内容级溢出为 0
- 代码块前景 / 背景对比度约 12.5:1，超过 WCAG AAA 阈值
- 逐页可见文本 contrast audit：23 页中低对比页面为 0

PDF 导出命令：

```bash
npx slidev export --per-slide --wait 1500 --timeout 60000 \
  decks/jev-system-one-official-starter/slides.md \
  --output decks/jev-system-one-official-starter/jev-system-one-official-starter.pdf
```

## 命令

```bash
npm run dev -- decks/jev-system-one-official-starter/slides.md
npm run build -- decks/jev-system-one-official-starter/slides.md
npx slidev export --per-slide --wait 1500 --timeout 60000 decks/jev-system-one-official-starter/slides.md --output decks/jev-system-one-official-starter/jev-system-one-official-starter.pdf
```

## 静态预览

Deck 使用 `routerMode: hash`，因此静态服务器不需要 history fallback：

```bash
cd decks/jev-system-one-official-starter/dist
python3 -m http.server 4173 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:4173/#/1
```

直达某一页时使用 `#/14` 这种格式，不要使用 `/14`；简单静态服务器遇到 `/14` 会返回 404。

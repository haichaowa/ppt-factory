# HTML5 UP · 体系拆解笔记

## 1. 结论摘要

HTML5 UP 不是 44 个互相无关的页面，而是一套“共享工程骨架 + 每套模板独立换肤”的模板族：

1. **工程骨架一致**：44/44 套模板都保留 `assets/sass/libs/_vars.scss`，用 `$misc`、`$duration`、`$size`、`$font`、`$palette` 五组 Sass token 定义节奏、字体、尺寸与颜色。
2. **结构词汇一致**：`wrapper / container / inner / main / header / footer / nav / section / article / box / actions` 是跨模板复用的布局语言。
3. **组件谱系一致**：按钮、表单、图标、网格、卡片、表格、图片、页脚联系区在不同模板中换皮，但行为与类名基本延续。
4. **响应式策略一致**：所有模板都有 736px 断点，绝大多数共享 480 / 736 / 980 / 1280 / 1680px 的级联；`breakpoints.min.js` 将设备状态挂到 `body`，CSS 再按状态降级。
5. **视觉策略清晰**：强首屏、全幅图像 + 半透明遮罩、正文卡片、交替背景区块、少量高饱和 accent，构成从个人作品集到企业落地页的可复用版式语法。

对本仓库最有价值的不是照搬 CSS，而是学习它如何把**版式配方、组件行为、响应式降级和主题 token**分层。

## 2. 完整模板与页面清单

共 **44 套模板、110 个顶层 HTML 页面**。下表为完整清单，页面文件均位于 `source/<slug>/`。

| 模板 | 页面 | 主线版式 |
|---|---|---|
| `aerial` | `index.html` | 全屏首屏 + 极简滚动叙事 |
| `alpha` | `contact.html`, `elements.html`, `generic.html`, `index.html` | 商业落地页 + 通用页/组件页/联系页 |
| `arcana` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html`, `two-sidebar.html` | 侧栏内容页族 |
| `astral` | `index.html` | 单页作品集/介绍结构 |
| `big-picture` | `index.html` | 大图分幕叙事 |
| `dimension` | `index.html` | 全屏背景 + 锚点文章面板 |
| `directive` | `index.html` | 企业落地页与分栏区块 |
| `dopetrope` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 多侧栏内容页族 |
| `editorial` | `elements.html`, `generic.html`, `index.html` | 侧栏导航 + 文档/博客体系 |
| `escape-velocity` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 多侧栏企业页族 |
| `ethereal` | `index.html` | 分屏/区块化落地页 |
| `eventually` | `index.html` | 极简订阅转化页 |
| `forty` | `elements.html`, `generic.html`, `index.html`, `landing.html` | 商业落地页 + 组件/通用页 |
| `fractal` | `index.html` | 单页分区介绍 |
| `future-imperfect` | `index.html`, `single.html` | 博客首页 + 详情页 |
| `halcyonic` | `index.html`, `onecolumn.html`, `threecolumn.html`, `twocolumn1.html`, `twocolumn2.html` | 多列布局页族 |
| `helios` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 轮播 + 侧栏页族 |
| `highlights` | `index.html` | 卡片式亮点落地页 |
| `hyperspace` | `elements.html`, `generic.html`, `index.html` | 侧栏导航 + 组件/通用页 |
| `landed` | `elements.html`, `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 侧栏 + 组件参考页族 |
| `lens` | `index.html` | 全屏画廊 |
| `massively` | `elements.html`, `generic.html`, `index.html` | 杂志/博客卡片流 + 组件参考 |
| `minimaxing` | `index.html`, `onecolumn.html`, `threecolumn.html`, `twocolumn1.html`, `twocolumn2.html` | 网格布局页族 |
| `miniport` | `index.html` | 单页作品集 |
| `multiverse` | `index.html` | 瀑布流画廊 |
| `paradigm-shift` | `index.html` | 现代单页叙事 |
| `parallelism` | `index.html` | 作品网格 |
| `phantom` | `elements.html`, `generic.html`, `index.html` | 作品网格 + 组件参考 |
| `photon` | `index.html` | 分屏式产品/服务页 |
| `prologue` | `index.html` | 左栏固定导航作品集 |
| `read-only` | `index.html` | 单页简历/介绍 |
| `solid-state` | `elements.html`, `generic.html`, `index.html` | 画廊式作品集 + 组件参考 |
| `spectral` | `elements.html`, `generic.html`, `index.html` | 全屏分区落地页 |
| `stellar` | `elements.html`, `generic.html`, `index.html` | 滚动叙事 + 组件参考 |
| `story` | `index-demo.html`, `index.html` | 长滚动故事 + 画廊/演示页 |
| `strata` | `index.html` | 个人作品集 |
| `striped` | `index.html` | 博客/文章布局 |
| `strongly-typed` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 多侧栏强排版页族 |
| `telephasic` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 企业官网页族 |
| `tessellate` | `index.html` | 分块落地页 |
| `twenty` | `contact.html`, `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 响应式网格/侧栏页族 |
| `txt` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 文本密集页族 |
| `verti` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 纵向导航页族 |
| `zerofour` | `index.html`, `left-sidebar.html`, `no-sidebar.html`, `right-sidebar.html` | 杂志/门户页族 |

## 3. 组件完整清单

以下清单来自对 110 个 HTML 页面、44 套 CSS/Sass 的类名与结构扫描。

### 3.1 全局框架

| 组件 | 典型类 / ID | 说明 |
|---|---|---|
| 页面包装 | `#page-wrapper`, `.wrapper`, `#wrapper` | 负责页面级背景、最小高度与滚动容器。 |
| 内容容器 | `.container`, `.inner`, `.main`, `#main` | 控制内容宽度与水平留白；常见宽度 64–72rem。 |
| 页头 | `#header`, `.logo`, `.alt` | 站点名、当前状态、透明/固定变化。 |
| 导航 | `#nav`, `.menu`, `.links`, `.current` | 桌面横向导航，移动端折叠成 panel。 |
| 页脚 | `#footer`, `.copyright`, `.contact-method` | 联系信息、社交链接、许可证署名。 |
| 分区 | `section`, `.wrapper`, `.spotlight`, `.features` | 用交替背景和大间距制造叙事节奏。 |

### 3.2 排版与内容

| 组件 | 典型类 / 标签 | 说明 |
|---|---|---|
| 标题组 | `h1–h6`, `.major`, `.subtitle` | 常见 `h1` 2.25–4rem，配 0.025–0.5em 字距；沉浸式模板多用 uppercase。 |
| 正文 | `p`, `.major`, `.dim` | 默认段落底部间距 2em/rem，重点段落放大到 1.25rem。 |
| 列表 | `ul`, `ol`, `dl`, `.alt`, `.icons` | 支持普通、图标、定义、行动按钮列表。 |
| 引用 | `blockquote` | 多为 3–4px 左边框 + 斜体，用于观点强调。 |
| 代码 | `pre`, `code` | 等宽字体与浅背景，`elements.html` 提供样张。 |
| 表格 | `.table-wrapper`, `table`, `.alt` | 横向滚动容器 + 默认/交替行样式。 |
| 卡片/盒子 | `.box`, `.content`, `.inner`, `article` | 内容分组；常见内边距与边框，不依赖阴影。 |
| 时间信息 | `.date`, `.timestamp`, `.published`, `.meta` | 博客/文章流中的弱化元信息。 |

### 3.3 网格与媒体

| 组件 | 典型类 | 说明 |
|---|---|---|
| 栅格 | `.row`, `.col-3/4/6/8/12` | 12 列网格，附 `medium / narrower / xsmall / mobile` 变体。 |
| 栅间距 | `.gtr-50/150/200`, `.gtr-uniform` | 用 gutter 类控制密度，而非每处手写 margin。 |
| 图片 | `.image`, `.fit`, `.left`, `.right`, `.thumb` | 支持适配、浮动、缩略图；常见圆角 4px。 |
| 作品网格 | `.tiles`, `.posts`, `.features`, `.items` | 从 2–6 列响应式降级，常用于作品、文章、特性。 |
| 画廊 | `.gallery`, `.lightbox`, `.filtered` | Story、Multiverse、Lens 等模板提供大图/灯箱/筛选。 |
| 大图分幕 | `.spotlight`, `.image`, `.content` | 左右图文交替，图片全出血，内容侧保持可读宽度。 |

### 3.4 交互与表单

| 组件 | 典型类 / 属性 | 说明 |
|---|---|---|
| 按钮 | `.button`, `.primary`, `.small`, `.large`, `.fit`, `.icon` | 常见高度 2.75–3.75em，交互过渡 0.2s。 |
| 按钮组 | `.actions`, `.buttons`, `.stacked` | 表单与卡片底部的操作区。 |
| 图标 | `.icon`, `.icons`, `.brands`, `.solid`, `.alt` | Font Awesome 体系，支持圆形/方形容器与 solo icon。 |
| 表单 | `.field`, `.fields`, `input`, `select`, `textarea` | 文本、密码、邮箱、电话、搜索、URL、下拉、多行文本。 |
| 选择控件 | `checkbox`, `radio`, `option` | `elements.html` 内提供完整状态样张。 |
| 状态 | `:hover`, `:active`, `:focus`, `:invalid`, `.disabled` | 交互状态完整，但表单多为前端展示，不含后端验证。 |
| 滚动动效 | `.scrolly`, `.is-preload`, `.is-transitioning` | 进入视口、预载、过渡状态由 JS 挂类。 |
| 导航面板 | `#navPanel`, `.navButton` | 移动端折叠导航，0.35–0.5s 过渡。 |

## 4. 设计系统拆解

### 4.1 Token 架构

每套模板的 `assets/sass/libs/_vars.scss` 都保留同一五段式结构：

```scss
$misc:     (z-index, overlay-opacity, gallery-limit ...)
$duration: (transition, menu, banner, gallery-lightbox ...)
$size:     (element-height, element-margin, padding, wrapper, gutter ...)
$font:     (family, family-heading, family-fixed, weight, kerning ...)
$palette:  (bg, bg-alt, fg, fg-bold, fg-light, border, accent, invert ...)
```

这说明 HTML5 UP 的设计系统核心是**模板内 token 化**：一套模板先定义节奏与颜色，再复用共享组件语法。它不是全站统一的 CSS variables，而是每套模板独立编译但结构同构。

### 4.2 色板策略

| 模板 | 主要颜色 | 使用策略 |
|---|---|---|
| Massively | `#ffffff` / `#f5f5f5` / `#212931` / `#1e252d` / `#18bfef` | 白底正文 + 深色首尾，唯一 cyan accent 贯穿链接与主按钮。 |
| Dimension | `#1b1f22` / `#000000` / `#ffffff` / overlay `rgba(19,21,25,0.5)` | 深色沉浸式，靠白色文字和极低透明度边框分层。 |
| Editorial | `#ffffff` / `#f5f6f7` / `#3d4449` / `#7f888f` / `#f56a6a` | 文档型灰阶 + 单一红 accent，适合长文阅读。 |
| Forty | `#242943` / `#2a2f4a` / `#ffffff` / `#9bf1ff` + 6 个 accent | 深蓝企业底色，多 accent 只用于模块识别，避免随机上色。 |
| Story | `#ffffff` / `#eeeeee` / `#000000` / `#47D3E5` + 7 色渐进 | 白底叙事 + 冷暖渐进色带，画廊区块使用分段色彩。 |
| Spectral | `#2e3842` / `#ffffff` + 7 组 accent | 深底高对比，accent 组合用于区块和行动按钮。 |

**可迁移规则**：底色/前景/弱文本/边框/遮罩/主 accent 先成组定义；多 accent 必须绑定固定模块或序列，不能逐卡片随机取色。

### 4.3 字体阶梯

| 模板 | 正文字体 | 标题字体 | 关键字号 |
|---|---|---|---|
| Massively | Merriweather 300 / 1rem / line-height 2.375 | Source Sans Pro 900 / uppercase / 0.075em | h1 4rem；h2 1.75rem；h3 1.25rem |
| Dimension | Source Sans Pro 300 / 1rem / 1.65 | 同族 600 / uppercase / 0.2–0.5em | h1 2.25rem；h2 1.5rem；h3 1rem |
| Editorial | Open Sans | Roboto Slab 700 | h1 4em；h2 1.75em；h3 1.25em；移动端 h1 2em |
| Forty | Source Sans Pro 300 | 同族 600 | h1 2.5em；h2 1.75em；h3 1.35em |
| Story | Source Sans Pro 300 | 同族 300 / -0.05em | h1 3.5rem；h2 2.25rem；h3 1.5rem |

共同规律：**正文固定 1rem，标题跨度 2.25–4rem，段落底部 2em/rem**。标题家族常与正文字体分离，用字重和字距制造层级，而不是无限放大字号。

### 4.4 间距与容器

| 值 | 来源与用途 |
|---|---|
| `element-height: 2.75em/rem` | 多数控件标准高度。 |
| `element-height: 3–3.75em/rem` | Massively、Editorial、Story 等更强触控按钮高度。 |
| `element-margin: 2em/rem` | 控件与段落的基础垂直节奏。 |
| `wrapper / inner: 64–72rem` | 内容最大宽度；Massively 72rem，Story 64rem，Forty 65em。 |
| `sidebar-width: 26em` | Editorial 左侧导航/信息栏。 |
| `gutter: 3–3.5em/rem` | Editorial 与 Story 的主栏间距。 |
| `padding: 7 → 5 → 4 → 3 → 2rem` | Story 的页面内边距响应式阶梯。 |
| `border-radius: 4px / 0.375em / 0.5rem` | 常见轻圆角；Story 按钮使用胶囊形。 |

### 4.5 响应式体系

对 44 套模板 CSS 的断点统计：

| 断点 | 出现模板数 | 角色 |
|---|---:|---|
| 736px | 44/44 | 必备移动端降级：导航折叠、栅格变单列、字号收缩。 |
| 1280px | 39/44 | 桌面内容密度与侧栏调整。 |
| 1680px | 38/44 | 大屏最大宽度与背景缩放。 |
| 980px | 35/44 | 平板/窄桌面：侧栏上移、双栏变单栏。 |
| 480px | 29/44 | 小屏字号、按钮与图片进一步收缩。 |
| 360px | 15/44 | 新模板增加的超小屏保护。 |

`breakpoints.min.js` 会把 `is-mobile`、`is-desktop` 等状态挂到 `<body>`，使组件可以按设备状态而非单条媒体查询处理行为。

### 4.6 组件规范提炼

- **按钮**：`appearance: none`、无边框或 inset 边框、`height = line-height`、`padding 2–2.5em`、`.small/.large/.fit/.icon/.primary` 变体、0.2s hover/active。交互通过背景、颜色、inset shadow 三者同时变化，反馈明显但不跳版。
- **卡片/盒子**：以 `.box`、`.inner`、`.content` 组合，主要靠内边距、细边框、交替背景和内容宽度控制层级，阴影使用克制。
- **网格**：`.row` + `.col-*` 是结构性网格；`.tiles/.posts/.features` 是内容型网格。前者负责布局，后者负责卡片节奏，二者不混用。
- **导航**：桌面横向，736px 以下折叠；当前项用 `.current`，移动按钮固定在页头或页面边缘。
- **表单**：字段统一高度与边框，focus/invalid 状态清晰；`.fields` 可拆分列，`.actions` 固定在底部。
- **图片**：`fit` 保持内容适配，`left/right` 用于浮动，`thumb` 用于列表；全幅图必配遮罩，避免文字直接压在复杂图片上。
- **页脚**：联系信息、社交图标、版权与 HTML5 UP 署名总是保留，这是许可证与信息架构的一部分。

## 5. 为什么这套体系成立

1. **分层清楚**：token 决定气质，结构类决定骨架，内容组件决定节奏，JS 只负责状态与交互。
2. **复用而非重复**：44 套模板复用同一按钮/表单/网格/页头页脚语法，视觉差异集中在 palette、字体、容器宽度和区块配方。
3. **响应式是设计前提**：736px 降级是硬约束，侧栏、作品网格、大图分幕都有明确的窄屏策略。
4. **版式配方成熟**：全屏 hero、图文交替 spotlight、卡片流、侧栏文档、网格作品集、极简转化页覆盖了常见网站叙事场景。
5. **可读性优先**：大量使用遮罩、单 accent、明确正文宽度与 2em 节奏，避免模板为了炫技牺牲阅读。
6. **源码可学习**：每套模板同时保留编译后的 CSS 和 Sass token 文件，能直接反查设计决策。

## 6. 局限与使用 caution

1. **不是单一设计系统**：44 套模板各自持有 token，缺少跨模板的统一变量文档；直接抽取样式容易把“模板皮肤”误当“全局规范”。
2. **资产重复**：jQuery、Responsive Tools、Font Awesome 在每个模板内重复，适合本地学习，不适合整体打包进产品。
3. **依赖较老**：大量 IE/旧浏览器前缀与 jQuery 插件；现代项目应保留设计结论，而非复用实现。
4. **外部字体风险**：页面引用 Google Fonts；本地预览曾出现 fallback 提示。PPT Factory 若借鉴，应内嵌或使用系统字体。
5. **可达性未系统保证**：图片上的白字、icon-only 社交链接、demo 链接和表单标签需要逐页复核，不能默认达标签。
6. **表单是展示样张**：多数表单没有后端、验证或提交逻辑，只适合学习版式。
7. **Demo 内容非生产内容**：占位图、`#` 链接、Lorem ipsum 和假联系方式较多。
8. **许可证约束**：CC BY 3.0 要求保留署名；迁移到 PPT Factory 时只能提炼思路与 token，不应复制整页代码。

## 7. 阅读优先级

1. `source/massively/`：看杂志流、卡片、分页、组件参考页。
2. `source/editorial/`：看侧栏导航、文档信息架构、长文排版。
3. `source/forty/`：看商业落地页 CTA、tile 网格与 spotlight 交替。
4. `source/dimension/`：看全屏封面、遮罩、锚点导航与面板式内容。
5. `source/story/`：看长滚动叙事、画廊、响应式 padding 阶梯。
6. `source/twenty/` 与 `source/minimaxing/`：看多列页面族的降级方式。

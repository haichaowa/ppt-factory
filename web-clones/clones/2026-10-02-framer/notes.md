# Framer 首页设计拆解

> 证据来源：`archive/viewport-{1440,1280,375}-metrics.json`（三档真实 computed style / geometry）、`archive/design-evidence.json`（字体、动效、视频与 CSS 规则）、`archive/framer-home.mhtml`、`archive/performance-resources.json`。本文只记录页面实际渲染值，不凭视觉猜测。

## 1. 设计令牌

### 色彩

**基础色**
- 页面底色 / 首屏 Section：`rgb(0, 0, 0)` `#000000`
- 深色面板：`#111111`、`#171717`、`#1F1F1F`、`#1E1E1E`、`#242424`
- 纯白前景：`#FFFFFF`
- 白色透明层级：`rgba(255,255,255,0.8)`、`0.6`、`0.4`、`0.1`、`0.08`
- 中性灰：`#999999`、`#666666`、`#CCCCCC`

**功能色**
- 品牌链接 / 主 CTA 文字：`rgb(0,0,238)` `#0000EE`
- 信息蓝：`#0099FF`
- 成功 / 性能绿：`#4CD963`、`#00BB88`
- 暖橘标注：`#D67A5C`
- 半透明色底：`rgba(0,187,136,0.1)`、`rgba(34,34,34,0.8)`

**对比度抽查（黑底）**
- `#FFFFFF/#000000`：21.00:1；`#999999/#000000`：7.37:1
- `#0099FF/#000000`：7.00:1；`#00BB88/#000000`：8.46:1
- `#0000EE/#FFFFFF`：9.40:1
- `rgba(255,255,255,0.4)` 在黑底等效 `#666666`，对比度 3.66:1，只适合辅助性小标签，不适合承担核心信息。

### 字体系统

| 层级 | 字族 | 字号 / 行高 / 字重 / 字距 |
|---|---|---|
| H1 | `GT Walsheim Medium`, `GT Walsheim Medium Placeholder`, sans-serif | 54px / 54px / 500 / -2.16px |
| H2 | `GT Walsheim Medium`, `GT Walsheim Medium Placeholder`, sans-serif | 44px / 48.4px / 500 / -1.76px |
| H3 / 卡片说明 | `Inter Variable`, `Inter Variable Placeholder`, sans-serif | 18px / 24.3px / 400 / -0.2px |
| 段落正文 | `Inter Variable` | 18px / 24.3px，`rgba(255,255,255,0.6)` |
| 次级标签 | `Inter Variable` | 15px / 20.25px / -0.1~-0.2px |
| 导航 / 常规 UI | `Inter Variable` | 14px / 19.6px，主要 400 |
| 主 CTA 文字 | `Inter Variable` | 14px / 14px / -0.28~-0.56px |
| 微标签 | `Inter Variable` | 10px / 12px |
| 数据大数字 | `GT Walsheim Medium` | 54px / 43.2px / 500 / -2.16px |

字体结构是“几何感品牌字 + 中性 UI 字”：Walsheim 承担叙事和规模，Inter 承担工具、导航、代码和长文本。页面 CSS 中有 378 个 `@font-face` 声明 / 377 个唯一样式组合，说明大量按字重、语言与子集切分；实际加载 11 个字体资源，主要为 Walsheim、Inter 与少量第三方字体。

### 圆角

实测高频值：`0px`（外框保持硬边界）、`8px`（按钮 / 小控件，249 次）、`15px`（卡片，71 次）、`6px`、`20px`、`4px`、`100px`（胶囊）、`18px`（大面板）、`25px`。层级规律清楚：页面外框直角，交互控件 6–10px，产品截图/卡面 15–20px，标签胶囊 50–100px。

### 阴影 / 光效

- 轻浮层：`rgba(0,0,0,0.1) 0 1px 2px`
- 标准浮起：`rgba(0,0,0,0.2) 0 2px 6px`
- 产品截图阴影按尺寸递增到 `0 39.6px 63.4px`
- 玻璃边界：`rgba(255,255,255,0.1) 0 0 0 1px`；大面积玻璃为外阴影 + inset 白色 1px 边界
- 背景模糊：`backdrop-filter: blur(3px)`、`blur(5px)`
- 材质光效：`mix-blend-mode: plus-lighter` / `overlay`，以及 `blur(0px → 约1.48px)` 的颗粒/柔光序列

### 间距

- 桌面外安全边：主内容左右 `20px`，1440 视口下内容列 `1200px`（x=120–1320）
- 首屏 Header：`padding: 100px 20px 40px`
- 主叙事区块：`20px 20px 120px`，纵向 `gap: 60px`
- 平台 / 展示 / 社区区块：`120px 20px`，纵向 `gap: 40px`
- 常用组件 gap：`5px`、`10px`、`15px`、`20px`、`30px`、`40px`、`60px`
- 首屏 H1：x=120、y=164，H2 保持 x=120，形成统一左对齐轴线
- 移动端：内容左右 `20px`，区块上下多压缩为 `80px/60px`；375 下 H1 36px、H2 28px、H3 18px

## 2. 版式结构

1. **固定工具栏 + 大留白首屏**：站点导航高约 64px；首屏 H1 左置，右侧留给 1200×673 的产品视频。标题宽 721px，两行以内，下方 CTA 与“New”提示距离明确。
2. **统一 1200px 叙事列**：桌面所有主要 section 的内容宽度均为 1200px，外层 20px 安全边在 1440 / 1280 保持一致，因此两档页高同为 10741px。
3. **长页面分成 7 个主节**：Hero、客户横幅、Agents、Platform、Showcase、Stories、Community、CTA/Footer。每节由“44px H2 + 12–15px 操作链接 + 大产品界面”组成，反复建立“文字—证据”的节奏。
4. **大截图即证明**：Agents 区用连续的产品界面替代抽象插画；Platform 区通过 CMS、SEO、Analytics 等真实 UI 演示功能；Community Feed 使用 1200×840、`#111111`、18px 圆角面板承载内部应用界面。
5. **结尾情绪抬升**：“Your next idea starts here” 回到 H1 级字号，随后进入超长多列 Footer，让营销叙事迅速切换为可检索信息架构。
6. **响应式策略**：1280 与 1440 结构和页高完全一致，只收缩可用空白；375 将产品界面改为满宽卡片，字号按 2/3 缩放，H3 保持 18px，页高仅比桌面多 120px，说明移动端主要堆叠而非重排。

## 3. 动效语言

- 链接 / 文本：`color 0.2s cubic-bezier(0.44, 0, 0.56, 1)`
- 输入清除：`color 0.15s`
- 视频进度条高度：`height 0.2s linear`；播放宽度：`width 0.3s linear`
- 浮层 / 编辑器条：`opacity 0.4s ease-out`
- 编辑器 flap：`0.3s ease-in-out`
- 第三方按钮：`background-color / border-color 0.218s`
- 页面颗粒材质：`betterGrainWebpFramesV22`，`750ms linear` 无限循环，`background-position` 从 `0 0` 到 `var(--grain-range-y, 0px)`
- Shimmer：`background-position` 从 `200% center` 到 `-100% center`
- 实测运行动画 3 个；7 个 muted、loop 的产品视频节点是叙事核心。视觉动效总体克制，主要靠视频内容、滚动触发与轻微材质噪声驱动，而不是大幅位移。

## 4. 可复用结论

**适合转化的 PPT 主题**
- “AI 工具 / 开发者平台 / 产品发布”深色主题
- 基础版式：黑底 + 白色大标题 + 60% 白正文 + 大产品截图 + 白色高对比 CTA
- 字体建议：标题用几何无衬线 Medium，正文 / 数据标签用 Inter；标题字距取 `-2%` 到 `-4%`
- 图形建议：使用真实界面截图而不是抽象图标；截图阴影 40–60px，边角 15–20px

**可直接转成 patterns**
- `dark-product-evidence`：左侧 H2 + 链接，右侧 1200px 产品视频 / 界面，每节 120px 上下留白
- `glass-tool-panel`：`#111` 面板、18px 圆角、3–5px backdrop blur、1px 10% 白边
- `metric-status-strip`：10px 胶囊标签 + 功能绿 `#4CD963`，旁边放 15px 灰白指标名
- `community-terminal`：黑底内嵌社区 Feed / 搜索框 / 操作流，模拟正在运行的产品
- `quiet-grain-motion`：750ms linear 背景位移，用于 PPT 可换成静态 2–3% 噪点或极慢视频

**不要照抄的部分**
- Walsheim 是商业字体，复用主题时应用已授权字体或开源几何无衬线替代
- Framer logo、产品截图、客户 Logo 和文案有版权；PPT 模板只能学习布局和色彩，应替换为原创截图与文案

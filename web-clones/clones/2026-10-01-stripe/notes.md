# Stripe 首页设计拆解（DOM 实测）

> 证据：`archive/computed-styles.json`（live DOM + computed style）、`archive/live-dom.html`、`archive/styles/`、`archive/capture-manifest.json`。除特别说明外均为 1440×900、DPR 1、`prefers-reduced-motion: reduce` 下的测量。

## 1. 第一眼结论

Stripe 的经典感并非来自装饰，而来自**金融品牌可信度 × 产品界面剧场**：几乎全白的页面用深海军蓝文字和唯一紫色行动色保持秩序；每讲一个产品，就把真实 checkout、订阅、发卡、平台后台做成微缩插画。斜切渐变、径向光和插画共用紫—品红—橙的色谱，让复杂模块看起来像同一个系统。

## 2. 斜切渐变与 Hero

- Hero 背景 DOM 是 `section-background hero-section__background`，内部为 `hero-wave-animation`、`canvas[data-engine="three.js r178"]`，画布属性 1392×761；可见区域约 1440×685。视觉从左上深蓝紫推进到右下品红与橙，形成斜切波面。
- `prefers-reduced-motion` 时保留 desktop/tablet/mobile 三档 WebP fallback，因此归档不仅记录动态 canvas，也能研究静态降级素材。
- H1 采用双份同位文案：`--background` 与 `--foreground` 各一份。48px / 300 / 55.2px / -0.96px；主句 `em` 是 #0A2540，说明句在波形上呈现绿/蓝半透明采样色，形成“文字嵌入渐变”的效果。
- 顶部动态 GDP 指标使用双层数字滚动；首屏下方 logo marquee 以横向位移延续能量，但在 reduced motion 场景中避免抢占主叙事。

## 3. 色彩系统

实测高频文本色：

- `#0A2540`（rgb(6,27,49)）：主标题、导航、卡片标题。
- `#50617A`（rgb(80,97,122)）：次级说明、illustrated UI 中的大量细节。
- `#64748D`（rgb(100,116,141)）：Hero ticker 与弱化文本。
- `#533AFD`（rgb(83,58,253)）：品牌行动色、Logo、主 CTA、链接。
- `#FFFFFF`：深色模块文本与主 CTA 文本。

背景与材质：

- 页面 #FFFFFF；安静区 #F8FAFD；边框 #E5EDF5。
- 开发者区使用 #020826 和 #2C2484 等深色阶段，完成营销→工程语境切换。
- Bento 边光 `radial-gradient(circle,#7F7DFC,#F44BCC 33%,#E5EDF5 66%)`，透明度 0.5；使用条 `linear-gradient(90deg,#7232F1 3.13%,#FB76FA 50%,#FFCF5E)`。
- Stats 背景按时间推进：daytime 为 `#0071C1 → #60A8E2 → #B4D8FF → #D9EBFF → #F8FAFD`，sunrise 加入 #CB83FF/#FF90B9/#FFC977/#FFF1DC。

**可复用原则**：一个业务系统只允许一个主行动色；渐变色谱可以跨模块复用，但必须由深色文本和白色纸面约束。

## 4. 字体与层级

- 营销字体：`sohne-var, "SF Pro Display", sans-serif`；代码/工程模块：`SourceCodePro, SFMono-Regular, monospace`。
- 字重几乎只用 300（display）、400（正文/控件）、500（少数 interface）；没有靠加粗抢层级。
- 1440 阶梯：56/48/32/26/22/18/16/14；插画内部另用 8–12px 模拟真实产品 UI。
- 行高：56→57.68、48→55.2、32→35.2、26→29.12、22→24.2，均接近 1.1；18px 正文约 1.5，16px 控件为紧凑 16px。
- 字距随字号增大收紧：-1.4、-0.96、-0.64、-0.26、-0.22。

## 5. 版式与留白

- 首页根网格呈现 1232px 内容宽，外层 section container 1266px；Hero H1 从 x=208 开始，宽约 959px，说明大标题不占满全宽，而把右下留给渐变与插画入口。
- 主体模块大量使用 12 列语义栅格：标题 `span-8`、业务细分标题 `span-5`，与右侧 7 列产品剧场配对。
- 间距节奏以 4px 为基：8、16、32、64、96、128 反复出现；高频 gap 实测 8px×54、16px×27、4px×20、32px×16、64px×14。
- 导航高 76px，Hero 总高 685px，第一屏不硬塞满；中段 section 常以 96–128px 垂直节奏分隔。

## 6. 插画系统

Stripe 插画不是独立装饰，而是“产品界面微缩模型”：

1. **真实流程**：Checkout 卡片、订阅计划、发卡、平台 dashboard、代码编辑器均有真实状态与文案；
2. **小字是材质**：8–12px 标签、金额、货币符号让插画可信，但通过低对比和 #50617A 避免抢正文；
3. **软光而非重投影**：卡片用 #E5EDF5 边框、低透明度 navy 阴影、径向渐变边光；
4. **圆角克制**：控件 4px、面板 6px、媒体 8px，避免可爱化；
5. **色彩同源**：插画中的紫、品红、橙与 Hero、stats 渐变同谱，深色区用 #020826/rgba 白色线条延续。

## 7. 滚动与动效语言

- 图标填充：`fill 0.3s cubic-bezier(.25,1,.5,1)`，120 处；
- 轮播淡入：`opacity 0.15s linear`，36 处；
- 边框响应：`border-color 0.5s cubic-bezier(.4,0,.2,1)`；
- 滚动渐显：`opacity 0.5s cubic-bezier(.33,1,.68,1)`；
- stats 背景用 `cubic-bezier(.65,0,.35,1)` 过渡 opacity；
- 布局位移：`transform 2s cubic-bezier(.9,0,.1,1)`；
- 线条绘制：`stroke-dashoffset 2s cubic-bezier(.78,0,.22,1) 1.25s`。
- CSS 明确区分 `prefers-reduced-motion:no-preference`（58 处媒体块）与 `reduce`（15 处），动态 Hero 有静态 fallback。

**动效气质**：慢、少、长尾；进入时轻微位移/透明度，完成后让插画和文本自己说明产品。

## 8. 可复用转化

- **PPT 主题**：白底、#0A2540 大字、#533AFD 单一 CTA、#F8FAFD 分区、#E5EDF5 边框、紫粉橙渐变只作分隔带或图表光效。
- **Pattern**：五类页面结构可直接转化——Hero 波形、Bento 产品矩阵、数据大字、企业/初创/平台分段、深色开发者区。
- **适合场景**：金融科技、开发者平台、复杂产品矩阵、需要把可靠性转译成现代感的 B2B 叙事。
- **避免**：小字号插画复制到投影会失效，应保留形态与色谱，删除小字；不要在同一页使用多个高饱和 CTA。

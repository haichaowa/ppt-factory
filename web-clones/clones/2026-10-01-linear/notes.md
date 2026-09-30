# Linear 首页设计拆解（2026-10-01）

> 证据：`archive/linear-home-robots-sanitized.mhtml`（渲染后单文件归档）、`archive/computed-styles.json`
> （1440 / 1280 / 375 三档真实 computed style 与元素盒模型）、`archive/mhtml-manifest.json`
> （robots 清理后保留 115 个 part；原始渲染 snapshot 143 个 part，其中 28 个 `/cdn-cgi/` 图片 part 已按 robots 移除）、
> `archive/section-capture-manifest.json` 与 `screenshots/`。
> 本文数值均为浏览器实测，不用目测近似；少量标注为 CSS token 的值来自归档 CSS。
> 由于 robots 清理移除了 `/cdn-cgi/` 图片字节，视觉保真以三档全页 PNG 与 2× 区块 PNG 为 canonical。

## 1. 总体气质

Linear 的营销页几乎不是“装饰型深色页”，而是一个**近黑产品系统舞台**：
`#08090A` 承底，首屏直接放入高保真 Linear 应用界面，用产品自身的信息密度、
1px 白色透明 hairline、柔和黑色投影和克制的语法高色完成说服。文字层级比图形更抢眼：
64px/510 的主标题、48px 的章节命题、24px 的说明文字，在暗背景上形成明确的三级阅读秩序。

它的“高级感”来自三件事：

1. **深色但不糊**：页面黑、产品面板黑、边框黑和投影黑分层，而不是同一张黑底叠亮字；
2. **界面即插画**：首屏与功能区的截图/仿真 UI 有真实导航、issue、diff、AI 对话，而非抽象图形；
3. **克制动效**：多数状态只动 color/filter/transform/stroke，0.1–0.16s 完成，不改变布局稳定性。

## 2. 色彩令牌

### 页面与文字

| 用途 | 实测值 |
|---|---:|
| 页面背景 / 反白按钮文字 | `rgb(8,9,10)` = `#08090A` |
| 主文字 / 主 CTA 前景 | `rgb(247,248,248)` = `#F7F8F8` |
| 功能区正文 | `rgb(208,214,224)` = `#D0D6E0` |
| 导航、hero 副题、弱说明 | `rgb(138,143,152)` = `#8A8F98` |
| 产品 UI 更弱文字/图标 | `rgb(98,102,109)` = `#62666D` |
| 页脚顶边 / 产品面板描边 | `rgb(35,37,42)` = `#23252A` |
| 页头底边、浅色 hairline | `rgba(255,255,255,0.08)` = `#FFFFFF14` |

### 动作与玻璃材质

| 用途 | 实测值 |
|---|---:|
| 主 CTA 背景 | `rgb(229,229,230)` = `#E5E5E6` |
| 主 CTA hover（CSS token） | `#FFFFFF` |
| 次 CTA 背景 | `rgba(255,255,255,0.05)` = `#FFFFFF0D` |
| 页头背景 | `linear-gradient(rgba(11,11,11,0.8), oklab(0.149576 0.00000680983 0.00000298768 / 0.761905))` |
| 页头模糊 | `backdrop-filter: blur(20px)` |
| 品牌焦点/强调（CSS token） | `#7170FF`；旧品牌 indigo `#5E6AD2`；链接 `#828FFF` |

这套页面没有把品牌紫色铺满首屏。紫色主要保留在焦点、链接和产品状态里；
主 CTA 反而用近白 `#E5E5E6`，让“开始使用”在深色环境中成为最高亮度而非最高饱和度。

### 产品 UI 与代码色

页面内嵌产品截图还有一套完整深色界面色：面板 `#0F1011`、`#141516`、`#191A1B`，
边框 `#23252A`、`#34343A`；语法/token 色包括 keyword `#F79CE0`、variable `#F7BF8B`、
string `#FFDF9F`、constant `#8FA6FF`、entity `#83DCDC`。这些颜色服务于信息辨识，
不是营销装饰色。

## 3. 字体系统

- 无衬线主字体（computed）：
  `"Inter Variable", "SF Pro Display", -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`
  （归档 CSS token 中还包含 `BlinkMacSystemFont` fallback；Chromium 序列化 computed value 时省略该项。）
- 等宽：
  `"Berkeley Mono", ui-monospace, "SF Mono", Menlo, monospace`
- 归档 CSS 另有展示衬线 token：`"Tiempos Headline", ui-serif, Georgia, ...`，本首页主路径未使用。
- 字重 token：300 / 400 / **510** / 590 / 680；营销大标题主要用 510，产品 UI 密集文本常用 400 与 510。

### 三档字号阶梯

| 层级 | 1440 | 1280 | 375 |
|---|---:|---:|---:|
| 收束 CTA | `72/72/510/-1.584px` | `40/44/510/-0.88px` | `38/41.8/510/-0.836px` |
| Hero H1 | `64/64/510/-1.408px` | `64/64/510/-1.408px` | `38/41.8/510/-0.836px` |
| 宣言 / 章节 H2 | `48/48/510/-1.056px`（manifesto 与 CTA 在 1280 降 `40/44`） | `40/44` 或 feature `48/48` | `24/31.92/510/-0.288px` |
| 功能区正文 | `24/31.92/400/-0.288px` | `24/31.92/400/-0.288px` | `15/24/400/-0.165px` |
| 基础正文 / 大链接 | `16/24/400/normal` | 同左 | 同左 |
| hero 副题 / 移动正文 | `15/24/400/-0.165px` | 同左 | 同左 |
| 导航与页脚栏目 | `13/19.5/400–510/-0.13px` | 同左 | 同左 |
| 等宽代码 | `12–14px / 1.4 / 400` | 同左 | 同左 |

关键观察：**1280 不是简单等比缩小**。H1 保持 64px，功能 H2 保持 48px，
但宣言和收束 CTA 降到 40px；375 才把大命题统一压到 24–38px。这保证了中等屏的
章节权重，同时避免长文案提前折行失控。

## 4. 版式与网格

### 1440 桌面

- 页高 `9960px`，内容盒 `x=48`、宽 `1344px`；固定页头高 `72px`、`z-index:100`。
- Hero：
  - H1 盒 `x78 y272`，`1282×128`；
  - 副题 `x80 y432`，`505×25`，形成左对齐但不满铺的初始阅读线；
  - 产品截图 `y527` 起，`1440×768`，向下突破内容盒做全宽视觉锚点，底部留 `48px`。
- 宣言 H2：`x46 y1596`，`1250×144`，几乎占据内容宽度，用灰色而非白色降低持续阅读压力。
- 功能区：四个重复章节，外距/内距块 `128px`；标题/描述头为 `672px + 672px` 双列，
  标题内容从 `x78` 开始，说明从 `x752` 开始；头部下缘再留 `96px` 接产品演示。
- 收束 CTA：上下各 `224px`，水平排布、`40px` gap，标题居中后再放两颗按钮。
- 页脚：`#08090A`，顶边 `#23252A`，栏目标题 `13/19.5/510`，下方链接规则排列。

### 1280 与 375 响应

- 1280：内容盒 `x10`、宽 `1260px`；H1 仍有 `1198px` 宽度，产品演示和功能双列保持稳定。
- 375：内容盒 `x16`、宽 `343px`；H1 变 `328×167`，副题 `276×48`；
  产品媒体变成 `375×400` 全宽；功能区从双列改为纵向堆叠，正文回落 `15/24`。
- 页头在移动端约 `64–65px`，保留 Sign up 小 CTA，其余主导航收纳。

### 节奏结论

桌面节奏不是 24px 小网格的堆叠，而是**“128px 章节 breath + 96px 标题到媒体 + 产品界面内部小间距”**
的双尺度系统。营销层给足留白，产品截图内部再用 8/12/16/24px UI 节奏提供密度，
两者并置时形成“空—密—空”的节奏。

## 5. 圆角、阴影与材质

| 类型 | 实测 |
|---|---:|
| CTA / 导航触发器 | `9999px` 胶囊 |
| 首页产品截图外框 | `6px` |
| 代码块 | `4px` |
| 常规控件 | `8px` |
| 产品 frame/panel | `12px`，部分 panel 顶部 `12px 12px 0 0` |
| 评论卡 | `9px` |
| 头像 | `50%` |
| 装饰 glow | `400px` |

阴影极克制且多为黑色细描边：

- 产品 panel：`0 2px 32px rgba(0,0,0,0.25)`；
- 评论卡：`0 0 0 1px rgba(0,0,0,0.20)`；
- 内凹：`inset 0 0 12px rgba(0,0,0,0.20)`；
- 主 CTA：五层 `0–8px` 的低透明黑影，最重也只有 `rgba(0,0,0,0.08)`；
- 次 CTA：白色 inset 高光 + 外层黑描边 + `0 4px 4px rgba(0,0,0,0.1)`。

玻璃与边缘处理是核心材质：页头 20px blur；组件用 `::before` 画渐变 border，
再以 mask 限定在边框盒；edge highlight 用局部 radial mask/glow，只让边缘局部亮起。
这比整块玻璃卡片更精细，也避免了深色页面常见的灰雾感。

## 6. 动效语言

实测状态动效分四档：

1. **quick**：0.1s，`cubic-bezier(0.25,0.46,0.45,0.94)`，用于导航文字、链接 color、filter；
2. **button**：0.16s，同 ease-out-quad，动 `border/background-color/color/box-shadow/opacity/filter/transform`；
3. **regular token**：0.25s（设计系统 CSS token）；
4. **说明性动效**：代码背景 0.4s ease-out；SVG transform/stroke 0.7s `cubic-bezier(0.32,0.72,0,1)`；
   agent label sweep 2s linear；marquee token 30s linear。

滚动叙事主要改变插画、stroke、路径和局部状态，页面骨架与文字位置保持稳定。
复刻时应避免大幅位移和弹性缓动；Linear 的动效可信度来自“短、确定、只动必要属性”。

## 7. 代表区块

- `sections/01-hero-product-screenshot.png`：左上标题与全宽真实应用界面的密度对比，是首屏信任感的来源。
- `sections/02-manifesto-statement.png`：用低对比大字在黑底上制造品牌宣言，不额外插图。
- `sections/03-intake-integrations.png`：48px 标题 + 24px 说明 + 真实工作流演示的标准功能章节模板。
- `sections/04-ai-automations.png`：AI 对话、代码和自动化状态用产品语言而非抽象 AI 图形表达。
- `sections/05-changelog.png`：更新流以紧凑文字卡呈现，延续产品信息密度。
- `sections/06-prefooter-cta.png`：224px 留白 + 72px 大字 + 双胶囊 CTA，收束干净。

## 8. 可复用结论

适合转化为 `linear-dark-product-system` 类 PPT / pattern：

- 深色产品发布、开发者工具、AI 工作流、企业 SaaS 方案；
- 需要展示复杂界面但不想让版面失控的场景；
- 用“真实截图 + 少量高保真 UI 组件”替代泛化插画的技术叙事。

PPT 转译建议：

1. 背景 `#08090A`，文字三级 `#F7F8F8` / `#D0D6E0` / `#8A8F98`；
2. 大标题 Inter/系统无衬线，510 字重，负字距约为 `-2.2%`；
3. 用 1px `#FFFFFF14` 分隔，而非亮色大边框；
4. 产品图外框 6px，卡片 9–12px，CTA 胶囊 `#E5E5E6`；
5. 每个章节保留 128px 级别留白，产品截图内部保持小尺度 8/12/16/24px；
6. 动效只做 0.1–0.16s 的颜色/亮度/轻微 transform，滚动图表可用 0.4–0.7s。

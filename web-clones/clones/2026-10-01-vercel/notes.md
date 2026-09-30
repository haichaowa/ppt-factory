# Vercel 首页设计拆解（2026-10-01）

> 证据：`archive/vercel-home.mhtml`、`archive/style-metrics.json`、`archive/key-element-metrics.json`（1440 / 375 实测 computed style）、三档 PNG 与 5 张 2× 区块图。以下均为渲染后的具体值，而不是目测值。最终 MHTML 在离线 Chromium 中可渲染 H1，且 1440×1000 首屏与 live 截图有 98.4819% 像素匹配（平均通道误差 1.6948），字体补充有效。

## 1. 总体气质：黑白基础设施面板

页面把营销首屏做成一个“可部署的控制台”：纯黑背景 `#000000`，主要文字 `#EDEDED`，次级文字 `#A1A1A1`，媒介区域用 `#0A0A0A` 抬升一层。大面积黑并不闷，因为每个产品段落都有极低亮度的光晕、噪点和 1px 发光边框；彩色只出现在 Passport 彩虹书脊、蓝色链接和终端成功状态，功能语义明确。视觉核心不是渐变炫技，而是“黑底 + 高对比无衬线 + 等宽状态文本 + 模糊网格”的组合。

## 2. 色彩令牌

| 用途 | 实测值 | 说明 |
|---|---:|---|
| 页面底色 | `rgb(0, 0, 0)` / `#000000` | html/body computed background |
| 媒介/卡片底 | `hsla(0,0%,4%,1)` / `#0A0A0A` | `--ds-background-100`，比页面亮 4% |
| 主文字 | `rgb(237,237,237)` / `#EDEDED` | H1/H2/按钮反色 |
| 次级文字 | `rgb(161,161,161)` / `#A1A1A1` | proof 与说明段 |
| 弱文字 | `rgb(143,143,143)`、`rgb(136,136,136)` | mono 标识、加载态 |
| 反色按钮文字 | `rgb(10,10,10)` / `#0A0A0A` | 白底 primary |
| 常见边线 | `rgb(31,31,31)`、`rgb(46,46,46)` | 默认 border 色与按钮描边 |
| 高光边 | `rgba(255,255,255,0.145)` | 产品面板双线边界 |
| 链接/焦点 | `rgb(0,112,243)` / `#0070F3` | Vercel blue |
| 成功态 | `rgb(98,192,115)` / `#62C073` | CLI `✓` |
| Passport 渐变 | `#00E5FF → #9500FF → #FF1744 → #FFD000 → #00FF95` | 书脊与全息光 |
| 光晕底 | `rgba(0,0,0,.15)` + `blur(120px)` 的 `#0A0A0A` 椭圆 | 低强度局部提升 |

可复用口径：以 0 / 4 / 10 / 237 四个明度构成骨架；彩色总量控制在 5% 以内，并只承担“成功、链接、身份”三种语义。

## 3. 字体与字号

实测字体族只有两套：`GeistSans, "GeistSans Fallback"` 和 `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`。标题不是重字量堆叠，而靠极大字号与负字距形成密度。

| 层级 | 1440px | 375px | 字重/行高 |
|---|---:|---:|---|
| H1 | 64px / 64px / -3.84px | 48px / 56px / -2.88px | 400 |
| H2 | 56px / 56px / -3.36px | 32px / 40px / -1.60px | 450 |
| proof 段 | 24px / 32px | 同体系缩放 | 450，`#A1A1A1` |
| 正文 | 16px / 24px | 16px / 24px | 400 |
| 标签/导航 | 14px / 20–21px | 同 | 400–500 |
| mono 微文本 | 12px / 16–20px | 同 | 400–500 |
| 页脚 | 14px / 21px | 同 | 400 |
| mono 装饰字 | 11px / 16.5px | 同 | 400 |

字体权重只有 `400 / 450 / 500`，没有 700。这个选择让大标题保持工程产品感，避免营销页常见的重黑字。中英文复刻可保留 Geist/Inter 一类的低对比几何无衬线；等宽仅用于状态、命令、护照信息和部署结果。

## 4. 版式与间距

- **页面网格**：12 列，列间距 `20px`；主要产品叙事为 `8 列媒介 + 3 列文案 + 1 列空隙`，文案不是机械三等分。
- **页面宽度**：`--geist-page-width: 1200px`、`--geist-page-width-with-margin: calc(1200px + 48px)`；同页还有 `--ds-page-width: 1400px`。1440 视口因可用宽约束实际内容框 1392px，1280 为 1232px，375 为 327px。
- **页边距**：`--geist-page-margin: 24px`，移动端同样保留 24px，不做满边出血。
- **Header**：高 `64px`，sticky；未滚动透明，滚动后 `background-200` + `rgba(255,255,255,.14)` 下边线。
- **首屏**：y=64、高 936px，文本容器最大 444px，大标题与说明/按钮垂直 `32px` 分组；背景光晕与网格承担空间感。
- **段落节奏**：`--spacing: 4px`；营销区块顶部约 `208px`，大段间约 `208–212px`，小组间距 `6 / 12 / 20 / 32 / 40px`。段落间隔大于组件内间距，形成“长呼吸、密信息”的节奏。
- **移动端**：H1 从 64/1 降到 48/1.167，H2 从 56/1 降到 32/1.25；按钮从并排改为 327px 全宽、40px 高、垂直堆叠，间距 12px。
- **产品截图**：桌面 2784×1560 原图按 960px 宽呈现，移动端切换 1284×1026；底部用 `linear-gradient(to top, #000, transparent)` 融入黑底。

## 5. 组件与质感

- **按钮**：大按钮 40px 高、16px 字、500 字重、pill radius；primary `#EDEDED` 底 + `#0A0A0A` 字，secondary `#0A0A0A` 底 + `#EDEDED` 字 + `#2E2E2E` 1px 边。头部小按钮 32px 高、14px 字。hover 反转/提亮，过渡 150ms。
- **产品面板**：底 `#0A0A0A`、radius `6px`，边线 `rgba(255,255,255,.145)` + 外侧 `#000`，并叠加大范围 `blur(120px)` 光晕。它不依赖玻璃拟态的高透明度，而是靠双线边界和噪点制造硬件面板感。
- **最近发布卡片**：卡片内边距 `20px`，radius `6px`，标题 24px/26.4px/450，说明 14px/20px。Passport 卡使用彩虹渐变与全息字，Containers 卡使用 12px mono CLI 成功日志，二者形成强/弱彩色对比。
- **圆角体系**：控制项 `4px`、基础面板 `6px`、营销组件 `8px`、按钮/徽标 pill。整体半径小，保持工具感。
- **阴影**：`--ds-shadow-border-base: 0 0 0 1px #ffffff25`；完整面板为 `0 0 0 1px #ffffff25, 0 0 0 1px #000`；菜单/浮层采用多段 `1px` 边界 + 低透明黑投影。Vercel 的阴影多数是“边线”而非投影。

## 6. 动效语言

- 基础 token：`--default-transition-duration: .15s`，`--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`。
- 按钮：`border-color, background, color, transform, box-shadow` 150ms `ease-in-out`。
- Header/内容显隐：opacity `0.3s cubic-bezier(.4,0,.2,1)`；浮层 opacity/scale `0.2s cubic-bezier(.23,1,.32,1)`。
- 卡片和媒介：transform/translate/scale/rotate `0.3s cubic-bezier(0,0,.2,1)`；文字/链接颜色 100–500ms。
- 页面入场：`fade-in 1.25s cubic-bezier(.4,.04,.04,1)`，`fade-slide-in .35s cubic-bezier(.16,1,.3,1)`。
- 循环动效：logo marquee `40s linear infinite`；Passport 光斑 `passport-glow-ellipse-x 1.2s ease-in-out infinite alternate`；微光扫过 `1.5s ease-in-out`。
- 复刻时动效应保持“快交互、慢氛围”：按钮 150ms，媒介 300ms，大面积入场 800–1250ms，持续循环不得抢走正文。

## 7. 代表区块评价

1. **Hero / Drop to deploy**：把部署动作隐喻为拖放与加载状态，中心大字、右侧产品面板、背景微光形成三层层级。
2. **Agentic Infrastructure**：8 列媒介 + 3 列 proof/feature list，让复杂能力由产品截图解释，文字只保留索引功能。
3. **Ship apps**：Notion/Zapier 的具体量级与黑色界面同屏，可信度来自“数字 + 实景 UI + 短 feature list”。
4. **Host platforms**：Mintlify 案例使用底部渐隐与 120px blur 光晕，让产品图像像漂浮在黑色机房中。
5. **Recently shipped**：Passport 彩虹卡、CLI mono 卡和普通产品卡并列，展示如何在极简系统里用少量彩色制造新品焦点。

## 8. 可复用结论

这套风格适合开发者工具、AI 基础设施、命令行产品和技术型 SaaS：黑底、低字重大标题、等宽状态文本、120px 光晕、1px 双边界、极少彩色。转化为 PPT 时可用 `#000` 背景、`#EDEDED/#A1A1A1` 双级文字、4/6/8px 小圆角、20px 网格间距；每页只放一个产品截图或终端块，彩色仅作为成功/新品/链接的高亮。若用于浅色 deck，可反转成 `#FAFAFA` 底、`#111` 字，但仍保留 Geist/mono 双字体与低圆角面板。

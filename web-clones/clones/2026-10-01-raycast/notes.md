# Raycast 设计拆解（live DOM 实测）

> 证据：`archive/computed-styles.json`（1440 × 900、完整渲染后 `getComputedStyle`）、`archive/styles/`（11 个 CSS 源文件）、`archive/dom-snapshot.html`。截图统一使用 reduced-motion 并禁用 CSS animation，避免动态内容造成不可复现重影；本文动效参数来自实时 CSS。

## 1. 总体气质

Raycast 不是普通深色 SaaS 页，而是把 **macOS 系统材质、物理键盘、命令窗口和星光背景** 放进一个近乎纯黑的影院。全站只给三个强刺激：白色标题、浅灰主 CTA、少量红色 AI/品牌点缀。页面通过真实产品界面推进叙事：launcher → 键盘效率 → 扩展生态 → AI agent → API，每一段都让用户先看见“操作发生的位置”。

## 2. 色彩

### 核心分层

- **页面底色**：`#07080A`（CSS `--color-bg` / `--grey-900`；实测 body `rgb(7, 8, 10)`）
- **抬升层**：`#101111`、`#111214`、`#18191A`、`#1B1C1E`
- **结构描边**：`#242728`；demo 内部描边常见 `rgb(27,28,30) 0 0 0 1px` + `rgb(7,8,10) inset`
- **主文字**：`#FFFFFF` / `#F4F4F6`
- **次级文字**：`#CDCECE`、`#C2C7CA`
- **弱文字/占位**：`#9C9C9D`、`#6A6B6C`、`rgba(255,255,255,.5/.4)`
- **主按钮**：底 `#E6E6E6`，文字 `#2F3031`，hover 变量指向 `#FFF`

### 功能色

- **红**：`#FF6363`（AI eyebrow）、`#FF6161`（`--color-red`）、透明态 `#FF616126`
- **绿**：`#59D499` / `#59D49926`
- **蓝**：`#57C1FF` / `#57C1FF26`
- **黄**：`#FFC533` / `#FFC53326`

红、绿、蓝、黄同时出现在 clipboard/history demo 里，承担类别语义；营销层则克制地几乎不使用彩色。这个“产品内多彩、页面外壳近黑”的分离，是 Raycast 材质感的重要来源。

## 3. 字体与字号

### 字族

- **主 UI/营销**：`Inter, "Inter Fallback", sans-serif`
- **键盘/系统控件**：`"SF Pro Text", "SF Pro Icons", Inter, "Inter Fallback"`
- **AI eyebrow / 命令态**：`"JetBrains Mono", "JetBrains Mono Fallback", Menlo, Monaco, Courier, monospace`
- **代码/等宽变量**：`GeistMono, ui-monospace, SFMono-Regular, ...`
- Windows 备选链出现 `Segoe UI Variable`，但 macOS 实测以 Inter / SF Pro / JetBrains Mono 为主。

### 1440 视口实测层级

| 用例 | 字号 / 行高 | 字重 | 字距 / 颜色 |
|---|---:|---:|---|
| Hero H1 `Your shortcut to everything.` | 64 / 70.4px | 600 | normal / `#FFF` |
| API 大标题 `Build the perfect tools.` | 56 / 65.52px | 400 | .2px / `#FFF` |
| AI 标题 `Meet your new virtual assistant` | 32 / 38.4px | 500 | -0.8px / `#FFF` |
| Feature wall 标题 | 24 / 38.4px | 500 | .2px / `#FFF` |
| 常规 section H2 | 20 / normal | 500 | .2px / `#FFF` |
| 常规 section 描述 | 20 / normal | 500 | .2px / `#6A6B6C` |
| Hero 段落 | 18 / normal | 400 | .2px / `#FFF` |
| 正文/launcher | 16 / 18.4px | 400–500 | .1px / 白或弱白 |
| 导航/footer | 14 / normal | 500 | .2px / `#9C9C9D` |
| AI 聊天 item | 13 / 16px | 400 | normal / `#FFF` |
| AI eyebrow | 12 / 16px | 500 | 1.44px、uppercase / `#FF6363` |
| metadata/hotkey | 11 / normal | 400–500 | normal / 弱白 |
| 最小 kbd/状态 | 9–10px | 400–500 | 系统字 |

整体是“超大国字标题 + 意外小的 20px section header”。因为产品窗口本身信息密度高，营销标题反而收窄，避免和界面抢焦点。

## 4. 版式与间距

- **4px 基础节奏**：`4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 168, 224`
- **页面水平安全边**：移动 16px，≥720px 为 24px；hero text 最大 818px。
- **容器宽度**：XS `746px`、SM `1064px`、navbar `1204px`；grid gap 移动 24px，桌面 32px。
- **Navbar**：内容宽 1204px，视觉高度约 92px，变量 `--navbar-height:76px`，上方 16px。
- **典型 section**：桌面上下 `224px`，横向 `24px`；通用 SectionContainer 在 ≥720px 为上下 `168px`、gap `64px`。
- **Hero 构图**：文本从页面顶部约 370px 开始，H1 最大 540px 宽，下方 18px 描述与 CTA 以 32px 级距排列；1200px 背景/产品物件居中。
- **区块节奏**：1440 全页 root 区块 y 坐标约为 0、1191、2566、3286、4724、6292、7392、8536、9522、10317、13499、14744。空白本身承担章节分隔，页面很少用粗分割线。
- **Footer**：6 列链接，最大 1064px；`backdrop-filter: blur(20px)` 与渐变/径向光构成收束材质。

## 5. 圆角、边框与阴影

### 圆角系统

`4px (xs) · 6px (sm) · 8px (normal) · 12px (md) · 16px (lg) · 20px (xl) · 24px (xxl) · 100% / 99999px`

高频使用为 `11px`、`8px`、`6px`、`12px`、`20px`。键盘按键和圆形头像取 100%，产品窗口则多为 8–12px，避免过度圆润削弱工具感。

### 材质描边/阴影

- **macOS 键盘按键**（159 个元素共用）：  
  `rgba(0,0,0,.4) 0 1.5px .5px 2.5px, rgb(0,0,0) 0 0 .5px 1px, rgba(0,0,0,.25) 0 2px 1px 1px inset, rgba(255,255,255,.2) 0 1px 1px 1px inset`
- **浅色 CTA**：外圈 `rgba(0,0,0,.5) 0 0 0 2px`、柔光 `rgba(255,255,255,.19) 0 0 14px`、上下 inset 高光/暗部
- **窗口/面板**：常见 `rgb(27,28,30) 0 0 0 1px`、`rgb(7,8,10) inset`，大面积投影可到 `rgba(0,0,0,.4) 0 4px 40px 8px`
- **暖色氛围**：`rgba(215,201,175,.05) 0 0 20px 5px` ×2
- **Footer 顶部**：`0 -4px 10px #0000001c`，配 1px `#1B1C1E` 上边线

阴影不是装饰性 glow，而是模拟物件的受光面、边缘厚度和下沉深度；这让它比普通 dark glass 更接近硬件渲染。

## 6. 材质与图形

- **Hero 背景**：近黑底 + 三层渐变遮罩（底部到 `#07080A`、左右 5% 边缘渐隐）保护文字与背景的对比。
- **Launcher 背景**：`RaycastWindow` 有 star field、radial backdrop、`loadingSweep`/`blink`；产品界面内部承载色彩。
- **键盘区域**：桌面使用 radial mask：`radial-gradient(95% 70% at 17.02% 47.84%, #d9d9d9 16.79%, #d9d9d900 83.76%)`，让键盘像被环境光局部照亮。
- **扩展横向卷轴**：两侧 mask `linear-gradient(to right, transparent, black 48px, black calc(100% - 224px), transparent)`，滚动条隐藏，保留连续感。
- **玻璃/半透明**：大量 `rgba(255,255,255,.05/.1)` 面板；AI source chips 为 `#ffffff1a`、12px 圆角。
- **Footer**：`blur(20px)` + `linear-gradient(#07080acc, #07080a)` + `radial-gradient(49.41% 64.58% at 49.4% 0, #ffffff08, #fff0)`。

## 7. 动效语言

### 过渡

- 常规 hover：`0.2s ease-in-out` / `0.3s ease` / `0.3s ease-in-out`
- CTA：background/color/box-shadow `0.2s`，transform `0.1s ease-in-out`
- 键盘/图标主曲线：`cubic-bezier(0.23, 1, 0.32, 1)`，opacity `0.4s`，box-shadow/transform/color `0.2s`
- 长滚动/场景物件：`0.5s`–`2s cubic-bezier(0.165, 0.84, 0.44, 1)`，并有 0.5s、0.65s、0.85s、1s stagger

### 关键帧

CSS 源文件包含 `fadeInUp`、`fadeInScaleUp`、`slideIn`、`blink`、`loadingSweep`、`spinLoading`、`shimmer`、`progress`、`float`、`nightRider` 等。核心语法是“短促 UI 反馈 + 慢速环境漂浮 + 循环状态指示”；文字 shimmer 明确遵守 `prefers-reduced-motion: reduce` 时禁用。

## 8. 三档视口观察

- **1440 / 1280**：全页高均为 15983px；桌面结构保持相同，1280 只压缩水平余量，产品窗口和 carousel 仍横向溢出滚动。
- **375**：全页高 15647px，移动端 hero 字号源码从 36px 起步，≥420px 到 48px；AI 描述降到 15px，section 纵向堆叠，扩展 reel 继续使用横向 snap/mask。
- Raycast 的移动策略不是“缩小桌面”，而是保留暗色材质和产品截图，重排文案与 demo，但坚持横向生态展示。

## 9. 可复用结论

适合转化为：

- 开发者工具、AI agent、系统级软件、效率工具的产品发布页；
- 需要“可靠、精致、快”的暗色 keynote / pitch deck；
- 以真实软件 UI 作为叙事核心，而非抽象插画的核心区；
- PPT 的 product demo 页：暗底、产品窗口、一层 radial light、少量 mono 标签。

迁移要点：

- 底色使用近黑但带蓝灰的 `#07080A`，不要纯黑；
- 只有主 CTA 可以亮到 `#E6E6E6`，其余表面用 2–10% 白；
- 红色只给 AI/品牌关键点，不要全页泛红；
- 字体用 Inter + JetBrains Mono，标题 56–64px，正文 16–20px，保留 `.2px` 微字距；
- 圆角控制在 8–20px，投影必须模拟 inset 光与外厚度；
- 每屏保留一个可辨认的操作物件，说明文字短于产品界面标签。

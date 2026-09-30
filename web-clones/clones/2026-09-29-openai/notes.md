# OpenAI 首页设计拆解（2026-09-29）

> 证据来源：`archive/openai-home.mhtml`、`archive/dom.raw.html`（原始序列化）与 `archive/dom.html`（可浏览静态版）、
> `archive/computed-styles-probe.json`（1440px）、`archive/computed-styles-mobile.json`（375px）、
> `archive/selected-computed-styles.json`。阶段6又以 1440×1000 / 375×812 无头 Chromium 复查，新增
`archive/stage6-computed-recheck.json` 与 `archive/stage6-token-audit.json`。本文数值均为浏览器真实 computed style，非目测。

## 1. 总体气质

这是一套“产品界面即营销首屏”的极简黑白系统：白底、近零装饰、黑色主 CTA、
大尺寸媒体卡片和 24px 常规网格。页面不靠彩色品牌点缀建立识别，而靠**超大的真实媒体、
稳定的信息卡结构、轻微的柔和阴影和精确的字号阶梯**形成高级感。

## 2. 设计令牌（实测）

### 色彩

| 用途 | 实测值 |
|---|---:|
| 页面背景 | `rgb(255,255,255)` = `#FFFFFF` |
| 主文字 | `rgb(0,0,0)` = `#000000` |
| 次要文字 / placeholder | `rgba(0,0,0,0.60)`（token `--color-primary-60`） |
| 弱分隔/边框 | `rgba(0,0,0,0.12)`（token `--color-primary-12`） |
| 浅表面/悬停 wash | `rgba(0,0,0,0.04)`（token `--color-primary-4`） |
| 主 CTA | `#000000` 底 + `#FFFFFF` 字 |
| 反白文字（视频/深色媒体） | `#FFFFFF` |
| 灰阶备选 | `#F5F5F5`、`#E0E0E0`、`#8F8F8F`、`#333333` |

### 字体系统

- 主字体：`"OpenAI Sans", "OpenAI Sans Variable Scripts", sans-serif`（品牌字体，本地只记录不二次分发）。
- 等宽：`"SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace`。
- 页面基础：`17px / 27.999px / 400 / -0.17px`。
- 中文/通用复刻建议：`Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`。

### 字号阶梯（1440px 实测）

| 层级 | 实测值 | 用途 |
|---|---:|---|
| Featured 标题 | `48px / 55.68px / 500 / -1.44px` | 大媒体下方主故事 |
| 首屏问题 | `28px / 34px / 600 / +0.3px` | “What can I help with?” |
| 区块标题 | `22px / 27.72px / 500 / -0.22px` | Recent news / Stories / Latest research |
| 卡片标题 | `18px / 23.76px / 500 / -0.18px` | 1:1 与列表卡 |
| 正文/页面默认 | `17px / 27.999px / 400 / -0.17px` | 继承正文 |
| 输入框 | `16px / 24px / 400 / -0.16px` | ChatGPT prompt |
| 卡片 Meta | `14px / 19.6px / 500 / normal` | 分类、日期、阅读时长 |
| 按钮 / View all / chip 文案 | `14px / 14px / 500 / normal` | 真实交互控件使用独立 1:1 行高，而非卡片 Meta 行高 |
| 导航与页脚链接 | `13px / 19.68px / 500 / normal` | Header 导航、页脚栏目与链接 |
| 收束 CTA 标题 | `48px / 55.68px / 500 / -1.44px` | Get started with ChatGPT |

响应式实测：375px 下区块标题降为 `20px / 24px / 500 / -0.2px`，移动容器边距 24px；
收束 CTA 标题降为 `32px / 36.48px / 500 / -0.64px`。

### 圆角与阴影

- 媒体卡：`6.08px`（`--radius-md: .38rem`）。
- Prompt 输入：桌面 `24px`，移动 `16px`。
- 快捷入口 chip：`9999px`。
- 主 CTA / Download：`40px` 药丸；主 CTA 高 36px，Download 高 40px，两者均为 `14px/14px/500`。
- View all 文字动作：`4px` 圆角、40px 可点击高度、`14px/14px/500`。
- Prompt 主阴影（简化后的有效层）：
  - `0 3px 6px 0 rgba(0,0,0,.04)`
  - `0 4px 80px 8px rgba(0,0,0,.04)`
  - `0 0 1px 0 rgba(0,0,0,.62)`
- Chip 阴影：`0 4px 6px 0 rgba(0,0,0,.02)` + `0 0 2px 0 rgba(0,0,0,.05)`。

## 3. 版式网格与留白

- 1440px 页面容器：内容宽 `1376px`，左右 gutter `32px`；375px 内容宽 `327px`，左右 gutter `24px`。
- Header：高 `64px`，白底，背景滚动过渡 `0.15s`。
- 首屏：768px 宽 prompt 居中，输入高 `104px`，下方 chip 行高 `40px`，整块用大留白而非插画装饰。
- 首页故事区：4 列显式网格 `[326px 326px 326px 326px]` + `24px` gap；首个视频跨 3 列成 `1026×577`（约 16:9），右列三张 1:1 卡垂直排布，卡间 `64px`。
- Recent news：两列 `[676px 676px]` + `24px` gap；行内小图为 `185×185`，文字距图 `32px`。
- Stories / Latest research / OpenAI for business：三列 `[442.664px × 3]` + `24px` gap，方形媒体 `443×443`；商业区复用研究区卡片网格，只更换内容与入口。
- Get started CTA：卡片 `1376×368`、4% 黑表面、6.08px 圆角、12 列 `[92.656px]` + `24px` gap；375px 变为 `327×385`、12 列 `[19.914px]` + `8px` gap。
- Footer：外距 `120px 0 32px`，内容顶部 `48px`；5 组 `256px` 信息列 + `24px` 列距，列内 `40px` 节奏，底部工具行高 `40px`。
- 页面主纵向节奏：`article` gap 在 1440px 为 `120px`，移动为 `80px`。
- 标题行：区块标题与右上 “View all” 用 baseline 对齐，标题下方到内容 `32px`。

## 4. 动效语言

| 场景 | 实测参数 |
|---|---|
| 通用链接/chip | `0.25s cubic-bezier(0,0,1,1)`，token `ease-curve-a` |
| 主按钮 / View all | `0.2s cubic-bezier(0,0,1,1)` |
| 卡片 hover opacity/background | `0.3s cubic-bezier(.6,0,.4,1)`，token `ease-curve-d` |
| 媒体 hover scale | `0.3s cubic-bezier(.4,0,.2,1)`，幅度约 1.025 |
| Header 背景 | `0.15s cubic-bezier(.4,0,.2,1)` |
| 媒体显隐 | `0.3s cubic-bezier(0,.56,.46,1)`，token `ease-curve-c` |

动效特点：时长短、位移小，主要变化集中在透明度、背景、颜色和 1%–2.5% 的 scale；
没有大幅滚动视差，页面稳定感优先。

## 5. 阶段6令牌校正记录

- 将“Meta / CTA”拆成两类：卡片 Meta `14/19.6/500`，交互动作 `14/14/500`。
- 补齐 Header 导航 `13/19.68/500`。
- 补齐 OpenAI for business 与 Latest research 完全同构的三列卡片网格。
- 补齐 Get started CTA 桌面/移动网格、4% 表面、6.08px 圆角与 32/36.48 移动标题。
- 补齐 Footer 5×256px 信息列、24px 列距、40px 列内节奏与 13/19.68 链接系统。
- 证据：`archive/stage6-token-audit.json`（1440×1000 DOM）与 `archive/computed-styles-mobile.json`（375×812）。

## 6. 可复用结论（→ PPT 主题 / patterns）

1. **主题名建议**：`openai-monochrome`。
2. **适合场景**：AI/研究/企业级产品发布、严肃技术分享、以真实媒体和数据卡为主的叙事。
3. **PPT 映射**：
   - 背景 `#FFFFFF`，主字 `#000000`，弱字 60% 黑，分隔线 12% 黑；
   - 封面标题 44–54px / 500 / -2% 字距，章节标题 22px / 500，卡标题 18px / 500；
   - 用 12% 黑细线和 4% 黑 wash 代替重色块；
   - 图片卡统一 6px 圆角，重点卡可跨 3/4 宽，辅卡保持 1:1；
   - 主 CTA 黑底白字 40px 药丸、36px 高、14px/14px 行高；次级 chip 1px 12% 黑边 + 40px 胶囊形；
   - 页脚用 5 组 256px 列、24px 列距与 13px/19.68px 链接，避免把大量导航做成重色块。
4. **patterns 建议**：封面可用居中 prompt 结构；`metrics` 可学“大媒体 + 右侧三条 1:1 卡”的信息密度；`timeline`/`two-col` 可学 2 列新闻列表的 185px 方图 + 文本；`section` 可复用“小标题 + 右上 View all”的基准线结构。
5. **不要照搬**：OpenAI Sans、logo、视频与图像资产受版权保护；复用应抽取黑白系统、网格和动效参数，图形与文案原创。

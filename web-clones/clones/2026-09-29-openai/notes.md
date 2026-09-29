# OpenAI 首页设计拆解（2026-09-29）

> 证据来源：`archive/openai-home.mhtml`、`archive/dom.html`、
> `archive/computed-styles-probe.json`（1440px）、`archive/computed-styles-mobile.json`（375px）、
> `archive/selected-computed-styles.json`。本文数值均为浏览器真实 computed style，非目测。

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
| Meta / CTA | `14px / 19.6px 或 14px / 500` | 分类、日期、按钮 |
| 页脚链接 | `13px / 19.68px / 500` | 次级导航 |

响应式实测：375px 下区块标题降为 `20px / 24px / 500 / -0.2px`，移动容器边距 24px。

### 圆角与阴影

- 媒体卡：`6.08px`（`--radius-md: .38rem`）。
- Prompt 输入：桌面 `24px`，移动 `16px`。
- 快捷入口 chip：`9999px`。
- 主 CTA：`40px` 药丸。
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
- Stories / Latest research：三列 `[442.664px × 3]` + `24px` gap，方形媒体 `443×443`。
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

## 5. 可复用结论（→ PPT 主题 / patterns）

1. **主题名建议**：`openai-monochrome`。
2. **适合场景**：AI/研究/企业级产品发布、严肃技术分享、以真实媒体和数据卡为主的叙事。
3. **PPT 映射**：
   - 背景 `#FFFFFF`，主字 `#000000`，弱字 60% 黑，分隔线 12% 黑；
   - 封面标题 44–54px / 500 / -2% 字距，章节标题 22px / 500，卡标题 18px / 500；
   - 用 12% 黑细线和 4% 黑 wash 代替重色块；
   - 图片卡统一 6px 圆角，重点卡可跨 3/4 宽，辅卡保持 1:1；
   - 主 CTA 黑底白字 40px 药丸，次级 chip 1px 12% 黑边 + 胶囊形。
4. **patterns 建议**：封面可用居中 prompt 结构；`metrics` 可学“大媒体 + 右侧三条 1:1 卡”的信息密度；`timeline`/`two-col` 可学 2 列新闻列表的 185px 方图 + 文本；`section` 可复用“小标题 + 右上 View all”的基准线结构。
5. **不要照搬**：OpenAI Sans、logo、视频与图像资产受版权保护；复用应抽取黑白系统、网格和动效参数，图形与文案原创。

# themes/ — 主题（CSS 变量组）

一个主题 = 一个 `.css` 文件，只含 `:root` CSS 自定义属性声明。装配时整文件内联进 deck 的主题注入点（围栏标记）。

## 变量 Schema（所有主题必须完整定义，禁止增删变量名）

| 变量 | 用途 |
|------|------|
| `--stage-w` / `--stage-h` | 舞台尺寸（1280px × 720px，一般不改） |
| `--bg` / `--bg-soft` | 页面背景 / 次级背景（卡片底） |
| `--fg` / `--fg-dim` | 正文色 / 弱化文字（注释、备注） |
| `--accent` / `--accent-2` | 主强调色 / 次强调色 |
| `--font-display` / `--font-body` / `--font-mono` | 标题 / 正文 / 代码字体栈 |
| `--line-height-title` / `--line-height-body` | 显式行高（**跨平台中文防溢出的关键**，必须显式声明） |
| `--card-bg` / `--card-border` / `--card-radius` / `--card-blur` | 卡片视觉（底色/边框/圆角/毛玻璃）——patterns.css 的 `.pat-card` 消费这组变量 |

## 主题清单（P0 交付）

| 主题 | 定位 |
|------|------|
| `dark-glow.css` | 深空发光：深色基调 + 纯 CSS 渐变光晕背景 + 毛玻璃卡片 + 渐变边框（承接旧项目 Glow 审美）。色系约定：主 violet/purple，辅 blue/cyan，强调 green/amber，rose 警示、emerald 成功 |
| `minimal-light.css` | 极简白：浅底深字，正式场合、打印友好 |

## 字体约束（必须）

全部使用系统字体栈（PingFang SC → Microsoft YaHei → Noto Sans SC 回退链）。**禁止**引用任何在线字体 CDN——国内网络不可达，且破坏单文件离线可用。

## 扩展方式

新主题：复制现有主题 → 只改变量值 → 命名入库。变量 schema 变更 = 破坏性变更，须同步 `base.css` 与全部主题，并在 `docs/LESSONS.md` 记录。

# Framer 高保真素材包

**先看这三件**

1. [1440 全页截图](screenshots/framer-home-1440-fullpage.png) — 快速理解整页节奏与真实视觉状态。
2. [设计拆解](notes.md) — 提取自三档 computed style，包含色值、字体、间距、圆角、阴影与动效参数。
3. [结构化令牌](tokens.json) — 可直接映射到 PPT 主题或 patterns 的机器可读版；每类证据均指向 archive JSON。

**代表性区块**

打开 [sections/README.md](sections/README.md)，五个 2x 截图分别对应首屏标题、产品视频、Agent 工作流、一体化平台面板与社区 Feed。

**离线与复现**

- 主归档：[archive/framer-home.mhtml](archive/framer-home.mhtml)
- 归档说明与版权：[meta.md](meta.md)
- 离线检查：[archive/offline-browser-check.json](archive/offline-browser-check.json)
- 令牌回溯：[archive/token-evidence-audit.json](archive/token-evidence-audit.json)
- 总校验：[archive/verification.json](archive/verification.json)

**复核命令**

```bash
python3 archive/verification.py
python3 archive/token-evidence-audit.py
python3 archive/responsive-metrics.py
python3 archive/color-accessibility.py
python3 archive/security-scan.py
```

原站内容仅本地学习留存，不二次分发、不商用、不作训练素材；不要复用 Framer logo、文案、产品截图、客户 Logo 或商业字体。

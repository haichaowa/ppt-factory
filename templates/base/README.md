# templates/base/ — deck 引擎资产

回答"怎么搭一个 deck"。装配时这些文件被**逐字复制**进目标 deck（见 `docs/WORKFLOW.md`），本目录是唯一可维护源。

## 文件清单与行数预算

| 文件 | 职责 | 预算 |
|------|------|------|
| `skeleton.html` | 单文件 deck 骨架：head + 16:9 舞台（1280×720）+ 主题变量注入点 + runtime 挂载点 + 封面/内容/结尾三个示例页 | ~150 行 |
| `base.css` | 舞台与等比缩放、幻灯片通用 chrome、显式 line-height 的 px 级字号阶梯、`@media print`（`@page` 显式规格） | ≤300 行 |
| `runtime.js` | deck 运行时。**v0 核心**：键盘（←→/空格/PageUp·PageDown/Home/End/F 全屏）、fragment 渐进、窗口缩放适配、`#/页码` 深链、`?qa=1` 溢出描红。**批次二**：触摸、演讲者备注弹窗（BroadcastChannel）、进度条 | v0 ~150 行 |
| `themes/` | 主题 = 单文件 CSS 变量组（schema 见 `themes/README.md`） | 每文件 ≤60 行 |

## 修改规则

- 改这里的文件 = 影响所有**未来** deck；已生成的 deck 是冻结快照，不追溯
- `runtime.js` 任何变更必须递增围栏版本号（`/* runtime:v1 */`）
- 装配规则、手术流程见 `docs/WORKFLOW.md` 第 4 步

## 扩展方式

- 新主题 → `themes/` 加一个 `.css`（只改变量值，不增删变量名）
- runtime 新能力 → 按批次迭代，守住行数预算；预算不够先做减法再加功能

# SB Admin 2 · 代表截图索引

采集环境：2026-10-02，1440px 宽无头 Chromium，本地 HTTP `127.0.0.1:8766`，`fullPage` 截图；页面资源加载到 `networkidle` 后再等待 500ms。所有截图对应 `../source/` 的原始文件，未修改源码。

| 截图 | 对应源文件 | 采集意图 | 尺寸 |
|---|---|---|---|
| [01-index-dashboard.png](01-index-dashboard.png) | [../source/index.html](../source/index.html) | 仪表盘首页：KPI 边线卡、面积图、环形图、项目进度与色板卡 | 1440×1665 |
| [02-cards-components.png](02-cards-components.png) | [../source/cards.html](../source/cards.html) | 基础卡、下拉操作卡和可折叠卡的组件规范 | 1440×900 |
| [03-tables-datatable.png](03-tables-datatable.png) | [../source/tables.html](../source/tables.html) | DataTables 搜索、排序、分页与密集信息排版 | 1440×1089 |
| [04-charts-visualizations.png](04-charts-visualizations.png) | [../source/charts.html](../source/charts.html) | 面积图、柱状图、环形图的统一卡片容器与高度体系 | 1440×1275 |
| [05-utilities-color-tokens.png](05-utilities-color-tokens.png) | [../source/utilities-color.html](../source/utilities-color.html) | 文字色、灰阶、主题渐变等设计令牌的文档化展示 | 1440×1359 |
| [06-login-authentication.png](06-login-authentication.png) | [../source/login.html](../source/login.html) | 认证页图文分栏、胶囊表单与同族页面结构 | 1440×900 |
| [07-404-error-state.png](07-404-error-state.png) | [../source/404.html](../source/404.html) | 异常状态页的大号 glitch 数字与操作入口 | 1440×900 |

## 采集备注

- 截图 01–07 均成功保存，图片均为 PNG。
- 图表页存在 Chart.js 2 的弃用提示（`scales.[x/y]Axes.maxBarThickness`），不影响渲染。
- 登录页有浏览器关于 `current-password` autocomplete 的建议提示，不影响视觉浏览。

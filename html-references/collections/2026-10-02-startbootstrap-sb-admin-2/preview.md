# SB Admin 2 · 本地预览记录

## 打开方式

```bash
cd ppt-factory/html-references/collections/2026-10-02-startbootstrap-sb-admin-2/source
python3 -m http.server 8766 --bind 127.0.0.1
# 浏览器访问 http://127.0.0.1:8766/index.html
```

不需要 `npm install`。仓库已经提交运行所需的 Bootstrap、jQuery、Chart.js、DataTables 与字体资源；`package.json` 只用于可选开发构建。

## 2026-10-02 本地验证

验证环境：1440×900 无头 Chromium，通过本地 HTTP 服务器打开；目录为源码原始状态，未修改任何文件。

| 页面 | 本地入口 | 验证结果 |
|---|---|---|
| 仪表盘 | [source/index.html](source/index.html) | 通过。标题 `SB Admin 2 - Dashboard`，H1 `Dashboard`，两块 Chart.js canvas 可见，17 个 `.card` 容器正常渲染；唯一控制台错误为缺省 `favicon.ico` 404，不影响页面 |
| 组件页 | [source/cards.html](source/cards.html) | 通过。8 张示例卡片、5 个按钮、42 个链接渲染正常，无控制台错误 |
| 数据表页 | [source/tables.html](source/tables.html) | 通过。DataTable 挂载成功，1 张数据表与分页/搜索控件可浏览，无控制台错误 |
| 认证页 | [source/login.html](source/login.html) | 通过。居中登录卡片、图标输入框与登录/注册/忘记密码路径完整，无控制台错误 |
| 工具类页 | [source/utilities-color.html](source/utilities-color.html) | 通过。4 张卡片中的背景、文字、渐变色样例完整显示，无控制台错误 |

## 建议阅读顺序

1. `index.html`：看信息层级、KPI 数字卡与两栏图表的版式节奏。
2. `cards.html`：看卡片折叠、头部/底部结构、留白与组件状态。
3. `tables.html`：看密集信息的表格密度、搜索/分页位置和工具栏组织。
4. `utilities-color.html` + `utilities-other.html`：看设计令牌如何被文档化为可用规则。
5. `login.html` / `register.html` / `404.html`：看系统在非仪表盘场景下如何保持品牌与布局一致性。

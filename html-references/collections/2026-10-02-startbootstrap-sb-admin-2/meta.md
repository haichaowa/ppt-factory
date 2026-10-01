# SB Admin 2 · 归档元数据

## 基本信息

- **收录日期**：2026-10-02（Asia/Shanghai）
- **名称**：SB Admin 2
- **来源 URL**：https://github.com/StartBootstrap/startbootstrap-sb-admin-2
- **官方产品页**：https://startbootstrap.com/theme/sb-admin-2/
- **作者/署名**：Start Bootstrap LLC；David Miller（`README.md` 的 About 与 Copyright and License 章节、`package.json` contributors 均完整保留）
- **版本**：4.1.4（`package.json`）
- **commit**：`f0309881ef82794a1bd6257cd321801bc38a0f3d`（master，浅克隆 HEAD）
- **下载方式**：`git clone --depth 1 https://github.com/StartBootstrap/startbootstrap-sb-admin-2.git`
- **下载范围**：完整 Git 浅克隆；记录 HEAD 后移除 `.git` 管理元数据以冻结源码快照；未安装依赖，未执行构建，未修改 `source/` 任何文件；仓库内未包含 `node_modules`
- **源码体积**：有效源码 1,878 个文件、18,153,426 bytes（约 17.31 MiB）；浅克隆刚完成、尚含 `.git` 时工作区约 28 MiB。远端 GitHub size 报告 29,395 KB
- **本地路径**：`collections/2026-10-02-startbootstrap-sb-admin-2/source/`

## 许可证

- **许可证类型**：MIT License
- **原文位置**：本地 `source/LICENSE`
- **原文链接**：https://raw.githubusercontent.com/StartBootstrap/startbootstrap-sb-admin-2/master/LICENSE
- **版权声明**：Copyright (c) 2013-2021 Start Bootstrap LLC
- **合规判断**：MIT 允许本地留存、学习、修改和再分发；本目录仅作本地学习归档，不删除、不遮蔽原许可证与作者署名。

## 收录前复核

| 标准 | 结论 | 证据 |
|---|---|---|
| 成体系 | 通过 | 14 个 HTML 页面，覆盖仪表盘、卡片、按钮、图表、表格、认证页与 4 类工具类演示；SCSS 按 nav/card/utilities 等分层 |
| 专业质量 | 通过 | Bootstrap 4.6 基础上的完整后台系统：固定侧栏/顶栏、KPI 卡、图表、数据表、认证流程与响应式布局均成型 |
| 可运行 | 通过 | 静态 HTML + 已提交的 vendor 资源；本地 HTTP 服务器零构建即可浏览 |
| 体量 <200MB | 通过 | 有效源码 17.31 MiB，无 `node_modules` 或新生成构建产物 |
| 许可证清晰 | 通过 | 仓库根目录 MIT 原文与作者署名完整保留 |

## 快照完整性

- 校验文件：`download-manifest.json`
- 有效源码：1,878 个文件、18,153,426 bytes
- 源码树 SHA-256：`6254b19dbbd5e51a98872c7e9f5221f21670fe85485cb4319a09c6748e3c8d00`
- 14 个顶层 HTML 页面均逐文件记录 SHA-256；manifest 采用相对路径排序，可复算。
- 快照中无 `node_modules/`、顶层 `dist/`、顶层 `build/` 或 `.git/`。`vendor/` 中已有 minified 文件为上游包原始内容，非本轮生成。

## 内嵌第三方许可与署名

- Bootstrap 4.6.0：文件头 MIT 声明，保留在 `vendor/bootstrap/js/*.js`。
- Chart.js 2.9.4：文件头 MIT 声明，保留在 `vendor/chart.js/*.js`。
- DataTables 1.10.24：`vendor/datatables/jquery.dataTables.js` 文件头保留 SpryMedia 版权与 MIT license 链接。
- jQuery 3.6.0：文件头保留 OpenJS Foundation 版权与 MIT license 链接。
- jQuery Easing 1.4.1：文件头保留 George McGinley Smith 版权与 BSD License 链接。
- Font Awesome Free 5.15.3：`vendor/fontawesome-free/LICENSE.txt` 完整保留，声明 Icons CC BY 4.0 / Fonts SIL OFL 1.1 / Code MIT。

## 真人验收清单

- [ ] 打开 `index.html`，确认两张 collection 卡片视觉节奏正常。
- [ ] 打开 `source/index.html`，目检 KPI 卡、面积图、环形图与项目进度是否完整。
- [ ] 打开 `source/cards.html`，试点击卡头下拉与折叠，确认状态图标方向。
- [ ] 打开 `source/tables.html`，试搜索、排序与翻页。
- [ ] 断网后重新打开 `source/login.html`，确认可接受远程背景缺失的系统回退。
- [ ] 阅读 `notes.md` 第 8 节，决定是否试装 `--sb-*` token 草案。

## 运行时外部资源

- **字体**：14 个页面均通过 Google Fonts 加载 Nunito；离线时使用系统 sans-serif 回退，布局仍可浏览，但品牌字形会变化。
- **认证/头像图片**：`source.scss/_login.scss` 与页面头像引用 `source.unsplash.com` 的 4 个唯一 URL；离线时左侧认证背景与远程头像会缺失，本地 SVG 插画和 Font Awesome 不受影响。
- **外部链接**：升级到 Pro、UnDraw、Bootstrap/Chart.js/DataTables 文档链接只在点击时访问，不影响本地渲染。
- **favicon**：源码未提供 favicon，本地 HTTP 打开 Dashboard 时会出现一次 404；这是上游模板状态，未修改源码。

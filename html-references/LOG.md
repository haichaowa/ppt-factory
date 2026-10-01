# HTML 范例搜集日志

## 2026-09-30 · HTML5 UP

### 采纳

- **HTML5 UP 官方站**：44 套模板、110 个页面、CC BY 3.0、官方 ZIP 快照。通过复核：许可证允许本地留存，体系完整，专业质量稳定，源码约 150.5MB，零构建可浏览。
- 产出：`collections/2026-09-30-html5up/`。

### 考察但未采用

| 候选 | 考察结果 | 淘汰原因 |
|---|---|---|
| `zce/html5up` GitHub 镜像 | 46 个模板目录，2020-09-12 commit，仓库约 88MB。 | 非官方快照且版本偏旧；`ethereal/` 缺 `LICENSE.txt` 与主要 assets，不能证明 44/44 版权与完整性均保留。 |
| `World-of-Templates/HTML5Up-Free-Templates` | 45 个目录，仓库约 182MB。 | 未保留逐模板 `LICENSE.txt`，且包含 `zSupportImages/` 等非源码支持资产；许可与完整性证据不足。 |
| Wayback CDX 官方 ZIP 快照 | 已确认存在 44 个 `application/x-zip` 归档记录。 | 仅作为官方端点临时 429 时的备选；后续官方下载恢复，未采用混合快照，保证来源一致性。 |

### 过程记录

- 官方下载初期连续触发 429，等待后恢复；最终 44/44 均来自 `https://html5up.net/<slug>/download`。
- 每个 ZIP 均通过 Python `zipfile` 完整性校验，解压后确认 `index.html`、`LICENSE.txt`、`README.txt` 均存在。
- 未发现 `node_modules/`、`dist/`、`build/`、`.git/`。

### 来源选择结论

官方端点恢复后，最终来源统一采用 `html5up.net/<slug>/download`，未混用 GitHub 镜像或 Wayback 快照。这样可以保证 44 套模板的下载方式、许可文本和作者署名来自同一权威来源，也让 `download-manifest.json` 的 SHA-256 具有一致解释。

### 交付前检查

- [x] 44/44 官方 ZIP SHA-256 对账
- [x] 44/44 `LICENSE.txt` 与 `README.txt`
- [x] 110 个顶层页面清单
- [x] 6 张代表截图与源码页面一一对应
- [x] 15 个 PPT Factory pattern 全部映射
- [x] 导览页 0 error / 0 warning，1440/900/560/390px 无横向溢出
- [x] 3 轮复审记录与修复提交
- [ ] 真人目检导览页与截图视觉效果
- [ ] 产品侧决定是否试装建议 token

## 2026-10-02 · SB Admin 2

### 采纳

- **StartBootstrap/startbootstrap-sb-admin-2**：14 个 HTML 页面、MIT、版本 4.1.4、commit `f0309881ef82794a1bd6257cd321801bc38a0f3d`、有效源码 17.31 MiB。通过复核：许可证清晰，后台体系完整，专业质量稳定，静态源码可浏览，体积远低于 200MB。
- 下载方式：GitHub 浅克隆；保留原 `LICENSE`、`README.md`、作者署名与 vendor 版权头；未安装依赖、未执行构建、未修改 `source/`。
- 产出：`collections/2026-10-02-startbootstrap-sb-admin-2/`；源码树 SHA-256 `6254b19dbbd5e51a98872c7e9f5221f21670fe85485cb4319a09c6748e3c8d00`。

### 考察但未采用

本轮只复核了队列最上方候选并采纳，没有为了凑数继续下载后续项。无候选因许可、体系或质量被淘汰。

### 过程记录

- 本地 HTTP + 无头 Chromium 验证 Dashboard、Cards、Tables、Login、Color Utilities 均可浏览；唯一页面级控制台错误为 Dashboard 缺省 `favicon.ico` 404，不影响功能。
- 截图时 `charts.html` 出现 Chart.js 2 弃用提示，`login.html` 出现 autocomplete 建议，均不阻塞浏览，已记录。
- `index.html` 在 1440/900/560/390px 下均无横向溢出，两张缩略图均正常加载，0 error / 0 warning。
- 已明确限制：Nunito 与认证页背景为外部资源；Bootstrap 4/jQuery/Chart.js 2 技术栈偏旧，只借鉴体系，不建议直接复制到 PPT Factory。

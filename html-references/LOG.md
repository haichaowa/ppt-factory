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

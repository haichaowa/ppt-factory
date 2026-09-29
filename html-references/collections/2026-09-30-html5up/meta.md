# HTML5 UP · 体系化响应式模板集合

## 收录结论

**收录：达标。** 本轮从 HTML5 UP 官方站完整收录 44 套响应式 HTML/CSS 模板，共 110 个顶层 HTML 页面。该集合远超“≥3 页面或 ≥10 组件”的体系化门槛，且同一作者、同一组件谱系、同一响应式策略，适合作为多场景版式参考库。

- **来源首页**：<https://html5up.net/>
- **官方许可页**：<https://html5up.net/license>
- **许可证原文**：Creative Commons Attribution 3.0 Unported，官方页面与每个模板包内 `LICENSE.txt` 均保留原文；协议链接：<http://creativecommons.org/licenses/by/3.0/>
- **许可判断**：允许个人与商业使用、允许修改；条件是保留 HTML5 UP / @ajlkn 署名。满足本地留存与学习归档要求。
- **作者署名**：每个模板的 `README.txt` 均保留 `by HTML5 UP`、`html5up.net`、`@ajlkn` 及第三方依赖致谢；`LICENSE.txt` 44/44 完整保留。
- **下载日期**：2026-09-30（Asia/Shanghai）
- **版本 / 校验**：HTML5 UP 官方 ZIP 不暴露 VCS commit 或语义化版本；本轮以每个原始 ZIP 的 SHA-256 作为快照指纹，完整记录在 [`download-manifest.json`](download-manifest.json)。
- **源码体积**：150,470,994 bytes（约 150.5 MB），2,438 个文件，44 个模板目录，低于 200MB 红线。
- **下载方式**：逐个请求官方下载端点 `https://html5up.net/<slug>/download`，校验 ZIP 完整性后原样解压到 `source/<slug>/`；未修改源码。
- **排除项**：本地检查未发现 `node_modules/`、`dist/`、`build/`、`.git/`。

## 完整性复核结果

| 检查项 | 结果 |
|---|---|
| Manifest 条目 / 唯一 slug | 44 / 44 |
| 原始 ZIP SHA-256 复核 | 44/44 匹配 `download-manifest.json` |
| `index.html` / `LICENSE.txt` / `README.txt` | 44/44、44/44、44/44 |
| 顶层 HTML 页面 | 110 |
| 源码文件数 | 2,438 |
| 源码字节数 | 150,470,994 bytes（约 143.48 MiB / 150.47 MB） |
| `node_modules` / `dist` / `build` / `.git` | 0 |

## 本地结构

```text
source/<template-slug>/
├── index.html
├── *.html              # 模板自带页面
├── LICENSE.txt
├── README.txt
└── assets/             # CSS/JS/字体/图片等原包资源
```

## 快照复核

| 复核项 | 结果 |
|---|---|
| 许可证允许本地留存 | 通过：CC BY 3.0 |
| 成体系 | 通过：44 套模板 / 110 页 |
| 专业质量 | 通过：响应式、组件、版式和主题语汇一致 |
| 源码体积 | 通过：约 150.5 MB |
| 版权与署名 | 通过：44/44 保留 LICENSE 与 README |
| 可浏览 | 通过：零构建，本地静态服务器可直接打开 |

## 可复现校验

```bash
python3 - <<'PY'
import json, hashlib
from pathlib import Path
m = json.loads(Path("download-manifest.json").read_text())
assert len(m["entries"]) == 44
assert len({e["slug"] for e in m["entries"]}) == 44
for e in m["entries"]:
    assert (Path("source") / e["slug"] / "LICENSE.txt").is_file()
    assert (Path("source") / e["slug"] / "README.txt").is_file()
print("manifest and attribution files verified")
PY
```

原始 ZIP 的 SHA-256 复核需要在下载现场保留的 ZIP 文件上执行；本轮已在复审中完成 44/44 对账。

## 真人验收清单

- [ ] 打开 `../index.html`，确认导览页视觉、中文排版和链接层级符合预期。
- [ ] 依次打开 6 张截图对应页面，确认没有资源缺失或明显错位。
- [ ] 抽查 `source/massively/elements.html` 的按钮、表单、表格与代码块。
- [ ] 抽查 `source/forty/landing.html` 的图文交替与 CTA 层级。
- [ ] 阅读 `notes.md` 第 8 节，决定是否进入主题 token / pattern 试装。
- [ ] 若未来公开引用该参考库，确认继续保留 CC BY 3.0 与 HTML5 UP 署名。

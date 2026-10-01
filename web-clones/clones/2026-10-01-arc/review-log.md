# Arc 归档复审记录

## Round 1 · 2026-10-01

**结论：通过（发现 7 处资料完整性 / 命名 / 验证问题，已修复）**

1. `capture-design-evidence.js` 中 text leaf 过滤表达式优先级错误，导致两档实测文本样式数均为 0；已改为 `(innerText || '').trim() !== ''` 并复测，1440 / 375 分别补齐 46 / 41 个文本节点。
2. `design-evidence.json` 原先把 media condition 数组命名为 `keyframes`，容易把 1 条媒体条件误读为关键帧；已拆分为 `cssMediaConditions` 与真实 `keyframes` 名称，两个口径均为 1。
3. 第五个区块实际捕获的是 Footer CTA，原文件名与评价错误包含 privacy；已更名为 `05-footer-cta.png`，同步修正截图脚本、manifest 与 `sections/README.md`。
4. 新增 `mhtml-manifest.py/.json`，逐 part 记录 Content-Location、类型、大小与 SHA256；确认 14 parts、4,097,083 bytes、9 个 arc.net 资源与 5 个 CID 资源。
5. 新增 `security-scan.py/.json`，扫描 33 个非生成 JSON / 扫描器源文件，未发现 Set-Cookie、Authorization/Bearer、OAuth token、私钥、AWS key 或 OpenAI key。
6. 新增 `rights-inventory.py/.json`，明确 MHTML 与补充资源域名、第三方权利保留，以及不二次分发、不商用、不作训练素材的口径。
7. 新增 `file-inventory.py/.json` 与 `offline-fidelity.json`，分别覆盖 63 个交付文件、30,071,295 bytes，以及 MHTML/live 首屏 exact 65.89%、MAE 30.98 的动态保真差异。

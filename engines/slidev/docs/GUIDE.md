# 实操指南：从零到发布

## 0. 前置要求

- Node.js ≥ 22.12.0（`node -v` 检查）
- 本创作台已统一安装依赖：`npm install`（只需一次）

## 1. 创建一个新 deck

```bash
npm run new -- my-talk              # 默认用 cn-default 模板
npm run new -- my-talk cn-seriph    # 指定模板
npm run ls                          # 查看全部模板与已有 deck
```

生成 `decks/my-talk/`（slides.md + style.css + README.md）。

## 2. 写作与预览

```bash
npm run dev -- decks/my-talk/slides.md
```

- 自动打开 http://localhost:3030，保存即热更新
- 网页内直接切换「编辑器 / 演示」两种视图
- 快捷键：`←→` 翻页、`d` 切换暗色、`o` 总览网格、`f` 全屏

## 3. 排练（演讲者模式）

- 另开窗口访问 `http://localhost:3030/presenter`
- 双屏：观众看主窗口，你看备注 + 下一页 + 计时
- 手机控制：presenter 页扫二维码，手机翻页
- **AI 协作加分项**：v53 起 dev server 自带 MCP 端点（`/__mcp`），AI 代理可直接检查和编辑幻灯片
- 每页末尾写 HTML 注释即为演讲备注：`<!-- 这里是备注 -->`

## 4. 导出交付物

```bash
# PDF（推荐，正式场合首选）
npm run export -- decks/my-talk/slides.md

# PPTX（⚠️ 每页是整张图片，文字不可选中；演讲备注会带入）
npm run export:pptx -- decks/my-talk/slides.md

# 暗色版本
npm run export:dark -- decks/my-talk/slides.md
```

常用参数：

| 参数 | 作用 |
| --- | --- |
| `--with-clicks` | 把分步动画导出成多页 |
| `--range 1,3-5` | 只导出部分页 |
| `--output 名字` | 指定输出文件名 |
| `--timeout 60000` | 大演示防超时 |
| `--wait 10000` | 等待异步内容渲染 |

> 导出依赖 playwright-chromium，本创作台已内置；本机已有 Chromium 缓存。

## 5. 构建网页版并部署

```bash
npm run build -- decks/my-talk/slides.md
# 产物在 decks/my-talk/dist/，任何静态托管都能用
```

| 平台 | 做法 |
| --- | --- |
| Vercel / Netlify | 指定构建命令 `npm run build -- decks/my-talk/slides.md`，输出目录 `decks/my-talk/dist` |
| GitHub Pages | 子路径部署需加 `--base=/<仓库名>/`，并放一个空 `.nojekyll` |
| 自托管 | dist 目录丢给任意静态服务器 / nginx |

网页版保留全部交互（动画、演讲者模式、画笔），是分享链接的最佳形态。

## 6. 建议的做事流程

1. `npm run new --` 建 deck，选合适模板
2. 先改 frontmatter 的 `title`，再删掉示例页，搭出**空大纲**（一页一行）
3. 填内容：一页一观点，正文少字，细节进演讲备注
4. `dev` 边写边预览，重点检查代码块与图表是否溢出
5. presenter 模式完整排练一遍
6. `export` 出 PDF 作为交付快照，`build` 出网页版作为分享链接
7. 整个 deck 目录 git 提交归档

## 7. 常见问题

**Q: 中文显示不对 / 想换字体？**
改该 deck 的 `style.css`。模板已内置 macOS（PingFang SC）与 Windows（Microsoft YaHei）回退栈。要更有个性的字体可引入 webfont（注意文件体积，中文字体建议子集化）。

**Q: 导出 PDF 超时 / 白页？**
加 `--timeout 60000`；页面有异步内容再加 `--wait 5000`。

**Q: 想加新主题？**
`npm i slidev-theme-xxx`，然后 slides.md 头部改 `theme: xxx`。全部可用主题见 docs/RESOURCES.md。

**Q: 想加插件（二维码、手绘、Python 运行）？**
`npm i slidev-addon-xxx` + frontmatter `addons:` 列表。见 docs/RESOURCES.md 第四节。

**Q: 和 PPT Factory 主系统什么关系？**
本引擎是「应用型」车间：强交互、代码演示、演讲者模式；
根目录 HTML 系统是「冻结快照型」车间：零依赖单文件 HTML。按场合选型。

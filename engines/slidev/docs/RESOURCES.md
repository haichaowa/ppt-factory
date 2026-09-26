# Slidev 生态资源大全

> 调研时间：2026-09-26 · 当前 @slidev/cli 最新版 v53.0.0 · 全部链接经可用性验证

## 一、官方核心资源

| 资源 | 地址 | 说明 |
| --- | --- | --- |
| 主仓库 | https://github.com/slidevjs/slidev | 48.8k stars，Anthony Fu 出品 |
| 官方文档 | https://sli.dev | 语法 / 自定义 / 部署全指南 |
| 中文文档 | https://cn.sli.dev | 官方中文翻译 |
| 在线试用 | https://sli.dev/new | StackBlitz 免安装体验 |
| 主题画廊 | https://sli.dev/resources/theme-gallery | 官方 + 社区策展主题，带预览截图 |
| npm 主题搜索 | https://www.npmjs.com/search?q=keywords%3Aslidev-theme | 全部社区主题 |
| Discord | https://chat.sli.dev | 官方社区 |
| 官方示例 deck | https://github.com/slidevjs/slidev/tree/main/demo | Anthony Fu 演讲源码，最佳学习样本 |
| 免费封面图 | https://cover.sli.dev | Unsplash 精选，1920×1080 webp |
| Docker 镜像 | https://hub.docker.com/r/tangramor/slidev | 免装环境，`playwright` tag 支持导出 |

## 二、官方主题（5 个）

| 包名 | 风格 | 标签 |
| --- | --- | --- |
| @slidev/theme-default | 极简默认 | 暗/亮 |
| @slidev/theme-seriph | 衬线字体，正式优雅 | 暗/亮 |
| @slidev/theme-apple-basic | Apple Keynote 黑白基础款 | 暗/亮 |
| @slidev/theme-bricks | 积木砖块风 | 亮 |
| @slidev/theme-shibainu | 柴犬插画风 | 暗 |

## 三、社区精选主题（官方画廊策展）

| 主题包 | 特点 |
| --- | --- |
| slidev-theme-geist | Vercel 设计系统风，极简黑白 |
| slidev-theme-takahashi | 高桥流大字报，一页一词 |
| slidev-theme-academic | 学术演示 |
| slidev-theme-frankfurt | Beamer Frankfurt 风（LaTeX 学术感） |
| slidev-theme-dracula | Dracula 紫粉暗色 |
| slidev-theme-light-icons | 轻盈图标 + 丰富布局 |
| slidev-theme-eloc | 极简写作风 |
| slidev-theme-unicorn | 渐变梦幻 |
| slidev-theme-penguin | 圆润企鹅插画风 |
| slidev-theme-vuetiful | Vue 官方生态风 |
| slidev-theme-excali-slide | Excalidraw 手绘 + 荧光笔动画 |
| slidev-theme-nord | Nord 配色 |
| slidev-theme-hep | 高能物理学术风 |
| slidev-theme-the-unnamed | Elio Struyf 的 VS Code 主题同款 |
| slidev-theme-zhozhoba / purplin / mokkapps | 个人品牌向 |

安装用法：`npm i slidev-theme-geist` → slides.md 头部 `theme: geist`。

## 四、Add-on 插件生态

| 插件 | 能力 |
| --- | --- |
| slidev-addon-studio | ⭐ 可视化编辑器：画布上拖拽排版，产物仍是 Markdown |
| slidev-addon-fancy-arrow | 花式箭头标注 |
| slidev-addon-excalidraw | 手绘风图表 |
| slidev-addon-qrcode | 二维码组件（结尾页放联系方式） |
| slidev-addon-python-runner | 幻灯片内跑 Python |
| slidev-addon-livecode | 嵌入在线 VS Code |
| slidev-addon-liveshell | 真实终端会话 |
| slidev-addon-asciinema | 嵌入终端录制 |
| slidev-addon-citations | 学术引用 / 参考文献 |
| slidev-addon-animattr | data 属性驱动的元素动画 |
| slidev-addon-naive / prime | 引入 Naive UI / PrimeVue 组件库 |

用法：`npm i <包名>` → frontmatter `addons:` 列表加入。

## 五、高质量模板仓库

| 仓库 | 说明 |
| --- | --- |
| https://github.com/LittleSound/talks-template | ⭐217 演讲模板，开箱即用 |
| https://github.com/iridite/slidev-templates | ⭐74 中文，收录高质量模板 |
| https://github.com/godkun/ppt-template | ⭐27 blazing PPT 模板 |
| https://github.com/kxxt/slidev-template-repo | GitHub Pages 自动部署 |
| https://github.com/imageslr/slidev-bytedance | 字节风 PPT 模板（中文） |
| https://github.com/zcag/tahta | 一行切换整套视觉的设计系统 |
| https://github.com/espressif/slidev-esp-template | 乐鑫官方模板 |

## 六、周边工具

| 工具 | 说明 |
| --- | --- |
| prettier-plugin-slidev | 官方 Prettier 插件，格式化 slides.md |
| slidev-covers | 封面图库（cover.sli.dev 背后） |
| tangramor/slidev_docker | Docker 化运行与导出 |
| slidev-addon-studio | 见上，值得单独强调 |

> ⚠️ 官方 VS Code 扩展（slidevjs/slidev-vscode）已归档停止维护。
> 用 Slidev 内置网页编辑器（localhost:3030 左栏 Markdown 右栏预览）即可。

## 七、技术栈速览

Markdown + Vue 3 + Vite + UnoCSS + Shiki + Monaco + Mermaid + KaTeX + Iconify + RecordRTC。
本质：一个由 Markdown 驱动的 Vite 项目，可随意塞 Vue 组件和 npm 包。

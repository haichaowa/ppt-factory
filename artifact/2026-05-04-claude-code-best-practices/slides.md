---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Claude Code 最佳实践
exportFilename: claude-code-best-practices
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 150
routerMode: hash
fonts:
  sans: 'DM Sans'
  mono: 'Fira Code'
---

<div flex flex-col items-center>

# Claude Code 最佳实践

<div mt-4 class="text-lg opacity-60">
从配置环境到并行扩展，掌握代理式编码的核心模式
</div>

</div>

---
class: py-10
glowSeed: 200
---

## 内容概览

<div grid grid-cols-2 gap-4 mt-8>

<div border="2 solid violet-800/50" rounded-lg bg="violet-900/10" px-4 py-3>
  <div text-sm font-bold text-violet-300>认知基础</div>
  <div class="text-xs opacity-70">理解 Context Window 核心约束</div>
</div>

<div border="2 solid blue-800/50" rounded-lg bg="blue-900/10" px-4 py-3>
  <div text-sm font-bold text-blue-300>工作流优化</div>
  <div class="text-xs opacity-70">验证驱动 + 四阶段流程</div>
</div>

<div border="2 solid green-800/50" rounded-lg bg="green-900/10" px-4 py-3>
  <div text-sm font-bold text-green-300>提示工程</div>
  <div class="text-xs opacity-70">精准指令与丰富上下文</div>
</div>

<div border="2 solid amber-800/50" rounded-lg bg="amber-900/10" px-4 py-3>
  <div text-sm font-bold text-amber-300>环境配置</div>
  <div class="text-xs opacity-70">CLAUDE.md 与六大扩展机制</div>
</div>

<div border="2 solid teal-800/50" rounded-lg bg="teal-900/10" px-4 py-3>
  <div text-sm font-bold text-teal-300>会话管理</div>
  <div class="text-xs opacity-70">Context 压缩与检查点回溯</div>
</div>

<div border="2 solid rose-800/50" rounded-lg bg="rose-900/10" px-4 py-3>
  <div text-sm font-bold text-rose-300>自动化扩展</div>
  <div class="text-xs opacity-70">并行会话与扇出模式</div>
</div>

</div>

---
layout: section
glowSeed: 250
---

# 01

认知基础

<div class="text-sm opacity-50">理解 Claude Code 的工作边界</div>

---
class: py-10
clicks: 2
glow: right
glowSeed: 300
---

## 不是聊天机器人，是代理

<div grid grid-cols-2 gap-8 mt-8>

<div
  v-click="1"
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-orange-500/30 rounded-lg p-5 bg-orange-500/10"
>
  <div text-lg font-bold mb-3 text-orange-300>传统方式</div>
  <div text-sm>你写代码，让 AI 审查</div>
  <div class="text-xs opacity-60 mt-2">人驱动，AI 辅助</div>
</div>

<div
  v-click="2"
  transition duration-500 ease-in-out
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
>
  <div text-lg font-bold mb-3 text-green-300>Claude Code</div>
  <div text-sm>你描述需求，Claude 探索、规划、实现</div>
  <div class="text-xs opacity-60 mt-2">人指导，AI 执行</div>
</div>

</div>

---
class: py-10
glow: right
glowSeed: 350
---

## Context Window 是最珍贵的资源

<div mt-8 flex flex-col gap-6>

<div flex items-center gap-4>
  <div w-10 h-10 rounded-full bg="violet-800/30" flex items-center justify-center text-violet-300 text-lg>1</div>
  <div flex-1>
    <div font-bold>保存全部对话、文件和命令输出</div>
    <div class="text-xs opacity-60">单次调试可能消耗数万 token</div>
  </div>
</div>

<div flex items-center gap-4>
  <div w-10 h-10 rounded-full bg="blue-800/30" flex items-center justify-center text-blue-300 text-lg>2</div>
  <div flex-1>
    <div font-bold>Context 填满时性能显著下降</div>
    <div class="text-xs opacity-60">Claude 开始"遗忘"早期指令，犯更多错误</div>
  </div>
</div>

<div flex items-center gap-4>
  <div w-10 h-10 rounded-full bg="green-800/30" flex items-center justify-center text-green-300 text-lg>3</div>
  <div flex-1>
    <div font-bold>几乎所有最佳实践都源于此约束</div>
    <div class="text-xs opacity-60">使用自定义状态行持续追踪 Context 使用量</div>
  </div>
</div>

</div>

---
layout: section
glowSeed: 400
---

# 02

工作流优化

<div class="text-sm opacity-50">验证驱动 + 结构化流程</div>

---
layout: center
glowSeed: 450
---

<div flex flex-col items-center>

<div text-6xl font-bold text-center>给 Claude 一种<br>验证其工作的方式</div>

<div mt-6 class="text-lg opacity-60 text-center">
提供测试、截图或预期输出<br>这是你能做的最高杠杆的事情
</div>

<div mt-8 class="text-xs opacity-40">
没有验证标准 → 你成为唯一的反馈循环 → 每个错误都需要你的关注
</div>

</div>

---
class: py-10
glowSeed: 500
---

## 验证策略对比

<div mt-6 />

| 策略 | 之前 | 之后 |
|------|------|------|
| **提供验证标准** | "实现一个验证邮箱的函数" | "写 validateEmail，含测试用例，实现后运行测试" |
| **视觉验证 UI** | "让仪表盘看起来更好" | "按截图实现设计，截图对比差异并修复" |
| **根因分析** | "构建失败" | "粘贴错误日志，修复并验证构建成功，解决根因" |

<div mt-6 class="text-xs opacity-50">
验证可以是测试套件、linter、截图对比或 Bash 命令 —— 投资使你的验证非常可靠
</div>

---
class: py-10
clicks: 4
glowSeed: 550
---

## 探索 → 规划 → 编码 → 提交

<span class="text-sm opacity-70">推荐的四阶段工作流</span>

<div mt-8 />

<div flex items-center gap-4>

<v-clicks>

<div
  rounded-lg border="2 solid violet-900" bg="violet-900/20"
  backdrop-blur flex-1 transition duration-500 ease-in-out
>
  <div px-4 py-6 flex items-center justify-center>
    <div i-carbon:search text-4xl />
  </div>
  <div bg="violet-900/30" w-full px-4 py-2 flex items-center justify-center text-center>
    <div text-xs font-bold>探索</div>
    <div class="text-xs opacity-60">Plan Mode 只读</div>
  </div>
</div>

<div text-2xl class="opacity-30">→</div>

<div
  rounded-lg border="2 solid blue-800" bg="blue-800/20"
  backdrop-blur flex-1 transition duration-500 ease-in-out
>
  <div px-4 py-6 flex items-center justify-center>
    <div i-carbon:document text-4xl />
  </div>
  <div bg="blue-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
    <div text-xs font-bold>规划</div>
    <div class="text-xs opacity-60">制定实现方案</div>
  </div>
</div>

<div text-2xl class="opacity-30">→</div>

<div
  rounded-lg border="2 solid green-800" bg="green-800/20"
  backdrop-blur flex-1 transition duration-500 ease-in-out
>
  <div px-4 py-6 flex items-center justify-center>
    <div i-carbon:code text-4xl />
  </div>
  <div bg="green-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
    <div text-xs font-bold>实现</div>
    <div class="text-xs opacity-60">按计划编码验证</div>
  </div>
</div>

<div text-2xl class="opacity-30">→</div>

<div
  rounded-lg border="2 solid amber-800" bg="amber-800/20"
  backdrop-blur flex-1 transition duration-500 ease-in-out
>
  <div px-4 py-6 flex items-center justify-center>
    <div i-carbon:checkmark text-4xl />
  </div>
  <div bg="amber-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
    <div text-xs font-bold>提交</div>
    <div class="text-xs opacity-60">commit + PR</div>
  </div>
</div>

</v-clicks>

</div>

<div mt-4 class="text-xs opacity-40">
能用一句话描述 diff 的简单任务，跳过规划直接执行
</div>

---
layout: section
glowSeed: 600
---

# 03

提示工程

<div class="text-sm opacity-50">指令越精确，修正越少</div>

---
class: py-10
clicks: 4
glow: right
glowSeed: 650
---

## 四种精准提示策略

<div grid grid-cols-2 gap-4 mt-8>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:aim-area text-sm mr-2 />
    <div font-semibold>限定范围</div>
  </div>
  <div bg="violet-900/5" px-4 py-3>
    <div text-sm>指定哪个文件、什么场景、测试偏好</div>
    <div class="text-xs opacity-60">"为 foo.py 写测试，覆盖注销边界，避免 mock"</div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg overflow-hidden bg="blue-900/10" backdrop-blur-sm>
  <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
    <div i-carbon:source-code text-sm mr-2 />
    <div font-semibold>指向来源</div>
  </div>
  <div bg="blue-900/5" px-4 py-3>
    <div text-sm>引导 Claude 到能回答问题的位置</div>
    <div class="text-xs opacity-60">"查看 git 历史总结 API 是如何形成的"</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
    <div i-carbon:copy text-sm mr-2 />
    <div font-semibold>参考模式</div>
  </div>
  <div bg="green-900/5" px-4 py-3>
    <div text-sm>指向代码库中的现有实现</div>
    <div class="text-xs opacity-60">"看 HotDogWidget.php 的模式，按此实现日历组件"</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-carbon:stethoscope text-sm mr-2 />
    <div font-semibold>描述症状</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div text-sm>提供症状、位置和"修复"的定义</div>
    <div class="text-xs opacity-60">"会话超时后登录失败，检查 token 刷新"</div>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
clicks: 5
glowSeed: 700
---

## 丰富的上下文输入

<div mt-6 flex flex-col gap-4>

<v-clicks>

<div flex gap-4 border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-violet-300>@ 引用</div>
  </div>
  <div flex-1 text-sm>
    使用 @ 引用文件，Claude 在响应前读取
  </div>
</div>

<div flex gap-4 border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-blue-300>粘贴图像</div>
  </div>
  <div flex-1 text-sm>
    复制/粘贴或拖放图像到提示中
  </div>
</div>

<div flex gap-4 border="2 solid green-800/30" rounded-lg bg="green-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-green-300>提供 URL</div>
  </div>
  <div flex-1 text-sm>
    文档和 API 参考，用 /permissions 允许列表常用域
  </div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>管道数据</div>
  </div>
  <div flex-1 text-sm>
    <span font-mono text-xs>cat error.log | claude</span> 直接发送文件内容
  </div>
</div>

<div flex gap-4 border="2 solid teal-800/30" rounded-lg bg="teal-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-teal-300>自主获取</div>
  </div>
  <div flex-1 text-sm>
    让 Claude 用 Bash、MCP 工具或读取文件自己拉取上下文
  </div>
</div>

</v-clicks>

</div>

---
layout: section
glowSeed: 750
---

# 04

环境配置

<div class="text-sm opacity-50">一次配置，所有会话受益</div>

---
class: py-10
glow: right
glowSeed: 800
---

## CLAUDE.md — 项目的持久记忆

<div mt-8 flex flex-col gap-5>

<div flex items-start gap-4>
  <div i-carbon:document-import text-xl text-violet-400 mt-1 />
  <div>
    <div font-bold>每次对话自动加载</div>
    <div class="text-xs opacity-60">提供 Claude 无法从代码推断的持久上下文</div>
  </div>
</div>

<div flex items-start gap-4>
  <div i-carbon:restart text-xl text-blue-400 mt-1 />
  <div>
    <div font-bold>运行 /init 生成基础版本</div>
    <div class="text-xs opacity-60">检测构建系统、测试框架和代码模式</div>
  </div>
</div>

<div flex items-start gap-4>
  <div i-carbon:clean text-xl text-green-400 mt-1 />
  <div>
    <div font-bold>保持简洁</div>
    <div class="text-xs opacity-60">删掉不会导致 Claude 犯错的行 —— 膨胀的 CLAUDE.md 会被忽略</div>
  </div>
</div>

</div>

<div mt-6 class="text-xs opacity-40">
支持 @path/to/import 导入其他文件 · 可在 ~/.claude/ 项目根目录 子目录多层放置
</div>

---
class: py-10
clicks: 2
glowSeed: 850
---

## CLAUDE.md 写什么

<div grid grid-cols-2 gap-8 mt-8>

<div
  v-click="1"
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
>
  <div text-lg font-bold mb-3 text-green-300>✓ 应包括</div>
  <div text-sm flex flex-col gap-2>
    <div>Bash 命令</div>
    <div>非默认代码风格</div>
    <div>测试指令和运行器</div>
    <div>仓库礼仪（分支、PR）</div>
    <div>架构决策</div>
    <div>环境怪癖</div>
    <div>常见陷阱</div>
  </div>
</div>

<div
  v-click="2"
  transition duration-500 ease-in-out
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-orange-500/30 rounded-lg p-5 bg-orange-500/10"
>
  <div text-lg font-bold mb-3 text-orange-300>✗ 不应包括</div>
  <div text-sm flex flex-col gap-2>
    <div>代码可推断的信息</div>
    <div>标准语言约定</div>
    <div>详细 API 文档</div>
    <div>频繁变化的信息</div>
    <div>长篇教程</div>
  </div>
</div>

</div>

---
class: py-10
clicks: 6
glowSeed: 900
---

## 六大扩展机制

<div grid grid-cols-3 gap-4 mt-8>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:locked text-4xl text-violet-400 />
  </div>
  <div bg="violet-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>权限配置</div>
    <div class="text-xs opacity-60">Auto / 允许列表 / 沙箱</div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg overflow-hidden bg="blue-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:terminal text-4xl text-blue-400 />
  </div>
  <div bg="blue-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>CLI 工具</div>
    <div class="text-xs opacity-60">gh / aws / gcloud</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:plug text-4xl text-green-400 />
  </div>
  <div bg="green-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>MCP 服务器</div>
    <div class="text-xs opacity-60">Notion / Figma / DB</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:hook text-4xl text-amber-400 />
  </div>
  <div bg="amber-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>Hooks</div>
    <div class="text-xs opacity-60">确定性自动脚本</div>
  </div>
</div>

<div border="2 solid teal-800/50" rounded-lg overflow-hidden bg="teal-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:skill-level-advanced text-4xl text-teal-400 />
  </div>
  <div bg="teal-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>Skills</div>
    <div class="text-xs opacity-60">域知识与工作流</div>
  </div>
</div>

<div border="2 solid rose-800/50" rounded-lg overflow-hidden bg="rose-900/10" backdrop-blur-sm>
  <div flex items-center justify-center py-6>
    <div i-carbon:group text-4xl text-rose-400 />
  </div>
  <div bg="rose-900/5" px-4 py-3 text-center>
    <div text-sm font-bold>Subagents</div>
    <div class="text-xs opacity-60">独立 context 助手</div>
  </div>
</div>

</v-clicks>

</div>

---
layout: section
glowSeed: 950
---

# 05

会话管理

<div class="text-sm opacity-50">对话是持久的、可逆的</div>

---
class: py-10
glowSeed: 1000
---

## 快速纠正，保持方向

<div mt-8 flex flex-col gap-5>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-violet-300 bg="violet-800/20" px-3 py-1 rounded>Esc</div>
  <div text-sm>中途停止，保留 context 后重定向</div>
</div>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-blue-300 bg="blue-800/20" px-3 py-1 rounded>Esc + Esc</div>
  <div text-sm>打开 rewind 菜单，恢复之前的对话和代码状态</div>
</div>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-green-300 bg="green-800/20" px-3 py-1 rounded>"撤销那个"</div>
  <div text-sm>让 Claude 回退更改</div>
</div>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-amber-300 bg="amber-800/20" px-3 py-1 rounded>/clear</div>
  <div text-sm>不相关任务间重置 context</div>
</div>

</div>

<div mt-6 class="text-xs opacity-40">
同一问题纠正两次以上 → /clear 换更好的提示重新开始
</div>

---
class: py-10
glow: right
glowSeed: 1050
---

## Context 是消耗品，主动管理

<div mt-8 flex flex-col gap-5>

<div flex items-start gap-4>
  <div font-mono text-sm font-bold text-violet-300 bg="violet-800/20" px-3 py-1 rounded>/clear</div>
  <div text-sm>任务间频繁完全重置 context</div>
</div>

<div flex items-start gap-4>
  <div font-mono text-sm font-bold text-blue-300 bg="blue-800/20" px-3 py-1 rounded>自动压缩</div>
  <div text-sm>接近限制时自动保留重要代码和决策</div>
</div>

<div flex items-start gap-4>
  <div font-mono text-sm font-bold text-green-300 bg="green-800/20" px-3 py-1 rounded>/compact</div>
  <div text-sm>
    精确控制压缩重点，如 <span font-mono text-xs>/compact Focus on API changes</span>
  </div>
</div>

<div flex items-start gap-4>
  <div font-mono text-sm font-bold text-amber-300 bg="amber-800/20" px-3 py-1 rounded>/btw</div>
  <div text-sm>快速提问，不进入历史，不消耗 context</div>
</div>

</div>

---
class: py-10
clicks: 2
glowSeed: 1100
---

## Subagent 调查 & 检查点回溯

<div grid grid-cols-2 gap-8 mt-8>

<div
  v-click="1"
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-blue-500/30 rounded-lg p-5 bg-blue-500/10"
>
  <div text-lg font-bold mb-3 text-blue-300>Subagent 调查</div>
  <div text-sm flex flex-col gap-2>
    <div>独立 context 中探索</div>
    <div>主对话保持干净</div>
    <div>实现后也可用 subagent 验证</div>
  </div>
</div>

<div
  v-click="2"
  transition duration-500 ease-in-out
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
>
  <div text-lg font-bold mb-3 text-green-300>检查点回溯</div>
  <div text-sm flex flex-col gap-2>
    <div>每个操作自动创建检查点</div>
    <div>双击 Esc 或 /rewind 恢复</div>
    <div>大胆尝试，不行就回退</div>
  </div>
</div>

</div>

---
class: py-10
glowSeed: 1150
---

## 任务跨会话延续

<div mt-8 flex flex-col gap-5>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-violet-300 bg="violet-800/20" px-3 py-1 rounded>claude --continue</div>
  <div text-sm>继续最近的对话</div>
</div>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-blue-300 bg="blue-800/20" px-3 py-1 rounded>claude --resume</div>
  <div text-sm>从最近会话中选择恢复</div>
</div>

<div flex items-center gap-4>
  <div font-mono text-sm font-bold text-green-300 bg="green-800/20" px-3 py-1 rounded>/rename</div>
  <div text-sm>给会话命名，如 oauth-migration、debugging-memory-leak</div>
</div>

</div>

<div mt-6 class="text-xs opacity-40">
像对待 Git 分支一样对待会话 —— 不同工作流有独立的、持久的 context
</div>

---
layout: section
glowSeed: 1200
---

# 06

自动化与扩展

<div class="text-sm opacity-50">从一个人一个 Claude，到并行会话扇出</div>

---
class: py-10
clicks: 3
glow: right
glowSeed: 1250
---

## 非交互模式

<div grid grid-cols-5 gap-6 mt-6>
<div col-span-3>

```bash
# 一次性查询
claude -p "Explain what this project does"

# 结构化输出
claude -p "List all API endpoints" \
  --output-format json

# 流式处理
claude -p "Analyze this log file" \
  --output-format stream-json
```

</div>
<div col-span-2>

<div
  v-click="1"
  transition duration-300
  :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-violet-500 pl-4 mb-6
>
  <div text-sm font-bold text-violet-300>CI / CD</div>
  <div class="text-xs mt-1">集成到管道自动执行</div>
</div>

<div
  v-click="2"
  transition duration-300
  :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-blue-500 pl-4 mb-6
>
  <div text-sm font-bold text-blue-300>Pre-commit Hooks</div>
  <div class="text-xs mt-1">提交前自动检查</div>
</div>

<div
  v-click="3"
  transition duration-300
  :class="$clicks < 3 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-green-500 pl-4
>
  <div text-sm font-bold text-green-300>批量脚本</div>
  <div class="text-xs mt-1">可编程解析输出结果</div>
</div>

</div>
</div>

---
class: py-10
clicks: 3
glowSeed: 1300
---

## 并行会话的三种方式

<div grid grid-cols-3 gap-6 mt-8>

<div
  v-click="1"
  transition duration-500
  :class="$clicks < 1 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
>
  <div border="2 solid violet-800/50" rounded-lg bg="violet-900/10" px-5 py-6 text-center>
    <div i-carbon:desktop text-4xl text-violet-400 mb-4 />
    <div font-bold text-violet-300>桌面应用</div>
    <div class="text-xs opacity-60 mt-2">可视化管理多个会话</div>
    <div class="text-xs opacity-60">每个独立 worktree</div>
  </div>
</div>

<div
  v-click="2"
  transition duration-500
  :class="$clicks < 2 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
>
  <div border="2 solid blue-800/50" rounded-lg bg="blue-900/10" px-5 py-6 text-center>
    <div i-carbon:cloud text-4xl text-blue-400 mb-4 />
    <div font-bold text-blue-300>Web 版</div>
    <div class="text-xs opacity-60 mt-2">安全云 VM 隔离运行</div>
    <div class="text-xs opacity-60">无需本地环境</div>
  </div>
</div>

<div
  v-click="3"
  transition duration-500
  :class="$clicks < 3 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
>
  <div border="2 solid green-800/50" rounded-lg bg="green-900/10" px-5 py-6 text-center>
    <div i-carbon:group text-4xl text-green-400 mb-4 />
    <div font-bold text-green-300>Agent Teams</div>
    <div class="text-xs opacity-60 mt-2">多会话自动协调</div>
    <div class="text-xs opacity-60">共享任务和消息</div>
  </div>
</div>

</div>

<div mt-6 class="text-xs opacity-40">
新鲜 context 的 Claude 做代码审查更好 —— 它不会偏向自己写的代码
</div>

---
class: py-10
clicks: 2
glowSeed: 1350
---

## 扇出模式 & Auto Mode

<div grid grid-cols-2 gap-8 mt-8>

<div
  v-click="1"
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-violet-500/30 rounded-lg p-5 bg-violet-500/10"
>
  <div text-lg font-bold mb-3 text-violet-300>跨文件扇出</div>
  <div text-sm flex flex-col gap-2>
    <div>1. 生成任务列表</div>
    <div>2. 循环 <span font-mono text-xs>claude -p</span></div>
    <div>3. <span font-mono text-xs>--allowedTools</span> 限定权限</div>
  </div>
  <div class="text-xs opacity-60 mt-3">适用于大型迁移和批量分析</div>
</div>

<div
  v-click="2"
  transition duration-500 ease-in-out
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  class="border-2 border-amber-500/30 rounded-lg p-5 bg-amber-500/10"
>
  <div text-lg font-bold mb-3 text-amber-300>Auto Mode</div>
  <div text-sm flex flex-col gap-2>
    <div>分类器自动审查命令</div>
    <div>阻止范围升级和风险操作</div>
    <div>无人值守时安全运行</div>
  </div>
  <div class="text-xs opacity-60 mt-3">
    <span font-mono text-xs>claude --permission-mode auto</span>
  </div>
</div>

</div>

---
class: py-10
clicks: 5
glowSeed: 1400
---

## 避开五个陷阱

<div mt-8 flex flex-col gap-4>

<div
  v-click="1"
  transition duration-300
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  flex items-center gap-4
>
  <div w-8 h-8 rounded-full bg="orange-800/30" flex items-center justify-center text-orange-300 text-sm font-bold>1</div>
  <div flex-1>
    <span font-bold>会话混杂</span>
    <span class="text-xs opacity-60 ml-2">→</span>
    <span class="text-xs opacity-70">不相关任务间 /clear 重置</span>
  </div>
</div>

<div
  v-click="2"
  transition duration-300
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  flex items-center gap-4
>
  <div w-8 h-8 rounded-full bg="orange-800/30" flex items-center justify-center text-orange-300 text-sm font-bold>2</div>
  <div flex-1>
    <span font-bold>反复纠正失败</span>
    <span class="text-xs opacity-60 ml-2">→</span>
    <span class="text-xs opacity-70">两次后 /clear 换更好的提示</span>
  </div>
</div>

<div
  v-click="3"
  transition duration-300
  :class="$clicks < 3 ? 'opacity-0' : 'opacity-100'"
  flex items-center gap-4
>
  <div w-8 h-8 rounded-full bg="orange-800/30" flex items-center justify-center text-orange-300 text-sm font-bold>3</div>
  <div flex-1>
    <span font-bold>CLAUDE.md 太长</span>
    <span class="text-xs opacity-60 ml-2">→</span>
    <span class="text-xs opacity-70">无情修剪，规则在噪音中丢失</span>
  </div>
</div>

<div
  v-click="4"
  transition duration-300
  :class="$clicks < 4 ? 'opacity-0' : 'opacity-100'"
  flex items-center gap-4
>
  <div w-8 h-8 rounded-full bg="orange-800/30" flex items-center justify-center text-orange-300 text-sm font-bold>4</div>
  <div flex-1>
    <span font-bold>不验证就发布</span>
    <span class="text-xs opacity-60 ml-2">→</span>
    <span class="text-xs opacity-70">始终提供测试、脚本或截图</span>
  </div>
</div>

<div
  v-click="5"
  transition duration-300
  :class="$clicks < 5 ? 'opacity-0' : 'opacity-100'"
  flex items-center gap-4
>
  <div w-8 h-8 rounded-full bg="orange-800/30" flex items-center justify-center text-orange-300 text-sm font-bold>5</div>
  <div flex-1>
    <span font-bold>无限探索</span>
    <span class="text-xs opacity-60 ml-2">→</span>
    <span class="text-xs opacity-70">用 subagent 隔离，限定调查范围</span>
  </div>
</div>

</div>

<div mt-6 class="text-xs opacity-40">
培养直觉 —— 注意什么有效，什么无效，何时具体，何时开放
</div>

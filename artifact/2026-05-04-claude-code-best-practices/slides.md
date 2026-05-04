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
  <div text-5xl font-bold mb-4>Claude Code 最佳实践</div>
  <div text-lg opacity-70 mb-8>从配置环境到跨并行会话扩展</div>
  <div text-sm opacity-40>开发者培训 · 2026</div>
</div>

---
layout: section
glowSeed: 200
---

# 01

认识 Claude Code

---
class: py-10
clicks: 2
glow: right
glowSeed: 220
---

## 代理式编码范式

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-orange-500/30 rounded-lg p-5 bg-orange-500/10"
  >
    <div text-xl font-bold mb-3 text-orange-300>聊天机器人</div>
    <div text-sm>等待你提问</div>
    <div text-sm>需要你粘贴代码</div>
    <div text-sm>只给建议不执行</div>
    <div text-sm mt-2 class="text-orange-400/70">你 → 提问 → 回答</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
  >
    <div text-xl font-bold mb-3 text-green-300>代理式编码</div>
    <div text-sm>读取你的文件</div>
    <div text-sm>运行命令</div>
    <div text-sm>自主解决问题</div>
    <div text-sm mt-2 class="text-green-400/70">你 → 描述目标 → Claude 实现</div>
  </div>
</div>

<!--
Claude Code 不是聊天机器人，而是代理式编码环境。它能读取文件、运行命令、自主解决问题。
-->

---
class: py-10
clicks: 2
glow: center
glowSeed: 260
---

## Context Window — 最关键的资源

<div mt-8 />

<div
  v-click="1"
  transition duration-500
  :class="$clicks < 1 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  text-center mb-10
>
  <div text-6xl font-bold class="text-violet-400">200K</div>
  <div text-sm mt-3 opacity-70>Context Window Token 容量</div>
</div>

<div
  v-click="2"
  transition duration-500
  :class="$clicks < 2 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
>
  <div grid grid-cols-3 gap-6>
    <div text-center>
      <div text-3xl font-bold class="text-blue-400">读取文件</div>
      <div text-xs mt-2 opacity-70>每个文件消耗 token</div>
    </div>
    <div text-center>
      <div text-3xl font-bold class="text-cyan-400">命令输出</div>
      <div text-xs mt-2 opacity-70>调试日志大量占用</div>
    </div>
    <div text-center>
      <div text-3xl font-bold class="text-amber-400">对话历史</div>
      <div text-xs mt-2 opacity-70>累积增长不可逆</div>
    </div>
  </div>
  <div mt-6 text-center text-sm opacity-60>
    Context 填满 → 性能下降 → "遗忘"早期指令
  </div>
</div>

---
layout: section
glowSeed: 300
---

# 02

给 Claude 验证能力

---
class: py-10
clicks: 3
glowSeed: 320
---

## 三种验证策略

<div grid grid-cols-3 gap-6 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid violet-800/50" rounded-lg>
      <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
        <div i-carbon:test-tool text-sm mr-1 />
        <div text-xs><em>测试用例</em></div>
      </div>
      <div bg="violet-800/10" px-4 py-3>
        <div text-sm>提供预期输入/输出</div>
        <div text-xs opacity-70 mt-1>让 Claude 运行测试自检</div>
      </div>
    </div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid blue-800/50" rounded-lg>
      <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
        <div i-carbon:visual-reference text-sm mr-1 />
        <div text-xs><em>视觉验证</em></div>
      </div>
      <div bg="blue-800/10" px-4 py-3>
        <div text-sm>截图对比设计稿</div>
        <div text-xs opacity-70 mt-1>Chrome 扩展自动迭代</div>
      </div>
    </div>
  </div>
  <div
    v-click="3"
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid green-800/50" rounded-lg>
      <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
        <div i-carbon:debug text-sm mr-1 />
        <div text-xs><em>根本原因</em></div>
      </div>
      <div bg="green-800/10" px-4 py-3>
        <div text-sm>粘贴错误信息</div>
        <div text-xs opacity-70 mt-1>解决根因而非抑制症状</div>
      </div>
    </div>
  </div>
</div>

<!--
这是你能做的最高杠杆的事情。没有验证标准，Claude 可能产生看起来正确但不工作的代码。
-->

---
class: py-10
glowSeed: 340
---

## 验证策略对比

<div mt-8 />

| 策略 | 之前 | 之后 |
|------|------|------|
| **提供验证标准** | "实现验证邮箱函数" | "编写 validateEmail，user@example.com 为真，invalid 为假，运行测试" |
| **视觉验证 UI** | "让仪表盘更好看" | "[截图] 实现此设计，截图对比，列出差异并修复" |
| **根本原因修复** | "构建失败" | "[粘贴错误] 修复并验证构建成功，解决根因不抑制错误" |

<div mt-6 text-sm opacity-60>
  没有验证标准 → 你成为唯一的反馈循环 → 每个错误都需要你的关注
</div>

---
layout: section
glowSeed: 380
---

# 03

探索 → 规划 → 编码

---
class: py-10
clicks: 4
glowSeed: 400
---

## 四阶段工作流

<span class="text-sm opacity-70">将研究和规划与实现分开</span>

<div mt-8 />

<div flex items-center gap-4>
  <v-clicks>

  <div
    rounded-lg
    border="2 solid violet-900" bg="violet-900/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
  >
    <div px-5 py-8 flex items-center justify-center>
      <div i-carbon:search text-4xl />
    </div>
    <div bg="violet-900/30" w-full px-4 py-2 flex items-center justify-center text-center>
      <span text-sm>探索</span>
    </div>
  </div>

  <div text-2xl class="opacity-30">→</div>

  <div
    rounded-lg
    border="2 solid blue-800" bg="blue-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
  >
    <div px-5 py-8 flex items-center justify-center>
      <div i-carbon:plan text-4xl />
    </div>
    <div bg="blue-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
      <span text-sm>规划</span>
    </div>
  </div>

  <div text-2xl class="opacity-30">→</div>

  <div
    rounded-lg
    border="2 solid green-800" bg="green-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
  >
    <div px-5 py-8 flex items-center justify-center>
      <div i-carbon:code text-4xl />
    </div>
    <div bg="green-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
      <span text-sm>实现</span>
    </div>
  </div>

  <div text-2xl class="opacity-30">→</div>

  <div
    rounded-lg
    border="2 solid amber-800" bg="amber-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
  >
    <div px-5 py-8 flex items-center justify-center>
      <div i-carbon:git-commit text-4xl />
    </div>
    <div bg="amber-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
      <span text-sm>提交</span>
    </div>
  </div>

  </v-clicks>
</div>

---
class: py-10
clicks: 2
glowSeed: 420
---

## 什么时候用 Plan Mode？

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
  >
    <div text-xl font-bold mb-4 text-green-300>适合规划</div>
    <div text-sm mb-2>对方法不确定</div>
    <div text-sm mb-2>修改涉及多个文件</div>
    <div text-sm mb-2>不熟悉被修改的代码</div>
    <div text-sm>功能实现、架构重构</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-orange-500/30 rounded-lg p-5 bg-orange-500/10"
  >
    <div text-xl font-bold mb-4 text-orange-300>直接执行</div>
    <div text-sm mb-2>范围明确、修复很小</div>
    <div text-sm mb-2>能用一句话描述 diff</div>
    <div text-sm mb-2>修复拼写错误</div>
    <div text-sm>添加日志、重命名变量</div>
  </div>
</div>

---
layout: section
glowSeed: 450
---

# 04

精确的上下文

---
class: py-10
clicks: 4
glowSeed: 470
---

## 四种提示策略

<div grid grid-cols-2 gap-4 mt-8>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:target text-sm mr-2 />
    <div font-semibold>限定范围</div>
  </div>
  <div bg="violet-900/5" px-4 py-3>
    <div text-sm>指定哪个文件、什么场景</div>
    <div text-xs opacity-70>"为 foo.py 写测试，覆盖注销边界情况，避免 mock"</div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg overflow-hidden bg="blue-900/10" backdrop-blur-sm>
  <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
    <div i-carbon:source-code text-sm mr-2 />
    <div font-semibold>指向来源</div>
  </div>
  <div bg="blue-900/5" px-4 py-3>
    <div text-sm>引导 Claude 到信息源</div>
    <div text-xs opacity-70>"查看 git 历史总结 API 演变"</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
    <div i-carbon:reference text-sm mr-2 />
    <div font-semibold>参考模式</div>
  </div>
  <div bg="green-900/5" px-4 py-3>
    <div text-sm>指向代码库中的范例</div>
    <div text-xs opacity-70>"参考 HotDogWidget.php 实现日历小部件"</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-carbon:stethoscope text-sm mr-2 />
    <div font-semibold>描述症状</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div text-sm>提供症状 + 位置 + 期望</div>
    <div text-xs opacity-70>"会话超时后登录失败，检查 token 刷新"</div>
  </div>
</div>

</v-clicks>

</div>

---
class: py-10
clicks: 5
glowSeed: 500
---

## 丰富内容输入方式

<div grid grid-cols-3 gap-4 mt-8>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:document text-sm mr-2 />
    <div font-semibold>@ 引用文件</div>
  </div>
  <div bg="violet-900/5" px-4 py-3>
    <div text-sm>Claude 读取后再响应</div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg overflow-hidden bg="blue-900/10" backdrop-blur-sm>
  <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
    <div i-carbon:image text-sm mr-2 />
    <div font-semibold>粘贴图片</div>
  </div>
  <div bg="blue-900/5" px-4 py-3>
    <div text-sm>拖放截图到提示中</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
    <div i-carbon:link text-sm mr-2 />
    <div font-semibold>提供 URL</div>
  </div>
  <div bg="green-900/5" px-4 py-3>
    <div text-sm>文档和 API 参考</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-carbon:data-flow text-sm mr-2 />
    <div font-semibold>管道数据</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div text-sm font-mono>cat error.log | claude</div>
  </div>
</div>

<div border="2 solid cyan-800/50" rounded-lg overflow-hidden bg="cyan-900/10" backdrop-blur-sm>
  <div flex items-center bg="cyan-800/30" px-3 py-2 text-cyan-300>
    <div i-carbon:bot text-sm mr-2 />
    <div font-semibold>让 Claude 自己拉取</div>
  </div>
  <div bg="cyan-900/5" px-4 py-3>
    <div text-sm>Bash / MCP / 读文件</div>
  </div>
</div>

</v-clicks>

</div>

---
layout: section
glowSeed: 520
---

# 05

配置你的环境

---
class: py-10
clicks: 2
glowSeed: 540
---

## 编写有效的 CLAUDE.md

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
  >
    <div text-xl font-bold mb-4 text-green-300>应该包含</div>
    <div text-sm mb-2>Bash 命令（Claude 无法猜测的）</div>
    <div text-sm mb-2>与默认不同的代码风格规则</div>
    <div text-sm mb-2>测试指令和首选运行器</div>
    <div text-sm mb-2>分支命名、PR 约定</div>
    <div text-sm>常见陷阱和非显而易见行为</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-orange-500/30 rounded-lg p-5 bg-orange-500/10"
  >
    <div text-xl font-bold mb-4 text-orange-300>应该排除</div>
    <div text-sm mb-2>代码能推断的任何东西</div>
    <div text-sm mb-2>标准语言约定</div>
    <div text-sm mb-2>详细 API 文档（改为链接）</div>
    <div text-sm mb-2>频繁变化的信息</div>
    <div text-sm>自明的实践如"写干净代码"</div>
  </div>
</div>

<!--
保持简洁。每条规则问：删除它会导致 Claude 犯错吗？如果不会，删掉。
-->

---
class: py-10
clicks: 5
glowSeed: 560
---

## CLAUDE.md 放置位置

<div mt-6 flex flex-col gap-4>

<v-clicks>

<div flex gap-4 border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3>
  <div w-40 shrink-0>
    <div text-sm font-mono font-bold text-violet-300>~/.claude/CLAUDE.md</div>
  </div>
  <div flex-1 text-sm>全局 — 适用于所有 Claude 会话</div>
</div>

<div flex gap-4 border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3>
  <div w-40 shrink-0>
    <div text-sm font-mono font-bold text-blue-300>./CLAUDE.md</div>
  </div>
  <div flex-1 text-sm>项目根目录 — 检入 git 与团队共享</div>
</div>

<div flex gap-4 border="2 solid green-800/30" rounded-lg bg="green-900/10" px-4 py-3>
  <div w-40 shrink-0>
    <div text-sm font-mono font-bold text-green-300>./CLAUDE.local.md</div>
  </div>
  <div flex-1 text-sm>个人笔记 — 加入 .gitignore 不共享</div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-40 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>父/子目录</div>
  </div>
  <div flex-1 text-sm>Monorepos 多层 — 处理子目录时按需拉入</div>
</div>

<div flex gap-4 border="2 solid cyan-800/30" rounded-lg bg="cyan-900/10" px-4 py-3>
  <div w-40 shrink-0>
    <div text-sm font-mono font-bold text-cyan-300>@ 导入语法</div>
  </div>
  <div flex-1 text-sm font-mono>See @README.md for project overview</div>
</div>

</v-clicks>

</div>

---
class: py-10
clicks: 3
glowSeed: 580
---

## 权限配置 — 三种减少中断的方式

<div grid grid-cols-3 gap-6 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid violet-800/50" rounded-lg>
      <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
        <div i-carbon:flash text-sm mr-1 />
        <div text-xs><em>Auto Mode</em></div>
      </div>
      <div bg="violet-800/10" px-4 py-3>
        <div text-sm>分类器自动审批</div>
        <div text-xs opacity-70 mt-1>仅阻止有风险的操作</div>
      </div>
    </div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid blue-800/50" rounded-lg>
      <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
        <div i-carbon:list text-sm mr-1 />
        <div text-xs><em>允许列表</em></div>
      </div>
      <div bg="blue-800/10" px-4 py-3>
        <div text-sm>预批准安全命令</div>
        <div text-xs opacity-70 mt-1>npm run lint / git commit</div>
      </div>
    </div>
  </div>
  <div
    v-click="3"
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid green-800/50" rounded-lg>
      <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
        <div i-carbon:locked text-sm mr-1 />
        <div text-xs><em>沙箱</em></div>
      </div>
      <div bg="green-800/10" px-4 py-3>
        <div text-sm>OS 级隔离</div>
        <div text-xs opacity-70 mt-1>限制文件系统和网络</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 2
glowSeed: 600
---

## CLI 工具 + MCP 服务器

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-violet-500/30 rounded-lg p-5 bg-violet-500/10"
  >
    <div text-xl font-bold mb-3 text-violet-300>CLI 工具</div>
    <div text-sm mb-2>与外部服务最高效的交互方式</div>
    <div text-sm mb-2 font-mono>gh</div>
    <div text-sm mb-2 font-mono>aws / gcloud</div>
    <div text-sm font-mono>sentry-cli</div>
    <div text-xs opacity-70 mt-3>Claude 也能学习未知 CLI</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-cyan-500/30 rounded-lg p-5 bg-cyan-500/10"
  >
    <div text-xl font-bold mb-3 text-cyan-300>MCP 服务器</div>
    <div text-sm mb-2>连接外部工具和数据库</div>
    <div text-sm mb-2 font-mono>claude mcp add</div>
    <div text-sm mb-2>Notion / Figma / 数据库</div>
    <div text-sm>问题跟踪器 / 监控数据</div>
  </div>
</div>

---
class: py-10
clicks: 3
glowSeed: 620
---

## Hooks + Skills + Subagents

<div grid grid-cols-3 gap-6 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid violet-800/50" rounded-lg>
      <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
        <div i-carbon:hook text-sm mr-1 />
        <div text-xs><em>Hooks</em></div>
      </div>
      <div bg="violet-800/10" px-4 py-3>
        <div text-sm>确定性自动脚本</div>
        <div text-xs opacity-70 mt-1>文件编辑后自动 lint</div>
      </div>
    </div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid blue-800/50" rounded-lg>
      <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
        <div i-carbon:skill-level text-sm mr-1 />
        <div text-xs><em>Skills</em></div>
      </div>
      <div bg="blue-800/10" px-4 py-3>
        <div text-sm>域知识和可复用工作流</div>
        <div text-xs opacity-70 mt-1>按需加载不膨胀 context</div>
      </div>
    </div>
  </div>
  <div
    v-click="3"
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div border="2 solid green-800/50" rounded-lg>
      <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
        <div i-carbon:group text-sm mr-1 />
        <div text-xs><em>Subagents</em></div>
      </div>
      <div bg="green-800/10" px-4 py-3>
        <div text-sm>隔离 context 的专门助手</div>
        <div text-xs opacity-70 mt-1>读多文件不污染主对话</div>
      </div>
    </div>
  </div>
</div>

---
layout: section
glowSeed: 650
---

# 06

有效沟通

---
class: py-10
clicks: 4
glowSeed: 670
---

## 问对问题 + 采访模式

<div grid grid-cols-2 gap-4 mt-8>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:chat text-sm mr-2 />
    <div font-semibold>像问资深工程师一样</div>
  </div>
  <div bg="violet-900/5" px-4 py-3>
    <div text-sm>日志如何工作？</div>
    <div text-sm>第 134 行的 async move 做什么？</div>
    <div text-sm>这个类处理哪些边界情况？</div>
  </div>
</div>

<div border="2 solid blue-800/50" rounded-lg overflow-hidden bg="blue-900/10" backdrop-blur-sm>
  <div flex items-center bg="blue-800/30" px-3 py-2 text-blue-300>
    <div i-carbon:microphone text-sm mr-2 />
    <div font-semibold>让 Claude 采访你</div>
  </div>
  <div bg="blue-900/5" px-4 py-3>
    <div text-sm>从最小提示开始</div>
    <div text-sm>Claude 挖掘你没考虑到的</div>
    <div text-sm>完成后写 SPEC.md</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
    <div i-carbon:task text-sm mr-2 />
    <div font-semibold>新会话执行规范</div>
  </div>
  <div bg="green-900/5" px-4 py-3>
    <div text-sm>干净 context 专注实现</div>
    <div text-sm>有书面规范可参考</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-carbon:idea text-sm mr-2 />
    <div font-semibold>模糊提示也有用</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div text-sm>"你会改进这个文件的什么？"</div>
    <div text-sm>表面你不会想到的东西</div>
  </div>
</div>

</v-clicks>

</div>

---
layout: section
glowSeed: 700
---

# 07

会话管理

---
class: py-10
clicks: 4
glowSeed: 720
---

## 尽早且经常改正方向

<div mt-6 flex flex-col gap-4>

<v-clicks>

<div flex gap-4 border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-violet-300>Esc</div>
  </div>
  <div flex-1 text-sm>中途停止 Claude，Context 保留可重定向</div>
</div>

<div flex gap-4 border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-blue-300>Esc + Esc</div>
  </div>
  <div flex-1 text-sm>打开 rewind 菜单，恢复之前的对话和代码状态</div>
</div>

<div flex gap-4 border="2 solid green-800/30" rounded-lg bg="green-900/10" px-4 py-3>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-green-300>"撤销那个"</div>
  </div>
  <div flex-1 text-sm>让 Claude 恢复其更改</div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>/clear</div>
  </div>
  <div flex-1 text-sm>重置 context，不相关任务间使用</div>
</div>

</v-clicks>

</div>

<div mt-4 text-sm opacity-60>
  两次失败的改正后 → /clear + 更好的初始提示（包含你学到的）
</div>

---
class: py-10
clicks: 4
glowSeed: 740
---

## Context 管理策略

<div mt-6 flex flex-col gap-4>

<v-clicks>

<div flex gap-4 border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-violet-300>/clear</div>
  </div>
  <div flex-1 text-sm>任务间频繁使用，完全重置 context</div>
</div>

<div flex gap-4 border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-blue-300>自动压缩</div>
  </div>
  <div flex-1 text-sm>接近限制时触发，保留代码模式和关键决策</div>
</div>

<div flex gap-4 border="2 solid green-800/30" rounded-lg bg="green-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-green-300>/compact</div>
  </div>
  <div flex-1 text-sm>手动压缩并指定保留重点</div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>/btw</div>
  </div>
  <div flex-1 text-sm>快速问题不进对话历史，节省 context</div>
</div>

</v-clicks>

</div>

---
class: py-8
clicks: 2
glowSeed: 760
---

## 使用 Subagents 进行调查

<div mt-4 text-sm opacity-70>它们在单独 context 中探索，保持你的主对话干净</div>

<div grid grid-cols-5 gap-6 mt-6>
<div col-span-3>

```text
Use subagents to investigate how our auth system
handles token refresh, and whether we have any
existing OAuth utilities I should reuse.
```

</div>
<div col-span-2>

<div
  v-click="1"
  transition duration-300
  :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-violet-500 pl-4 mb-6
>
  <div text-sm font-bold text-violet-300>独立 Context</div>
  <div text-xs mt-1>Subagent 不消耗你的 context</div>
</div>

<div
  v-click="2"
  transition duration-300
  :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-green-500 pl-4
>
  <div text-sm font-bold text-green-300>返回摘要</div>
  <div text-xs mt-1>只报告发现不拉入全文</div>
</div>

</div>
</div>

---
class: py-10
clicks: 2
glowSeed: 780
---

## 检查点 + 恢复对话

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-violet-500/30 rounded-lg p-5 bg-violet-500/10"
  >
    <div text-xl font-bold mb-3 text-violet-300>检查点</div>
    <div text-sm mb-2>每个操作自动创建检查点</div>
    <div text-sm mb-2>恢复对话 / 代码 / 或两者</div>
    <div text-sm>关闭终端后仍可 rewind</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-cyan-500/30 rounded-lg p-5 bg-cyan-500/10"
  >
    <div text-xl font-bold mb-3 text-cyan-300>恢复对话</div>
    <div text-sm mb-2 font-mono>claude --continue</div>
    <div text-sm mb-2 font-mono>claude --resume</div>
    <div text-sm mb-2>/rename 命名会话</div>
    <div text-sm>跨会话持续工作</div>
  </div>
</div>

---
layout: section
glowSeed: 800
---

# 08

自动化和扩展

---
class: py-10
glowSeed: 820
---

## 非交互模式

<div mt-6 />

<div text-sm opacity-70 mb-4>CI 管道、pre-commit hooks、脚本集成</div>

```bash
# 一次性查询
claude -p "Explain what this project does"

# 结构化输出
claude -p "List all API endpoints" --output-format json

# 流式处理
claude -p "Analyze this log file" --output-format stream-json

# 自动模式（无人值守）
claude --permission-mode auto -p "fix all lint errors"
```

<div mt-4 text-sm opacity-60>
  --allowedTools 限制权限 · --verbose 调试 · 生产关闭 verbose
</div>

---
class: py-10
clicks: 3
glowSeed: 840
---

## 多会话并行 + 扇出

<div mt-6 />

<div grid grid-cols-3 gap-6>
  <div
    v-click="1"
    transition duration-500
    :class="$clicks < 1 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    text-center
  >
    <div text-4xl font-bold class="text-violet-400">桌面应用</div>
    <div text-sm mt-3 opacity-70>视觉管理多个会话</div>
    <div text-xs opacity-50>每个会话隔离 worktree</div>
  </div>
  <div
    v-click="2"
    transition duration-500
    :class="$clicks < 2 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    text-center
  >
    <div text-4xl font-bold class="text-blue-400">Web 版</div>
    <div text-sm mt-3 opacity-70>安全云基础设施</div>
    <div text-xs opacity-50>隔离 VM 运行</div>
  </div>
  <div
    v-click="3"
    transition duration-500
    :class="$clicks < 3 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    text-center
  >
    <div text-4xl font-bold class="text-green-400">Agent Teams</div>
    <div text-sm mt-3 opacity-70>自动协调多会话</div>
    <div text-xs opacity-50>共享任务和消息</div>
  </div>
</div>

<div mt-8 text-sm opacity-70>
  <span font-bold>扇出模式</span>：循环调用 <span font-mono>claude -p</span> 为每个文件单独处理，大规模迁移利器
</div>

---
layout: section
glowSeed: 860
---

# 09

避坑指南

---
class: py-10
clicks: 5
glowSeed: 880
---

## 五种常见失败模式

<div mt-6 flex flex-col gap-4>

<v-clicks>

<div flex gap-4 border="2 solid orange-800/30" rounded-lg bg="orange-900/10" px-4 py-3>
  <div w-8 shrink-0>
    <div text-sm font-bold text-orange-300>1</div>
  </div>
  <div flex-1>
    <div text-sm font-bold text-orange-300>厨房水槽会话</div>
    <div text-xs opacity-70 mt-1>不相关任务混杂 → context 充满噪音 → <span font-mono>/clear</span></div>
  </div>
</div>

<div flex gap-4 border="2 solid red-800/30" rounded-lg bg="red-900/10" px-4 py-3>
  <div w-8 shrink-0>
    <div text-sm font-bold text-red-300>2</div>
  </div>
  <div flex-1>
    <div text-sm font-bold text-red-300>一次又一次改正</div>
    <div text-xs opacity-70 mt-1>两次改正失败 → context 污染 → <span font-mono>/clear</span> + 更好提示</div>
  </div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-8 shrink-0>
    <div text-sm font-bold text-amber-300>3</div>
  </div>
  <div flex-1>
    <div text-sm font-bold text-amber-300>过度指定的 CLAUDE.md</div>
    <div text-xs opacity-70 mt-1>太长 → Claude 忽略一半 → 无情修剪</div>
  </div>
</div>

<div flex gap-4 border="2 solid rose-800/30" rounded-lg bg="rose-900/10" px-4 py-3>
  <div w-8 shrink-0>
    <div text-sm font-bold text-rose-300>4</div>
  </div>
  <div flex-1>
    <div text-sm font-bold text-rose-300>信任但未验证</div>
    <div text-xs opacity-70 mt-1>看起来正确但不处理边界 → 始终提供验证</div>
  </div>
</div>

<div flex gap-4 border="2 solid fuchsia-800/30" rounded-lg bg="fuchsia-900/10" px-4 py-3>
  <div w-8 shrink-0>
    <div text-sm font-bold text-fuchsia-300>5</div>
  </div>
  <div flex-1>
    <div text-sm font-bold text-fuchsia-300>无限探索</div>
    <div text-xs opacity-70 mt-1>无范围调查 → 读取数百文件 → 限定范围或用 subagents</div>
  </div>
</div>

</v-clicks>

</div>

---
layout: quote
glowSeed: 900
---

> 当 Claude 产出好结果时，注意你做了什么：提示结构、提供的 context、所处的模式。当 Claude 遇到困难时，问为什么。

---
layout: end
glowSeed: 950
---

感谢观看

<div class="text-sm opacity-50 mt-4">
  Claude Code 最佳实践 · 开发者培训
</div>

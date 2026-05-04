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
  <div text-lg opacity-70 mb-3>从配置环境到跨并行会话扩展</div>
  <div text-sm class="text-violet-400/70" mb-4>代理式编码环境</div>
  <img src="/coder-writing.png" w-28 rounded-lg opacity-80 />
  <div text-sm opacity-40 mt-4>开发者培训 · 2026</div>
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
    <div mt-3 flex justify-center>
      <img src="/shocked-cat.gif" w-28 rounded />
    </div>
  </div>
</div>

<div mt-6 text-sm opacity-60>
  💡 就像雇佣厨师 vs 烹饪顾问：厨师走进厨房、看食材、做菜；顾问只给你食谱，你自己做
</div>

---
class: py-10
clicks: 2
glow: center
glowSeed: 260
---

## Context Window — 最关键的资源

<div mt-6 />

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
  <div mt-4 text-center text-sm opacity-60>
    单个调试会话或代码库探索就能消耗数万 token
  </div>
  <div mt-2 text-center text-sm opacity-60>
    Context 填满 → 性能下降 → "遗忘"早期指令
  </div>
  <div mt-3 flex items-center justify-center gap-4>
    <img src="/coding-cat.gif" w-28 rounded-xl />
    <span text-sm opacity-50>猫猫疯狂敲键盘 = context 飞速填满</span>
  </div>
</div>

---
class: py-10
clicks: 4
glowSeed: 290
---

## 大多数最佳实践都基于一个约束

<div mt-8 flex flex-col items-center>

<div
  v-click="1"
  transition duration-500
  :class="$clicks < 1 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  text-center mb-10
>
  <div text-3xl font-bold class="text-rose-400">Context Window 填满速度很快</div>
  <div text-sm mt-3 opacity-70>随着填充，性能会下降</div>
</div>

<div grid grid-cols-2 gap-6>
  <div
    v-click="2"
    transition duration-500
    :class="$clicks < 2 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3
  >
    <div text-sm font-bold text-violet-300>每条消息消耗 token</div>
  </div>
  <div
    v-click="3"
    transition duration-500
    :class="$clicks < 3 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3
  >
    <div text-sm font-bold text-blue-300>每个文件读取都计入</div>
  </div>
  <div
    v-click="4"
    transition duration-500
    :class="$clicks < 4 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
    border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3
  >
    <div text-sm font-bold text-amber-300>命令输出可能很大</div>
  </div>
</div>

</div>

<div grid grid-cols-2 gap-8 mt-6>
  <div flex items-center>
    <span text-sm opacity-60>💡 Context 像笔记本，一条消息占一行，调试一次填半本</span>
  </div>
  <div flex flex-col items-center gap-3>
    <img src="/cat-tired.jpg" w-48 rounded-xl />
    <span text-sm opacity-50>context 爆满的你</span>
  </div>
</div>

---
layout: center
glowSeed: 295
---

<div flex flex-col items-center gap-6>
  <img src="/shocked-cat.gif" w-72 rounded-xl />
  <div text-3xl font-bold>当你还在手动复制粘贴代码...</div>
  <div text-sm opacity-60>Claude：让我自己来好吗？</div>
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

<div text-sm class="text-amber-400/80" mb-2>⭐ 这是你能做的最高杠杆的事情</div>

<div grid grid-cols-3 gap-6 mt-8>
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

<div mt-6 text-sm opacity-60>
  投资使你的验证非常可靠 — 测试套件、linter、截图对比都可以
</div>

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
  💡 验证就像自动驾驶的传感器 — 没有传感器车照常行驶，但你会撞墙
</div>

<div mt-4 text-xs opacity-50>
  UI 更改可使用 Chrome 中的 Claude 扩展进行验证，它在浏览器中打开新标签页，测试 UI，并迭代直到代码工作
</div>

---
layout: center
glowSeed: 345
---

<div flex flex-col items-center gap-6>
  <img src="/fix-bug.gif" w-72 rounded-xl />
  <div text-3xl font-bold>当你意识到让 Claude 自己验证...</div>
  <div text-sm opacity-60>可以省下 80% 的 debug 时间！</div>
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

  <div
    v-click="1"
    rounded-lg
    border="2 solid violet-900" bg="violet-900/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'"
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
    v-click="2"
    rounded-lg
    border="2 solid blue-800" bg="blue-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'"
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
    v-click="3"
    rounded-lg
    border="2 solid green-800" bg="green-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-30' : 'opacity-100'"
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
    v-click="4"
    rounded-lg
    border="2 solid amber-800" bg="amber-800/20"
    backdrop-blur flex-1
    transition duration-500 ease-in-out
    :class="$clicks < 4 ? 'opacity-30' : 'opacity-100'"
  >
    <div px-5 py-8 flex items-center justify-center>
      <div i-carbon:git-commit text-4xl />
    </div>
    <div bg="amber-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
      <span text-sm>提交</span>
    </div>
  </div>

</div>

<div mt-4 text-center text-sm opacity-50>
  💡 像买房 — 先看房（探索），再决定买哪个（规划），然后签合同付款（实现），最后拿钥匙（提交）
</div>

---
class: py-10
clicks: 2
glowSeed: 415
---

## 实际示例：探索 & 规划

<div grid grid-cols-2 gap-6 mt-8>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-violet-500/30 rounded-lg p-4 bg-violet-500/10"
  >
    <div text-sm font-bold text-violet-300 mb-3>Phase 1: 探索 (Plan Mode)</div>

```text
read /src/auth and understand how we
handle sessions and login.
also look at how we manage environment
variables for secrets.
```

  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-blue-500/30 rounded-lg p-4 bg-blue-500/10"
  >
    <div text-sm font-bold text-blue-300 mb-3>Phase 2: 规划 (Plan Mode)</div>

```text
I want to add Google OAuth.
What files need to change?
What's the session flow?
Create a plan.
```

  </div>
</div>

<div
  v-click="2"
  transition duration-300
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  class="text-xs text-white/50 mt-3 text-center"
>
  💡 按 Ctrl+G 在文本编辑器中打开计划进行直接编辑
</div>

---
class: py-10
clicks: 2
glowSeed: 425
---

## 实际示例：实现 & 提交

<div grid grid-cols-2 gap-6 mt-8>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-green-500/30 rounded-lg p-4 bg-green-500/10"
  >
    <div text-sm font-bold text-green-300 mb-3>Phase 3: 实现 (Normal Mode)</div>

```text
implement the OAuth flow from your plan.
write tests for the callback handler,
run the test suite and fix any failures.
```

  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-amber-500/30 rounded-lg p-4 bg-amber-500/10"
  >
    <div text-sm font-bold text-amber-300 mb-3>Phase 4: 提交</div>

```text
commit with a descriptive message
and open a PR
```

  </div>
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

<div mt-4 text-sm opacity-50>
  💡 规划像查地图 — 已经知道路线就直接开，不确定时再开导航。如果你能用一句话描述 diff，跳过计划
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
glowSeed: 485
---

## 提示策略完整对比

<div mt-6 />

| 策略 | 之前 | 之后 |
|------|------|------|
| **限定范围** | "为 foo.py 添加测试" | "为 foo.py 写测试，覆盖注销边界情况，避免 mock" |
| **指向来源** | "ExecutionFactory 为什么 API 这么奇怪？" | "查看 ExecutionFactory 的 git 历史，总结其 API 是如何形成的" |
| **参考模式** | "添加日历小部件" | "参考 HotDogWidget.php 的模式实现日历小部件，只使用代码库已有的库" |
| **描述症状** | "修复登录错误" | "会话超时后登录失败，检查 src/auth/ token 刷新，写失败测试再修复" |

<div grid grid-cols-2 gap-8 mt-6>
  <div flex items-center>
    <span text-sm opacity-60>模糊提示也有用 — "你会改进这个文件的什么？" 能发现你不会想到的问题</span>
  </div>
  <div flex justify-center>
    <img src="/cat-question.jpg" w-48 rounded-xl />
  </div>
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

<div text-sm class="text-cyan-400/70" mb-2>运行 /init 根据项目结构自动生成</div>

<div grid grid-cols-2 gap-8 mt-6>
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

---
class: py-8
glowSeed: 545
---

## CLAUDE.md 代码示例

<div mt-4 />

```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making code changes
- Prefer running single tests, not the whole test suite, for performance
```

<div mt-6 text-sm opacity-60>
  💡 CLAUDE.md 就像新员工第一天看的 README — 不说"做个好人"，而是"咖啡机在3楼，密码1234"
</div>

<div mt-4 text-xs opacity-50>
  保持简洁，每条规则问自己："删除它会导致 Claude 犯错吗？"如果不会，删掉
</div>

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
        <div text-xs opacity-70 mt-1>每次文件编辑后自动 eslint</div>
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

<div mt-6 text-xs opacity-50>
  Claude 可以为你编写 Hooks — 试试"编写一个在每次文件编辑后运行 eslint 的 hook"
</div>

---
class: py-8
clicks: 2
glowSeed: 625
---

## Skills & Subagents 配置示例

<div grid grid-cols-2 gap-6 mt-6>
  <div
    v-click="1"
    transition duration-300
    :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'"
  >
    <div text-sm font-bold text-blue-300 mb-3>api-conventions Skill</div>

```yaml
---
name: api-conventions
description: REST API conventions
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON
- Always include pagination
- Version in URL path (/v1/, /v2/)
```

  </div>
  <div
    v-click="2"
    transition duration-300
    :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'"
  >
    <div text-sm font-bold text-green-300 mb-3>security-reviewer Subagent</div>

```yaml
---
name: security-reviewer
description: Reviews code for security
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer.
Review code for:
- Injection vulnerabilities (SQL, XSS)
- Authentication and authorization flaws
- Secrets or credentials in code
```

  </div>
</div>

<div mt-3 flex justify-center gap-8>
  <span class="text-xs text-white/50">💡 Claude 按需自动应用 Skill，/fix-issue 1234 直接调用</span>
  <span class="text-xs text-white/50">💡 Subagent 独立 context 运行，不污染主对话</span>
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

<div grid grid-cols-2 gap-4 mt-6>

<v-clicks>

<div border="2 solid violet-800/50" rounded-lg overflow-hidden bg="violet-900/10" backdrop-blur-sm>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:chat text-sm mr-2 />
    <div font-semibold>像问资深工程师一样</div>
  </div>
  <div bg="violet-900/5" px-4 py-3>
    <div text-sm>"日志如何工作？"</div>
    <div text-sm>"第 134 行的 async move 做什么？"</div>
    <div text-sm>"CustomerOnboardingFlowImpl 处理哪些边界？"</div>
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
    <div text-xs mt-1 opacity-70>启动新会话执行规范 — 干净 context</div>
  </div>
</div>

<div border="2 solid green-800/50" rounded-lg overflow-hidden bg="green-900/10" backdrop-blur-sm>
  <div flex items-center bg="green-800/30" px-3 py-2 text-green-300>
    <div i-carbon:idea text-sm mr-2 />
    <div font-semibold>模糊提示也有用</div>
  </div>
  <div bg="green-900/5" px-4 py-3>
    <div text-sm>"你会改进这个文件的什么？"</div>
    <div text-sm>表面你不会想到的东西</div>
  </div>
</div>

<div border="2 solid amber-800/50" rounded-lg overflow-hidden bg="amber-900/10" backdrop-blur-sm>
  <div flex items-center bg="amber-800/30" px-3 py-2 text-amber-300>
    <div i-carbon:task text-sm mr-2 />
    <div font-semibold>采访 Prompt 示例</div>
  </div>
  <div bg="amber-900/5" px-4 py-3>
    <div text-xs font-mono>Interview me using AskUserQuestion.</div>
    <div text-xs font-mono>Ask about implementation, UX,</div>
    <div text-xs font-mono>edge cases, tradeoffs.</div>
    <div text-xs font-mono>Then write SPEC.md</div>
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

<div flex gap-4 border="2 solid violet-800/30" rounded-lg bg="violet-900/10" px-4 py-3 items-center>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-violet-300>Esc</div>
  </div>
  <div flex-1 text-sm>中途停止 Claude，Context 保留可重定向</div>
</div>

<div flex gap-4 border="2 solid blue-800/30" rounded-lg bg="blue-900/10" px-4 py-3 items-center>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-blue-300>Esc + Esc</div>
  </div>
  <div flex-1 text-sm>打开 rewind 菜单，恢复之前的对话和代码状态</div>
</div>

<div flex gap-4 border="2 solid green-800/30" rounded-lg bg="green-900/10" px-4 py-3 items-center>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-green-300>"撤销那个"</div>
  </div>
  <div flex-1 text-sm>让 Claude 恢复其更改</div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3 items-center>
  <div w-28 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>/clear</div>
  </div>
  <div flex-1 text-sm>重置 context，不相关任务间使用</div>
</div>

</v-clicks>

</div>

<div grid grid-cols-2 gap-8 mt-6>
  <div>
    <div text-sm opacity-60>
      两次失败的改正后 → /clear + 更好的初始提示（包含你学到的）
    </div>
    <div text-sm opacity-50 mt-2>
      💡 就像 GPS 导航 — 走错路不要继续，立即重新计算。干净的会话+更好的提示 > 长会话+累积改正
    </div>
  </div>
  <div flex justify-center>
    <img src="/panda-knock.gif" w-48 rounded-xl />
  </div>
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
  <div flex-1 text-sm>手动压缩并指定保留重点，如 <span font-mono text-xs>/compact Focus on the API changes</span></div>
</div>

<div flex gap-4 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3>
  <div w-32 shrink-0>
    <div text-sm font-mono font-bold text-amber-300>/btw</div>
  </div>
  <div flex-1 text-sm>快速问题不进对话历史，答案在可关闭覆盖层中</div>
</div>

</v-clicks>

</div>

<div mt-4 text-sm opacity-50>
  💡 像对待分支一样对待会话 — /rename 命名如 oauth-migration，不同工作流有独立的持久 context
</div>

---
class: py-8
clicks: 3
glowSeed: 760
---

## 使用 Subagents 进行调查

<div mt-4 text-sm opacity-70>它们在单独 context 中探索，保持你的主对话干净</div>

<div grid grid-cols-5 gap-6 mt-4>
<div col-span-3>

```text
Use subagents to investigate how our auth
system handles token refresh, and whether
we have any existing OAuth utilities
I should reuse.
```

</div>
<div col-span-2>

<div
  v-click="1"
  transition duration-300
  :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-violet-500 pl-4 mb-4
>
  <div text-sm font-bold text-violet-300>独立 Context</div>
  <div text-xs mt-1>Subagent 不消耗你的 context</div>
</div>

<div
  v-click="2"
  transition duration-300
  :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-green-500 pl-4 mb-4
>
  <div text-sm font-bold text-green-300>返回摘要</div>
  <div text-xs mt-1>只报告发现不拉入全文</div>
</div>

<div
  v-click="3"
  transition duration-300
  :class="$clicks < 3 ? 'opacity-30' : 'opacity-100'"
  border-l-2 border-amber-500 pl-4
>
  <div text-sm font-bold text-amber-300>实现后验证</div>
  <div text-xs mt-1>"use a subagent to review this code for edge cases"</div>
</div>

</div>
</div>

<div grid grid-cols-2 gap-8 mt-4>
  <div flex items-center>
    <span text-sm opacity-60>没错，subagent 就是这么好用</span>
  </div>
  <div flex justify-center>
    <img src="/cat-nod.gif" w-48 rounded-xl />
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
    <div text-sm mb-2>关闭终端后仍可 rewind</div>
    <div class="text-xs text-amber-400/60 mt-2 italic">尝试冒险的方法，不行就 rewind</div>
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

<div mt-4 text-sm opacity-50>
  💡 检查点就像游戏存档 — 可以尝试 Boss 战，失败了加载到战前。但注意：检查点不跟踪外部进程，不是 git 的替代品
</div>

---
layout: center
glowSeed: 790
---

<div flex flex-col items-center gap-6>
  <img src="/panda-wrong.jpg" w-72 rounded-xl />
  <div text-3xl font-bold>"我错了，下次还敢"</div>
  <div text-sm opacity-60>— context 管理不当的真实写照</div>
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

# 管道集成
claude -p "<prompt>" --output-format json | your_command

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

## 多会话并行

<div grid grid-cols-3 gap-6 mt-6>
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

<div mt-6 />

<div grid grid-cols-2 gap-4>
  <div class="border-2 border-orange-500/30 rounded-lg p-3 bg-orange-500/10">
    <div text-sm font-bold text-orange-300>Session A: Writer</div>
    <div text-xs>"实现 API 速率限制器"</div>
  </div>
  <div class="border-2 border-green-500/30 rounded-lg p-3 bg-green-500/10">
    <div text-sm font-bold text-green-300>Session B: Reviewer</div>
    <div text-xs>"审查速率限制器，查边界情况和竞态条件"</div>
  </div>
</div>

<div mt-3 text-sm opacity-50>
  💡 并行会话像厨房里多位厨师 — 一位做主菜，一位做甜点，互不干扰
</div>

---
class: py-8
glowSeed: 845
---

## 扇出脚本：大规模迁移

<div mt-4 text-sm opacity-70>三步流程：生成任务列表 → 编写脚本 → 小规模测试后大规模运行</div>

<div mt-4 />

```bash
# Step 1: 列出需要迁移的文件
# Step 2: 编写脚本循环处理
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)"
done
# Step 3: 先在 2-3 个文件上测试，确认提示无误后大规模运行
```

<div grid grid-cols-2 gap-8 mt-4>
  <div>
    <div text-sm opacity-60>
      💡 像工厂流水线 — 先生产一个产品确认质量，再大批量生产
    </div>
    <div text-xs opacity-50 mt-2>
      --allowedTools 在无人值守时限制 Claude 能做什么 · 开发时用 --verbose 调试
    </div>
  </div>
  <div flex flex-col items-center gap-2>
    <img src="/panda-brick.jpg" w-48 rounded-xl />
    <span text-sm opacity-50>搬砖就完事了</span>
  </div>
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

<div mt-4 flex flex-col gap-3>

<v-clicks>

<div flex gap-3 border="2 solid orange-800/30" rounded-lg bg="orange-900/10" px-4 py-3 items-center>
  <img src="/cat-tired.jpg" w-10 h-10 rounded />
  <div flex-1>
    <div text-sm font-bold text-orange-300>1. 厨房水槽会话</div>
    <div text-xs opacity-70 mt-1>不相关任务混杂 → Context 充满噪音 → <span font-mono>/clear</span> 在不相关任务间重置</div>
  </div>
</div>

<div flex gap-3 border="2 solid red-800/30" rounded-lg bg="red-900/10" px-4 py-3 items-center>
  <img src="/scared-bug.gif" w-10 h-10 rounded />
  <div flex-1>
    <div text-sm font-bold text-red-300>2. 一次又一次改正</div>
    <div text-xs opacity-70 mt-1>Context 被失败方法污染 → 两次改正后 <span font-mono>/clear</span> + 更好的提示</div>
  </div>
</div>

<div flex gap-3 border="2 solid amber-800/30" rounded-lg bg="amber-900/10" px-4 py-3 items-center>
  <div w-10 h-10 flex items-center justify-center text-2xl>📋</div>
  <div flex-1>
    <div text-sm font-bold text-amber-300>3. 过度指定的 CLAUDE.md</div>
    <div text-xs opacity-70 mt-1>太长 → Claude 忽略一半 → 无情修剪，能正确做的删除或转为 hook</div>
  </div>
</div>

<div flex gap-3 border="2 solid rose-800/30" rounded-lg bg="rose-900/10" px-4 py-3 items-center>
  <img src="/bug-hey.png" w-10 h-10 rounded />
  <div flex-1>
    <div text-sm font-bold text-rose-300>4. 信任但未验证</div>
    <div text-xs opacity-70 mt-1>看起来正确但不处理边界 → 始终提供验证，不能验证就不发布</div>
  </div>
</div>

<div flex gap-3 border="2 solid fuchsia-800/30" rounded-lg bg="fuchsia-900/10" px-4 py-3 items-center>
  <div w-10 h-10 flex items-center justify-center text-2xl>🔍</div>
  <div flex-1>
    <div text-sm font-bold text-fuchsia-300>5. 无限探索</div>
    <div text-xs opacity-70 mt-1>无范围调查 → 读取数百文件 → 限定调查范围或使用 subagents</div>
  </div>
</div>

</v-clicks>

</div>

---
layout: center
glowSeed: 890
---

<div flex flex-col items-center gap-6>
  <img src="/bug-hey.png" w-72 rounded-xl />
  <div text-3xl font-bold>呦，又写 bug 呢？</div>
  <div text-sm opacity-60>— 没有验证就提交的你</div>
</div>

---
layout: section
glowSeed: 900
---

# 10

培养你的直觉

---
class: py-10
clicks: 2
glowSeed: 910
---

## 规则是起点，不是铁律

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-blue-500/30 rounded-lg p-5 bg-blue-500/10"
  >
    <div text-xl font-bold mb-4 text-blue-300>指南说...</div>
    <div text-sm mb-2>保持 context 干净</div>
    <div text-sm mb-2>总是先规划再编码</div>
    <div text-sm mb-2>提示要精确具体</div>
    <div text-sm>频繁 /clear</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-amber-500/30 rounded-lg p-5 bg-amber-500/10"
  >
    <div text-xl font-bold mb-4 text-amber-300>但有时你应该...</div>
    <div text-sm mb-2>让 context 累积 — 深入问题时历史有价值</div>
    <div text-sm mb-2>跳过规划 — 探索性任务让 Claude 自己来</div>
    <div text-sm mb-2>模糊提示 — 看看 Claude 如何解读问题</div>
    <div text-sm>保留 context — 复杂问题需要全局视野</div>
  </div>
</div>

---
layout: quote
glowSeed: 920
---

> 注意什么有效。当 Claude 产出好结果时，注意你做了什么：提示结构、提供的 context、所处的模式。
>
> 当 Claude 遇到困难时，问为什么。Context 太嘈杂？提示太模糊？任务太大？
>
> 随着时间推移，你会培养出没有指南能捕捉的直觉。

<div grid grid-cols-2 gap-8 mt-6>
  <div flex items-center>
    <span text-sm opacity-60>💡 像学开车 — 起初刻意检查每个镜子，最终变为本能</span>
  </div>
  <div flex justify-center>
    <img src="/panda-happy.gif" w-48 rounded-xl />
  </div>
</div>

---
layout: end
glowSeed: 950
---

感谢观看

<div class="text-sm opacity-50 mt-4">
  Claude Code 最佳实践 · 开发者培训
</div>

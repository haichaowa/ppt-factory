---
theme: seriph
background: https://cover.sli.dev
title: 10 分钟看懂 Jev
info: |
  ## Jev / TypeSafe AI / System One
  基于 official Slidev Starter Template 重制的调研演示。
drawings:
  persist: false
class: text-center
transition: slide-left
comark: true
duration: 10min
colorSchema: dark
routerMode: hash
---

<div
  v-motion
  class="hf-title-lockup"
  :initial="{ y: 34, opacity: 0, scale: 0.96 }"
  :enter="{ y: 0, opacity: 1, scale: 1, transition: { duration: 650, ease: 'easeOut' } }"
>
  <h1>Jev：不会聊天的大模型</h1>
  <h2>从生成文本，到软件里的类型化决策</h2>
</div>

<div class="pt-10 text-sm opacity-70">
  调研日期：2026-09-26 · 来源：官网 / 官方文档 / GitHub
</div>

<!--
开场用反差建立兴趣：这个模型不聊天、不写文案、不解释理由，但它可以被放进软件的判断节点里。

说明本次内容来自公开调研，不是独立实测结论。
-->

---

# Jev 是什么？

TypeSafe AI 发布的第一个 **System One** 模型。

<v-clicks>

- 不负责生成自然语言回复
- 接收 `state + questions`
- 返回类型化答案、概率和置信度
- 让代码可以直接路由、打分、过滤和分支
- 适合作为 AI 应用里的决策层

</v-clicks>

<!--
先给定义：Jev 是 TypeSafe AI 的第一个 System One 模型。它不是另一个 ChatGPT，而是给软件提供结构化判断结果。
-->

---
layout: two-cols
layoutClass: gap-16
---

# 目录

按“是什么 → 怎么用 → 好不好用 → 边界在哪”展开。

::right::

<Toc columns="2" text-xs minDepth="1" maxDepth="1" />

<!--
这一页沿用了官方 Starter Template 的目录写法。讲解时可以强调本次不是新闻式介绍，而是拆 API、输出形态和适用边界。
-->

---

# 调研边界与来源

| 来源 | 用途 |
| --- | --- |
| [typesafe.ai](https://typesafe.ai/) | 公司与发布信息 |
| [官方文档](https://docs.typesafe.ai/) | API、概念、模型规格 |
| [官方博客](https://typesafe.ai/blog/introducing-system-one-models-and-jev) | 发布口径 |
| [GitHub 组织](https://github.com/typesafe-ai) | SDK、Skill、适配器与社区生态 |

<div class="pt-4 text-sm opacity-70">
  本 deck 只引用公开信息；示例输出均已标注，不代表真实 API 调用结果。
</div>

<!--
建立可信度，同时划定边界：官方参数不是实测结论，示例输出也不是真实调用。
-->

---

# 身份关系

<div class="grid grid-cols-3 gap-6 pt-8 text-sm">
  <div
    v-motion
    class="hf-card"
    :initial="{ y: 24, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { duration: 450, delay: 100 } }"
  >TypeSafe AI<br /><span class="opacity-70">公司 / 实验室</span></div>
  <div
    v-motion
    class="hf-card"
    :initial="{ y: 24, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { duration: 450, delay: 220 } }"
  >System One<br /><span class="opacity-70">模型类别</span></div>
  <div
    v-motion
    class="hf-card hf-card-accent"
    :initial="{ y: 24, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { duration: 450, delay: 340 } }"
  >Jev<br /><span class="opacity-70">旗舰模型</span></div>
</div>

<!--
观众容易混淆三个名字。TypeSafe AI 是公司，System One 是模型类别，Jev 是第一个 System One 模型。
-->

---

# 传统 LLM vs Jev

| 维度 | 传统 LLM | Jev |
| --- | --- | --- |
| 目标 | 生成自然语言或代码 | 输出类型化决策 |
| 输出 | 文本，或约束成 JSON | Choice / Score / Noul |
| 使用 | 常需要解析、校验、再判断 | 更容易直接进入业务分支 |
| 适合 | 写作、总结、解释、复杂生成 | 分类、打分、路由、过滤、重排 |
| 风险 | 格式和内容都可能错 | 类型受约束，但语义仍可能错 |

<!--
核心差异不是“能不能输出 JSON”，而是请求结构本身定义了问题类型和答案空间。
-->

---

# 系统视角

<FlowDiagram />

<!--
从架构上讲，Jev 是软件里的决策层，不是最终面向用户的生成层。输出会被业务系统继续消费。
-->

---

# API 请求形态

```json {2|3|5-16|18-27|all}
{
  "state": "My payouts have been failing for 3 days.",
  "model": "jev-latest",
  "questions": {
    "department": {
      "type": "choice",
      "instructions": "Which team should handle this?",
      "criteria": {
        "billing": "Payments, invoices, refunds",
        "technical": "Bugs, outages, integrations"
      }
    },
    "urgency": {
      "type": "score",
      "instructions": "How urgent is this?",
      "criteria": ["Routine", "Today", "Urgent", "Critical"]
    },
    "escalate": {
      "type": "noul",
      "instructions": "Should this be escalated immediately?"
    }
  }
}
```

<!--
逐段解释：state 提供业务上下文，questions 定义问题契约。答案空间在请求里已经定义好了。
-->

---

# 三种问题原语

<div class="grid grid-cols-3 gap-6 pt-6">
  <div
    v-motion
    class="hf-card primitive-card"
    :initial="{ y: 26, opacity: 0, rotateX: -6 }"
    :enter="{ y: 0, opacity: 1, rotateX: 0, transition: { duration: 480, delay: 100 } }"
  >
    <div class="text-3xl font-bold">Choice</div>
    <div class="pt-2">从固定选项中选择一个</div>
    <div class="pt-3 text-sm opacity-70">部门路由 · 钩子类型 · 工具选择</div>
  </div>
  <div
    v-motion
    class="hf-card primitive-card"
    :initial="{ y: 26, opacity: 0, rotateX: -6 }"
    :enter="{ y: 0, opacity: 1, rotateX: 0, transition: { duration: 480, delay: 240 } }"
  >
    <div class="text-3xl font-bold">Score</div>
    <div class="pt-2">按有序等级打分</div>
    <div class="pt-3 text-sm opacity-70">紧急度 · 风险 · 相关性 · 质量分</div>
  </div>
  <div
    v-motion
    class="hf-card primitive-card"
    :initial="{ y: 26, opacity: 0, rotateX: -6 }"
    :enter="{ y: 0, opacity: 1, rotateX: 0, transition: { duration: 480, delay: 380 } }"
  >
    <div class="text-3xl font-bold">Noul</div>
    <div class="pt-2">判断命题是否成立</div>
    <div class="pt-3 text-sm opacity-70">是否退款 · 是否升级 · 是否有证据</div>
  </div>
</div>

<!--
Choice 管选择，Score 管有序强度，Noul 管命题真假。不要把它们泛化成万能 JSON 字段。
-->

---
layout: two-cols
layoutClass: gap-12
---

# Choice

从固定选项中选择一个。

返回：

- `choice`
- 每个选项的 `probabilities`
- `confidence`

适合：分类、路由、工具选择、标签选择。

::right::

```text
department: billing

probabilities:
  billing    0.87
  technical  0.09
  account    0.04

confidence: 0.87
```

<div class="pt-3 text-xs opacity-70">示例输出，非真实调用。</div>

<!--
Choice 适合答案空间能提前列清楚的问题。这里展示的是格式示例，不是真实 API 返回。
-->

---
layout: two-cols
layoutClass: gap-12
---

# Score

按有序等级打分。

返回：

- `score`
- `probabilities`
- `legend`
- `confidence`

适合：紧急度、风险、相关性、内容质量。

::right::

```text
urgency: 3.0 / 3

legend:
  0 routine
  1 today
  2 urgent
  3 critical

confidence: 0.91
```

<div class="pt-3 text-xs opacity-70">示例输出，非真实调用。</div>

<!--
Score 的关键是每个等级必须有业务定义，否则分数无法解释。
-->

---
layout: two-cols
layoutClass: gap-12
---

# Noul 与 confidence

Noul 判断一个命题是否成立，返回 `0–1` 概率。

适合：

- 是否请求退款
- 是否需要升级
- 是否有证据支撑

::right::

<div class="border rounded p-5">
  <div class="text-xl font-bold">confidence ≠ 正确率</div>
  <div class="pt-3 text-sm">
    Choice / Score 的 confidence 表示答案分布的集中程度；Noul 本身就是概率。不能把它理解为判断百分之百正确。
  </div>
</div>

<!--
Noul 没有单独的 confidence 字段。confidence 也不是正确率，只能作为路由阈值的一部分。
-->

---

# 官方规格

<div class="grid grid-cols-3 gap-4 pt-4 text-sm">
  <div class="hf-card metric-card"><b><AnimatedNumber :to="1.13" :decimals="2" prefix="jev-" suffix=".0" :duration="750" /></b><div class="pt-1 opacity-70">当前版本 / latest</div></div>
  <div class="hf-card metric-card"><b><AnimatedNumber :to="500" prefix="70–" suffix="ms" :duration="1000" /></b><div class="pt-1 opacity-70">官方称延迟范围</div></div>
  <div class="hf-card metric-card"><b><AnimatedNumber :to="0.042" :decimals="3" prefix="$" suffix="/Mtok" :duration="900" /></b><div class="pt-1 opacity-70">输入价格 · 输出免费</div></div>
  <div class="hf-card metric-card"><b><AnimatedNumber :to="64" suffix="k" :duration="850" /></b><div class="pt-1 opacity-70">Context / request</div></div>
  <div class="border rounded p-3"><b>Text / JSON</b><div class="pt-1 opacity-70">文本、object、array</div></div>
  <div class="border rounded p-3"><b>No fine-tune</b><div class="pt-1 opacity-70">不支持客户数据 LoRA</div></div>
</div>

<div class="pt-4 text-sm">
  多模态暂不支持；英语效果最好，CJK 可用但可能较低。
</div>

<div class="pt-4 text-sm opacity-70">
  实际延迟、成本和准确率，需要在自己的数据、网络和业务场景中实测。
</div>

<!--
规格来自官方 Models 文档。讲的时候要强调这些是公开参数，不是个人实测。
-->

---

# 官方 Cookbook 示例

<CookbookMetrics />

<div class="pt-4 text-xs opacity-70">
  来源：TypeSafe AI 官方 Cookbook。以下为官方示例结果，不是本项目的独立实测结论。
</div>

<!--
这页把调研底稿中的官方 Cookbook 数据补进演示：并行问题、重排和 Skill 推荐。视觉上复用 Rising Bars / chart-story 的“前后对比 + 数字落定”模式。

必须强调：这是官方示例结果，不能说成我们自己的 benchmark。
-->

---
layout: image-right
image: https://cover.sli.dev
---

# 演示 1：短视频开头体检器

输入：

- 标题
- 前 3 秒口播
- 点赞、转发、评论数据

问题：

<div class="grid grid-cols-2 gap-3 text-sm">
  <div class="border rounded p-2"><code>hook_type</code> · Choice</div>
  <div class="border rounded p-2"><code>opens_loop</code> · Noul</div>
  <div class="border rounded p-2"><code>has_evidence</code> · Noul</div>
  <div class="border rounded p-2"><code>virality_potential</code> · Score</div>
</div>

<!--
第一个演示面向内容工作流：把模糊的开头文案，变成几个可处理的评分字段。
-->

---

# 演示 1：示例输出

<div class="hf-meter-grid">
  <ConfidenceMeter label="钩子类型" :value="1" suffix=" · open_loop" tone="violet" />
  <ConfidenceMeter label="悬念强度" :value="0.91" :decimals="2" />
  <ConfidenceMeter label="证据强度" :value="0.24" :decimals="2" tone="amber" />
  <ConfidenceMeter label="爆款潜力" :value="2.7" :decimals="1" :max="3" suffix=" / 3" />
  <ConfidenceMeter label="置信度" :value="0.83" :decimals="2" tone="violet" />
</div>

<v-clicks>

- 悬念强 → 保留开头
- 证据弱 → 中段补事实
- 置信度低 → 人工复核

</v-clicks>

<div class="pt-4 text-xs opacity-70">示例输出，仅用于说明字段如何驱动动作。</div>

<!--
这个例子说明 Jev 的价值不是文案点评，而是能触发具体内容动作的字段。
-->

---
layout: two-cols
layoutClass: gap-12
---

# 演示 2：客服工单路由

用户说：

> 我已经被重复扣款两次了，三天没有人回复。我现在只想退款。

软件需要知道：

- 给哪个部门
- 优先级多高
- 是否退款
- 是否升级

::right::

<div class="hf-meter-stack">
  <ConfidenceMeter label="department" :value="1" suffix=" · billing" tone="violet" />
  <ConfidenceMeter label="urgency" :value="3" :decimals="1" :max="3" suffix=" / 3" />
  <ConfidenceMeter label="frustration" :value="2.8" :decimals="1" :max="3" suffix=" / 3" tone="amber" />
  <ConfidenceMeter label="refund_requested" :value="0.92" :decimals="2" />
  <ConfidenceMeter label="escalate" :value="0.94" :decimals="2" />
</div>

<div class="pt-3 text-xs opacity-70">示例输出，非真实调用。</div>

<!--
客服系统需要的不是一段回复，而是处理路径。Jev 负责分流和升级判断，不负责生成安抚话术。
-->

---

# 把判断变成业务动作

```ts {1-3|5-6|all}
route_to_billing(ticket)
set_priority_high(ticket)
attach_refund_workflow(ticket)

if (confidence < 0.6) {
  send_to_human_review(ticket)
}
```

<RouteNotification />

<!--
这一页把模型输出接入业务系统。阈值只是示例，实际要按误判成本和复核成本调优。

右下角的系统通知借用了 Common Effects 里的 macOS notification 形态，用来强调“Jev 的结果最终要变成业务事件”。
-->

---

# GitHub 与工具生态

<div class="grid grid-cols-2 gap-6 pt-4 text-sm">
  <div class="border rounded p-5">
    <div class="text-lg font-bold">官方</div>
    <div class="pt-2">Python SDK · JavaScript SDK</div>
    <div>Agent Skills · System One Adapter</div>
  </div>
  <div class="border rounded p-5">
    <div class="text-lg font-bold">社区</div>
    <div class="pt-2">jev-ultrafast · fast-jev-compaction</div>
    <div>awesome-jev · jev-arena</div>
  </div>
</div>

<div class="pt-5">
  模型权重不开源；开源的是 SDK、Skill、适配器与社区工具。
</div>

<!--
生态口径要准确：Jev 是托管 API，不是开源权重模型。
-->

---

# 边界与风险

<div class="grid grid-cols-2 gap-6 pt-4 text-sm">
  <div class="border rounded p-5">
    <div class="text-lg font-bold">不适合</div>
    <ul class="pt-2">
      <li>文本生成</li>
      <li>数学计算与精确计数</li>
      <li>日期 / 时间比较</li>
      <li>多层间接推理</li>
      <li>图片、音频、视频理解</li>
    </ul>
  </div>
  <div class="border rounded p-5">
    <div class="text-lg font-bold">工程风险</div>
    <ul class="pt-2">
      <li>无关上下文会干扰判断</li>
      <li>对抗性内容可能影响输出</li>
      <li>中文效果需要实测</li>
      <li>高风险决策必须有人工兜底</li>
    </ul>
  </div>
</div>

<!--
类型安全不等于语义正确。官方说的“不会 hallucinate”应理解为不会生成 schema 外自由文本，而不是永远判断正确。
-->

---

# 落地前测试清单

<v-clicks>

- 准备 20–50 条带标注的真实样本
- 分别测试中文和英文效果
- 实测延迟、批量调用和失败重试
- 对比普通 LLM JSON mode 的成本与效果
- 调优 confidence 阈值与人工复核比例
- 设置灰度、日志、审计和回滚

</v-clicks>

<!--
工程落地不要问“能不能取代 GPT”，要问决策是否高频、答案空间是否能定义、误判成本是否可控。
-->

---
layout: center
class: text-center
---

# Jev 不是更会说话的 AI

## 而是更容易被软件使用的 AI

<div class="pt-8 text-sm opacity-70">
  生成负责表达，决策负责执行。
</div>

<PoweredBySlidev mt-10 />

<!--
收束到核心定位：Jev 与通用 LLM 更像互补层，不是替代关系。
-->

---

# 主要来源

<div class="grid grid-cols-2 gap-5 text-sm">
  <div><a href="https://typesafe.ai/" target="_blank">TypeSafe AI 官网</a></div>
  <div><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank">发布博客</a></div>
  <div><a href="https://docs.typesafe.ai/" target="_blank">官方文档</a></div>
  <div><a href="https://docs.typesafe.ai/concepts/system-one" target="_blank">System One</a></div>
  <div><a href="https://docs.typesafe.ai/api" target="_blank">API Reference</a></div>
  <div><a href="https://docs.typesafe.ai/models" target="_blank">Models</a></div>
  <div><a href="https://github.com/typesafe-ai" target="_blank">GitHub</a></div>
</div>

<div class="pt-8 text-xs opacity-70">
  模板来源：Slidev 官方 Starter Template · 内容来源：2026-09 Jev 调研底稿
</div>

<!--
保留来源页，方便观众复核。也说明本 deck 是基于官方 Starter Template 重制。
-->

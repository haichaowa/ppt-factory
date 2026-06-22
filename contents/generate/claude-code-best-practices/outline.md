# Claude Code 最佳实践 — 幻灯片大纲

---

## 第 1 页：封面

- **Pattern**：`center`
- **章节**：封面
- **核心内容**：
  - 主标题：Claude Code 最佳实践
  - 副标题：从入门到高效，掌握 AI 编程助手的正确打开方式
- **布局细节**：
  - 使用 `layout: center`，flex 纵向居中布局
  - 主标题大字号，副标题小字号低透明度
  - glowSeed: 100, glow: full
- **备注**：封面页，简洁有力

---

## 第 2 页：什么是 Claude Code

- **Pattern**：`default`
- **章节**：认识 Claude Code
- **核心内容**：
  - Claude Code 不是聊天机器人——它是代理式编码环境
  - 能读取文件、运行命令、自主解决问题
  - 你描述目标，Claude 探索、规划并实现
- **布局细节**：
  - 标题 + 3 个要点列表，使用 v-clicks 逐条展示
  - 每个要点配一个图标（i-carbon:terminal、i-carbon:flow、i-carbon:code）
- **备注**：面向初学者，建立基础认知

---

## 第 3 页：与传统 AI 助手的区别

- **Pattern**：`comparison`
- **章节**：认识 Claude Code
- **核心内容**：
  - 左栏：传统 AI 助手——被动回答、需要人工复制代码、无执行能力
  - 右栏：Claude Code——主动探索、直接修改文件、可运行命令
- **布局细节**：
  - 双栏卡片对比
  - 左栏用 orange 色系（旧方式），右栏用 green 色系（新方式）
  - 每栏 2-3 条要点

---

## 第 4 页：最重要的资源——Context Window

- **Pattern**：`metrics`
- **章节**：认识 Claude Code
- **核心内容**：
  - Context Window 保存整个对话：每条消息、每个文件、每个命令输出
  - 单次调试可能消耗数万 token
  - 当 context 填满，性能会下降
- **布局细节**：
  - 3 个指标卡片横向排列
  - 指标 1：大数字"整个对话" + 说明"消息、文件、命令全部保留"
  - 指标 2：大数字"数万" + 说明"单次调试消耗的 token"
  - 指标 3：大数字"性能下降" + 说明"context 填满的后果"
  - 使用 violet / blue / amber 色系

---

## 第 5 页：Context Window 是核心约束

- **Pattern**：`statement`
- **章节**：认识 Claude Code
- **核心内容**：
  - 本指南几乎所有最佳实践都围绕一个核心约束展开：context window 会快速填满
  - 管好 context = 管好 Claude 的表现
- **布局细节**：
  - `layout: center`，居中大字核心结论
  - 一句话陈述，配合 glow 发光效果
- **备注**：这是一个呼吸页，用一句话收束前几页的认知铺垫

---

## 第 6 页：章节分隔——核心原则

- **Pattern**：`section`
- **章节**：核心原则：让 Claude 验证自己
- **核心内容**：
  - 章节标题：核心原则
  - 副标题：给 Claude 一种验证自己工作的方式
- **布局细节**：
  - `layout: section`
  - glowSeed: 200

---

## 第 7 页：为什么验证是最高杠杆的事

- **Pattern**：`comparison`
- **章节**：核心原则：让 Claude 验证自己
- **核心内容**：
  - 左栏：没有验证——Claude 产出看似正确但实际无效的代码，你成为唯一的反馈循环
  - 右栏：有验证——Claude 自检、自纠、迭代，你只需关注结果
- **布局细节**：
  - 双栏对比，左 orange 右 green
  - 每栏各一条核心描述 + 一个小代码示例

---

## 第 8 页：三种验证策略

- **Pattern**：`card-grid`
- **章节**：核心原则：让 Claude 验证自己
- **核心内容**：
  - 提供验证标准：给出测试用例和预期输出
  - 视觉验证 UI：截图对比，列出差异并修复
  - 根因修复：粘贴错误信息，修复并验证构建成功
- **布局细节**：
  - 3 列卡片网格（grid-cols-3）
  - 卡片 1：violet 色系，标题"提供验证标准"，描述含 before/after 对比
  - 卡片 2：blue 色系，标题"视觉验证 UI"，描述截图对比流程
  - 卡片 3：green 色系，标题"根因修复"，描述错误粘贴 + 验证构建
  - 每张卡片含简短 before→after 示例

---

## 第 9 页：验证方式不止测试

- **Pattern**：`default`
- **章节**：核心原则：让 Claude 验证自己
- **核心内容**：
  - 验证可以是：测试套件、linter、Bash 命令、Chrome 扩展截图
  - 投资让验证更可靠——这是你能做的最重要的事
- **布局细节**：
  - 标题 + 要点列表，配合 v-clicks
  - 每种验证方式配图标
- **备注**：收束验证章节，强调可操作的投资方向

---

## 第 10 页：章节分隔——工作流

- **Pattern**：`section`
- **章节**：标准工作流
- **核心内容**：
  - 章节标题：标准工作流
  - 副标题：先探索，再规划，最后编码
- **布局细节**：
  - `layout: section`
  - glowSeed: 300

---

## 第 11 页：四阶段工作流总览

- **Pattern**：`steps-pipeline`
- **章节**：标准工作流
- **核心内容**：
  - 探索 → 规划 → 实现 → 提交
  - 4 个步骤水平排列，箭头连接
- **布局细节**：
  - 4 个步骤卡片：violet(探索) → blue(规划) → green(实现) → amber(提交)
  - 每个卡片配图标：i-carbon:search、i-carbon:document、i-carbon:code、i-carbon:send
  - 使用 v-clicks 逐个展示

---

## 第 12 页：阶段一——探索

- **Pattern**：`code-focus`
- **章节**：标准工作流
- **核心内容**：
  - 进入 Plan Mode，Claude 只读不写
  - 读取文件、理解架构、回答问题
- **布局细节**：
  - 左侧：模拟 Plan Mode 对话代码块（3-4 行示例提示）
  - 右侧：2 个注释要点
    - "Plan Mode 下 Claude 不做任何修改"
    - "适合理解代码结构、查找问题根源"
  - violet 色系边框

---

## 第 13 页：阶段二——规划

- **Pattern**：`code-focus`
- **章节**：标准工作流
- **核心内容**：
  - 要求 Claude 创建详细实现计划
  - 用 Ctrl+G 打开编辑器直接修改计划
- **布局细节**：
  - 左侧：Plan Mode 示例提示（"What files need to change? Create a plan."）
  - 右侧：2 个注释要点
    - "明确列出需修改的文件和步骤"
    - "Ctrl+G 可直接编辑计划文本"
  - blue 色系边框

---

## 第 14 页：阶段三和四——实现与提交

- **Pattern**：`default`
- **章节**：标准工作流
- **核心内容**：
  - 实现：切回 Normal Mode，让 Claude 按计划编码并运行测试
  - 提交：描述性 commit message + 创建 PR
- **布局细节**：
  - 两段式内容，上半部分"实现"下半部分"提交"
  - 各配一个简短代码示例提示
  - green / amber 色系区分

---

## 第 15 页：什么时候跳过规划

- **Pattern**：`comparison`
- **章节**：标准工作流
- **核心内容**：
  - 左栏：跳过规划——修拼写错误、加一行日志、重命名变量（一句话能描述的 diff）
  - 右栏：需要规划——涉及多文件、方法不确定、不熟悉的代码
- **布局细节**：
  - 双栏对比
  - 左栏 green 色系（直接做），右栏 violet 色系（先规划）
  - 各列 2-3 条判断标准

---

## 第 16 页：章节分隔——提示技巧

- **Pattern**：`section`
- **章节**：写出好提示
- **核心内容**：
  - 章节标题：写出好提示
  - 副标题：你的指令越精确，需要的修正就越少
- **布局细节**：
  - `layout: section`
  - glowSeed: 400

---

## 第 17 页：四种提示优化策略

- **Pattern**：`card-grid`
- **章节**：写出好提示
- **核心内容**：
  - 限定任务范围：指定文件、场景、测试偏好
  - 指向来源：引导 Claude 到可回答问题的源头
  - 参考现有模式：指向代码库中的范例
  - 描述症状：提供现象、位置和预期修复
- **布局细节**：
  - 2x2 卡片网格（grid-cols-2）
  - 4 张卡片分别用 violet / blue / green / amber 色系
  - 每张卡片标题 + 一句精简描述
  - 图标：i-carbon:target、i-carbon:locator、i-carbon:reference、i-carbon:stethoscope

---

## 第 18 页：限定任务范围——对比示例

- **Pattern**：`comparison`
- **章节**：写出好提示
- **核心内容**：
  - 左栏（模糊）：为 foo.py 添加测试
  - 右栏（精确）：为 foo.py 编写测试，覆盖用户已注销的边界情况，避免 mock
- **布局细节**：
  - 双栏对比，左 orange（模糊提示）右 green（精确提示）
  - 每栏展示提示文字，用代码块样式包裹

---

## 第 19 页：参考现有模式——对比示例

- **Pattern**：`comparison`
- **章节**：写出好提示
- **核心内容**：
  - 左栏（模糊）：添加日历小部件
  - 右栏（精确）：查看 HotDogWidget.php 了解模式，按同样模式实现日历小部件，不引入新库
- **布局细节**：
  - 双栏对比，左 orange 右 green
  - 代码块包裹提示文字

---

## 第 20 页：提供丰富的内容

- **Pattern**：`card-grid`
- **章节**：写出好提示
- **核心内容**：
  - @ 引用文件：不用描述位置，Claude 直接读取
  - 粘贴图片：复制/粘贴或拖放到提示中
  - 提供 URL：文档和 API 参考，用 /permissions 允许域名
  - 管道数据：cat error.log | claude
  - 让 Claude 自己获取：用 Bash、MCP 或读文件拉取上下文
- **布局细节**：
  - 3 列 2 行网格（grid-cols-3，共 5 张卡片，最后一张跨列）
  - 前 4 张均匀排列，第 5 张居中或跨 2 列
  - 各卡片用不同色系，配图标

---

## 第 21 页：章节分隔——配置环境

- **Pattern**：`section`
- **章节**：配置你的环境
- **核心内容**：
  - 章节标题：配置你的环境
  - 副标题：一次配置，所有会话受益
- **布局细节**：
  - `layout: section`
  - glowSeed: 500

---

## 第 22 页：CLAUDE.md——Claude 的持久记忆

- **Pattern**：`default`
- **章节**：配置你的环境
- **核心内容**：
  - CLAUDE.md 是 Claude 每次对话开始时自动读取的特殊文件
  - 包含 Bash 命令、代码风格、工作流规则
  - 提供无法从代码推断的持久上下文
  - 用 /init 命令一键生成初始版本
- **布局细节**：
  - 标题 + 4 个要点，v-clicks 逐条展示
  - 每条配图标

---

## 第 23 页：CLAUDE.md 示例

- **Pattern**：`code-focus`
- **章节**：配置你的环境
- **核心内容**：
  - 展示一个简洁的 CLAUDE.md 示例文件
  - 右侧注释说明各部分作用
- **布局细节**：
  - 左侧（col-span-3）：CLAUDE.md 代码块，约 8 行
    - Code style 部分：ES modules、解构导入
    - Workflow 部分：完成修改后类型检查、优先跑单测
  - 右侧（col-span-2）：3 个注释要点
    - "代码风格：Claude 无法从代码推断的规则"
    - "工作流：确保 Claude 按正确步骤执行"
    - "保持简洁——每条规则都要经得起删除测试"

---

## 第 24 页：CLAUDE.md 该写什么

- **Pattern**：`comparison`
- **章节**：配置你的环境
- **核心内容**：
  - 左栏（写）：无法猜测的 Bash 命令、非默认代码风格、测试指令、仓库礼仪、架构决策、环境怪癖、常见陷阱
  - 右栏（不写）：代码能推断的、标准语言约定、详细 API 文档、频繁变化的信息、长篇解释、"写干净代码"类废话
- **布局细节**：
  - 双栏对比
  - 左栏 green 色系（包含），右栏 red/orange 色系（排除）
  - 各列 4 条要点

---

## 第 25 页：CLAUDE.md 的放置位置

- **Pattern**：`architecture`
- **章节**：配置你的环境
- **核心内容**：
  - 展示 CLAUDE.md 在不同位置的层级关系和作用范围
- **布局细节**：
  - 3 层架构图
  - 顶层（violet）：全局 ~/.claude/CLAUDE.md —— 所有会话生效
  - 中层（blue）：项目根 ./CLAUDE.md —— git 共享团队配置 + ./CLAUDE.local.md —— 个人笔记
  - 底层（green）：子目录 ./src/CLAUDE.md —— 按需加载
  - 层间用箭头连接，标注作用范围

---

## 第 26 页：配置权限

- **Pattern**：`card-grid`
- **章节**：配置你的环境
- **核心内容**：
  - Auto Mode：分类器自动审批，仅阻止高风险操作
  - 权限允许列表：允许已知安全命令如 npm run lint
  - 沙箱：操作系统级隔离，限制文件系统和网络
- **布局细节**：
  - 3 列卡片（grid-cols-3）
  - violet / blue / green 色系
  - 每张卡片标题 + 一句说明 + 适用场景

---

## 第 27 页：CLI 工具与 MCP 服务器

- **Pattern**：`card-grid`
- **章节**：配置你的环境
- **核心内容**：
  - CLI 工具：与外部服务交互最高效的方式（gh、aws、gcloud）
  - MCP 服务器：claude mcp add 连接 Notion、Figma、数据库等
- **布局细节**：
  - 2 列卡片（grid-cols-2）
  - 左卡片 blue 色系：CLI 工具
  - 右卡片 violet 色系：MCP 服务器
  - 每张配简短代码示例

---

## 第 28 页：Hooks——确定性自动化

- **Pattern**：`default`
- **章节**：配置你的环境
- **核心内容**：
  - Hooks 在工作流特定点自动运行脚本
  - 与 CLAUDE.md 不同：hooks 是确定性的，保证执行
  - 示例：每次编辑后运行 eslint、阻止写入迁移文件夹
- **布局细节**：
  - 标题 + 3 个要点
  - 配一个简短 JSON 配置代码块示例
  - 图标：i-carbon:hook

---

## 第 29 页：Skills——领域知识扩展

- **Pattern**：`code-focus`
- **章节**：配置你的环境
- **核心内容**：
  - 在 .claude/skills/ 创建 SKILL.md 文件
  - 提供项目/团队/领域专属知识
  - Claude 按需加载，不膨胀每次对话
- **布局细节**：
  - 左侧（col-span-3）：SKILL.md 示例代码块
    - frontmatter 含 name 和 description
    - 内容为 API 约定列表
  - 右侧（col-span-2）：2 个注释要点
    - "Claude 相关时自动应用，也可 /skill-name 手动调用"
    - "与 CLAUDE.md 互补：域知识放 skills，通用规则放 CLAUDE.md"
  - green 色系边框

---

## 第 30 页：Subagents——隔离任务委托

- **Pattern**：`default`
- **章节**：配置你的环境
- **核心内容**：
  - Subagents 在独立 context 中运行
  - 适合读取大量文件或需要专门关注的任务
  - 不污染主对话 context
- **布局细节**：
  - 标题 + 3 个要点
  - 配一个简短的 subagent 定义示例代码块（.claude/agents/security-reviewer.md）
  - 图标：i-carbon:group

---

## 第 31 页：扩展能力一览

- **Pattern**：`data-table`
- **章节**：配置你的环境
- **核心内容**：
  - 对比 5 种扩展方式的使用场景
- **布局细节**：
  - 表格含 4 列：扩展方式 | 何时使用 | 加载方式 | 确定性
  - 行：CLAUDE.md / Skills / Hooks / Subagents / MCP
  - 高亮每行的关键特征
- **备注**：这是配置章节的收束页，用表格帮观众建立整体认知

---

## 第 32 页：章节分隔——沟通技巧

- **Pattern**：`section`
- **章节**：有效沟通
- **核心内容**：
  - 章节标题：有效沟通
  - 副标题：像问资深工程师一样提问
- **布局细节**：
  - `layout: section`
  - glowSeed: 600

---

## 第 33 页：问对问题

- **Pattern**：`default`
- **章节**：有效沟通
- **核心内容**：
  - 问 Claude 你会问资深工程师的问题
  - 示例：日志如何工作？如何创建新 API 端点？这段代码为什么这样写？
  - 这是最高效的入职方式
- **布局细节**：
  - 标题 + 3 个示例问题（用引号卡片样式）
  - 每个问题配图标
  - v-clicks 逐个展示

---

## 第 34 页：让 Claude 采访你

- **Pattern**：`steps-pipeline`
- **章节**：有效沟通
- **核心内容**：
  - 对于大功能，从最小提示开始，让 Claude 采访你
  - Claude 会追问技术实现、UI/UX、边界情况
  - 采访完成后写 SPEC.md，新会话执行
- **布局细节**：
  - 3 步水平流程：最小提示 → Claude 采访 → 输出 SPEC.md
  - violet → blue → green 色系
  - 紧凑变体（无图标区域，py-3）

---

## 第 35 页：章节分隔——会话管理

- **Pattern**：`section`
- **章节**：会话管理
- **核心内容**：
  - 章节标题：会话管理
  - 副标题：对话是持久的和可逆的
- **布局细节**：
  - `layout: section`
  - glowSeed: 700

---

## 第 36 页：尽早且经常纠偏

- **Pattern**：`card-grid`
- **章节**：会话管理
- **核心内容**：
  - Esc：中途停止，保留 context
  - Esc+Esc / /rewind：回溯到之前的对话和代码状态
  - "撤销那个"：让 Claude 恢复更改
  - /clear：重置 context，重新开始
- **布局细节**：
  - 2x2 卡片网格
  - 4 张卡片用 violet / blue / green / amber 色系
  - 每张卡片：操作名称 + 快捷键 + 一句说明
  - 图标：i-carbon:stop、i-carbon:undo、i-carbon:close、i-carbon:reset

---

## 第 37 页：Context 管理工具箱

- **Pattern**：`annotated-list`
- **章节**：会话管理
- **核心内容**：
  - /clear：不相关任务间完全重置
  - 自动压缩：接近限制时自动总结重要信息
  - /compact：手动压缩并指定保留重点
  - /btw：快速问题不进入对话历史
- **布局细节**：
  - 4 行注释列表
  - 左侧参数名（命令），右侧说明
  - violet / blue / green / amber 色系交替

---

## 第 38 页：关键规则——两次纠偏后 /clear

- **Pattern**：`statement`
- **章节**：会话管理
- **核心内容**：
  - 如果对同一问题纠偏超过两次，context 已被失败方法污染
  - /clear + 更好的提示，几乎总是优于长会话 + 累积纠偏
- **布局细节**：
  - `layout: center`，居中大字结论
  - 一句话核心规则
- **备注**：呼吸页，强调核心纪律

---

## 第 39 页：检查点与回溯

- **Pattern**：`default`
- **章节**：会话管理
- **核心内容**：
  - Claude 每次操作前自动创建检查点
  - 可恢复对话、代码或两者到任意检查点
  - 检查点跨会话持久，关闭终端后仍可回溯
- **布局细节**：
  - 标题 + 3 个要点
  - 配图：简单的检查点时间线示意（3 个圆点 + 连线）
  - 底部小字警告：检查点不跟踪外部进程，不是 git 替代品

---

## 第 40 页：恢复对话

- **Pattern**：`code-focus`
- **章节**：会话管理
- **核心内容**：
  - claude --continue：继续最近对话
  - claude --resume：从历史会话中选择
  - /rename：给会话命名便于后续查找
- **布局细节**：
  - 左侧（col-span-3）：CLI 命令代码块（3 行命令）
  - 右侧（col-span-2）：3 个注释要点
    - "跨会话保持 context"
    - "用描述性命名管理多个工作流"
    - "不同工作流有独立的持久 context"
  - blue 色系边框

---

## 第 41 页：章节分隔——自动化与扩展

- **Pattern**：`section`
- **章节**：自动化与扩展
- **核心内容**：
  - 章节标题：自动化与扩展
  - 副标题：从一个 Claude 到 N 个 Claude
- **布局细节**：
  - `layout: section`
  - glowSeed: 800

---

## 第 42 页：非交互模式

- **Pattern**：`code-focus`
- **章节**：自动化与扩展
- **核心内容**：
  - claude -p "prompt" 非交互运行
  - 支持 JSON、流式输出
  - 集成 CI、pre-commit hooks、脚本
- **布局细节**：
  - 左侧（col-span-3）：3 行命令代码块
    - claude -p "Explain this project"
    - claude -p "List endpoints" --output-format json
    - claude -p "Analyze log" --output-format stream-json
  - 右侧（col-span-2）：3 个注释要点
    - "一次性查询，无需会话"
    - "JSON 输出适合脚本解析"
    - "流式输出适合实时处理"
  - violet 色系边框

---

## 第 43 页：并行会话与扇出

- **Pattern**：`card-grid`
- **章节**：自动化与扩展
- **核心内容**：
  - 桌面应用：可视化管理多个本地会话
  - Web 版：云端隔离 VM
  - Agent Teams：多会话自动协调
  - Writer/Reviewer 模式：一个写代码，一个审查
- **布局细节**：
  - 2x2 卡片网格
  - 4 张卡片用 violet / blue / green / amber 色系
  - 图标：i-carbon:desktop、i-carbon:cloud、i-carbon:group-objects、i-carbon:review

---

## 第 44 页：章节分隔——常见陷阱

- **Pattern**：`section`
- **章节**：常见陷阱与总结
- **核心内容**：
  - 章节标题：常见陷阱
  - 副标题：识别这些错误模式，尽早纠正
- **布局细节**：
  - `layout: section`
  - glowSeed: 900

---

## 第 45 页：五大失败模式

- **Pattern**：`faq`
- **章节**：常见陷阱与总结
- **核心内容**：
  - 厨房水槽会话：不相关任务混在一个会话 → 修复：/clear
  - 反复纠偏：context 被失败方法污染 → 修复：两次后 /clear + 更好提示
  - 过度 CLAUDE.md：规则在噪音中丢失 → 修复：无情修剪
  - 信任不验证：看似合理但不处理边界 → 修复：始终提供验证
  - 无限探索：不限范围地调查 → 修复：限定范围或用 subagent
- **布局细节**：
  - 5 个 Q/A 风格卡片纵向排列
  - 每个卡片：问题（红色系标题）+ 修复方案（green 色系回答）
  - v-clicks 逐个展开
- **备注**：这是高密度页，内容精简到每条一句话

---

## 第 46 页：培养你的直觉

- **Pattern**：`quote`
- **章节**：常见陷阱与总结
- **核心内容**：
  - 这些模式不是教条，而是通常有效的起点
  - 有时你应该累积 context、有时应该跳过规划、有时模糊提示正是你想要的
  - 注意什么有效，问为什么，培养没有指南能捕捉的直觉
- **布局细节**：
  - `layout: quote`
  - 核心引言居中展示
- **备注**：呼吸页，从失败模式过渡到总结

---

## 第 47 页：关键要点回顾

- **Pattern**：`metrics`
- **章节**：常见陷阱与总结
- **核心内容**：
  - 核心指标 1：Context Window 是最重要的资源
  - 核心指标 2：验证 > 纠偏——让 Claude 自检
  - 核心指标 3：探索→规划→编码，不要跳步
  - 核心指标 4：简洁的 CLAUDE.md > 臃肿的文档
- **布局细节**：
  - 4 个大数字/关键词指标横向排列
  - violet / blue / green / amber 色系
  - 每个指标：一个关键词 + 一句说明

---

## 第 48 页：学习资源

- **Pattern**：`annotated-list`
- **章节**：常见陷阱与总结
- **核心内容**：
  - Claude Code 工作原理：代理循环、工具和 context 管理
  - 扩展 Claude Code：skills、hooks、MCP、subagents
  - 常见工作流：调试、测试、PR 等分步配方
  - CLAUDE.md：存储项目约定和持久 context
- **布局细节**：
  - 4 行注释列表
  - 左侧：资源名称
  - 右侧：一句话描述
  - violet / blue / green / amber 色系

---

## 第 49 页：结束页

- **Pattern**：`end`
- **章节**：结束
- **核心内容**：
  - 感谢聆听
  - 开始使用：claude --init
  - 问题与讨论
- **布局细节**：
  - `layout: end`
  - 居中布局，简洁文字
  - glowSeed: 999, glow: full

---

## 页面统计

| 章节 | 页数 |
|------|------|
| 封面 | 1 |
| 认识 Claude Code | 4 |
| 核心原则：验证 | 4 |
| 标准工作流 | 6 |
| 写出好提示 | 6 |
| 配置你的环境 | 10 |
| 有效沟通 | 3 |
| 会话管理 | 6 |
| 自动化与扩展 | 3 |
| 常见陷阱与总结 | 6 |
| **总计** | **49** |

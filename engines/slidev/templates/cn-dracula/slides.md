---
theme: dracula
title: Dracula 代码风模板
highlighter: shiki
transition: slide-left
mdc: true
lang: zh-CN
---

# Dracula 代码风

### 紫粉暗色 · 为代码而生

<div class="pt-12 font-mono text-sm opacity-70">
  $ npx slidev --watch
</div>

---

# 环境安装

```bash {1|2|3|all}
# Node.js >= 22.12.0
node -v

# 一键初始化项目
npm init slidev@latest

# 启动开发服务器
npx slidev
```

---

# 语法高亮

Dracula 配色 + Shiki 高亮器，多语言支持：

```python {2|3-4|all}
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(10)])
```

---

# 终端演示

```bash
$ git clone https://github.com/you/your-talk.git
$ cd your-talk && npm i
$ npm run dev

  ▲ Slidev  v53.0.0
  ➜  Local:   http://localhost:3030/
  ➜  Network: use --host to expose
```

---

# Mermaid 暗色图表

```mermaid {theme: 'dark'}
graph LR
    Code[Markdown] --> Build[Vite Build]
    Build --> HTML[静态 HTML]
    Build --> PDF[导出 PDF]
    Build --> PPTX[导出 PPTX]
```

---
layout: center
---

# Happy Hacking

### `<Slidev />`

<div class="pt-6 font-mono text-sm opacity-60">
  github.com/slidevjs/slidev
</div>

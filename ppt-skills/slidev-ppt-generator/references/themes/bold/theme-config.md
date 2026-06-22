# Bold 主题配置

## 主题 ID: bold

大字号 + 强对比 + 几何渐变背景的 Keynote 风，为产品发布、主题演讲、商业提案等场景提供视觉冲击力强的舞台感。

## 适用场景

| 场景 | 适配度 | 说明 |
|------|--------|------|
| 产品发布 / 主题演讲 | ✅ 最佳 | 大字号、强对比，舞台远距离可读 |
| 商业提案 / 路演 | ✅ 最佳 | 强视觉冲击，记忆点突出 |
| Keynote 风 / 大会主旨 | ✅ 推荐 | Apple / Stripe 风格 |
| 学术答辩 / 咨询报告 | ❌ 不推荐 | 过于张扬 —— 用 minimal |
| 代码深度讲解 | ❌ 不推荐 | 字号过大挤占代码空间 —— 用 glow |

## 必需文件

| 文件 | 路径 | 说明 |
|------|------|------|
| global-bottom.vue | `assets/themes/bold/global-bottom.vue` | 渐变背景（径向渐变 + 对角线渐变） |
| uno.config.ts | `assets/themes/bold/uno.config.ts` | UnoCSS 配置（Inter 字体 + bunny provider） |
| style.css | `assets/themes/bold/style.css` | 大字号、粗字重、强阴影、渐变文字 |

## 全局 Headmatter 约束

```yaml
colorSchema: dark          # 推荐：深色背景配合渐变光晕（light 也可）
css: unocss                # 必须
highlighter: shiki         # 推荐
transition: slide-left     # 推荐：更有舞台感的切换效果
fonts:
  sans: 'Inter'            # 无衬线、紧字距、现代
  mono: 'JetBrains Mono'
```

## Per-Slide Frontmatter 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `boldAccent` | string | `'orange'` | 强调色（orange/blue/emerald/pink） |
| `boldEffect` | string | — | 特殊效果：`pulse` / `float` / `stroke` |

## 设计模式

### 大字号 Hero 页（Apple 风）
```html
---
layout: center
class: px-20
---

<div class="text-center">
  <div class="text-8xl font-extrabold tracking-tight leading-none">
    <span class="bold-gradient-text">产品名称</span>
  </div>
  <div class="text-2xl mt-6 opacity-70">一句话价值主张</div>
</div>
```

### 渐变文字
```html
<span class="bold-gradient-text">高亮关键词</span>
```

### 描边文字（空心）
```html
<div class="bold-stroke-text text-7xl font-extrabold">
  OUTLINE TEXT
</div>
```

### 大卡片（强阴影）
```html
<div class="bold-card bg-white dark:bg-gray-800 p-10">
  <div class="text-3xl font-bold mb-4">卡片标题</div>
  <div class="text-lg opacity-70">卡片描述</div>
</div>
```

## 配色方案

| 色系 | 可用颜色 | 适用场景 |
|------|---------|---------|
| 暖色主色 | `orange-500` / `red-500` / `pink-500` | 热情、发布、创新 |
| 冷色主色 | `blue-600` / `indigo-600` / `purple-600` | 专业、科技、信任 |
| 自然色 | `emerald-500` / `teal-500` / `cyan-500` | 增长、生态、健康 |
| 中性色 | `gray-900` / `gray-700` / `white` | 正文、次要 |

## 已知约束

1. **标题字号必须 ≥ `text-5xl`（48pt）** —— Bold 主题的灵魂
2. **不推荐使用衬线字体** —— 与现代感冲突
3. **代码块会占较大空间** —— 代码超过 10 行的页面考虑改用 glow 主题
4. **`backdrop-blur` 效果较弱** —— 改用实色 `bg-white/10` 或 `bg-black/20`
5. **Web Fonts 必须使用 `provider: 'bunny'`** —— 国内网络限制
6. **`/` 在裸属性中会导致编译错误** —— 必须用 `class="..."` 形式

## 排版风格

- **标题字重**：`font-extrabold`（800）或 `font-black`（900）
- **字距**：`tracking-tight` 或 `tracking-tighter`（紧字距显大字感）
- **行高**：`leading-none` 或 `leading-tight`（标题）
- **对比**：正文 `text-xl` 起，与标题 `text-6xl+` 形成 3x+ 对比

## 动画风格

Bold 主题提供 2 个专属动画：
- `animate-bold-pulse` —— 脉冲缩放（强调元素）
- `animate-bold-float` —— 上下浮动（装饰元素）

**推荐使用 v-click + scale/translate 过渡**（比 Glow 主题的 fade 更有舞台感）：
```html
<div
  v-click="1"
  transition transform duration-700
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  大卡片内容
</div>
```

# Dark-Pro 主题配置

## 主题 ID: dark-pro

深蓝灰背景 + 细网格 + 克制配色的企业汇报主题，为季度 review、战略汇报、数据分享等场景提供专业稳重的视觉。

## 适用场景

| 场景 | 适配度 | 说明 |
|------|--------|------|
| 企业内部汇报 / 季度 review | ✅ 最佳 | 稳重、数据导向、专业感 |
| 战略汇报 / 高管演讲 | ✅ 最佳 | 深色背景 + 克制配色显正式 |
| 数据分享 / KPI 复盘 | ✅ 推荐 | tabular-nums + 徽章组件 |
| 产品发布 / 主题演讲 | ❌ 不推荐 | 过于稳重 —— 用 bold |
| 学术答辩 | ❌ 不推荐 | 过于商业 —— 用 minimal |
| 创意分享 | ❌ 不推荐 | 过于严肃 —— 用 neon |

## 必需文件

| 文件 | 路径 | 说明 |
|------|------|------|
| global-bottom.vue | `assets/themes/dark-pro/global-bottom.vue` | 深蓝灰渐变 + 细网格 + 径向光晕 |
| uno.config.ts | `assets/themes/dark-pro/uno.config.ts` | UnoCSS 配置（Inter 字体 + bunny provider） |
| style.css | `assets/themes/dark-pro/style.css` | 数据数字、徽章、分隔线样式 |

## 全局 Headmatter 约束

```yaml
colorSchema: dark          # 必须：深色背景
css: unocss                # 必须
highlighter: shiki         # 推荐
transition: fade-out       # 推荐：稳重的过渡
fonts:
  sans: 'Inter'            # 无衬线、现代
  mono: 'JetBrains Mono'   # 等宽（数据 / 代码）
```

## Per-Slide Frontmatter 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `proAccent` | string | `'blue'` | 主色调（blue/indigo/emerald/amber） |
| `proGrid` | boolean | `true` | 是否显示网格背景 |

## 设计模式

### 数据徽章（KPI / 状态标签）
```html
<span class="dark-pro-badge">进行中</span>
<span class="dark-pro-badge dark-pro-badge-success">已完成</span>
<span class="dark-pro-badge dark-pro-badge-warning">延期</span>
<span class="dark-pro-badge dark-pro-badge-danger">阻塞</span>
```

### 强调卡片（左边框）
```html
<div class="dark-pro-card-accent">
  <div class="text-sm font-semibold text-blue-300">关键结论</div>
  <div class="text-sm mt-1 opacity-80">支撑数据 / 论据</div>
</div>
```

### 数据指标（tabular-nums）
```html
<div class="text-center">
  <div class="dark-pro-metric text-5xl font-bold text-blue-400">99.9%</div>
  <div class="text-sm mt-2 opacity-70">服务可用性 SLA</div>
</div>
```

### 分隔线
```html
<div class="dark-pro-divider" />
```

## 配色方案

| 色系 | 可用颜色 | 适用场景 |
|------|---------|---------|
| 主色 | `blue-400` / `blue-500` / `blue-600` | 主概念、数据高亮 |
| 辅助 | `indigo-400` / `slate-400` / `cyan-400` | 次要数据、说明 |
| 成功 | `emerald-400` / `green-400` | 达成、增长、正向 |
| 警告 | `amber-400` / `orange-400` | 延期、风险、注意 |
| 危险 | `red-400` / `rose-400` | 下降、失败、负向 |
| 中性 | `slate-300` / `slate-400` / `slate-500` | 正文、次要文字 |

## 已知约束

1. **必须使用 `colorSchema: dark`** —— 浅色背景破坏稳重感
2. **数字必须使用 `font-variant-numeric: tabular-nums`** —— 用 `dark-pro-metric` 类
3. **不推荐使用 Glow frontmatter 属性** —— 会被忽略但应避免
4. **不推荐使用 `backdrop-blur` 大范围** —— 仅用于卡片局部
5. **Web Fonts 必须使用 `provider: 'bunny'`** —— 国内网络限制
6. **`/` 在裸属性中会导致编译错误** —— 必须用 `class="..."` 形式

## 排版风格

- **标题字重**：`font-semibold`（600）或 `font-bold`（700），不超过 800
- **字距**：`tracking-tight`（紧字距）
- **行距**：`leading-relaxed`（1.625）用于段落，`leading-tight`（1.25）用于标题
- **数字对齐**：表格、指标必须 `tabular-nums`

## 动画约束

Dark-Pro 主题**不支持**以下动画：
- ❌ Glow 的 balance 动画
- ❌ Bold 的 pulse / float 动画
- ❌ 大幅度位移动画

**允许的动画**：
- ✅ `v-click` 简单 opacity 过渡
- ✅ `dark-pro-shimmer` 加载占位动画
- ✅ `transition duration-300` 短时过渡

## 数据展示最佳实践

### 表格（推荐 tabular-nums）
```html
| 指标 | Q1 | Q2 | Q3 | 同比 |
|------|-----|-----|-----|------|
| DAU | 12.5万 | 15.8万 | 18.2万 | +45% |
| 收入 | ¥820万 | ¥1,050万 | ¥1,280万 | +56% |
```

### 对比柱状图（CSS 实现）
```html
<div class="flex items-center gap-4">
  <div class="text-sm w-20">Q1</div>
  <div class="flex-1 bg-slate-800 rounded h-6 relative">
    <div class="absolute inset-y-0 left-0 bg-blue-500 rounded" style="width: 45%"></div>
  </div>
  <div class="text-sm tabular-nums w-16">12.5万</div>
</div>
```

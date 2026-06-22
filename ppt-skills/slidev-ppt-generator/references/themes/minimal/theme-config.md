# Minimal 主题配置

## 主题 ID: minimal

白底 + 衬线字体 + 无动效的极简学术主题，为论文答辩、咨询报告、研究报告等场景提供专业、克制、阅读友好的视觉风格。

## 适用场景

| 场景 | 适配度 | 说明 |
|------|--------|------|
| 学术答辩 / 论文汇报 | ✅ 最佳 | 衬线字体、无分散注意力的动效、白底高对比 |
| 咨询报告 / 研究报告 | ✅ 最佳 | 克制、专业、数据导向 |
| 企业白皮书 / 政策汇报 | ✅ 推荐 | 严肃场景、可打印为 PDF 纸质分发 |
| 技术分享 / 产品发布 | ❌ 不推荐 | 过于严肃，缺少视觉冲击 —— 用 glow 或 bold |
| 创意分享 / 设计相关 | ❌ 不推荐 | 过于克制 —— 用 neon |

## 必需文件

| 文件 | 路径 | 说明 |
|------|------|------|
| global-bottom.vue | `assets/themes/minimal/global-bottom.vue` | 空组件（无背景效果） |
| uno.config.ts | `assets/themes/minimal/uno.config.ts` | UnoCSS 配置（serif 字体 + bunny provider） |
| style.css | `assets/themes/minimal/style.css` | 白底、衬线、极简过渡 |

## 全局 Headmatter 约束

```yaml
colorSchema: light          # 必须：浅色背景
css: unocss                 # 必须：启用 UnoCSS
highlighter: shiki          # 推荐：Shiki 代码高亮
transition: fade            # 推荐：简单淡入淡出（非 fade-out）
fonts:
  sans: 'Source Sans 3'     # 无衬线（用于数据 / 表格）
  serif: 'Noto Serif SC'    # 衬线（正文 / 标题，学术感）
  mono: 'JetBrains Mono'    # 等宽（代码）
```

## Per-Slide Frontmatter 禁用项

Minimal 主题**不支持**以下 Glow 专属 frontmatter（会被忽略，不会报错）：

- ❌ `glow` / `glowOpacity` / `glowHue` / `glowSeed` —— 无发光效果
- ❌ `backdrop-blur` —— 毛玻璃效果与白底冲突
- ❌ `bg-{color}-900/10` 类深色底配色 —— 改用 `bg-{color}-50` / `bg-{color}-100`

## 设计模式

### 极简卡片（细边框 + 白底）
```html
<div class="border border-gray-200 rounded-sm bg-white px-5 py-4 shadow-sm">
  <div class="text-sm font-semibold text-gray-900">卡片标题</div>
  <div class="text-sm text-gray-600 mt-1">描述文字</div>
</div>
```

### 学术引用块
```html
<blockquote class="minimal-quote">
  引用内容
  <footer class="text-sm text-gray-500 mt-2">—— 作者, 《出处》(年份)</footer>
</blockquote>
```

### 章节分隔线
```html
<div class="minimal-divider" />
```

## 配色方案

| 色系 | 可用颜色（浅色版） | 适用场景 |
|------|-------------------|---------|
| 主色 | `gray-900` / `gray-700` / `gray-500` | 正文、标题、次要文字 |
| 强调色 | `blue-700` / `indigo-700` / `emerald-700` | 关键数据、重点高亮 |
| 警告色 | `amber-700` / `rose-700` / `red-700` | 问题、对比、旧方案 |
| 背景色 | `white` / `gray-50` / `gray-100` | 卡片底、页面背景 |

## 已知约束

1. **必须使用 `colorSchema: light`** —— 深色背景破坏学术克制感
2. **必须使用衬线字体作为正文** —— `Noto Serif SC` 是学术场景标配
3. **禁止使用 `backdrop-blur`** —— 毛玻璃效果与白底冲突
4. **禁止使用 Glow frontmatter 属性** —— `glow` / `glowSeed` 等会被忽略但应避免写入
5. **Web Fonts 必须使用 `provider: 'bunny'`** —— 国内网络限制
6. **`/` 在裸属性中会导致编译错误** —— 必须用 `class="text-gray-500/70"` 形式

## 排版风格

- **正文行距**：推荐 `leading-relaxed`（1.625）
- **段落间距**：推荐 `mb-4`
- **列表缩进**：推荐 `ml-6`
- **标题字重**：`font-semibold`（600）而非 `font-bold`（700）—— 学术克制
- **图表风格**：细线条（`stroke-width: 1.5`）、低饱和度配色

## 动画约束

Minimal 主题**不支持**以下动画：
- ❌ `animate-balance-shake` / `animate-balance-move-left` / `animate-balance-move-right`
- ❌ `blur(70px)` 类发光效果
- ❌ `scale-120` / `translate-y-30` 类大位移动画

**允许的动画**：
- ✅ `v-click` 简单出现/消失（opacity 过渡）
- ✅ `transition duration-300` 类短时过渡

# Neon 主题配置

## 主题 ID: neon

霓虹色 + 赛博朋克网格 + 故障美学的创意主题，为设计分享、创意演讲、技术艺术、黑客马拉松等场景提供强烈的视觉记忆点。

## 适用场景

| 场景 | 适配度 | 说明 |
|------|--------|------|
| 创意分享 / 设计相关 | ✅ 最佳 | 强烈视觉冲击，符合创意调性 |
| 黑客马拉松 / 创客分享 | ✅ 最佳 | 赛博朋克气质契合 |
| 游戏开发 / 互动艺术 | ✅ 推荐 | 霓虹效果 + glitch 动画 |
| 年轻受众 / 潮流话题 | ✅ 推荐 | 视觉记忆点强 |
| 企业内部汇报 | ❌ 不推荐 | 过于张扬 —— 用 dark-pro |
| 学术答辩 | ❌ 不推荐 | 过于花哨 —— 用 minimal |

## 必需文件

| 文件 | 路径 | 说明 |
|------|------|------|
| global-bottom.vue | `assets/themes/neon/global-bottom.vue` | 霓虹光团 + 赛博网格 + 扫描线 |
| uno.config.ts | `assets/themes/neon/uno.config.ts` | UnoCSS 配置（Orbitron + JetBrains Mono） |
| style.css | `assets/themes/neon/style.css` | 霓虹文字、发光边框、glitch 动画 |

## 全局 Headmatter 约束

```yaml
colorSchema: dark          # 必须：深色背景（深紫黑）
css: unocss                # 必须
highlighter: shiki         # 推荐
transition: fade-out       # 推荐
fonts:
  sans: 'Orbitron'         # 科技感无衬线
  mono: 'JetBrains Mono'   # 等宽（代码 / 终端风）
  hand: 'Press Start 2P'   # 像素字体（特殊场景）
```

## Per-Slide Frontmatter 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `neonHue` | number | `280` | 色调偏移（0-360），0=粉紫，90=青绿，180=青蓝 |
| `neonIntensity` | number | `0.6` | 光团强度（0-1） |
| `neonSeed` | string | `'neon-default'` | 光团布局种子 |

## 设计模式

### 霓虹文字（彩色发光）
```html
<div class="neon-text-pink text-6xl font-bold">PINK NEON</div>
<div class="neon-text-cyan text-4xl">CYAN NEON</div>
<div class="neon-text-green text-2xl">GREEN NEON</div>
<div class="neon-text-yellow text-xl">YELLOW NEON</div>
```

### 霓虹卡片
```html
<div class="neon-card p-6">
  <div class="neon-text-pink text-2xl font-bold mb-2">卡片标题</div>
  <div class="text-sm opacity-80">卡片描述</div>
</div>

<div class="neon-card-cyan p-6">
  <div class="neon-text-cyan text-2xl font-bold mb-2">青色卡片</div>
  <div class="text-sm opacity-80">卡片描述</div>
</div>
```

### 故障文字（Glitch）
```html
<div class="neon-glitch text-7xl font-bold">
  CYBERPUNK
</div>
```

### 闪烁霓虹（Flicker）
```html
<div class="neon-flicker text-5xl font-bold neon-text-pink">
  OPEN 24H
</div>
```

### 脉冲边框
```html
<div class="neon-border-pink neon-pulse p-6">
  重要内容
</div>
```

## 配色方案

| 色系 | 变量 | 颜色值 | 适用场景 |
|------|------|--------|---------|
| 霓虹粉 | `--neon-pink` | `#ff00ff` | 主色、强调、标题 |
| 霓虹青 | `--neon-cyan` | `#00ffff` | 辅助、链接、数据 |
| 霓虹紫 | `--neon-purple` | `#9d00ff` | 背景、过渡 |
| 霓虹绿 | `--neon-green` | `#00ff88` | 成功、终端、代码 |
| 霓虹黄 | `--neon-yellow` | `#ffff00` | 警告、高亮 |

## 已知约束

1. **必须使用 `colorSchema: dark`** —— 浅色背景无法展现霓虹效果
2. **正文字号建议 ≥ `text-lg`** —— 霓虹发光在小字号下模糊
3. **避免大面积使用霓虹色** —— 会造成视觉疲劳，建议 70% 中性 + 30% 霓虹
4. **Web Fonts 必须使用 `provider: 'bunny'`** —— 国内网络限制
5. **`/` 在裸属性中会导致编译错误** —— 必须用 `class="..."` 形式
6. **Orbitron 字体不含中文** —— 中文字符会 fallback 到系统字体，建议标题用英文

## 排版风格

- **标题字体**：`Orbitron`（科技感），字重 `font-bold`（700）
- **标题转换**：`uppercase`（全大写）增强科技感
- **字距**：`tracking-wide` 或 `tracking-wider`（宽字距显科技感）
- **代码字体**：`JetBrains Mono`（等宽，终端感）

## 动画系统

Neon 主题提供 3 个专属动画：
- `neon-glitch` —— 故障文字（标题装饰）
- `neon-flicker` —— 霓虹闪烁（强调元素，模拟坏掉的霓虹灯）
- `neon-pulse` —— 边框脉冲（焦点引导）

**动画节制原则**：单页最多使用 1 种霓虹动画，避免视觉过载。

## 网格背景说明

Neon 主题的网格背景模拟赛博朋克的"数字空间"感：
- 主网格：40×40px 的粉/青双色细线
- 中心遮罩：径向 mask 让网格中心更明显
- 扫描线：2px 间距的半透明粉色横线（CRT 显示器质感）

# Slidev + UnoCSS 语法护栏

本文档汇总所有在生成 slides.md 时**必须遵守**的语法规则，违反任一条都会导致 Vue 编译错误或视觉异常。

所有规则都有对应的 [failure-modes.md](./failure-modes.md) 条目，方便交叉引用。

---

## 规则 1：属性值中不能包含多余引号

裸属性（attributify 模式）中**不能有引号**，否则 Vue 模板编译器报错。

```md
<!-- ❌ 错误 - 会引发 Vue 模板编译错误 -->
<div opacity-70">文字</div>
<div text-blue-300">标题</div>
<div mb-4">内容</div>

<!-- ✅ 正确 -->
<div opacity-70>文字</div>
<div text-blue-300>标题</div>
<div mb-4>内容</div>

<!-- ✅ 使用 class 属性（推荐） -->
<div class="opacity-70">文字</div>
<div class="text-blue-300">标题</div>
<div class="mb-4">内容</div>
```

**对应 FM**：[FM-01](./failure-modes.md)

---

## 规则 2：含 `/` 的工具类必须用 class 属性

**这是最高频的坑**。任何包含 `/`（透明度修饰符）的工具类，作为裸属性会导致 `Illegal '/' in tags` 错误。

```md
<!-- ❌ 错误 - "Illegal '/' in tags" Vue 编译错误 -->
<span text-white/50>文字</span>
<div text="white/50">文字</div>
<div bg="blue-500/20">文字</div>  <!-- 这个其实是安全的，见下 -->

<!-- ✅ 正确 - 必须使用 class 属性包裹 -->
<span class="text-white/50">文字</span>
<div class="text-white/50">文字</div>
```

### 例外：引号内的值是安全的

```md
<!-- ✅ 写在引号值内是安全的 -->
<div bg="blue-500/20">文字</div>
<div border="2 solid teal-800/50">文字</div>
```

**原因**：Vue 模板编译器将裸属性中的 `/` 解析为 HTML 标签闭合符，导致编译失败。引号内的值（如 `bg="..."`、`border="..."`）被当作字符串，不受影响。

**对应 FM**：[FM-01](./failure-modes.md)

### 高频踩坑清单

| 工具类 | ❌ 错误写法 | ✅ 正确写法 |
|--------|-----------|-----------|
| `text-white/50` | `<span text-white/50>` | `<span class="text-white/50">` |
| `bg-blue-500/20` | `<div bg-blue-500/20>` | `<div class="bg-blue-500/20">` 或 `<div bg="blue-500/20">` |
| `border-violet-800/50` | `<div border-violet-800/50>` | `<div class="border-violet-800/50">` 或 `<div border="2 solid violet-800/50">` |
| `opacity-70` | 安全 | `<div opacity-70>` 或 `<div class="opacity-70">` 都行 |

**原则**：**任何包含 `/` 的工具类一律用 `class="..."`**，最简单最安全。

---

## 规则 3：v-click 动态绑定必须用 `:class`

```md
<!-- ❌ 错误 - class 属性不能直接写表达式 -->
<div v-click="1" class="$clicks < 1 ? 'opacity-0' : 'opacity-100'">

<!-- ✅ 正确 - 必须用 :class 进行动态绑定 -->
<div v-click="1" :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'">
```

**对应 FM**：[FM-06](./failure-modes.md)

---

## 规则 4：`<v-clicks>` 把所有直接子元素当作动画目标

`<v-clicks>` 会逐个动画显示**每个直接子元素**。如果箭头 `→` 等非交互元素也是 `<v-clicks>` 的子元素，它们会被当作动画目标出现/消失。

```md
<!-- ❌ 错误 - 箭头会随点击出现/消失 -->
<v-clicks>
  <div>步骤 1</div>
  <div>→</div>  <!-- 被当作动画目标 -->
  <div>步骤 2</div>
</v-clicks>

<!-- ✅ 正确 - 把箭头放在 <v-clicks> 外部 -->
<v-clicks>
  <div>步骤 1</div>
</v-clicks>
<div>→</div>
<v-clicks>
  <div>步骤 2</div>
</v-clicks>

<!-- ✅ 更好的方案 - 用显式 v-click -->
<div v-click="1">步骤 1</div>
<div class="opacity-50">→</div>
<div v-click="2">步骤 2</div>
```

**对应 FM**：[FM-03](./failure-modes.md)

---

## 规则 5：代码块（` ``` `）不能嵌套在 HTML 卡片内

当代码块嵌套在 HTML `<div>` 内部时，代码块后面紧接的 HTML 元素（如 `<div>` 提示文字）无法正常渲染，出现 `Element is missing end tag` 错误。

```md
<!-- ❌ 错误 - 代码块嵌套在卡片内 + 后跟 HTML 元素 -->
<div class="card">
  ```ts
  const x = 1
  ```

  <div>提示文字</div>  <!-- 无法渲染 -->
</div>

<!-- ✅ 正确 - 把代码块和文字都放在卡片外部 -->
<div class="card">
  <!-- 卡片其他内容 -->
</div>

```ts
const x = 1
```

<div>提示文字</div>
```

**对应 FM**：[FM-02](./failure-modes.md)

---

## 规则 6：代码块必须有语言标识

```md
<!-- ❌ 错误 - 缺少语言标识 -->
```
code here
```

<!-- ✅ 正确 - 指定语言 -->
```typescript
code here
```
```

**对应 FM**：无（属于 Level 2 基础检查）

---

## 规则 7：grid / grid-cols 语法

```md
<!-- ❌ 错误 - 使用了等号 -->
<div grid="~ cols-2">

<!-- ✅ 正确 - 使用连字符 -->
<div grid grid-cols-2>

<!-- ✅ 也可以用 class -->
<div class="grid grid-cols-2">
```

---

## 规则 8：代码块 maxHeight 语法

````md
```ts {1-8|10-16|all}{maxHeight:'350px'}
code here
```
````

- **语法**：在代码块语言标识后追加 `{maxHeight:'<value>'}`
- **位置**：`maxHeight` 放在**行高亮语法后面**的独立 `{}` 中
- **强制规则**：代码块超过 15 行**必须**设置 `maxHeight`

### 推荐值

| 值 | 约行数 | 适用 |
|----|-------|------|
| `maxHeight:'100px'` | ~5 行 | 嵌入卡片中 |
| `maxHeight:'200px'` | ~10 行 | 紧凑展示 |
| `maxHeight:'350px'` | ~18 行 | 占大部分幻灯片高度 |

**对应 FM**：[FM-05](./failure-modes.md)

---

## 规则 9：frontmatter `---` 不能嵌套

```md
<!-- ❌ 错误 - 会产生空白页 -->
---
layout: section
glowSeed: 350
---

# 章节标题

---
class: py-8
glowSeed: 400
---

## 内容标题
```

**问题**：中间的 `---` 会被识别为新的幻灯片分隔符，`class: py-8` 会被当作文本内容，产生空白页。

```md
<!-- ✅ 正确 - 每个幻灯片只有一个完整的 frontmatter 块 -->
---
layout: section
glowSeed: 350
---

# 章节标题

---
class: py-8
glowSeed: 400
---

## 内容标题
```

### Slidev 幻灯片结构规则

- `---` 开始 frontmatter
- `---` 结束 frontmatter，后面是内容
- 下一个 `---` 前的所有内容属于当前幻灯片
- **每个幻灯片必须有自己的完整 frontmatter 块**

**对应 FM**：[FM-04](./failure-modes.md)

---

## 规则 10：必需 headmatter 键齐全

不同主题有不同的必需 headmatter 键：

### 通用必需
- `layout` — 布局类型（center / default / section / two-cols 等）
- `highlighter: shiki` — 代码高亮器
- `css: unocss` — 启用 UnoCSS
- `colorSchema` — dark / light（根据主题）

### Glow 主题额外必需
- `glowSeed` — 发光种子（必须，否则无效果）
- 可选：`glow` / `glowOpacity` / `glowHue`

### Neon 主题额外推荐
- `neonHue` — 色调偏移（可选，默认 280）
- `neonIntensity` — 光团强度（可选，默认 0.6）

### 字体
- 每个主题有专属字体配置，详见对应 theme-config.md

**对应 FM**：[FM-07](./failure-modes.md)

---

## 规则 11：translate-y-* 下移后兄弟元素重叠

`translate-y-*` 下移容器后，其下方的兄弟元素**不会跟着移动**，导致重叠。

```md
<!-- ❌ 导致重叠 -->
<div class="translate-y-30">上方内容</div>
<div class="mt-4">下方内容</div>  <!-- 被上方覆盖 -->

<!-- ✅ 减小 translate-y，增大 mt-* -->
<div class="translate-y-8">上方内容</div>
<div class="mt-20">下方内容</div>
```

**修复策略**：
- 减小 `translate-y-*` 值（如 `translate-y-30` → `translate-y-8`）
- 同时增大下方元素的 `mt-*` 间距（如 `mt-4` → `mt-20`）

**对应 FM**：[FM-08](./failure-modes.md)

---

## 规则 12：封面页居中

使用 `layout: center` + 简单的 `flex flex-col items-center`，避免 `translate-y-*` 偏移。

```md
<!-- ❌ 导致内容偏出屏幕 -->
---
layout: default
---
<div class="translate-y-30">
  <h1>标题</h1>
</div>

<!-- ✅ 正确居中 -->
---
layout: center
---
<div class="flex flex-col items-center">
  <h1>标题</h1>
  <div class="subtitle">副标题</div>
</div>
```

---

## 规则 13：UnoCSS 任意值语法

当预设工具类不够用时，使用方括号语法：

```md
<div w="[calc(100%-20%)]" />           <!-- CSS calc -->
<div translate-x="[40%]" />           <!-- 百分比位移 -->
<div text="[48px]" />                 <!-- 精确像素值 -->
<div px-0! />                         <!-- !important -->
<div size-14 />                       <!-- 自定义尺寸 -->
<div gap-3 />                         <!-- 间距简写 -->
```

---

## 规则 14：Web Fonts 必须用 bunny provider

国内网络无法访问 Google Fonts，`presetWebFonts` 必须使用 `provider: 'bunny'`。

```ts
// ❌ 错误 - 国内会超时
presetWebFonts({
  provider: 'google',
  fonts: { sans: 'DM Sans' }
})

// ✅ 正确 - bunny 是国内可访问的 Google Fonts 镜像
presetWebFonts({
  provider: 'bunny',
  fonts: { sans: 'DM Sans' },
  timeouts: {
    failure: 60000,
    warning: 60000,
  },
})
```

`timeouts.failure` 建议设为 `60000`（60 秒），避免网络波动时构建失败。

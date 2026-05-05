# Git Commit Message 规范

## 格式

```
<type>: <简要描述>

<可选的详细说明>
```

## Type 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feature` | 新功能 | `feature: 添加导出PDF功能` |
| `bugfix` | 修复缺陷 | `bugfix: 修复封面页居中偏移问题` |
| `refactor` | 重构（不改变行为） | `refactor: 重构幻灯片模板解析逻辑` |
| `docs` | 文档变更 | `docs: 更新CLAUDE.md中的字体配置说明` |
| `style` | 代码风格（不影响逻辑） | `style: 统一缩进为2空格` |
| `perf` | 性能优化 | `perf: 优化大量图片加载时的渲染速度` |
| `test` | 测试相关 | `test: 添加模板生成器的单元测试` |
| `chore` | 构建/工具/依赖变更 | `chore: 升级slidev到v50` |
| `ci` | CI/CD 变更 | `ci: 添加自动部署workflow` |

## 规则

1. **中文描述**，简明扼要说明"改了什么"
2. **type 后冒号为英文冒号**，冒号后有一个空格
3. **不写"修复了bug"这类空话**，要写具体改了什么，如 `bugfix: 修复translate-y导致幻灯片内容重叠的问题`
4. **一次提交只做一件事**，混合多种改动拆分为多次提交
5. **涉及范围可加前缀**，如 `feature(slide-layout): 添加分栏布局模板`

## 示例

```
feature: 添加代码块maxHeight自动计算功能

根据代码行数自动设置maxHeight参数，超过15行时默认设为350px

feature(skill): 添加code相关指南到skill提示词

bugfix: 修复UnoCSS中/符号导致Vue编译错误的问题

将裸属性的text-white/50改为class="text-white/50"写法

refactor: 将模板生成逻辑从SKILL.md拆分到独立模块

docs: 添加表情包资源路径到CLAUDE.md

chore: 更新依赖版本
```
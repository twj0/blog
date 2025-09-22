# 🤝 贡献指南

感谢您对本项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 优化用户体验

## 📋 贡献方式

### 1. 报告问题

如果您发现了 Bug 或有改进建议：

1. **搜索现有 Issues** - 确认问题是否已被报告
2. **创建新 Issue** - 如果没有找到相关问题
3. **提供详细信息** - 包括复现步骤、环境信息等

#### Issue 模板

```markdown
**问题描述**
简要描述遇到的问题

**复现步骤**
1. 进入 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

**预期行为**
描述您期望发生的情况

**实际行为**
描述实际发生的情况

**环境信息**
- 操作系统: [例如 Windows 10]
- 浏览器: [例如 Chrome 91]
- Node.js 版本: [例如 16.14.0]

**截图**
如果适用，请添加截图来帮助解释问题

**附加信息**
添加任何其他相关信息
```

### 2. 提交代码

#### 开发环境设置

1. **Fork 仓库**
   ```bash
   # 点击 GitHub 上的 Fork 按钮
   ```

2. **克隆到本地**
   ```bash
   git clone https://github.com/yourusername/blog-template.git
   cd blog-template
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **创建开发分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

#### 开发流程

1. **本地开发**
   ```bash
   # 启动开发服务器
   npm run dev
   
   # 运行配置检查
   npm run check
   ```

2. **代码规范**
   - 使用有意义的变量和函数名
   - 添加必要的注释
   - 保持代码简洁易读
   - 遵循现有的代码风格

3. **测试您的更改**
   ```bash
   # 本地测试
   npm run server
   
   # 构建测试
   npm run build
   
   # 配置检查
   npm run check
   ```

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # 或
   git commit -m "fix: fix bug description"
   ```

#### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```bash
feat: add dark mode toggle button
fix: resolve mobile navigation issue
docs: update installation guide
style: improve code formatting
```

### 3. 提交 Pull Request

1. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **创建 Pull Request**
   - 访问您的 Fork 仓库
   - 点击 "New Pull Request"
   - 填写 PR 模板

#### Pull Request 模板

```markdown
## 📝 更改描述

简要描述此 PR 的更改内容

## 🔗 相关 Issue

Fixes #(issue number)

## 📋 更改类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他: ___________

## 🧪 测试

描述您如何测试了这些更改：

- [ ] 本地测试通过
- [ ] 构建成功
- [ ] 功能正常工作
- [ ] 没有破坏现有功能

## 📷 截图

如果适用，请添加截图展示更改效果

## ✅ 检查清单

- [ ] 我的代码遵循项目的代码规范
- [ ] 我已经进行了自我审查
- [ ] 我已经添加了必要的注释
- [ ] 我的更改没有产生新的警告
- [ ] 我已经测试了我的更改
- [ ] 相关文档已经更新
```

## 📚 开发指南

### 项目结构

```
blog-template/
├── .github/workflows/    # GitHub Actions 工作流
├── docs/                # 项目文档
├── scripts/             # 辅助脚本
├── source/              # 博客源文件
├── themes/anzhiyu/      # 主题文件
├── _config.template.yml # 配置模板
└── package.json         # 项目配置
```

### 重要文件说明

- `_config.template.yml` - Hexo 主配置模板
- `themes/anzhiyu/_config.template.yml` - 主题配置模板
- `.github/workflows/deploy.yml` - 自动部署工作流
- `scripts/setup.js` - 配置初始化脚本
- `scripts/check-config.js` - 配置检查脚本

### 开发注意事项

1. **配置文件**
   - 修改模板文件而非生成的配置文件
   - 使用 `{{VARIABLE_NAME}}` 格式的占位符
   - 确保所有占位符都有对应的环境变量

2. **文档更新**
   - 新功能需要更新相关文档
   - 保持文档的准确性和完整性
   - 使用清晰的语言和示例

3. **向后兼容**
   - 避免破坏性更改
   - 如果必须进行破坏性更改，请在 PR 中明确说明

## 🎯 贡献重点

我们特别欢迎以下方面的贡献：

### 高优先级
- 🐛 Bug 修复
- 📝 文档改进
- 🔧 配置优化
- 🚀 性能提升

### 中优先级
- 🎨 UI/UX 改进
- 🌐 国际化支持
- 📱 移动端优化
- 🔌 插件集成

### 低优先级
- 🎉 新功能添加
- 🎨 主题定制
- 🔧 工具脚本

## 📞 联系方式

如果您有任何问题或需要帮助：

- 💬 [创建 Discussion](../../discussions)
- 📧 [提交 Issue](../../issues)
- 📖 [查看文档](docs/)

## 🙏 致谢

感谢所有为本项目做出贡献的开发者！

### 贡献者

<!-- 这里会自动显示贡献者列表 -->

## 📄 许可证

通过贡献代码，您同意您的贡献将在 [MIT License](LICENSE) 下授权。

---

**再次感谢您的贡献！** 🎉

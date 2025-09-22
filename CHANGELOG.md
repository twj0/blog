# 📝 更新日志

本文件记录了项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 计划中
- 添加更多主题选择
- 集成更多评论系统
- 支持多语言文档
- 可视化配置界面

## [1.0.0] - 2025-01-01

### 🎉 首次发布

#### ✨ 新增功能
- **博客模板系统** - 基于 Hexo + AnZhiYu 主题的完整博客模板
- **GitHub Actions 自动部署** - 支持推送代码自动构建和部署
- **配置模板化** - 使用占位符变量简化个人配置
- **交互式配置向导** - `npm run setup` 快速配置博客信息
- **配置检查工具** - `npm run check` 验证配置完整性
- **完整文档系统** - 包含快速开始、故障排除等文档

#### 🎨 主题特性
- **响应式设计** - 完美适配桌面端和移动端
- **深色模式** - 自动切换深色/浅色主题
- **多评论系统** - 支持 Valine、Waline、Giscus、Twikoo
- **本地搜索** - 快速搜索博客内容
- **代码高亮** - 支持多种编程语言语法高亮
- **图片懒加载** - 优化页面加载性能
- **社交分享** - 支持多平台内容分享

#### 🔧 开发工具
- **自动化脚本** - 配置初始化和检查脚本
- **开发环境** - 本地预览和热重载
- **构建优化** - 缓存和性能优化
- **错误处理** - 完善的错误提示和处理

#### 📚 文档
- **README.md** - 项目介绍和快速开始
- **快速开始指南** - 5分钟部署指南
- **配置检查清单** - 完整的配置项说明
- **故障排除指南** - 常见问题解决方案
- **项目结构说明** - 详细的目录结构介绍
- **贡献指南** - 开发者贡献指南

#### 🚀 部署特性
- **GitHub Pages 集成** - 一键启用 GitHub Pages
- **环境变量支持** - 通过 GitHub Secrets 管理配置
- **多环境部署** - 支持开发、预览、生产环境
- **构建状态监控** - 实时查看部署状态
- **自动缓存** - 优化构建速度

#### 🛡️ 安全特性
- **敏感信息保护** - 配置文件模板化，避免泄露个人信息
- **环境变量管理** - 安全的密钥管理方式
- **权限控制** - 最小权限原则的 GitHub Actions 配置

### 📦 依赖项

#### 核心依赖
- `hexo@^7.3.0` - 静态网站生成器
- `hexo-theme-anzhiyu@latest` - AnZhiYu 主题
- `hexo-deployer-git@^4.0.0` - Git 部署插件

#### 生成器插件
- `hexo-generator-archive@^2.0.0` - 归档页面生成器
- `hexo-generator-category@^2.0.0` - 分类页面生成器
- `hexo-generator-index@^4.0.0` - 首页生成器
- `hexo-generator-tag@^2.0.0` - 标签页面生成器

#### 渲染器插件
- `hexo-renderer-ejs@^2.0.0` - EJS 模板渲染器
- `hexo-renderer-marked@^7.0.0` - Markdown 渲染器
- `hexo-renderer-stylus@^3.0.1` - Stylus 样式渲染器

#### 开发工具
- `hexo-server@^3.0.0` - 本地开发服务器
- `js-yaml@^4.1.0` - YAML 解析器

### 🔧 配置项

#### 必需配置
- `SITE_TITLE` - 网站标题
- `AUTHOR_NAME` - 作者姓名
- `GITHUB_USERNAME` - GitHub 用户名
- `GITHUB_REPOSITORY` - 仓库名称

#### 可选配置
- `SITE_DESCRIPTION` - 网站描述
- `AVATAR_URL` - 头像地址
- `THEME_COLOR_MAIN` - 主题主色调
- `COMMENT_SYSTEM` - 评论系统类型

### 🌟 支持的功能

#### 评论系统
- **Valine** - 基于 LeanCloud 的评论系统
- **Waline** - Valine 的增强版本
- **Giscus** - 基于 GitHub Discussions 的评论系统
- **Twikoo** - 简洁的评论系统

#### 网站分析
- **Google Analytics** - Google 网站分析
- **百度统计** - 百度网站分析
- **Cloudflare Analytics** - Cloudflare 分析

#### 搜索功能
- **本地搜索** - 基于生成的搜索索引
- **Algolia 搜索** - 云端搜索服务（可选）

### 📱 兼容性

#### 浏览器支持
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

#### Node.js 版本
- Node.js 16.x
- Node.js 18.x
- Node.js 20.x

#### 操作系统
- Windows 10+
- macOS 10.15+
- Ubuntu 18.04+

### 🔄 迁移指南

#### 从其他博客系统迁移
1. 导出现有博客内容
2. 转换为 Markdown 格式
3. 放置到 `source/_posts/` 目录
4. 调整 Front Matter 格式
5. 重新部署

#### 从旧版本升级
1. 备份现有配置
2. 更新依赖包：`npm update`
3. 检查配置兼容性
4. 测试功能正常性
5. 重新部署

### 🐛 已知问题

#### 限制
- GitHub Pages 有存储空间限制（1GB）
- 构建时间限制（10分钟）
- 每月带宽限制（100GB）

#### 解决方案
- 优化图片大小和数量
- 使用外部图床服务
- 启用缓存优化构建速度

### 🙏 致谢

感谢以下项目和贡献者：

- [Hexo](https://hexo.io/) - 优秀的静态网站生成器
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - 美观的 Hexo 主题
- [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管
- [GitHub Actions](https://github.com/features/actions) - 强大的 CI/CD 平台

---

**注意**: 版本号遵循 [语义化版本](https://semver.org/) 规范。

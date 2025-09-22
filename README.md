# 🚀 个人博客模板

[![Deploy Status](https://github.com/yourusername/your-blog-repo/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/yourusername/your-blog-repo/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

基于 **Hexo** + **AnZhiYu** 主题的个人博客模板，支持 **GitHub Actions** 自动部署，让您快速搭建属于自己的个人博客！

## ✨ 特性

- 🎨 **现代化设计** - 基于AnZhiYu主题，界面美观大方
- 🚀 **自动部署** - GitHub Actions自动构建和部署
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 💬 **多评论系统** - 支持Valine、Waline、Giscus等
- 🔍 **搜索功能** - 内置本地搜索，快速查找内容
- 📊 **数据统计** - 支持多种网站分析工具
- 🌙 **深色模式** - 自动切换深色/浅色主题
- ⚡ **性能优化** - 图片懒加载、代码高亮等优化

## 🎯 快速开始

### 方法一：一键部署（推荐）

1. **Fork 此仓库**
   ```bash
   点击右上角的 "Fork" 按钮
   ```

2. **配置个人信息**
   ```bash
   # 克隆到本地
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   
   # 安装依赖
   npm install
   
   # 运行配置向导
   npm run setup
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

4. **推送代码，自动部署**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. **访问您的博客**
   ```
   https://yourusername.github.io/your-blog-repo
   ```

### 方法二：手动配置

<details>
<summary>点击展开手动配置步骤</summary>

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   npm install
   ```

2. **配置基本信息**
   
   复制配置模板：
   ```bash
   cp _config.template.yml _config.yml
   cp themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
   ```
   
   编辑 `_config.yml` 文件，修改以下配置：
   ```yaml
   title: 您的博客标题
   author: 您的姓名
   url: https://yourusername.github.io/your-blog-repo
   ```

3. **配置主题**
   
   编辑 `themes/anzhiyu/_config.yml`，自定义：
   - 头像和社交链接
   - 菜单导航
   - 评论系统
   - 网站样式

4. **本地预览**
   ```bash
   npm run server
   ```

5. **部署到GitHub Pages**
   ```bash
   npm run deploy
   ```

</details>

## 📝 写作指南

### 创建新文章

```bash
# 创建新文章
npx hexo new "文章标题"

# 创建新页面
npx hexo new page "页面名称"
```

### 文章格式

```markdown
---
title: 文章标题
date: 2025-01-01 12:00:00
tags: 
  - 标签1
  - 标签2
categories: 
  - 分类名
cover: 封面图片URL
description: 文章描述
---

文章内容...
```

### 本地预览

```bash
# 启动本地服务器
npm run server

# 清理缓存后启动
npm run dev

# 生成静态文件后预览
npm run preview
```

## ⚙️ 配置说明

### 环境变量配置

在GitHub仓库的 Settings > Secrets and variables > Actions 中配置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `SITE_TITLE` | 网站标题 | 我的个人博客 |
| `AUTHOR_NAME` | 作者姓名 | Your Name |
| `SITE_URL` | 网站地址 | https://username.github.io/repo |
| `GITHUB_URL` | GitHub主页 | https://github.com/username |
| `AVATAR_URL` | 头像地址 | https://avatars.githubusercontent.com/u/xxx |

### 评论系统配置

支持多种评论系统，在 Secrets 中配置相应参数：

- **Valine**: `VALINE_APP_ID`, `VALINE_APP_KEY`
- **Waline**: `WALINE_SERVER_URL`
- **Giscus**: `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`

详细配置请参考：[配置检查清单](docs/configuration-checklist.md)

## 🛠️ 高级功能

### 自定义域名

1. 在 `source/` 目录下创建 `CNAME` 文件
2. 文件内容为您的域名，如：`blog.example.com`
3. 在域名DNS设置中添加CNAME记录指向 `username.github.io`

### 添加插件

```bash
# 安装插件
npm install hexo-plugin-name --save

# 在 _config.yml 中配置插件
```

### 主题自定义

- 修改 `themes/anzhiyu/_config.yml` 配置文件
- 在 `themes/anzhiyu/source/css/` 添加自定义样式
- 详细说明：[主题自定义指南](docs/theme-customization.md)

## 📚 文档

- [📋 配置检查清单](docs/configuration-checklist.md)
- [🏗️ 项目结构说明](docs/project-structure.md)
- [🚀 快速开始指南](docs/quick-start.md)
- [🔧 故障排除指南](docs/troubleshooting.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Hexo](https://hexo.io/) - 快速、简洁且高效的博客框架
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - 简洁美观的Hexo主题
- [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管服务

## 📞 支持

如果这个项目对您有帮助，请给个 ⭐ Star 支持一下！

有问题？欢迎：
- 📧 [提交 Issue](../../issues)
- 💬 [参与讨论](../../discussions)
- 📖 [查看文档](docs/)

---

**开始您的博客之旅吧！** 🎉

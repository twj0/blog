# 🚀 Personal Blog Template

[![Deploy Status](https://github.com/twj0/blog/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/twj0/blog/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A personal blog template based on **Hexo** + **AnZhiYu** theme with **GitHub Actions** auto-deployment, enabling you to quickly build your own personal blog!

## 🌐 Multi-Language Documentation

- [English](README.md) (Current)
- [简体中文](README-zhCN.md)
- [繁體中文](README-zhTW.md)
- [日本語](README-JP.md)
- [한국어](README-ko.md)

## ✨ Features

- 🎨 **Modern Design** - Based on AnZhiYu theme with beautiful and elegant interface
- 🚀 **Auto Deployment** - Automated build and deployment with GitHub Actions
- 📱 **Responsive Layout** - Perfect adaptation for desktop and mobile devices
- 💬 **Multiple Comment Systems** - Support for Valine, Waline, Giscus, and more
- 🔍 **Search Functionality** - Built-in local search for quick content discovery
- 📊 **Analytics Integration** - Support for various website analytics tools
- 🌙 **Dark Mode** - Automatic dark/light theme switching
- ⚡ **Performance Optimized** - Image lazy loading, code highlighting, and more

## 🎯 Quick Start

### Method 1: One-Click Deployment (Recommended)

1. **Fork this Repository**
   ```bash
   Click the "Fork" button in the top right corner
   ```

2. **Configure Personal Information**
   ```bash
   # Clone to local
   git clone https://github.com/yourusername/blog.git
   cd blog

   # Install dependencies
   npm install

   # Run setup wizard
   npm run setup
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as Source
   - Save settings

4. **Push Code for Auto Deployment**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. **Access Your Blog**
   ```
   https://yourusername.github.io/blog
   ```

### Method 2: Manual Configuration

<details>
<summary>Click to expand manual configuration steps</summary>

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
   npm install
   ```

2. **Configure Basic Information**

   Copy configuration templates:
   ```bash
   cp _config.template.yml _config.yml
   cp themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
   ```

   Edit `_config.yml` file and modify the following configurations:
   ```yaml
   title: Your Blog Title
   author: Your Name
   url: https://yourusername.github.io/your-blog-repo
   ```

3. **Configure Theme**

   Edit `themes/anzhiyu/_config.yml` to customize:
   - Avatar and social links
   - Menu navigation
   - Comment system
   - Website styling

4. **Local Preview**
   ```bash
   npm run server
   ```

5. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

</details>

## 📝 Writing Guide

### Create New Articles

```bash
# Create new article
npx hexo new "Article Title"

# Create new page
npx hexo new page "Page Name"
```

### Article Format

```markdown
---
title: Article Title
date: 2025-01-01 12:00:00
tags:
  - Tag1
  - Tag2
categories:
  - Category Name
cover: Cover Image URL
description: Article Description
---

Article content...
```

### Local Preview

```bash
# Start local server
npm run server

# Clean cache and start
npm run dev

# Generate static files and preview
npm run preview
```

## ⚙️ Configuration

### Environment Variables Configuration

Configure in GitHub repository Settings > Secrets and variables > Actions:

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `SITE_TITLE` | Website title | My Personal Blog |
| `SITE_SUBTITLE` | Website subtitle | Recording life, sharing technology |
| `SITE_DESCRIPTION` | Website description | Personal blog based on Hexo and AnZhiYu theme |
| `AUTHOR_NAME` | Author name | Your Name |
| `SITE_URL` | Website URL | https://username.github.io/repo |
| `SITE_ROOT` | Root path | /repo/ |

### Comment System Configuration

Support for multiple comment systems, configure corresponding parameters in Secrets:

- **Valine**: `VALINE_APP_ID`, `VALINE_APP_KEY`
- **Waline**: `WALINE_SERVER_URL`
- **Giscus**: `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`

For detailed configuration, please refer to: [Configuration Checklist](docs/configuration-checklist.md)

## 🛠️ Advanced Features

### Custom Domain

1. Create a `CNAME` file in the `source/` directory
2. File content should be your domain, e.g.: `blog.example.com`
3. Add a CNAME record in your domain DNS settings pointing to `username.github.io`

### Adding Plugins

```bash
# Install plugin
npm install hexo-plugin-name --save

# Configure plugin in _config.yml
```

### Theme Customization

- Modify `themes/anzhiyu/_config.yml` configuration file
- Add custom styles in `themes/anzhiyu/source/css/`
- Detailed instructions: [Theme Customization Guide](docs/theme-customization.md)

## 🔧 详细配置说明

### 📁 核心配置文件详解

#### 1. `.env.example` - 环境变量模板
这个文件包含了所有可配置的环境变量示例：

```bash
# 网站基本信息
SITE_TITLE=我的个人博客                    # 网站标题
SITE_SUBTITLE=记录生活，分享技术            # 网站副标题
SITE_DESCRIPTION=这是我的个人博客           # 网站描述
AUTHOR_NAME=您的姓名                       # 作者姓名

# GitHub 相关配置
GITHUB_USERNAME=yourusername               # GitHub 用户名
GITHUB_REPOSITORY=blog                     # 仓库名称
GITHUB_URL=https://github.com/yourusername # GitHub 主页

# 网站 URL 配置
SITE_URL=https://yourusername.github.io/blog  # 网站地址
ROOT_PATH=/blog/                              # 根路径

# 主题外观配置
AVATAR_URL=https://example.com/avatar.jpg     # 头像地址
THEME_COLOR_MAIN=#49b1f5                     # 主题主色调
THEME_COLOR_PAGINATOR=#00c4b6                # 分页器颜色

# 评论系统配置 (可选)
COMMENT_SYSTEM=valine                         # 评论系统类型
VALINE_APP_ID=your_app_id                    # Valine App ID
VALINE_APP_KEY=your_app_key                  # Valine App Key
```

**使用方法**：
1. 复制 `.env.example` 为 `.env`
2. 修改其中的值为您的实际信息
3. 运行 `npm run setup` 自动生成配置文件

#### 2. `_config.template.yml` - Hexo 主配置模板
这是 Hexo 的主要配置文件模板，包含：

```yaml
# 网站信息
title: {{SITE_TITLE}}                    # 使用环境变量
subtitle: {{SITE_SUBTITLE}}
description: {{SITE_DESCRIPTION}}
author: {{AUTHOR_NAME}}

# URL 配置
url: {{SITE_URL}}
root: {{ROOT_PATH}}

# 部署配置
deploy:
  type: git
  repo: {{DEPLOY_REPO}}
  branch: gh-pages
```

**占位符说明**：
- `{{VARIABLE_NAME}}` 格式的占位符会被环境变量替换
- GitHub Actions 会自动处理这些替换

#### 3. `themes/anzhiyu/_config.template.yml` - 主题配置模板
AnZhiYu 主题的配置文件，控制：

```yaml
# 网站图标和头像
avatar:
  img: {{AVATAR_URL}}

# 主题颜色
theme_color:
  enable: true
  main: "{{THEME_COLOR_MAIN}}"
  paginator: "{{THEME_COLOR_PAGINATOR}}"

# 社交链接
social:
  Github: {{GITHUB_URL}} || fab fa-github
```

### 🔄 GitHub Actions 工作流详解

#### `.github/workflows/deploy.yml` 文件作用：

1. **触发条件**：当推送到 `main` 分支时自动运行
2. **环境设置**：安装 Node.js 18 和项目依赖
3. **配置生成**：从环境变量生成实际配置文件
4. **构建部署**：生成静态文件并部署到 GitHub Pages

**工作流程**：
```yaml
name: Deploy Blog

on:
  push:
    branches: [ main ]  # 推送到 main 分支时触发

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout          # 检出代码
      - name: Setup Node.js     # 设置 Node.js 环境
      - name: Install deps      # 安装依赖
      - name: Generate config   # 生成配置文件
      - name: Build & Deploy    # 构建并部署
```

## 🌟 Git 操作详细指南

### 📥 基础 Git 操作

#### 1. 克隆仓库到本地
```bash
# 克隆您 Fork 的仓库
git clone https://github.com/yourusername/blog.git
cd blog

# 安装依赖
npm install
```

#### 2. 基本 Git 命令
```bash
# 查看当前状态
git status

# 添加文件到暂存区
git add .                    # 添加所有文件
git add filename.md          # 添加特定文件

# 提交更改
git commit -m "feat: 添加新文章"

# 推送到远程仓库
git push origin main
```

#### 3. 查看和管理历史
```bash
# 查看提交历史
git log --oneline

# 查看文件更改
git diff

# 撤销未提交的更改
git checkout -- filename.md
```

### 🌿 分支操作详解

#### 1. 创建和切换分支
```bash
# 创建新分支
git branch feature/new-post

# 切换到新分支
git checkout feature/new-post

# 创建并切换到新分支（一步完成）
git checkout -b feature/new-post
```

#### 2. 分支管理
```bash
# 查看所有分支
git branch -a

# 查看当前分支
git branch

# 删除本地分支
git branch -d feature/old-branch

# 删除远程分支
git push origin --delete feature/old-branch
```

#### 3. 合并分支
```bash
# 切换到主分支
git checkout main

# 合并功能分支
git merge feature/new-post

# 推送合并结果
git push origin main
```

### 🔄 Pull Request (PR) 操作流程

#### 1. 准备 PR
```bash
# 1. 确保在功能分支上
git checkout feature/new-article

# 2. 添加您的更改
echo "# 我的新文章" > source/_posts/my-new-article.md

# 3. 提交更改
git add .
git commit -m "feat: 添加新文章 - 我的新文章"

# 4. 推送分支到远程
git push origin feature/new-article
```

#### 2. 在 GitHub 上创建 PR
1. **访问您的仓库页面**
2. **点击 "Compare & pull request" 按钮**
3. **填写 PR 信息**：
   ```markdown
   ## 📝 更改描述
   添加了一篇关于技术分享的新文章

   ## 📋 更改类型
   - [x] 新文章
   - [ ] Bug 修复
   - [ ] 功能改进

   ## ✅ 检查清单
   - [x] 文章格式正确
   - [x] 图片链接有效
   - [x] 本地预览正常
   ```

#### 3. PR 审查和合并
```bash
# 如果需要修改 PR
git checkout feature/new-article
# 进行修改...
git add .
git commit -m "fix: 修正文章格式"
git push origin feature/new-article  # 自动更新 PR

# PR 合并后，清理本地分支
git checkout main
git pull origin main
git branch -d feature/new-article
```

### 🔄 博客更新工作流

#### 方法一：直接在 main 分支更新（简单）
```bash
# 1. 拉取最新代码
git pull origin main

# 2. 添加新文章
hexo new post "我的新文章"

# 3. 编辑文章
# 编辑 source/_posts/我的新文章.md

# 4. 本地预览
npm run server

# 5. 提交并推送
git add .
git commit -m "feat: 添加新文章 - 我的新文章"
git push origin main
```

#### 方法二：使用分支工作流（推荐）
```bash
# 1. 创建新分支
git checkout -b post/new-article

# 2. 添加内容
hexo new post "技术分享"

# 3. 编辑和预览
# 编辑文章...
npm run server

# 4. 提交到分支
git add .
git commit -m "feat: 添加技术分享文章"
git push origin post/new-article

# 5. 创建 PR 并合并
# 在 GitHub 上创建 PR，审查后合并

# 6. 清理分支
git checkout main
git pull origin main
git branch -d post/new-article
```

## 📚 Documentation

- [📋 Configuration Checklist](docs/configuration-checklist.md)
- [🏗️ Project Structure](docs/project-structure.md)
- [🚀 Quick Start Guide](docs/quick-start.md)
- [🔧 Troubleshooting Guide](docs/troubleshooting.md)

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source under the [MIT](LICENSE) license.

## 🙏 Acknowledgments

- [Hexo](https://hexo.io/) - Fast, simple & powerful blog framework
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - Clean and beautiful Hexo theme
- [GitHub Pages](https://pages.github.com/) - Free static website hosting service

## 📞 Support

If this project helps you, please give it a ⭐ Star!

Have questions? Welcome to:
- 📧 [Submit Issues](../../issues)
- 💬 [Join Discussions](../../discussions)
- 📖 [View Documentation](docs/)

---

**Start your blogging journey!** 🎉

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

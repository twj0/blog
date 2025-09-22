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

## 🔧 Detailed Configuration Guide

### 📁 Core Configuration Files

#### 1. `.env.example` - Environment Variables Template
This file contains examples of all configurable environment variables:

```bash
# Website Basic Information
SITE_TITLE=My Personal Blog                    # Website title
SITE_SUBTITLE=Recording life, sharing technology # Website subtitle
SITE_DESCRIPTION=This is my personal blog       # Website description
AUTHOR_NAME=Your Name                           # Author name

# GitHub Related Configuration
GITHUB_USERNAME=yourusername                    # GitHub username
GITHUB_REPOSITORY=blog                          # Repository name
GITHUB_URL=https://github.com/yourusername      # GitHub homepage

# Website URL Configuration
SITE_URL=https://yourusername.github.io/blog   # Website address
ROOT_PATH=/blog/                                # Root path

# Theme Appearance Configuration
AVATAR_URL=https://example.com/avatar.jpg       # Avatar address
THEME_COLOR_MAIN=#49b1f5                       # Theme main color
THEME_COLOR_PAGINATOR=#00c4b6                  # Paginator color

# Comment System Configuration (Optional)
COMMENT_SYSTEM=valine                           # Comment system type
VALINE_APP_ID=your_app_id                      # Valine App ID
VALINE_APP_KEY=your_app_key                    # Valine App Key
```

**Usage Instructions**:
1. Copy `.env.example` to `.env`
2. Modify the values to your actual information
3. Run `npm run setup` to automatically generate configuration files

#### 2. `_config.template.yml` - Hexo Main Configuration Template
This is the main configuration file template for Hexo, containing:

```yaml
# Website Information
title: {{SITE_TITLE}}                    # Using environment variables
subtitle: {{SITE_SUBTITLE}}
description: {{SITE_DESCRIPTION}}
author: {{AUTHOR_NAME}}

# URL Configuration
url: {{SITE_URL}}
root: {{ROOT_PATH}}

# Deployment Configuration
deploy:
  type: git
  repo: {{DEPLOY_REPO}}
  branch: gh-pages
```

**Placeholder Explanation**:
- Placeholders in `{{VARIABLE_NAME}}` format will be replaced by environment variables
- GitHub Actions will automatically handle these replacements

#### 3. `themes/anzhiyu/_config.template.yml` - Theme Configuration Template
AnZhiYu theme configuration file, controlling:

```yaml
# Website Icon and Avatar
avatar:
  img: {{AVATAR_URL}}

# Theme Colors
theme_color:
  enable: true
  main: "{{THEME_COLOR_MAIN}}"
  paginator: "{{THEME_COLOR_PAGINATOR}}"

# Social Links
social:
  Github: {{GITHUB_URL}} || fab fa-github
```

### 🔄 GitHub Actions Workflow Details

#### `.github/workflows/deploy.yml` File Functions:

1. **Trigger Conditions**: Automatically runs when pushing to `main` branch
2. **Environment Setup**: Install Node.js 18 and project dependencies
3. **Configuration Generation**: Generate actual configuration files from environment variables
4. **Build and Deploy**: Generate static files and deploy to GitHub Pages

**Workflow Process**:
```yaml
name: Deploy Blog

on:
  push:
    branches: [ main ]  # Triggers when pushing to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout          # Checkout code
      - name: Setup Node.js     # Setup Node.js environment
      - name: Install deps      # Install dependencies
      - name: Generate config   # Generate configuration files
      - name: Build & Deploy    # Build and deploy
```

## 🌟 Detailed Git Operations Guide

### 📥 Basic Git Operations

#### 1. Clone Repository to Local
```bash
# Clone your forked repository
git clone https://github.com/yourusername/blog.git
cd blog

# Install dependencies
npm install
```

#### 2. Basic Git Commands
```bash
# Check current status
git status

# Add files to staging area
git add .                    # Add all files
git add filename.md          # Add specific file

# Commit changes
git commit -m "feat: add new article"

# Push to remote repository
git push origin main
```

#### 3. View and Manage History
```bash
# View commit history
git log --oneline

# View file changes
git diff

# Undo uncommitted changes
git checkout -- filename.md
```

### 🌿 Branch Operations Details

#### 1. Create and Switch Branches
```bash
# Create new branch
git branch feature/new-post

# Switch to new branch
git checkout feature/new-post

# Create and switch to new branch (one step)
git checkout -b feature/new-post
```

#### 2. Branch Management
```bash
# View all branches
git branch -a

# View current branch
git branch

# Delete local branch
git branch -d feature/old-branch

# Delete remote branch
git push origin --delete feature/old-branch
```

#### 3. Merge Branches
```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/new-post

# Push merge results
git push origin main
```

### 🔄 Pull Request (PR) Operation Process

#### 1. Prepare PR
```bash
# 1. Ensure you're on the feature branch
git checkout feature/new-article

# 2. Add your changes
echo "# My New Article" > source/_posts/my-new-article.md

# 3. Commit changes
git add .
git commit -m "feat: add new article - My New Article"

# 4. Push branch to remote
git push origin feature/new-article
```

#### 2. Create PR on GitHub
1. **Visit your repository page**
2. **Click "Compare & pull request" button**
3. **Fill in PR information**:
   ```markdown
   ## 📝 Change Description
   Added a new article about technology sharing

   ## 📋 Change Type
   - [x] New article
   - [ ] Bug fix
   - [ ] Feature improvement

   ## ✅ Checklist
   - [x] Article format is correct
   - [x] Image links are valid
   - [x] Local preview works properly
   ```

#### 3. PR Review and Merge
```bash
# If PR needs modifications
git checkout feature/new-article
# Make modifications...
git add .
git commit -m "fix: correct article format"
git push origin feature/new-article  # Automatically updates PR

# After PR is merged, clean up local branch
git checkout main
git pull origin main
git branch -d feature/new-article
```

### 🔄 Blog Update Workflow

#### Method 1: Direct Update on main Branch (Simple)
```bash
# 1. Pull latest code
git pull origin main

# 2. Add new article
hexo new post "My New Article"

# 3. Edit article
# Edit source/_posts/My-New-Article.md

# 4. Local preview
npm run server

# 5. Commit and push
git add .
git commit -m "feat: add new article - My New Article"
git push origin main
```

#### Method 2: Using Branch Workflow (Recommended)
```bash
# 1. Create new branch
git checkout -b post/new-article

# 2. Add content
hexo new post "Technology Sharing"

# 3. Edit and preview
# Edit article...
npm run server

# 4. Commit to branch
git add .
git commit -m "feat: add technology sharing article"
git push origin post/new-article

# 5. Create PR and merge
# Create PR on GitHub, review and merge

# 6. Clean up branch
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

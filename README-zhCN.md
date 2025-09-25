# 🚀 个人博客模板

[![Deploy Status](https://github.com/twj0/blog/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/twj0/blog/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

基于 **Hexo** + **AnZhiYu** 主题的个人博客模板，支持 **GitHub Actions** 自动部署，让您快速搭建属于自己的个人博客！

## 🌐 多语言文档

- [English](README.md)
- [简体中文](README-zhCN.md) (当前)
- [繁體中文](README-zhTW.md)
- [日本語](README-JP.md)
- [한국어](README-ko.md)

## ✨ 特性

- 🎨 **现代化设计** - 基于AnZhiYu主题，界面美观大方
- 🚀 **多平台自动部署** - 同时部署到 GitHub Pages 和 Cloudflare Pages
- 🌐 **双CDN加速** - 全球访问优化，多重部署目标
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 💬 **多评论系统** - 支持Valine、Waline、Giscus等
- 🔍 **搜索功能** - 内置本地搜索，快速查找内容
- 📊 **数据统计** - 支持多种网站分析工具
- 🌙 **深色模式** - 自动切换深色/浅色主题
- ⚡ **性能优化** - 图片懒加载、代码高亮等优化
- 🔄 **内容同步** - 所有平台内容自动同步

## 🎯 快速开始

### 方法一：一键部署（推荐）

1. **Fork 此仓库**
   ```bash
   点击右上角的 "Fork" 按钮
   ```

2. **配置个人信息**
   ```bash
   # 克隆到本地
   git clone https://github.com/twj0/blog.git
   cd blog
   
   # 安装依赖
   npm install
   
   # 运行配置向导
   npm run setup
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

4. **配置 Cloudflare Pages（可选）**

   为了获得全球 CDN 加速，可以添加 Cloudflare Pages 部署：

   **步骤 1**: 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)

   **步骤 2**: Pages → Create a project → Connect to Git

   **步骤 3**: 选择您的 GitHub 仓库

   **步骤 4**: 配置构建设置：
   ```
   构建命令: npx hexo generate --config _config.cloudflare.yml
   构建输出目录: public
   环境变量: NODE_VERSION = 18
   ```

   📖 **详细设置指南**: [Cloudflare Pages 解决方案](CLOUDFLARE-SOLUTION.md)

5. **推送代码，自动部署**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

6. **访问您的博客**

   部署完成后，您的博客将在两个平台上可用：
   ```
   GitHub Pages:     https://yourusername.github.io/blog
   Cloudflare Pages: https://your-project-name.pages.dev
   ```

### 方法二：手动配置

<details>
<summary>点击展开手动配置步骤</summary>

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
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
| `SITE_SUBTITLE` | 网站副标题 | 记录生活，分享技术 |
| `SITE_DESCRIPTION` | 网站描述 | 基于Hexo和AnZhiYu主题的个人博客 |
| `AUTHOR_NAME` | 作者姓名 | 您的姓名 |
| `SITE_URL` | 网站地址 | https://username.github.io/repo |
| `SITE_ROOT` | 根路径 | /repo/ |

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

## 🌐 多平台部署架构

本项目支持同时部署到多个平台，配置优化：

### 📋 平台对比

| 功能 | GitHub Pages | Cloudflare Pages |
|------|-------------|------------------|
| **CDN** | GitHub CDN | Cloudflare 全球 CDN |
| **速度** | 良好 | 优秀（全球加速） |
| **配置** | `_config.yml` | `_config.cloudflare.yml` |
| **URL结构** | `/blog/` 子路径 | 根域名 |
| **构建命令** | `npm run build` | `npx hexo generate --config _config.cloudflare.yml` |

### 🔄 工作原理

```
📝 推送代码到 GitHub
         ↓
    ┌─────────┬─────────┐
    ↓         ↓         ↓
GitHub    Cloudflare   本地开发
Actions    Pages      环境
    ↓         ↓         ↓
使用        使用        使用
_config.yml _config.    _config.yml
           cloudflare.yml
    ↓         ↓         ↓
部署到      部署到      本地预览
GitHub     Cloudflare
Pages      Pages
    ↓         ↓
✅ 内容同步 ✅
```

## 🔧 快速故障排除

### 🌐 Cloudflare Pages 问题

**问题**: CSS/JS 文件无法加载
```bash
# ✅ 解决方案：使用正确的构建命令
npx hexo generate --config _config.cloudflare.yml
```

**问题**: 404 错误或路径错误
```yaml
# ✅ 检查 _config.cloudflare.yml
root: /  # Cloudflare Pages 必须使用根路径
url: https://your-project-name.pages.dev
```

### 📋 构建问题

**问题**: 构建失败
- ✅ 检查 Node.js 版本（使用 18+）
- ✅ 确认 `_config.cloudflare.yml` 存在
- ✅ 设置环境变量：`NODE_VERSION = 18`

📖 **完整指南**: [Cloudflare Pages 解决方案](CLOUDFLARE-SOLUTION.md)

## 📚 文档

### 🚀 部署指南
- [⚡ 快速多平台设置](MULTI-PLATFORM-SETUP.md) - **3分钟设置指南**
- [🌐 Cloudflare Pages 解决方案](CLOUDFLARE-SOLUTION.md) - **CSS/JS 修复指南**
- [🔧 高级部署指南](docs/deployment-guide.md) - 完整部署说明

### 📋 配置与设置
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
- [Cloudflare Pages](https://pages.cloudflare.com/) - 全球 CDN 和边缘计算平台

## 📞 支持

如果这个项目对您有帮助，请给个 ⭐ Star 支持一下！

有问题？欢迎：
- 📧 [提交 Issue](../../issues)
- 💬 [参与讨论](../../discussions)
- 📖 [查看文档](docs/)

---

**开始您的博客之旅吧！** 🎉

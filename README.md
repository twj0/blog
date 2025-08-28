# 🌟 AnZhiYu 主题博客

基于 [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 主题的个人博客，部署在 Cloudflare Pages 上。

## ✨ 特性

- 🎨 **精美主题**: 使用安知鱼的卡片式 UI 设计
- ⚡ **极速访问**: Cloudflare Pages 全球 CDN 加速
- 🔄 **自动部署**: GitHub Actions 自动构建和部署
- 📝 **简单管理**: Markdown 文件管理博客内容
- 💰 **零成本**: 完全免费的解决方案

## 🚀 一键部署到 Cloudflare Pages

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/twj0/blog)

### 部署步骤

1. **Fork 这个仓库**
2. **点击上面的部署按钮**
3. **连接你的 GitHub 账户**
4. **选择 Fork 的仓库**
5. **配置构建设置**:
   - 框架预设: `None` 或 `Static`
   - 构建命令: `chmod +x build.sh && ./build.sh`
   - 构建输出目录: `public`
   - 根目录: `/`
   - 环境变量: `NODE_VERSION=18`

## 📁 项目结构

```
blog-theme-anzhiyu/
├── hexo-theme-anzhiyu/         # 安知鱼主题文件
├── blog/                       # 博客文章目录
│   └── 2025/
│       └── 08/
├── themes/                     # Hexo 主题目录
├── scaffolds/                  # 文章模板
├── .github/workflows/          # GitHub Actions
├── _config.yml                 # Hexo 配置
├── package.json               # 项目依赖
├── build.sh                   # 构建脚本
└── README.md                  # 项目说明
```

## 🛠️ 本地开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装和运行

```bash
# 克隆仓库
git clone https://github.com/twj0/blog.git

# 安装依赖
npm install

# 设置主题链接
rm -rf themes/anzhiyu
ln -sf ../hexo-theme-anzhiyu themes/anzhiyu

# 安装主题依赖
cd hexo-theme-anzhiyu
npm install
cd ..

# 启动开发服务器
npm run server
```

访问 http://localhost:4000 查看博客。

## ✍️ 写作指南

### 创建新文章

```bash
# 创建新文章
npm run new "文章标题"

# 或者直接在 blog/ 目录下创建 Markdown 文件
# 文件路径: blog/YYYY/MM/文章名.md
```

### 文章格式

```markdown
---
title: 文章标题
date: 2025-08-28 10:32:00
tags: 
  - 标签1
  - 标签2
categories: 
  - 分类
description: 文章描述
cover: 封面图片URL
---

文章内容...
```

## 🔧 配置说明

### 站点配置

编辑 `_config.yml` 文件修改站点信息:

```yaml
# 站点信息
title: 我的博客
subtitle: '基于安知鱼主题的个人博客'
description: '记录技术学习和生活感悟'
author: Your Name
url: https://yourblog.pages.dev
```

### 主题配置

主题配置文件位于 `hexo-theme-anzhiyu/_config.yml`，可以自定义:

- 导航菜单
- 社交链接  
- 评论系统
- 统计分析
- 等等...

## 🚀 部署配置

### GitHub Actions 部署

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支时会自动构建并部署到 Cloudflare Pages。

需要在 GitHub 仓库设置中添加以下 Secrets:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API 令牌
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID

### 手动部署

```bash
# 构建静态文件
npm run build

# 生成的文件在 public/ 目录
```

## 🌐 自定义域名

在 Cloudflare Pages 项目设置中可以绑定自定义域名:

1. 进入 Cloudflare Pages 控制台
2. 选择你的项目
3. 点击 "Custom domains"
4. 添加你的域名
5. 按照提示配置 DNS

## 📚 相关链接

- [Hexo 官方文档](https://hexo.io/docs/)
- [AnZhiYu 主题文档](https://docs.anheyu.com/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

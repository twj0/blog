# Cloudflare Pages 直接连接 GitHub 设置指南

## 概述
这种方法让 Cloudflare Pages 直接监听您的 GitHub 仓库，当您推送代码时自动构建和部署。

## 优势
- ✅ 配置简单，无需复杂的 GitHub Actions
- ✅ Cloudflare 自动处理构建和部署
- ✅ 与现有的 GitHub Pages 部署并行运行
- ✅ 支持自定义域名和 CDN 加速

## 设置步骤

### 1. 登录 Cloudflare Dashboard
访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并登录

### 2. 创建 Pages 项目
1. 在左侧菜单选择 "Pages"
2. 点击 "Create a project"
3. 选择 "Connect to Git"

### 3. 连接 GitHub 仓库
1. 选择 "GitHub" 作为 Git 提供商
2. 授权 Cloudflare 访问您的 GitHub 账户
3. 选择您的博客仓库（如：`twj0/blog`）
4. 点击 "Begin setup"

### 4. 配置构建设置
在项目配置页面设置以下参数：

**项目名称**: `hexo-blog`（或您喜欢的名称）

**生产分支**: `main`（或 `master`）

**构建设置**:
- **Framework preset**: `None` 或 `Hexo`
- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/` (保持默认)

**环境变量**（推荐设置）:
- `NODE_VERSION`: `18`
- `NPM_VERSION`: `latest`

### 5. 高级构建配置（可选）

如果需要更复杂的构建过程，可以创建 `_headers` 文件：

```
# _headers 文件内容
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable
```

### 6. 部署和验证
1. 点击 "Save and Deploy"
2. Cloudflare 将开始首次构建
3. 构建完成后，您将获得一个 `.pages.dev` 域名

## 自定义域名设置

### 1. 添加自定义域名
1. 在 Pages 项目页面点击 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入您的域名（如：`blog.yourdomain.com`）

### 2. 配置 DNS
在您的域名 DNS 设置中添加 CNAME 记录：
- **Name**: `blog`（或您选择的子域名）
- **Target**: `your-project.pages.dev`

## 同步策略

### 自动同步
- 当您推送代码到 GitHub 时，两个平台都会自动更新：
  - GitHub Actions 部署到 GitHub Pages
  - Cloudflare Pages 自动检测变化并重新构建

### 手动触发
- GitHub Pages: 在 Actions 页面手动运行工作流
- Cloudflare Pages: 在项目页面点击 "Retry deployment"

## 监控和管理

### 构建日志
- GitHub Pages: 在 Actions 页面查看构建日志
- Cloudflare Pages: 在项目页面的 "Deployments" 标签查看

### 性能监控
- 使用 Cloudflare Analytics 监控访问情况
- 比较两个平台的访问速度和可用性

## 故障排除

### 常见问题
1. **构建失败**: 检查 Node.js 版本和依赖安装
2. **主题文件缺失**: 确保主题文件已提交到仓库
3. **路径问题**: 检查 `_config.yml` 中的 `url` 和 `root` 配置
4. **构建命令错误**: 确保使用 `npm run build` 而不是 `npx hexo generate`

### 调试技巧
1. 查看 Cloudflare Pages 构建日志
2. 本地测试构建命令：`npm run build`
3. 检查 `public` 目录是否正确生成
4. 验证 `package.json` 中的 build 脚本

## 最佳实践

1. **分支策略**: 使用 `main` 分支作为生产分支
2. **环境变量**: 为不同平台设置不同的配置
3. **缓存优化**: 配置适当的缓存头
4. **监控**: 定期检查两个平台的部署状态

## 访问地址对比

部署完成后，您将有两个访问地址：
- **GitHub Pages**: `https://twj0.github.io/blog/`
- **Cloudflare Pages**: `https://hexo-blog.pages.dev`（或您的自定义域名）

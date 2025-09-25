# 您的多平台部署配置指南

## 📋 项目信息
- **GitHub 用户名**: twj0
- **仓库名称**: blog
- **Cloudflare 项目名称**: blog

## 🔑 GitHub Secrets 配置

访问: https://github.com/twj0/blog/settings/secrets/actions

添加以下 Secrets:

### CLOUDFLARE_API_TOKEN
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → "My Profile"
3. 选择 "API Tokens" 标签页
4. 点击 "Create Token"
5. 选择 "Custom token" 模板
6. 配置权限：
   - **Account**: `Cloudflare Pages:Edit`
   - **Zone Resources**: `Include - All zones`
   - **Account Resources**: `Include - All accounts`
7. 复制生成的 Token

### CLOUDFLARE_ACCOUNT_ID
1. 在 Cloudflare Dashboard 右侧边栏找到 "Account ID"
2. 复制 Account ID

## 📊 GitHub Variables 配置

访问: https://github.com/twj0/blog/settings/variables/actions

添加以下 Variable:
- **Name**: `CLOUDFLARE_PROJECT_NAME`
- **Value**: `blog`

## 🚀 部署测试

配置完成后，推送代码测试部署:

```bash
git add .
git commit -m "feat: enable multi-platform deployment"
git push origin main
```

## 🌐 访问地址

部署成功后，您的博客将在以下地址可用:
- **GitHub Pages**: https://twj0.github.io/blog
- **Cloudflare Pages**: https://blog.pages.dev

## 📊 监控部署状态

- **GitHub Actions**: https://github.com/twj0/blog/actions
- **Cloudflare Pages**: https://dash.cloudflare.com/ → Pages → blog

## 🔧 故障排除

如果遇到问题，请查看:
1. GitHub Actions 构建日志
2. Cloudflare Pages 部署日志
3. 确认 Secrets 和 Variables 配置正确

---

生成时间: 2025/9/25 12:51:39

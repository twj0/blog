# Cloudflare Pages 配置指南

## 1. 获取 Cloudflare API Token

### 步骤：
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → "My Profile"
3. 选择 "API Tokens" 标签页
4. 点击 "Create Token"
5. 选择 "Custom token" 模板
6. 配置权限：
   - **Account**: `Cloudflare Pages:Edit`
   - **Zone Resources**: `Include - All zones`
   - **Account Resources**: `Include - All accounts`

### 复制生成的 Token 并保存到 GitHub Secrets

## 2. 获取 Cloudflare Account ID

### 步骤：
1. 在 Cloudflare Dashboard 右侧边栏找到 "Account ID"
2. 复制 Account ID 并保存到 GitHub Secrets

## 3. 在 GitHub 仓库中配置 Secrets

### 步骤：
1. 进入您的 GitHub 仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret" 添加以下 Secrets：
   - Name: `CLOUDFLARE_API_TOKEN`，Value: 您的 API Token
   - Name: `CLOUDFLARE_ACCOUNT_ID`，Value: 您的 Account ID

## 4. 配置 Variables

### 步骤：
1. 在同一页面点击 "Variables" 标签页
2. 点击 "New repository variable" 添加：
   - Name: `CLOUDFLARE_PROJECT_NAME`，Value: 您想要的项目名称（如：hexo-blog）

## 5. 创建 Cloudflare Pages 项目（可选）

### 自动创建：
- 当您首次运行 GitHub Actions 时，会自动创建项目

### 手动创建：
1. 在 Cloudflare Dashboard 中选择 "Pages"
2. 点击 "Create a project"
3. 选择 "Direct Upload"
4. 输入项目名称（与 `CLOUDFLARE_PROJECT_NAME` 一致）

## 6. 验证配置

配置完成后，推送代码到 main 分支，GitHub Actions 将自动：
1. 构建 Hexo 静态文件
2. 部署到 GitHub Pages
3. 部署到 Cloudflare Pages

## 访问地址

- **GitHub Pages**: `https://twj0.github.io/blog/`
- **Cloudflare Pages**: `https://[项目名称].pages.dev`

## 故障排除

### 常见问题：
1. **API Token 权限不足**：确保 Token 有 Cloudflare Pages 编辑权限
2. **Account ID 错误**：检查 Account ID 是否正确复制
3. **项目名称冲突**：确保项目名称在 Cloudflare 中唯一

### 调试方法：
- 查看 GitHub Actions 日志
- 检查 Cloudflare Pages 项目状态
- 验证 Secrets 和 Variables 配置

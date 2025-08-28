# 部署指南

## Cloudflare Pages 部署步骤

### 方法一：一键部署（推荐）

1. 点击 README 中的 "Deploy to Cloudflare Pages" 按钮
2. 登录 Cloudflare 账户
3. 连接 GitHub 账户并选择仓库
4. 配置构建设置：
   - **构建命令**: `chmod +x build.sh && ./build.sh`
   - **构建输出目录**: `public`
   - **环境变量**: `NODE_VERSION=18`

### 方法二：手动配置

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 进入 Pages 部分

2. **创建新项目**
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 连接 GitHub 并选择你的仓库

3. **配置构建设置**
   ```
   Framework preset: None
   Build command: chmod +x build.sh && ./build.sh
   Build output directory: public
   Root directory: /
   ```

4. **环境变量**
   ```
   NODE_VERSION = 18
   ```

5. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成

### 自定义域名配置

1. **在 Cloudflare Pages 中添加域名**
   - 进入项目设置
   - 点击 "Custom domains"
   - 添加你的域名

2. **DNS 配置**
   - 如果域名在 Cloudflare 管理：自动配置
   - 如果域名在其他服务商：添加 CNAME 记录指向 `your-project.pages.dev`

## GitHub Actions 自动部署

项目已配置 GitHub Actions，推送到 main 分支时自动部署。

### 配置 Secrets

在 GitHub 仓库设置中添加：

1. **CLOUDFLARE_API_TOKEN**
   - 访问 https://dash.cloudflare.com/profile/api-tokens
   - 创建自定义令牌，权限：
     - Zone:Zone Settings:Read
     - Zone:Zone:Read  
     - Account:Cloudflare Pages:Edit

2. **CLOUDFLARE_ACCOUNT_ID**
   - 在 Cloudflare Dashboard 右侧边栏找到 Account ID

## 本地开发

```bash
# 安装依赖
npm install

# 设置主题
rm -rf themes/anzhiyu
ln -sf ../hexo-theme-anzhiyu themes/anzhiyu

# 启动开发服务器
npm run server
```

## 故障排除

### 构建失败

1. **检查 Node.js 版本**
   - 确保使用 Node.js 18+

2. **检查主题文件**
   - 确保 `hexo-theme-anzhiyu` 目录存在
   - 检查主题配置文件

3. **检查依赖**
   - 运行 `npm install` 安装依赖
   - 检查 `package.json` 中的依赖版本

### 主题显示异常

1. **检查主题链接**
   ```bash
   ls -la themes/anzhiyu
   ```

2. **重新设置主题**
   ```bash
   rm -rf themes/anzhiyu
   ln -sf ../hexo-theme-anzhiyu themes/anzhiyu
   ```

### 文章不显示

1. **检查文章格式**
   - 确保 Front Matter 格式正确
   - 检查日期格式

2. **检查文件路径**
   - 文章应放在 `blog/` 目录下
   - 检查 `_config.yml` 中的 `source_dir` 配置

## 性能优化

1. **启用 CDN**
   - Cloudflare 自动提供 CDN 加速

2. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用图床服务

3. **缓存配置**
   - Cloudflare Pages 自动配置缓存
   - 可在 Page Rules 中自定义缓存规则

# 🌐 Cloudflare Pages 设置指南

## 🎯 目标

在不修改任何现有配置的情况下，添加 Cloudflare Pages 作为第二个部署平台。

## ✨ 方案优势

- ✅ **零代码修改** - GitHub Actions 继续正常工作
- ✅ **独立运行** - 两个平台互不干扰
- ✅ **自动同步** - 推送代码后两个平台都会更新
- ✅ **全球 CDN** - Cloudflare 提供更快的访问速度

## 🚀 设置步骤（5分钟）

### 第一步：登录 Cloudflare

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录您的账户（没有账户请先免费注册）

### 第二步：创建 Pages 项目

1. 在左侧菜单中点击 **"Pages"**
2. 点击 **"Create a project"** 按钮
3. 选择 **"Connect to Git"**

### 第三步：连接 GitHub 仓库

1. 选择 **"GitHub"** 作为 Git 提供商
2. 点击 **"Connect GitHub"** 并授权 Cloudflare 访问您的 GitHub
3. 在仓库列表中找到您的博客仓库（例如：`twj0/blog`）
4. 点击仓库名称旁的 **"Begin setup"** 按钮

### 第四步：配置构建设置

在项目配置页面填入以下信息：

#### 📋 基本设置
- **项目名称**: `twj0-blog`（或您喜欢的名称）
- **生产分支**: `main`（或 `master`，根据您的主分支名称）

#### 🔧 构建配置
- **Framework preset**: 选择 `None`
- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/`（保持默认）

#### 🌍 环境变量（推荐设置）
点击 **"Environment variables (advanced)"** 展开，然后添加：
- **Variable name**: `NODE_VERSION`，**Value**: `18`
- **Variable name**: `NPM_VERSION`，**Value**: `latest`

### 第五步：开始部署

1. 检查所有设置无误后，点击 **"Save and Deploy"**
2. Cloudflare 将开始首次构建（通常需要 2-3 分钟）
3. 构建完成后，您将看到部署成功的消息

## 🌐 访问地址

部署完成后，您将拥有两个访问地址：

- **GitHub Pages**: `https://twj0.github.io/blog/`
- **Cloudflare Pages**: `https://twj0-blog.pages.dev`

## 🔄 工作原理

```
推送代码到 GitHub
         ↓
    ┌─────────┬─────────┐
    ↓         ↓         ↓
GitHub    Cloudflare   您的本地
Actions    Pages      仓库更新
    ↓         ↓
构建并部署  独立构建部署
到 GitHub   到 Cloudflare
Pages       Pages
    ↓         ↓
两个平台内容保持同步
```

当您推送代码时：
1. **GitHub Actions** 自动触发，构建并部署到 GitHub Pages
2. **Cloudflare Pages** 同时检测到仓库变化，独立进行构建和部署
3. 两个平台的内容保持完全同步

## ✅ 验证部署成功

### 检查构建状态
1. **GitHub Actions**: 访问 `https://github.com/twj0/blog/actions`
2. **Cloudflare Pages**: 在 Cloudflare Dashboard → Pages → 您的项目页面

### 访问测试
1. 打开两个访问地址，确认都能正常访问
2. 检查内容是否一致
3. 比较两个平台的加载速度

## 🔧 故障排除

### 常见问题

#### 1. 构建失败
**可能原因**: Node.js 版本或依赖问题
**解决方案**: 
- 确认环境变量 `NODE_VERSION` 设置为 `18`
- 检查 `package.json` 是否正确提交到仓库

#### 2. 页面显示异常
**可能原因**: 构建命令或输出目录配置错误
**解决方案**:
- 确认构建命令为 `npm run build`
- 确认输出目录为 `public`

#### 3. 主题文件缺失
**可能原因**: 主题文件未提交到仓库
**解决方案**:
- 确认 `themes/anzhiyu` 目录已完整提交
- 检查 `.gitignore` 是否排除了主题文件

### 本地测试

在设置 Cloudflare Pages 之前，建议先本地测试：

```bash
# 清理缓存
npm run clean

# 安装依赖
npm install

# 构建静态文件
npm run build

# 检查输出
ls -la public/

# 本地预览
npm run server
```

## 🎉 完成！

现在您的博客已经成功部署到两个平台：

- **GitHub Pages** - 适合开发者访问，与 GitHub 生态集成良好
- **Cloudflare Pages** - 全球 CDN 加速，更快的访问速度

每次您推送新内容时，两个平台都会自动更新，为您的读者提供更好的访问体验！

## 📚 下一步

- 考虑为 Cloudflare Pages 配置自定义域名
- 使用 Cloudflare Analytics 监控访问情况
- 比较两个平台的性能表现

---

**需要帮助？** 请查看 [Issues](../../issues) 或参考 [详细文档](docs/)

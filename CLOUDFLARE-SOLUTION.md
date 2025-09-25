# 🔧 Cloudflare Pages CSS/JS 路径问题解决方案

## 🎯 问题描述

当使用 Cloudflare Pages 部署 Hexo 博客时，页面只显示 HTML 内容，CSS 和 JS 文件无法加载。

## 🔍 问题原因

您的 `_config.yml` 配置了 `root: /blog/`，这是为 GitHub Pages 设计的。但 Cloudflare Pages 部署在根路径，导致资源路径不匹配：

- **GitHub Pages**: `https://twj0.github.io/blog/css/index.css` ✅
- **Cloudflare Pages**: `https://project.pages.dev/blog/css/index.css` ❌（实际路径应该是 `/css/index.css`）

## ✅ 解决方案

### 方案：使用专门的 Cloudflare 配置文件

我已经为您创建了 `_config.cloudflare.yml` 文件，其中设置了：
```yaml
url: https://twj0-blog.pages.dev
root: /  # 根路径，不是 /blog/
```

## 🚀 Cloudflare Pages 正确配置

### 第一步：登录 Cloudflare Dashboard
访问 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

### 第二步：创建 Pages 项目
1. Pages → Create a project → Connect to Git
2. 选择您的 GitHub 仓库
3. 配置构建设置：

#### 🔧 关键配置
```
项目名称: twj0-blog
生产分支: main
构建命令: npx hexo generate --config _config.cloudflare.yml
输出目录: public
环境变量: NODE_VERSION = 18
```

**注意**：构建命令必须使用 `--config _config.cloudflare.yml` 参数！

### 第三步：部署
点击 "Save and Deploy"，等待构建完成。

## 🌐 最终结果

部署成功后，您将拥有两个完全正常的访问地址：

- **GitHub Pages**: `https://twj0.github.io/blog/` （使用 `_config.yml`）
- **Cloudflare Pages**: `https://twj0-blog.pages.dev` （使用 `_config.cloudflare.yml`）

## 🔄 工作原理

```
推送代码到 GitHub
         ↓
    ┌─────────┬─────────┐
    ↓         ↓         ↓
GitHub    Cloudflare   本地开发
Actions    Pages      
    ↓         ↓         ↓
使用        使用        使用
_config.yml _config.    _config.yml
           cloudflare.yml
    ↓         ↓         ↓
root:/blog/ root:/     root:/blog/
    ↓         ↓         ↓
GitHub Pages Cloudflare 本地预览
正常显示    Pages正常显示  正常显示
```

## 🧪 本地测试

您可以在本地测试 Cloudflare 配置：

```bash
# 清理缓存
npx hexo clean

# 使用 Cloudflare 配置构建
npx hexo generate --config _config.cloudflare.yml

# 检查生成的文件
ls public/

# 启动本地服务器测试
npx hexo server --config _config.cloudflare.yml
```

## 📋 验证清单

部署完成后，请检查：

- [ ] Cloudflare Pages 构建成功
- [ ] 页面能正常访问
- [ ] CSS 样式正确加载
- [ ] JavaScript 功能正常
- [ ] 图片资源显示正常
- [ ] 导航链接工作正常

## 🔧 故障排除

### 如果仍然有问题：

1. **检查构建日志**：在 Cloudflare Pages 项目页面查看构建日志
2. **验证构建命令**：确保使用了 `--config _config.cloudflare.yml`
3. **检查文件路径**：确认 `_config.cloudflare.yml` 文件存在
4. **清除缓存**：在浏览器中强制刷新（Ctrl+F5）

### 常见错误：

❌ **错误的构建命令**：`npm run build`
✅ **正确的构建命令**：`npx hexo generate --config _config.cloudflare.yml`

❌ **错误的配置**：使用默认的 `_config.yml`
✅ **正确的配置**：使用专门的 `_config.cloudflare.yml`

## 🎉 总结

通过使用专门的配置文件，您现在可以：

- ✅ **GitHub Pages** 和 **Cloudflare Pages** 同时正常工作
- ✅ 两个平台使用不同的路径配置，各自优化
- ✅ 推送一次代码，两个平台自动同步
- ✅ 享受 Cloudflare 的全球 CDN 加速

这是最简单、最稳定的多平台部署解决方案！

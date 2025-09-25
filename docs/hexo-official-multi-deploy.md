# Hexo 官方多平台部署指南

## 📖 基于 Hexo 官方文档

根据 [Hexo 官方文档](https://hexo.io/docs/one-command-deployment)，Hexo **原生支持多个部署目标**：

> "You can use multiple deployers. Hexo will execute each deployer in order."

## 🚀 支持的部署方式

### 方案一：多个 Git 仓库部署

#### 配置示例

```yaml
# _config.yml
deploy:
  - type: git
    repo: https://github.com/username/blog.git
    branch: gh-pages
    message: "GitHub Pages: {{ now('YYYY-MM-DD HH:mm:ss') }}"
  - type: git
    repo: https://github.com/username/blog-backup.git
    branch: main
    message: "Backup: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

#### 使用方法

```bash
# 安装 Git 部署插件
npm install hexo-deployer-git --save

# 部署到所有配置的仓库
hexo clean && hexo deploy
```

### 方案二：混合部署方式

Hexo 支持不同类型的部署器组合：

```yaml
# _config.yml
deploy:
  - type: git
    repo: https://github.com/username/blog.git
    branch: gh-pages
  - type: rsync
    host: your-server.com
    user: username
    root: /var/www/html
  - type: ftpsync
    host: ftp.yourhost.com
    user: username
    pass: password
    remote: /public_html
```

### 方案三：结合 Cloudflare Pages

#### 推荐的实际可行方案

基于您的需求，最实用的方案是：

1. **保持现有的 GitHub Pages 部署**（通过 GitHub Actions）
2. **添加 Cloudflare Pages 直连**（无需修改 Hexo 配置）

#### 具体实施步骤

**第一步：保持现有配置不变**
- 您的 GitHub Actions 继续部署到 GitHub Pages
- `_config.yml` 中的 deploy 配置保持现状

**第二步：设置 Cloudflare Pages**
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pages → Create a project → Connect to Git
3. 选择您的 GitHub 仓库
4. 配置构建设置：
   ```
   构建命令: npm run build
   输出目录: public
   环境变量: NODE_VERSION = 18
   ```

**第三步：自动同步**
- 当您推送代码时：
  - GitHub Actions 自动部署到 GitHub Pages
  - Cloudflare Pages 自动检测变化并构建部署
  - 两个平台内容保持同步

## 🔧 实际测试

让我们测试一下 Hexo 的多部署器功能：

### 测试配置

```yaml
# _config.yml - 测试用配置
deploy:
  - type: git
    repo: https://github.com/twj0/blog.git
    branch: gh-pages
    message: "GitHub Pages: {{ now('YYYY-MM-DD HH:mm:ss') }}"
  - type: git
    repo: https://github.com/twj0/blog-mirror.git  # 假设的镜像仓库
    branch: main
    message: "Mirror: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

### 测试命令

```bash
# 1. 确保安装了部署插件
npm install hexo-deployer-git --save

# 2. 清理并生成
hexo clean && hexo generate

# 3. 部署到所有配置的目标
hexo deploy
```

## 💡 最佳实践建议

### 推荐方案：GitHub Actions + Cloudflare Pages

考虑到实际可操作性，我推荐以下方案：

1. **保持现有的 GitHub Actions 工作流**
   - 继续自动部署到 GitHub Pages
   - 稳定可靠，无需修改

2. **添加 Cloudflare Pages 直连**
   - 直接连接 GitHub 仓库
   - 自动检测代码变化
   - 独立构建和部署

3. **两个平台并行运行**
   - 互不干扰
   - 自动同步内容
   - 提供冗余和更好的全球访问

### 为什么不使用 Hexo 多部署器？

虽然 Hexo 支持多部署器，但在您的场景下：

1. **GitHub Actions 已经很好用**
   - 自动化程度高
   - 构建日志详细
   - 易于调试

2. **Cloudflare Pages 直连更简单**
   - 无需配置复杂的认证
   - 自动 SSL 和 CDN
   - 构建速度快

3. **维护成本更低**
   - 减少配置复杂度
   - 降低出错概率
   - 更容易排查问题

## 🎯 最终推荐

**最实用的多平台部署方案**：

1. **GitHub Pages**：继续使用现有的 GitHub Actions
2. **Cloudflare Pages**：直接连接 GitHub 仓库，使用 `npm run build`

这样您可以获得：
- ✅ 两个平台的所有优势
- ✅ 最小的配置复杂度
- ✅ 最高的稳定性
- ✅ 自动内容同步

## 📚 参考资料

- [Hexo 官方部署文档](https://hexo.io/docs/one-command-deployment)
- [hexo-deployer-git 插件](https://github.com/hexojs/hexo-deployer-git)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

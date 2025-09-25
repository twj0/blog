# 多平台部署使用指南

## 🚀 快速开始

### 方案选择

根据您的需求选择合适的部署方案：

| 方案 | 优势 | 适用场景 |
|------|------|----------|
| **方案一**: GitHub Actions | 完全自动化，配置灵活 | 需要精确控制部署流程 |
| **方案二**: hexo-deployer-git | 简单直接，本地控制 | 喜欢本地部署命令 |
| **方案三**: Cloudflare 直连 | 配置最简单 | 希望最小化配置 |

## 📦 方案一：GitHub Actions 多平台部署

### 1. 启用新的工作流
```bash
# 禁用旧的工作流（可选）
git mv .github/workflows/deploy.yml .github/workflows/deploy.yml.backup

# 新的工作流已创建在 .github/workflows/multi-platform-deploy.yml
```

### 2. 配置 Secrets 和 Variables
按照 `docs/cloudflare-setup-guide.md` 的说明配置 Cloudflare 相关信息。

### 3. 部署
```bash
# 推送代码即可自动部署
git add .
git commit -m "Enable multi-platform deployment"
git push origin main
```

## 🔧 方案二：本地多仓库部署

### 1. 安装必要依赖
```bash
# 确保已安装 hexo-deployer-git
npm install hexo-deployer-git --save
```

### 2. 配置多个部署目标
编辑 `_config.yml` 文件的 deploy 部分（已为您配置好基础版本）：

```yaml
deploy:
  - type: git
    repo: https://github.com/twj0/blog.git
    branch: gh-pages
    message: "Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"
  - type: git
    repo: https://github.com/twj0/blog-backup.git  # 备份仓库
    branch: main
    message: "Backup updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

### 3. 部署命令
```bash
# 使用新的多平台部署脚本
npm run multi-deploy

# 或者使用传统的 hexo 命令
npm run clean
npm run build
npm run deploy
```

## 🌐 方案三：Cloudflare Pages 直连

### 1. 设置 Cloudflare Pages
按照 `docs/cloudflare-direct-setup.md` 的详细步骤操作。

### 2. 推送代码
```bash
# 正常推送代码，Cloudflare 会自动构建
git add .
git commit -m "Update blog content"
git push origin main
```

## 🛠️ 常用命令

### 开发命令
```bash
# 本地开发服务器
npm run dev

# 预览构建结果
npm run preview

# 清理缓存
npm run clean
```

### 部署命令
```bash
# 多平台部署（方案二）
npm run multi-deploy

# 传统部署
npm run deploy

# 仅构建（不部署）
npm run build
```

### 维护命令
```bash
# 检查配置
npm run check

# 更新主题
npm run update-theme

# 检查主题更新
npm run check-theme-update
```

## 📊 部署状态监控

### GitHub Pages
- 访问地址：https://twj0.github.io/blog/
- 状态监控：GitHub 仓库的 Actions 页面
- 构建日志：Actions 工作流详情

### Cloudflare Pages
- 访问地址：https://[项目名].pages.dev
- 状态监控：Cloudflare Dashboard → Pages → 项目页面
- 构建日志：项目页面的 Deployments 标签

## 🔍 故障排除

### 常见问题

#### 1. GitHub Actions 构建失败
```bash
# 检查工作流状态
# 在 GitHub 仓库的 Actions 页面查看详细日志

# 本地测试构建
npm run clean
npm run build
```

#### 2. Cloudflare Pages 构建失败
```bash
# 检查构建命令是否正确
npm install && npx hexo generate

# 检查 Node.js 版本
node --version  # 应该是 18.x
```

#### 3. 部署后页面显示异常
```bash
# 检查配置文件
npm run check

# 重新生成并部署
npm run clean
npm run multi-deploy
```

### 调试技巧

1. **查看构建日志**：始终先查看构建日志了解具体错误
2. **本地测试**：在本地运行相同的构建命令
3. **配置验证**：使用 `npm run check` 验证配置
4. **分步调试**：分别测试清理、构建、部署各个步骤

## 📈 性能优化建议

### 1. 缓存优化
- GitHub Pages：自动处理静态资源缓存
- Cloudflare Pages：配置 `_headers` 文件优化缓存策略

### 2. 图片优化
```bash
# 压缩图片（如果需要）
npm install imagemin-cli -g
imagemin source/images/* --out-dir=source/images/
```

### 3. 构建优化
```bash
# 使用并行构建（在 GitHub Actions 中已配置）
# 本地可以使用更多 CPU 核心
export HEXO_ALGOLIA_INDEXING_BATCH_SIZE=50
```

## 🔄 内容同步策略

### 自动同步（推荐）
- 推送到 main 分支后，两个平台都会自动更新
- GitHub Actions 处理 GitHub Pages
- Cloudflare Pages 自动检测仓库变化

### 手动同步
```bash
# 手动触发 GitHub Actions
# 在 GitHub 仓库的 Actions 页面点击 "Run workflow"

# 手动触发 Cloudflare Pages
# 在 Cloudflare Dashboard 中点击 "Retry deployment"
```

## 📝 最佳实践

1. **分支管理**：使用 main 分支作为生产分支
2. **提交信息**：使用清晰的提交信息便于追踪
3. **定期备份**：定期检查两个平台的部署状态
4. **监控访问**：使用分析工具监控两个站点的访问情况
5. **域名管理**：考虑为不同平台配置不同的域名或子域名

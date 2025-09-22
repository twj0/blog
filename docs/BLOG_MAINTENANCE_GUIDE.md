# Hexo AnZhiYu 博客维护和更新指南

## 📝 日常写作和发布流程

### 1. 创建新文章
```bash
# 进入博客目录
cd d:\github\anzhiyu-blog-start\blog-site

# 创建新文章
npx hexo new "文章标题"
# 或者创建草稿
npx hexo new draft "草稿标题"
```

### 2. 编辑文章
- 文章位置：`source/_posts/文章标题.md`
- 草稿位置：`source/_drafts/草稿标题.md`
- 使用 Markdown 语法编写内容

### 3. 预览文章
```bash
# 启动本地服务器
npx hexo server
# 或简写
npx hexo s

# 访问 http://localhost:4000 预览
```

### 4. 发布文章
```bash
# 将草稿发布为正式文章
npx hexo publish "草稿标题"

# 生成静态文件并部署
npx hexo generate && npx hexo deploy
# 或简写
npx hexo g -d
```

## 🔄 完整的更新部署流程

### 标准部署命令序列：
```bash
# 1. 清理缓存
npx hexo clean

# 2. 生成静态文件
npx hexo generate

# 3. 部署到 GitHub Pages
npx hexo deploy

# 或者一键完成（推荐）：
npx hexo clean && npx hexo g -d
```

## ⚙️ 博客配置管理

### 1. 站点配置文件
- **位置**：`_config.yml`
- **主要配置项**：
  - `title`: 网站标题
  - `subtitle`: 网站副标题
  - `description`: 网站描述
  - `author`: 作者名称
  - `language`: 网站语言
  - `url`: 网站 URL（保持 `https://twj0.github.io/blog`）
  - `root`: 根路径（保持 `/blog/`）

### 2. 主题配置文件
- **位置**：`themes/anzhiyu/_config.yml`
- **主要配置项**：
  - 导航菜单
  - 社交链接
  - 评论系统
  - 搜索功能
  - 页面布局

## 📁 重要目录结构

```
blog-site/
├── _config.yml          # 站点配置文件
├── package.json         # 依赖管理
├── source/              # 源文件目录
│   ├── _posts/          # 文章目录
│   ├── _drafts/         # 草稿目录
│   └── about/           # 关于页面
├── themes/              # 主题目录
│   └── anzhiyu/         # AnZhiYu 主题
└── public/              # 生成的静态文件（自动生成）
```

## 🎨 主题自定义

### 1. 修改主题配置
```bash
# 编辑主题配置文件
code themes/anzhiyu/_config.yml
```

### 2. 自定义 CSS
- 在 `themes/anzhiyu/source/css/` 目录下添加自定义样式
- 或在 `source/` 目录下创建自定义 CSS 文件

### 3. 添加自定义页面
```bash
# 创建关于页面
npx hexo new page about

# 创建标签页面
npx hexo new page tags

# 创建分类页面
npx hexo new page categories
```

## 🔧 常用维护命令

### 清理和重建
```bash
# 清理缓存和生成的文件
npx hexo clean

# 重新生成所有文件
npx hexo generate
```

### 本地调试
```bash
# 启动本地服务器（支持热重载）
npx hexo server --debug

# 指定端口
npx hexo server -p 4001
```

### 依赖管理
```bash
# 安装依赖
npm install

# 更新依赖
npm update

# 安装新插件（例如：搜索插件）
npm install hexo-generator-search --save
```

## 🚀 高级功能

### 1. 自动化部署（可选）
可以设置 GitHub Actions 实现自动部署：
- 推送到 main 分支时自动构建并部署
- 无需手动执行 `hexo deploy`

### 2. 插件推荐
```bash
# SEO 优化
npm install hexo-generator-sitemap --save
npm install hexo-generator-feed --save

# 搜索功能
npm install hexo-generator-search --save

# 图片压缩
npm install hexo-imagemin --save
```

### 3. 评论系统配置
在 `themes/anzhiyu/_config.yml` 中配置：
- Gitalk
- Valine
- Waline
- Twikoo

## 📋 日常维护检查清单

### 每次发布前：
- [ ] 检查文章格式和内容
- [ ] 本地预览确认无误
- [ ] 执行 `npx hexo clean`
- [ ] 执行 `npx hexo g -d`
- [ ] 访问 https://twj0.github.io/blog/ 确认更新

### 定期维护：
- [ ] 更新依赖包：`npm update`
- [ ] 备份重要配置文件
- [ ] 检查主题更新
- [ ] 优化图片和资源文件

## 🆘 常见问题解决

### 1. 部署失败
```bash
# 检查 Git 配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 重新部署
npx hexo clean && npx hexo g -d
```

### 2. 主题样式异常
```bash
# 清理缓存重新生成
npx hexo clean && npx hexo generate
```

### 3. 本地预览异常
```bash
# 重启服务器
npx hexo server --debug
```

## 📞 获取帮助

- [Hexo 官方文档](https://hexo.io/docs/)
- [AnZhiYu 主题文档](https://docs.anheyu.com/)
- [GitHub Issues](https://github.com/twj0/blog/issues)

---

**记住最重要的部署命令：**
```bash
npx hexo clean && npx hexo g -d
```

这一条命令就能完成清理、生成、部署的全部流程！

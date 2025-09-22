# Hexo博客技术路线与实现

本文档总结了Hexo博客的技术实现原理、工作流程以及自定义方法。

## 1. 技术架构

### 1.1 核心组件
- **Hexo引擎**：静态网站生成器，负责将Markdown内容转换为静态HTML页面
- **AnZhiYu主题**：提供博客的外观和交互功能
- **GitHub Pages**：托管和提供静态网站服务
- **Git部署**：自动化部署流程

### 1.2 工作流程
```
Markdown源文件 → Hexo引擎解析 → 主题模板渲染 → 静态HTML输出 → 部署至GitHub Pages
```

### 1.3 目录结构
```
blog-site/
├── source/              # 原始内容（Markdown文件）
├── themes/              # 主题文件
├── public/              # 生成的静态文件（部署用）
├── _config.yml          # 站点配置
└── package.json         # 项目依赖
```

## 2. 技术实现原理

### 2.1 静态网站生成过程

1. **内容管理**：
   - 文章以Markdown格式存储在 [source/_posts](file:///d:/github/anzhiyu-blog-start/blog-site/source/_posts) 目录中
   - 页面以Markdown格式存储在 [source](file:///d:/github/anzhiyu-blog-start/blog-site/source) 目录中

2. **渲染过程**：
   - Hexo读取Markdown文件
   - 使用EJS模板引擎应用主题模板
   - 编译Stylus为CSS
   - 生成完整的HTML文件

3. **部署机制**：
   - 生成的静态文件存储在 [public](file:///d:/github/anzhiyu-blog-start/blog-site/public) 目录
   - 使用 `hexo-deployer-git` 插件将文件推送到GitHub的 `gh-pages` 分支
   - GitHub Pages从该分支提供网站服务

### 2.3 主题系统

AnZhiYu主题基于以下技术：
- **模板引擎**：EJS
- **样式处理**：Stylus预处理器
- **前端框架**：原生JavaScript + 自定义脚本
- **插件系统**：支持自定义标签和功能扩展

## 3. 自定义方法

### 3.1 配置自定义
- 修改 [_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/_config.yml) 文件调整站点配置
- 修改 [themes/anzhiyu/_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/_config.yml) 调整主题配置

### 3.2 样式自定义
- 在 [themes/anzhiyu/source/css/_extra/anzhiyu/custom.css](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/source/css/_extra/anzhiyu/custom.css) 中添加自定义CSS
- 修改主题的Stylus文件以更改主题样式

### 3.3 功能扩展
- 在 [themes/anzhiyu/scripts](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/scripts) 目录中添加自定义脚本
- 使用内置标签插件丰富内容展示（note、folding、btn等）

### 3.4 页面模板
- 在 [themes/anzhiyu/layout](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/layout) 目录中创建自定义页面模板
- 使用EJS模板语法构建自定义页面

## 4. 部署与维护

### 4.1 部署流程
```bash
# 清理旧文件
hexo clean

# 生成静态文件
hexo generate
# 或使用 npm run build

# 部署到GitHub Pages
hexo deploy
# 或使用 npm run deploy
```

### 4.2 本地开发
```bash
# 启动本地服务器预览
hexo server
# 或使用 npm run server
```

### 4.3 更新维护
- 定期更新依赖：`npm update`
- 检查过时依赖：`npm outdated`
- 备份源文件和配置
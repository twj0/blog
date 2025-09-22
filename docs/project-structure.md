# 项目目录结构说明

## 📁 根目录结构

```
blog-site/
├── .github/                    # GitHub相关配置
│   └── workflows/             # GitHub Actions工作流
├── docs/                      # 项目文档
├── node_modules/              # 依赖包（自动生成）
├── public/                    # 生成的静态文件（自动生成）
├── scaffolds/                 # 文章模板
├── source/                    # 源文件目录
├── themes/                    # 主题目录
├── _config.yml               # Hexo主配置文件
├── _config.template.yml      # 配置模板文件
├── .env.example              # 环境变量示例
├── .gitignore               # Git忽略文件
├── package.json             # 项目依赖配置
└── README.md                # 项目说明文档
```

## 📝 重要目录详解

### `/source/` - 源文件目录
```
source/
├── _posts/                   # 博客文章
│   ├── hello-world.md       # 示例文章
│   └── welcome-to-my-blog.md # 欢迎文章
├── about/                   # 关于页面
├── categories/              # 分类页面
├── tags/                    # 标签页面
├── link/                    # 友链页面
└── CNAME                    # 自定义域名（可选）
```

**说明**：
- `_posts/` 目录存放所有博客文章
- 其他目录为独立页面
- 文章使用 Markdown 格式编写

### `/themes/anzhiyu/` - 主题目录
```
themes/anzhiyu/
├── _config.yml              # 主题配置文件
├── _config.template.yml     # 主题配置模板
├── layout/                  # 页面布局模板
├── source/                  # 主题静态资源
│   ├── css/                # 样式文件
│   ├── js/                 # JavaScript文件
│   └── img/                # 图片资源
└── scripts/                # 主题脚本
```

**说明**：
- 主题配置文件控制网站外观和功能
- 不建议直接修改主题文件，使用配置文件自定义

### `/.github/workflows/` - 自动化部署
```
.github/
└── workflows/
    ├── deploy.yml           # 部署工作流
    └── test.yml            # 测试工作流（可选）
```

**说明**：
- GitHub Actions 自动化部署配置
- 当推送代码时自动构建和部署博客

### `/docs/` - 项目文档
```
docs/
├── configuration-checklist.md  # 配置检查清单
├── project-structure.md       # 项目结构说明
├── quick-start.md             # 快速开始指南
└── troubleshooting.md         # 故障排除指南
```

## 🔧 配置文件说明

### `_config.yml` - Hexo主配置
控制博客的基本设置：
- 网站标题、描述、作者
- URL和路径配置
- 文章生成规则
- 部署设置

### `themes/anzhiyu/_config.yml` - 主题配置
控制主题的外观和功能：
- 菜单导航
- 社交链接
- 评论系统
- 页面样式

### `package.json` - 项目依赖
定义项目的依赖包和脚本命令：
- Hexo核心包
- 主题依赖
- 插件包
- 构建脚本

## 📄 重要文件说明

### 文章文件格式
```markdown
---
title: 文章标题
date: 2025-01-01 12:00:00
tags: 
  - 标签1
  - 标签2
categories: 
  - 分类名
cover: 封面图片URL
description: 文章描述
---

文章内容...
```

### 页面文件格式
```markdown
---
title: 页面标题
date: 2025-01-01 12:00:00
type: 页面类型
---

页面内容...
```

## 🚀 工作流程

### 1. 写作流程
1. 在 `source/_posts/` 创建新的 `.md` 文件
2. 编写文章内容
3. 提交到 GitHub
4. 自动部署到 GitHub Pages

### 2. 配置修改流程
1. 修改 `_config.yml` 或主题配置文件
2. 本地测试：`npm run server`
3. 确认无误后提交到 GitHub
4. 自动部署生效

### 3. 主题自定义流程
1. 修改主题配置文件
2. 添加自定义CSS（如需要）
3. 测试效果
4. 提交部署

## 📚 扩展说明

### 添加新页面
1. 在 `source/` 目录创建新文件夹
2. 添加 `index.md` 文件
3. 在主题配置中添加菜单链接

### 安装插件
1. 使用 npm 安装插件
2. 在 `_config.yml` 中配置插件
3. 重新部署

### 自定义样式
1. 在主题的 `source/css/` 目录添加CSS文件
2. 在主题配置中引用
3. 或直接修改主题配置中的样式设置

---

**提示**：建议在修改任何配置前先备份原文件，并在本地测试确认无误后再部署。

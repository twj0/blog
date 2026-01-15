---
title: giscus评论区使用
date: 2025-10-25 21:56:00

tags:
  - 评论区
  - giscus
categories:
  - Tech
cover: https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOTaPzXb4U3Uqbs2EVo4DXZlOyhhPUAApoMaxtaGelX1PM3qxd1sQIBAAMCAAN3AAM2BA.png
description: giscus评论区使用方法

---

# giscus评论区使用指南

在现代博客系统中，评论功能是与读者互动的重要方式。

giscus 是一个基于 GitHub Discussions 的轻量级评论系统，它具有开源、无追踪、支持多种主题等优点。本文将详细介绍如何在 AnZhiYu 主题的 Hexo 博客中配置和使用 giscus 评论系统。

## 什么是 giscus？

giscus 是一个由 GitHub Discussions 驱动的评论系统，具有以下特点：

- **开源且免费**：完全开源，可以自由使用和修改
- **无追踪**：不收集用户数据，保护用户隐私
- **支持多种主题**：可以适配博客的主题风格
- **易于配置**：只需简单的配置即可使用
- **多语言支持**：支持多种语言界面

## 配置前的准备工作

在配置 giscus 之前，需要确保满足以下条件：

1. 一个 GitHub 账户
2. 一个公开的 GitHub 仓库（用于托管博客）
3. 在仓库中启用 GitHub Discussions 功能

### 启用 GitHub Discussions

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 选项卡
3. 在 "Features" 部分找到 "Discussions"
4. 勾选 "Discussions" 选项并保存

### 安装 giscus GitHub 应用

1. 访问 [giscus GitHub 应用页面](https://github.com/apps/giscus)
2. 点击 "Install"
3. 选择要安装的仓库
4. 确认安装

## 获取 giscus 配置参数

访问 [giscus 官方网站](https://giscus.app/) 来获取配置参数：

1. 在 "repository" 字段中输入你的仓库名称（格式：`owner/repo`）
2. 选择一个讨论分类（如 "General"）
3. 根据需要选择其他选项（如主题、语言等）
4. 网站会自动生成配置代码，我们需要其中的关键参数：
   - `repo`：仓库名称
   - `repo_id`：仓库 ID
   - `category`：分类名称
   - `category_id`：分类 ID

## 在 AnZhiYu 主题中配置 giscus

AnZhiYu 主题已经内置了对 giscus 的支持，我们只需要在配置文件中填写相应的参数。

### 配置 GitHub Secrets（推荐方式）

为了安全起见，建议通过 GitHub Secrets 来配置 giscus 参数：

1. 在 GitHub 仓库中，进入 "Settings" → "Secrets and variables" → "Actions"
2. 添加以下 secrets：
   - `GISCUS_REPO`：仓库名称（格式：`owner/repo`）
   - `GISCUS_REPO_ID`：从 giscus.app 获取的仓库 ID
   - `GISCUS_CATEGORY_ID`：从 giscus.app 获取的分类 ID

### 直接在配置文件中配置

也可以直接在主题配置文件 `_config.anzhiyu.yml` 中配置 giscus：

```yaml
# giscus
# https://giscus.app/
giscus:
  repo: your-username/your-repo  # 你的仓库名称
  repo_id: R_kgDOxxxxxx  # 从 giscus.app 获取的实际仓库 ID
  category: General  # 你选择的讨论分类
  category_id: DIC_kwDOxxxxxx  # 从 giscus.app 获取的实际分类 ID
  theme:
    light: light
    dark: dark
  option:
    data-mapping: pathname
    data-strict: 0
    data-reactions-enabled: 1
    data-emit-metadata: 1
    data-input-position: top
    data-lang: zh-CN
    data-loading: lazy
    data-category: General
```

### 启用评论系统

在配置文件中找到评论系统设置部分，启用 giscus：

```yaml
# Comments System
comments:
  # 选择使用的评论系统
  use: [Giscus] # 可以同时配置两个评论系统，第一个为默认显示
  text: true # 在按钮旁边显示评论系统名称
  lazyload: false # 是否延迟加载评论系统
  count: false # 在文章顶部显示评论数
  card_post_count: false # 在首页显示评论数
```

## 配置参数详解

### 基本参数

- `repo`：GitHub 仓库名称，格式为 `owner/repo`
- `repo_id`：GitHub 仓库的唯一标识符
- `category`：GitHub Discussions 分类名称
- `category_id`：GitHub Discussions 分类的唯一标识符

### 主题配置

```yaml
theme:
  light: light  # 浅色主题
  dark: dark    # 深色主题
```

### 可选参数

- `data-mapping`：讨论映射方式（pathname、url、title、og:title）
- `data-strict`：严格标题匹配（0 或 1）
- `data-reactions-enabled`：启用反应（0 或 1）
- `data-emit-metadata`：发送元数据（0 或 1）
- `data-input-position`：输入框位置（top 或 bottom）
- `data-lang`：界面语言（如 zh-CN、en）
- `data-loading`：加载方式（lazy 或 eager）
- `data-category`：分类名称（应与 category 一致）

## 测试配置

配置完成后，可以通过以下步骤测试 giscus 是否正常工作：

1. 重新生成博客：
   ```bash
   hexo clean && hexo g && hexo s
   ```

2. 访问本地博客，查看文章页面底部是否显示评论区

3. 如果遇到问题，可以使用浏览器开发者工具检查控制台错误信息

## 调试工具

AnZhiYu 主题提供了调试工具来帮助检查 giscus 配置：

1. `check-giscus.js`：在浏览器控制台中运行此脚本来检查配置
2. 浏览器开发者工具：查看网络请求和控制台错误信息

## 常见问题及解决方案

### 评论区显示空白

可能原因及解决方案：
1. 仓库不是公开的 → 将仓库设为公开
2. 未启用 Discussions 功能 → 在仓库设置中启用
3. giscus 应用未正确安装 → 重新安装 giscus 应用
4. 配置参数错误 → 检查 repo_id 和 category_id 是否正确

### 控制台显示 CSP 错误

这通常是由于仓库配置不正确或 giscus 应用未正确安装导致的，请按照配置步骤重新检查。

### 如何获取正确的仓库 ID 和分类 ID？

访问 [giscus.app](https://giscus.app/)，输入你的仓库名称，系统会自动生成正确的配置参数。

## 高级用法

### 自定义主题

giscus 支持自定义主题，可以通过修改配置文件中的 theme 参数来实现：

```yaml
theme:
  light: https://cdn.example.com/giscus-light.css
  dark: https://cdn.example.com/giscus-dark.css
```

### 条件加载

可以通过设置 `lazyload: true` 来实现评论系统的延迟加载，提高页面加载速度。

### 多语言支持

giscus 支持多种语言，可以通过修改 `data-lang` 参数来切换界面语言。

## 总结

giscus 是一个优秀的基于 GitHub Discussions 的评论系统，它简单易用且功能强大。通过本文的介绍，你应该能够在 AnZhiYu 主题的 Hexo 博客中成功配置和使用 giscus 评论系统。

如果你在配置过程中遇到任何问题，可以参考官方文档或查看控制台错误信息进行调试。giscus 的开源特性也意味着你可以根据自己的需求进行定制和修改。

希望这篇文章能帮助你成功配置 giscus 评论系统，让你的博客拥有更好的读者互动体验！
# 🌐 多语言README配置指南

本指南提供了在博客项目中实施和管理多语言README文件的详细说明，以及正确的仓库变量配置。

## 📋 概述

本项目现在支持五种语言：
- **英语** (`README.md`) - 主要/标准版本
- **简体中文** (`README-zhCN.md`)
- **繁体中文** (`README-zhTW.md`)
- **日语** (`README-JP.md`)
- **韩语** (`README-ko.md`)

## 🚀 快速实施

### 步骤1：验证多语言文件

确保所有语言版本都存在于您的仓库根目录中：

```bash
# 检查是否存在所有README文件
ls -la README*.md

# 预期输出：
# README.md          (英语 - 主要)
# README-zhCN.md     (简体中文)
# README-zhTW.md     (繁体中文)
# README-JP.md       (日语)
# README-ko.md       (韩语)
```

### 步骤2：更新仓库变量

导航到您的GitHub仓库：**Settings > Secrets and variables > Actions > Variables**

#### 必需变量

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `SITE_TITLE` | 网站标题 | `我的个人博客` |
| `SITE_SUBTITLE` | 网站副标题 | `记录生活，分享技术` |
| `SITE_DESCRIPTION` | 网站描述 | `基于Hexo和AnZhiYu主题的个人博客` |
| `AUTHOR_NAME` | 作者姓名 | `您的姓名` |
| `SITE_URL` | 网站URL | `https://yourusername.github.io/blog` |
| `SITE_ROOT` | 根路径 | `/blog/` |
| `SITE_LANGUAGE` | 默认语言 | `zh-CN` (或 `en`, `zh-TW`, `ja`, `ko`) |
| `TIMEZONE` | 时区 | `Asia/Shanghai` (或 `UTC`, `Asia/Tokyo` 等) |

#### 增强功能的可选变量

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `SITE_KEYWORDS` | SEO关键词 | `博客,hexo,anzhiyu,个人` |
| `GITHUB_USERNAME` | GitHub用户名 | `yourusername` |
| `AVATAR_URL` | 头像图片URL | `https://avatars.githubusercontent.com/u/xxx` |

### 步骤3：配置评论系统（可选）

如果您想启用评论，请将这些添加到**Secrets**（不是Variables）：

#### Valine配置
- `VALINE_APP_ID`: 您的LeanCloud App ID
- `VALINE_APP_KEY`: 您的LeanCloud App Key

#### Waline配置
- `WALINE_SERVER_URL`: 您的Waline服务器URL

#### Giscus配置
- `GISCUS_REPO`: 格式为 `owner/repo` 的仓库
- `GISCUS_REPO_ID`: 来自Giscus的仓库ID
- `GISCUS_CATEGORY_ID`: 来自Giscus的分类ID

## 🛠️ 实施教程

### 完整的分步设置

#### 阶段1：仓库准备

1. **Fork并克隆仓库**
   ```bash
   # 首先在GitHub上Fork仓库
   git clone https://github.com/yourusername/blog.git
   cd blog
   ```

2. **验证多语言文件**
   ```bash
   # 检查是否存在所有README文件
   ls -la README*.md
   
   # 如果有任何缺失，它们应该自动创建
   # 或者您可以从原始仓库复制它们
   ```

#### 阶段2：GitHub仓库配置

1. **访问仓库设置**
   - 转到您的GitHub仓库
   - 点击**Settings**选项卡
   - 导航到**Secrets and variables** → **Actions**

2. **配置仓库变量**
   
   点击**Variables**选项卡并添加以下内容：

   **基本配置：**
   ```
   SITE_TITLE = "您的博客标题"
   SITE_SUBTITLE = "您的博客副标题"  
   SITE_DESCRIPTION = "您的博客描述"
   AUTHOR_NAME = "您的姓名"
   SITE_URL = "https://yourusername.github.io/blog"
   SITE_ROOT = "/blog/"
   ```

   **本地化设置：**
   ```
   SITE_LANGUAGE = "zh-CN"  # 或 en, zh-TW, ja, ko
   TIMEZONE = "Asia/Shanghai"  # 或 UTC, Asia/Tokyo 等
   ```

   **可选SEO变量：**
   ```
   SITE_KEYWORDS = "博客,hexo,anzhiyu,个人,技术"
   GITHUB_USERNAME = "yourusername"
   ```

#### 阶段3：评论系统设置（可选）

如果您想启用评论，请在**Secrets**选项卡中配置：

1. **Valine（LeanCloud）**
   ```
   VALINE_APP_ID = "your_leancloud_app_id"
   VALINE_APP_KEY = "your_leancloud_app_key"
   ```

2. **Waline**
   ```
   WALINE_SERVER_URL = "https://your-waline-server.vercel.app"
   ```

3. **Giscus（GitHub讨论）**
   ```
   GISCUS_REPO = "yourusername/blog"
   GISCUS_REPO_ID = "your_repo_id"
   GISCUS_CATEGORY_ID = "your_category_id"
   ```

#### 阶段4：启用GitHub Pages

1. **配置GitHub Pages**
   - 在仓库Settings → Pages中
   - Source：选择**GitHub Actions**
   - 保存配置

2. **验证工作流文件**
   ```bash
   # 检查.github/workflows/deploy.yml是否存在
   ls -la .github/workflows/
   ```

#### 阶段5：部署和测试

1. **初始部署**
   ```bash
   # 进行小的更改以触发部署
   echo "# 多语言博客设置完成" >> DEPLOYMENT_LOG.md
   git add .
   git commit -m "feat: 启用多语言文档"
   git push origin main
   ```

2. **监控部署**
   - 转到仓库中的**Actions**选项卡
   - 观察部署过程
   - 检查日志中的任何错误

3. **验证多语言支持**
   - 访问您的博客：`https://yourusername.github.io/blog`
   - 检查所有README文件是否可访问
   - 测试语言切换功能

## 🔐 安全最佳实践

### Variables vs Secrets

**使用Variables用于：**
- 公共信息（网站标题、作者姓名、URL）
- 非敏感配置数据
- 可以在日志中可见的信息

**使用Secrets用于：**
- API密钥和令牌
- 数据库凭据
- 私有配置数据

### 变量命名约定

遵循这些约定以保持一致性：
- 使用 `UPPERCASE_WITH_UNDERSCORES`
- 为相关变量添加前缀（例如，`SITE_*`, `VALINE_*`）
- 保持名称描述性但简洁

## 🚨 从旧变量迁移

### 重要变量更改

如果您正在从旧版本迁移，请注意这些更改：

**旧变量** → **新变量**
- `GITHUB_URL` → 使用 `GITHUB_USERNAME` 代替
- `REPO_NAME` → 从仓库设置中派生
- `DEPLOY_REPO` → 从仓库自动配置

### 迁移步骤

1. **备份当前变量**：
   ```bash
   # 导出当前变量（手动备份）
   # 转到Settings > Secrets and variables > Actions
   # 记录所有当前变量
   ```

2. **更新变量名称**：
   - 删除已弃用的变量
   - 添加新的必需变量
   - 更新引用旧变量的任何自定义脚本

3. **测试部署**：
   ```bash
   # 触发测试部署
   git commit --allow-empty -m "使用新变量测试部署"
   git push origin main
   ```

## 🔍 故障排除

### 常见问题

1. **缺少语言文件**
   ```bash
   # 错误：找不到README-xx.md
   # 解决方案：确保所有语言文件都已提交到仓库
   git add README-*.md
   git commit -m "添加缺失的语言文件"
   ```

2. **找不到变量**
   ```bash
   # 错误：未定义变量SITE_TITLE
   # 解决方案：在GitHub仓库设置中添加变量
   ```

3. **编码问题**
   ```bash
   # 确保所有文件使用UTF-8编码
   file -bi README-*.md
   ```

## 📞 支持

如果您在多语言设置中遇到问题：

1. **查看文档**：查看本指南和项目文档
2. **GitHub Issues**：搜索现有问题或创建新问题
3. **社区支持**：加入讨论获取社区帮助

---

**祝您多语言博客愉快！** 🌍

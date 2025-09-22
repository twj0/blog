# 🔧 方案一：设置 GitHub 环境变量

## 📋 需要设置的环境变量

请在 GitHub 仓库中设置以下环境变量：

### 🌐 访问路径
1. 打开您的 GitHub 仓库：https://github.com/twj0/blog
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Secrets and variables**
4. 点击 **Actions**
5. 选择 **Variables** 标签页
6. 点击 **New repository variable** 按钮

### 📝 必需变量列表

| 变量名 | 值 | 说明 |
|--------|----|----|
| `SITE_TITLE` | `twj0的个人博客` | 网站标题 |
| `SITE_SUBTITLE` | `记录生活，分享技术` | 网站副标题 |
| `SITE_DESCRIPTION` | `基于Hexo和AnZhiYu主题的个人博客` | 网站描述 |
| `SITE_KEYWORDS` | `blog,hexo,anzhiyu,技术,生活` | 网站关键词 |
| `AUTHOR_NAME` | `twj0` | 作者姓名 |
| `SITE_LANGUAGE` | `zh-CN` | 网站语言 |
| `TIMEZONE` | `Asia/Shanghai` | 时区设置 |
| `SITE_URL` | `https://twj0.github.io/blog` | 网站完整URL |
| `SITE_ROOT` | `/blog/` | 网站根路径 |
| `USER_GITHUB_URL` | `https://github.com/twj0` | GitHub主页 |
| `AVATAR_URL` | `https://avatars.githubusercontent.com/u/你的用户ID?v=4` | 头像地址 |
| `THEME_COLOR_MAIN` | `#425AEF` | 主题主色调 |
| `THEME_COLOR_DARK` | `#f2b94b` | 深色模式颜色 |

### 🔍 可选变量（评论系统等）

如果您需要评论系统，可以添加：

| 变量名 | 说明 |
|--------|-----|
| `COMMENT_SYSTEM` | 评论系统类型（valine/waline/giscus/none） |
| `VALINE_APP_ID` | Valine App ID（如使用Valine） |
| `VALINE_APP_KEY` | Valine App Key（如使用Valine） |
| `WALINE_SERVER_URL` | Waline 服务器地址（如使用Waline） |

## 🚀 设置完成后的操作

1. **触发重新部署**：
   - 设置完变量后，推送任何更改到 main 分支
   - 或者在 Actions 页面手动触发工作流

2. **监控部署状态**：
   - 访问：https://github.com/twj0/blog/actions
   - 查看最新的工作流执行状态

3. **验证网站**：
   - 等待部署完成（通常2-5分钟）
   - 访问：https://twj0.github.io/blog/

## 🔄 如果仍有问题

如果设置环境变量后仍有问题，请检查：

1. **GitHub Pages 设置**：
   - 仓库 Settings > Pages
   - Source 应该设置为 "GitHub Actions"

2. **仓库权限**：
   - 确保仓库是公开的（Public）
   - 或者您有 GitHub Pro/Team 订阅（私有仓库）

3. **工作流权限**：
   - Settings > Actions > General
   - Workflow permissions 设置为 "Read and write permissions"

## 📞 故障排除

如果遇到问题，请检查：
- GitHub Actions 工作流日志
- 是否所有必需变量都已设置
- 变量值是否正确（特别是URL和路径）

# 🚀 5分钟快速开始指南

本指南将帮助您在5分钟内完成博客的搭建和部署。

## 📋 准备工作

在开始之前，请确保您有：
- [x] GitHub 账号
- [x] 基本的 Git 操作知识
- [x] 网络连接

## 🎯 第一步：Fork 仓库

1. **访问模板仓库**
   ```
   https://github.com/yourusername/blog-template
   ```

2. **点击 Fork 按钮**
   - 点击右上角的 "Fork" 按钮
   - 选择您的账号作为目标
   - 等待 Fork 完成

3. **重命名仓库（可选）**
   - 进入 Fork 后的仓库
   - 点击 Settings > General
   - 修改 Repository name 为您喜欢的名称

## ⚙️ 第二步：配置基本信息

### 方法A：使用配置向导（推荐）

1. **克隆仓库到本地**
   ```bash
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **运行配置向导**
   ```bash
   npm run setup
   ```

4. **按提示输入信息**
   ```
   请输入网站标题: 我的个人博客
   请输入作者姓名: Your Name
   请输入GitHub用户名: yourusername
   请输入GitHub仓库名: your-blog-repo
   ...
   ```

### 方法B：在线编辑（简单快捷）

1. **在GitHub上编辑配置**
   - 进入您的仓库
   - 点击 `_config.template.yml` 文件
   - 点击编辑按钮（铅笔图标）

2. **修改关键配置**
   ```yaml
   title: {{SITE_TITLE}}        # 改为：我的个人博客
   author: {{AUTHOR_NAME}}      # 改为：Your Name
   url: {{SITE_URL}}           # 改为：https://yourusername.github.io/your-blog-repo
   ```

3. **保存文件**
   - 重命名文件为 `_config.yml`
   - 提交更改

## 🔧 第三步：设置 GitHub Actions 变量

1. **进入仓库设置**
   - 点击仓库的 Settings 标签
   - 在左侧菜单找到 "Secrets and variables"
   - 点击 "Actions"

2. **添加 Variables（变量）**
   
   点击 "New repository variable" 添加以下变量：
   
   | 变量名 | 值 | 说明 |
   |--------|----|----|
   | `SITE_TITLE` | 我的个人博客 | 网站标题 |
   | `AUTHOR_NAME` | Your Name | 作者姓名 |
   | `SITE_URL` | https://yourusername.github.io/your-blog-repo | 网站地址 |
   | `GITHUB_URL` | https://github.com/yourusername | GitHub主页 |
   | `AVATAR_URL` | https://avatars.githubusercontent.com/yourusername | 头像地址 |

3. **添加 Secrets（密钥）**
   
   如果需要评论系统，添加相应的密钥：
   
   | 密钥名 | 说明 |
   |--------|------|
   | `VALINE_APP_ID` | Valine评论系统ID |
   | `VALINE_APP_KEY` | Valine评论系统Key |

## 📄 第四步：启用 GitHub Pages

1. **进入 Pages 设置**
   - 在仓库 Settings 中找到 "Pages"
   - 或直接访问：`https://github.com/yourusername/your-blog-repo/settings/pages`

2. **配置部署源**
   - Source 选择 "GitHub Actions"
   - 保存设置

3. **等待部署完成**
   - 查看 Actions 标签页的部署状态
   - 绿色勾号表示部署成功

## 🎉 第五步：访问您的博客

1. **获取博客地址**
   ```
   https://yourusername.github.io/your-blog-repo
   ```

2. **检查部署状态**
   - 进入 Actions 标签页
   - 查看最新的工作流运行状态
   - 绿色表示成功，红色表示失败

3. **首次访问**
   - 可能需要等待几分钟
   - 刷新页面查看最新内容

## ✍️ 第六步：发布第一篇文章

### 在线编辑（推荐新手）

1. **创建新文章**
   - 进入 `source/_posts/` 目录
   - 点击 "Add file" > "Create new file"
   - 文件名：`my-first-post.md`

2. **编写文章内容**
   ```markdown
   ---
   title: 我的第一篇博客
   date: 2025-01-01 12:00:00
   tags: 
     - 博客
     - 开始
   categories: 
     - 日记
   ---
   
   # 欢迎来到我的博客！
   
   这是我的第一篇文章，很高兴与大家分享我的想法。
   
   ## 关于我
   
   我是一个热爱技术的人...
   ```

3. **提交文章**
   - 填写提交信息
   - 点击 "Commit new file"

### 本地编辑（推荐有经验用户）

1. **创建新文章**
   ```bash
   npx hexo new "我的第一篇博客"
   ```

2. **编辑文章**
   ```bash
   # 文章会在 source/_posts/ 目录下
   # 使用您喜欢的编辑器编辑
   ```

3. **本地预览**
   ```bash
   npm run server
   # 访问 http://localhost:4000 预览
   ```

4. **提交并部署**
   ```bash
   git add .
   git commit -m "Add my first post"
   git push origin main
   ```

## 🔍 验证部署

1. **检查 Actions**
   - 进入 Actions 标签页
   - 确认 "Deploy Blog to GitHub Pages" 工作流成功运行

2. **访问博客**
   - 打开您的博客地址
   - 确认新文章已显示

3. **测试功能**
   - 检查菜单导航
   - 测试搜索功能
   - 验证响应式布局

## 🎊 恭喜！

您已经成功搭建了自己的个人博客！

## 📚 下一步

- 📖 [配置检查清单](configuration-checklist.md) - 完善博客配置
- 🎨 [主题自定义](theme-customization.md) - 个性化您的博客
- 💬 [评论系统配置](comment-systems.md) - 添加互动功能
- 📊 [SEO优化](seo-optimization.md) - 提升搜索排名

## 🆘 遇到问题？

- 📋 [故障排除指南](troubleshooting.md)
- 💬 [提交 Issue](../../issues)
- 📖 [查看文档](../)

---

**享受您的博客之旅！** ✨

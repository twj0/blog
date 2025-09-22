# 博客配置检查清单

## 📋 必需配置项

### 基本信息
- [ ] **网站标题** (`SITE_TITLE`) - 您的博客名称
- [ ] **作者姓名** (`AUTHOR_NAME`) - 您的姓名或昵称
- [ ] **网站描述** (`SITE_DESCRIPTION`) - 简短的博客介绍
- [ ] **网站URL** (`SITE_URL`) - GitHub Pages地址
- [ ] **GitHub用户名** (`GITHUB_USERNAME`) - 您的GitHub用户名
- [ ] **仓库名称** (`GITHUB_REPOSITORY`) - 博客仓库名称

### 部署配置
- [ ] **部署仓库** (`DEPLOY_REPO`) - GitHub仓库地址
- [ ] **部署分支** (`DEPLOY_BRANCH`) - 通常为 `gh-pages`
- [ ] **网站根路径** (`SITE_ROOT`) - 如果部署在子目录需要配置

### GitHub Actions
- [ ] **GitHub Token** - 在仓库Settings > Secrets中设置 `GITHUB_TOKEN`
- [ ] **工作流权限** - 确保Actions有写入权限

## 🎨 外观配置

### 头像和图片
- [ ] **头像URL** (`AVATAR_URL`) - 个人头像图片链接
- [ ] **网站图标** (`FAVICON_URL`) - 网站favicon
- [ ] **首页背景** (`INDEX_IMG_URL`) - 首页横幅图片
- [ ] **默认文章封面** (`DEFAULT_TOP_IMG_URL`) - 文章默认封面

### 主题颜色
- [ ] **主色调** (`THEME_COLOR_MAIN`) - 网站主色调
- [ ] **深色模式主色调** (`THEME_COLOR_DARK`) - 深色模式下的主色调

## 🔗 社交链接

### 必填项
- [ ] **GitHub链接** (`GITHUB_URL`) - 您的GitHub主页

### 可选项
- [ ] **邮箱** (`EMAIL`) - 联系邮箱
- [ ] **微博** - 微博主页链接
- [ ] **Twitter** - Twitter主页链接
- [ ] **其他社交平台** - 根据需要添加

## 💬 评论系统（选择一个）

### Valine
- [ ] **App ID** (`VALINE_APP_ID`) - LeanCloud应用ID
- [ ] **App Key** (`VALINE_APP_KEY`) - LeanCloud应用Key
- [ ] **占位符文本** (`VALINE_PLACEHOLDER`) - 评论框提示文字

### Waline
- [ ] **服务器地址** (`WALINE_SERVER_URL`) - Waline服务器URL
- [ ] **背景图片** (`WALINE_BG`) - 评论区背景图片

### Giscus
- [ ] **仓库** (`GISCUS_REPO`) - GitHub仓库名
- [ ] **仓库ID** (`GISCUS_REPO_ID`) - GitHub仓库ID
- [ ] **分类ID** (`GISCUS_CATEGORY_ID`) - 讨论分类ID

### Twikoo
- [ ] **环境ID** (`TWIKOO_ENV_ID`) - 腾讯云环境ID

## 📊 网站分析（可选）

- [ ] **百度统计** (`BAIDU_ANALYTICS_ID`) - 百度统计ID
- [ ] **Google Analytics** (`GOOGLE_ANALYTICS_ID`) - GA跟踪ID
- [ ] **Cloudflare Analytics** (`CLOUDFLARE_ANALYTICS_ID`) - CF分析ID

## 🚀 高级功能（可选）

### PWA支持
- [ ] **启用PWA** (`PWA_ENABLE`) - 是否启用PWA功能
- [ ] **PWA图标** (`PWA_ICON_URL`) - PWA应用图标
- [ ] **Favicon 32x32** (`PWA_FAVICON_32`) - 32x32像素图标
- [ ] **Favicon 16x16** (`PWA_FAVICON_16`) - 16x16像素图标

### 其他配置
- [ ] **建站年份** (`SITE_SINCE_YEAR`) - 网站建立年份
- [ ] **页脚自定义文本** (`FOOTER_CUSTOM_TEXT`) - 页脚额外文字
- [ ] **作者描述** (`AUTHOR_DESCRIPTION`) - 侧边栏作者介绍

## ✅ 配置完成后检查

### 本地测试
- [ ] 运行 `npm run server` 启动本地服务器
- [ ] 检查网站是否正常显示
- [ ] 测试所有链接是否有效
- [ ] 验证评论系统是否工作

### 部署测试
- [ ] 推送代码到GitHub
- [ ] 检查GitHub Actions是否成功运行
- [ ] 访问GitHub Pages地址验证部署
- [ ] 测试在线功能是否正常

### SEO检查
- [ ] 网站标题和描述是否合适
- [ ] 关键词是否设置
- [ ] 社交媒体分享预览是否正常

## 🆘 常见问题

### 部署失败
1. 检查GitHub Token是否正确设置
2. 确认仓库权限设置
3. 查看Actions日志排查错误

### 样式异常
1. 检查图片链接是否有效
2. 验证主题颜色配置格式
3. 清除浏览器缓存重新访问

### 评论不显示
1. 确认评论系统配置信息正确
2. 检查第三方服务是否正常
3. 验证域名是否在服务商白名单中

---

**提示**: 建议按照此清单逐项检查，确保博客功能完整可用。

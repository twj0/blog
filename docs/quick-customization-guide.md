# 🚀 AnZhiYu主题快速自定义指南

本指南提供最常用的自定义配置，帮助您快速打造个性化博客。

## 📋 快速配置清单

### ✅ 必做配置

- [ ] 修改站点信息
- [ ] 设置头像和favicon
- [ ] 配置社交链接
- [ ] 启用评论系统
- [ ] 设置访问统计

### 🎨 推荐配置

- [ ] 自定义主题颜色
- [ ] 配置音乐播放器
- [ ] 启用搜索功能
- [ ] 添加页面特效
- [ ] 设置底部信息

## 1. 🏠 基础站点配置

### 站点信息设置

```yaml
# _config.yml (根目录)
title: 您的博客名称
subtitle: 博客副标题
description: 博客描述
keywords: 关键词1,关键词2,关键词3
author: 您的名字
language: zh-CN
timezone: Asia/Shanghai
url: https://yourdomain.com
```

### 头像和图标

```yaml
# _config.anzhiyu.yml
avatar:
  enable: true
  img: https://your-avatar-url.jpg
  effect: true

favicon: /favicon.ico
```

## 2. 🌈 主题颜色配置

### 预设配色方案

选择一个您喜欢的配色方案：

#### 🔵 经典蓝（默认）
```yaml
theme_color:
  enable: true
  main: "#425AEF"
  dark_main: "#f2b94b"
```

#### 🌸 樱花粉
```yaml
theme_color:
  enable: true
  main: "#ff6b9d"
  dark_main: "#ff8fab"
```

#### 🌊 海洋蓝
```yaml
theme_color:
  enable: true
  main: "#0077be"
  dark_main: "#4da6ff"
```

#### 🍃 森林绿
```yaml
theme_color:
  enable: true
  main: "#2d8659"
  dark_main: "#4caf50"
```

## 3. 🔗 社交链接配置

```yaml
social:
  Github: https://github.com/yourusername || fab fa-github
  Email: mailto:your@email.com || fas fa-envelope
  QQ: tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=your-qq || fab fa-qq
  微博: https://weibo.com/yourusername || fab fa-weibo
  知乎: https://www.zhihu.com/people/yourusername || fab fa-zhihu
```

## 4. 💬 评论系统配置

### 推荐：Twikoo（免费）

1. 部署Twikoo到Vercel
2. 配置环境变量
3. 在主题中启用：

```yaml
comments:
  use: Twikoo
  text: true
  count: true

twikoo:
  envId: your-vercel-app-name.vercel.app
  region: ap-shanghai
  visitor: true
```

## 5. 📊 访问统计配置

### 不蒜子统计（免费）

```yaml
busuanzi:
  site_uv: true  # 总访客数
  site_pv: true  # 总访问量
  page_pv: true  # 页面访问量
```

### 网站运行时间

```yaml
runtimeshow:
  enable: true
  publish_date: 1/1/2025 00:00:00  # 修改为您的建站时间
```

## 6. 🔍 搜索功能配置

### 本地搜索（推荐）

```yaml
local_search:
  enable: true
  preload: true
```

## 7. 🎵 音乐播放器配置

```yaml
nav_music:
  enable: true
  id: 8152976493        # 网易云歌单ID
  server: netease       # 音乐平台
  volume: 0.7          # 默认音量
```

## 8. ✨ 页面特效配置

### 基础特效

```yaml
# 深色模式粒子效果
universe:
  enable: true

# 页面气泡效果
bubble:
  enable: true

# 鼠标点击爱心
click_heart:
  enable: true
  mobile: false
```

## 9. 🏷️ 首页分类模块

```yaml
home_top:
  enable: true
  title: 您的博客标题
  subTitle: 您的博客副标题
  siteText: yourdomain.com
  category:
    - name: 技术
      path: /categories/技术/
      shadow: var(--anzhiyu-shadow-blue)
      class: blue
      icon: fas fa-code
    - name: 生活
      path: /categories/生活/
      shadow: var(--anzhiyu-shadow-green)
      class: green
      icon: fas fa-heart
    - name: 分享
      path: /categories/分享/
      shadow: var(--anzhiyu-shadow-red)
      class: red
      icon: fas fa-share-alt
```

## 10. 📄 底部信息配置

```yaml
footer:
  owner:
    enable: true
    since: 2025  # 建站年份
  custom_text: 📢 欢迎来到我的博客！
  runtime:
    enable: true
    launch_time: 01/01/2025 00:00:00
  bdageitem:
    enable: true
    list:
      - link: https://hexo.io/
        shields: https://npm.elemecdn.com/anzhiyu-blog@2.1.5/img/badge/Frame-Hexo.svg
        message: 博客框架为Hexo
      - link: https://hexo.anheyu.com/
        shields: https://npm.elemecdn.com/anzhiyu-theme-static@1.0.9/img/Theme-AnZhiYu-2E67D3.svg
        message: 本站使用AnZhiYu主题
      - link: https://github.com/yourusername/blog
        shields: https://img.shields.io/badge/Source-Github-black?style=flat&logo=github
        message: 本站项目由Github托管
```

## 11. 🎯 SEO优化配置

### 基础SEO

```yaml
# 站点验证
site_verification:
  google: your-google-verification-code
  baidu: your-baidu-verification-code

# Open Graph
Open_Graph_meta: true

# 网站地图
sitemap:
  path: sitemap.xml
```

## 12. 📱 移动端优化

```yaml
# PWA支持
pwa:
  enable: true
  manifest: /manifest.json
  theme_color: var(--anzhiyu-main)
```

## 13. 🛠️ 常用工具配置

### 字数统计

```yaml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```

### 代码高亮

```yaml
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
```

## 14. 🎨 简单自定义CSS

创建 `source/css/custom.css`：

```css
/* 自定义主色调 */
:root {
  --my-color: #your-favorite-color;
}

/* 自定义标题样式 */
.post-title {
  color: var(--my-color);
}

/* 自定义链接颜色 */
a {
  color: var(--my-color);
}

/* 自定义按钮样式 */
.btn {
  background: var(--my-color);
  border-radius: 20px;
}
```

然后在配置中引入：

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
```

## 15. 🚀 部署配置

### GitHub Pages部署

```yaml
# _config.yml
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io.git
  branch: main
```

### Vercel部署

1. 连接GitHub仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`public`

## 16. ✅ 配置检查清单

完成配置后，请检查以下项目：

- [ ] 网站标题和描述正确显示
- [ ] 头像和favicon正常加载
- [ ] 社交链接可以正常跳转
- [ ] 评论系统正常工作
- [ ] 搜索功能正常使用
- [ ] 音乐播放器正常播放
- [ ] 访问统计正常显示
- [ ] 移动端显示正常
- [ ] 页面加载速度正常

## 17. 🆘 常见问题解决

### 样式不生效
```bash
hexo clean && hexo generate
```

### 图标不显示
检查FontAwesome是否启用：
```yaml
icons:
  fontawesome: true
```

### 评论不显示
1. 检查评论系统配置
2. 确认网络连接正常
3. 查看浏览器控制台错误

### 搜索不工作
重新生成搜索索引：
```bash
hexo clean && hexo generate
```

## 18. 📚 进阶学习

完成基础配置后，您可以：

1. 查看 [完整自定义指南](./anzhiyu-customization-complete-guide.md)
2. 学习更多CSS和JavaScript自定义
3. 探索主题的高级功能
4. 参与社区讨论和贡献

---

## 🎉 完成！

恭喜您完成了AnZhiYu主题的快速配置！现在您的博客应该已经具备了基本的个性化设置。

如需更多高级功能，请参考完整的自定义指南。祝您博客之旅愉快！ 🚀

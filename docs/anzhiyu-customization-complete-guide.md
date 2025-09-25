# 🎨 AnZhiYu主题完整自定义指南

本指南将详细介绍AnZhiYu主题的所有自定义选项，帮助您打造独一无二的个人博客。

## 📋 目录

- [1. 主题颜色自定义](#1-主题颜色自定义)
- [2. 背景和图片自定义](#2-背景和图片自定义)
- [3. 音乐播放器自定义](#3-音乐播放器自定义)
- [4. 特效和动画自定义](#4-特效和动画自定义)
- [5. 文章和页面自定义](#5-文章和页面自定义)
- [6. 搜索功能自定义](#6-搜索功能自定义)
- [7. 评论系统自定义](#7-评论系统自定义)
- [8. 互动功能自定义](#8-互动功能自定义)
- [9. 移动端自定义](#9-移动端自定义)
- [10. 自定义CSS/JS注入](#10-自定义cssjs注入)
- [11. 高级自定义功能](#11-高级自定义功能)

## 1. 🌈 主题颜色自定义

### 基础颜色配置

```yaml
# _config.anzhiyu.yml
theme_color:
  enable: true
  main: "#425AEF"           # 主色调（蓝色）
  dark_main: "#f2b94b"      # 深色模式主色调（黄色）
  paginator: "#425AEF"      # 分页器颜色
  text_selection: "#2128bd" # 文本选择颜色
  link_color: "var(--anzhiyu-fontcolor)"
  meta_color: "var(--anzhiyu-fontcolor)"
  hr_color: "#4259ef23"     # 分割线颜色
  code_foreground: "#fff"   # 代码前景色
  code_background: "var(--anzhiyu-code-stress)"
  toc_color: "#425AEF"      # 目录颜色
  scrollbar_color: "var(--anzhiyu-scrollbar)"
  meta_theme_color_light: "#f7f9fe" # 浅色模式主题色
  meta_theme_color_dark: "#18171d"  # 深色模式主题色
```

### 推荐配色方案

#### 🌸 樱花粉主题
```yaml
theme_color:
  main: "#ff6b9d"
  dark_main: "#ff8fab"
  paginator: "#ff6b9d"
  text_selection: "#ff6b9d"
  toc_color: "#ff6b9d"
```

#### 🌊 海洋蓝主题
```yaml
theme_color:
  main: "#0077be"
  dark_main: "#4da6ff"
  paginator: "#0077be"
  text_selection: "#0077be"
  toc_color: "#0077be"
```

#### 🍃 森林绿主题
```yaml
theme_color:
  main: "#2d8659"
  dark_main: "#4caf50"
  paginator: "#2d8659"
  text_selection: "#2d8659"
  toc_color: "#2d8659"
```

## 2. 🖼️ 背景和图片自定义

### 首页背景设置

```yaml
# 首页顶部背景图
index_img: "https://your-image-url.jpg"

# 默认顶部图片
default_top_img: "https://your-default-image.jpg"

# 文章封面设置
cover:
  index_enable: true
  aside_enable: true
  archives_enable: true
  position: right  # left/right/both
  default_cover:
    - /img/default_cover.jpg
    - https://picsum.photos/1920/1080?random=1
    - https://picsum.photos/1920/1080?random=2
```

### 404页面自定义

```yaml
error_404:
  enable: true
  subtitle: "页面走丢了，试试搜索功能吧~"
  background: https://cdn.jsdelivr.net/gh/anzhiyu-c/CDN@master/img/404.gif
```

### 图片替换设置

```yaml
# 替换无法显示的图片
error_img:
  flink: /img/friend_404.gif
  post_page: /img/404.jpg

# 头像设置
avatar:
  enable: true
  img: https://your-avatar-url.jpg
  effect: true # 头像特效
```

## 3. 🎵 音乐播放器自定义

### 基础音乐配置

```yaml
# 左下角音乐播放器
nav_music:
  enable: true
  console_widescreen_music: false
  id: 8152976493        # 歌单ID
  server: netease       # 音乐平台：netease/tencent/kugou/xiami/baidu
  volume: 0.7          # 默认音量
  all_playlist: https://y.qq.com/n/ryqq/playlist/8802438608

# 音乐页面默认加载
music_page_default: nav_music
```

### 支持的音乐平台

| 平台 | server值 | 说明 |
|------|----------|------|
| 网易云音乐 | netease | 推荐使用 |
| QQ音乐 | tencent | 需要VIP |
| 酷狗音乐 | kugou | 部分歌曲 |
| 虾米音乐 | xiami | 已停服 |
| 百度音乐 | baidu | 资源较少 |

## 4. ✨ 特效和动画自定义

### 页面特效配置

```yaml
# 深色模式粒子效果
universe:
  enable: true

# 页面卡片顶部气泡效果
bubble:
  enable: true

# 鼠标点击爱心效果
click_heart:
  enable: true
  mobile: false

# 鼠标点击文字效果
ClickShowText:
  enable: true
  text:
    - 富强
    - 民主
    - 文明
    - 和谐
    - 自由
    - 平等
    - 公正
    - 法治
    - 爱国
    - 敬业
    - 诚信
    - 友善
  fontSize: 15px
  random: true
  mobile: false
```

### 页面美化设置

```yaml
# 美化页面显示
beautify:
  enable: true
  field: post # site/post
  title-prefix-icon: '\f0c1'
  title-prefix-icon-color: "#F47466"
```

## 5. 📝 文章和页面自定义

### 字数统计配置

```yaml
wordcount:
  enable: true
  post_wordcount: true    # 文章字数统计
  min2read: true         # 阅读时长
  total_wordcount: true  # 站点总字数
```

### 文章主色调自动提取

```yaml
mainTone:
  enable: true
  mode: api  # colorthief/cdn/api/both
  api: https://img2color-go.vercel.app/api?img=
  cover_change: true  # 整篇文章跟随封面修改主色调
```

### 文章元信息显示

```yaml
post_meta:
  page: # 主页
    date_type: created # created/updated/both
    date_format: simple # date/relative/simple
    categories: true
    tags: true
    label: false
  post: # 文章页
    date_type: both
    date_format: date
    categories: true
    tags: true
    label: true
```

## 6. 🔍 搜索功能自定义

### 本地搜索配置

```yaml
# 本地搜索（推荐）
local_search:
  enable: true
  preload: true
  CDN:
```

### Algolia搜索配置

```yaml
# Algolia搜索（高级）
algolia_search:
  enable: false
  hits:
    per_page: 6
  tags:
    - 前端
    - Hexo
    - 技术
```

### Docsearch配置

```yaml
# Docsearch（文档站点）
docsearch:
  enable: false
  appId: # 申请获得
  apiKey: # 申请获得
  indexName: # 申请获得
```

## 7. 💬 评论系统自定义

### 评论系统选择

```yaml
comments:
  use: Twikoo  # Valine/Waline/Twikoo/Artalk
  text: true   # 显示评论按钮文字
  lazyload: false
  count: true  # 显示评论数
  card_post_count: true # 首页显示评论数
```

### Twikoo评论配置

```yaml
# Twikoo评论系统（推荐）
twikoo:
  envId: your-env-id
  region: ap-shanghai
  visitor: true
  option:
```

### Waline评论配置

```yaml
# Waline评论系统
waline:
  serverURL: https://your-waline-url.vercel.app
  bg: /img/comment_bg.png
  pageview: true
  meta_css: true
  imageUploader: true
```

### Valine评论配置

```yaml
# Valine评论系统
valine:
  appId: your-leancloud-app-id
  appKey: your-leancloud-app-key
  pageSize: 10
  avatar: mp
  lang: zh-CN
  placeholder: 填写QQ邮箱就会使用QQ头像喔~
  guest_info: nick,mail,link
  recordIP: false
  bg: /img/comment_bg.png
  emojiCDN: //i0.hdslb.com/bfs/emote/
  enableQQ: true
  requiredFields: nick,mail
  visitor: true
```

## 8. 🎮 互动功能自定义

### 右键菜单配置

```yaml
rightClickMenu:
  enable: true
  translate:
    enable: true
    defaultToLanguage: zh-CN
  readMode: true
  darkMode: true
  selectTextMode: true
```

### 控制台信息

```yaml
console:
  enable: true
```

### 访问统计配置

```yaml
# 不蒜子统计
busuanzi:
  site_uv: true  # 站点总访客数
  site_pv: true  # 站点总访问量
  page_pv: true  # 页面访问量

# 51la统计（高级）
LA:
  enable: false
  ck: your-51la-key
  LingQueMonitorID: your-monitor-id
```

### 网站运行时间

```yaml
runtimeshow:
  enable: true
  publish_date: 1/1/2025 00:00:00
```

## 9. 📱 移动端自定义

### PWA支持配置

```yaml
pwa:
  enable: true
  startup_image_enable: true
  manifest: /manifest.json
  theme_color: var(--anzhiyu-main)
  mask_icon: /img/siteicon/apple-icon-180.png
  apple_touch_icon: /img/siteicon/apple-icon-180.png
  bookmark_icon: /img/siteicon/apple-icon-180.png
  favicon_32_32: /img/siteicon/32.png
  favicon_16_16: /img/siteicon/16.png
```

### 移动端优化

```yaml
# 移动端适配
mobile:
  scale: 1.0
  viewport: width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no
```

## 10. 🎨 自定义CSS/JS注入

### 注入配置

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
    - <link rel="preconnect" href="https://fonts.googleapis.com">
  bottom:
    - <script src="/js/custom.js"></script>
    - <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
```

### 自定义CSS示例

创建 `source/css/custom.css`：

```css
/* 自定义主题色 */
:root {
  --custom-primary: #ff6b6b;
  --custom-secondary: #4ecdc4;
  --custom-gradient: linear-gradient(45deg, var(--custom-primary), var(--custom-secondary));
}

/* 自定义标题样式 */
.post-title {
  background: var(--custom-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 自定义按钮样式 */
.btn {
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  background: var(--custom-gradient);
  border: none;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* 自定义卡片样式 */
.card {
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--custom-gradient);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--custom-primary);
}

/* 自定义代码块样式 */
.highlight {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

/* 自定义链接样式 */
a {
  position: relative;
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: var(--custom-gradient);
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}

/* 自定义引用样式 */
blockquote {
  border-left: 4px solid var(--custom-primary);
  background: linear-gradient(90deg, rgba(255,107,107,0.1) 0%, transparent 100%);
  border-radius: 0 8px 8px 0;
  padding: 20px;
  margin: 20px 0;
}

/* 自定义标签样式 */
.tag {
  background: var(--custom-gradient);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  margin: 2px;
  display: inline-block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-container {
    padding: 10px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}
```

### 自定义JavaScript示例

创建 `source/js/custom.js`：

```javascript
// 自定义打字机效果
document.addEventListener('DOMContentLoaded', function() {
  const typed = new Typed('#typed-text', {
    strings: ['欢迎来到我的博客', '分享技术与生活', '记录成长的足迹'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
});

// 自定义樱花飘落效果
function createSakura() {
  const sakura = document.createElement('div');
  sakura.innerHTML = '🌸';
  sakura.style.position = 'fixed';
  sakura.style.top = '-50px';
  sakura.style.left = Math.random() * window.innerWidth + 'px';
  sakura.style.fontSize = Math.random() * 20 + 10 + 'px';
  sakura.style.zIndex = '9999';
  sakura.style.pointerEvents = 'none';
  sakura.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

  document.body.appendChild(sakura);

  setTimeout(() => {
    sakura.remove();
  }, 5000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// 每隔一段时间创建樱花
setInterval(createSakura, 300);

// 自定义鼠标跟随效果
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #ff6b6b, #4ecdc4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(newCursor);
  }

  document.querySelector('.custom-cursor').style.left = e.clientX - 10 + 'px';
  document.querySelector('.custom-cursor').style.top = e.clientY - 10 + 'px';
});

// 自定义页面加载动画
window.addEventListener('load', function() {
  const loader = document.createElement('div');
  loader.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      animation: fadeOut 1s ease 0.5s forwards;
    ">
      <div style="
        color: white;
        font-size: 24px;
        font-weight: bold;
        animation: pulse 1s infinite;
      ">Loading...</div>
    </div>
  `;

  const loadStyle = document.createElement('style');
  loadStyle.textContent = `
    @keyframes fadeOut {
      to { opacity: 0; visibility: hidden; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(loadStyle);
  document.body.appendChild(loader);
});
```

## 11. 🌟 高级自定义功能

### 朋友圈功能

```yaml
friends_vue:
  enable: true
  vue_js: https://npm.elemecdn.com/anzhiyu-theme-static@1.1.1/friends/index.4f887d95.js
  apiurl: # 朋友圈后端地址
  top_tips: 使用 友链朋友圈 订阅友链最新文章
  top_background: https://your-background-image.jpg
```

### 即刻短文功能

```yaml
essay:
  enable: true
  essay_page_title: 即刻短文
  essay_page_subtitle: 记录生活的点点滴滴
  essay_top_background: https://your-essay-bg.jpg
```

### 相册功能

```yaml
album:
  enable: true
  album_page_title: 相册
  album_page_subtitle: 记录美好时光
  album_top_background: https://your-album-bg.jpg
```

### 留言弹幕配置

```yaml
comment_barrage_config:
  enable: true
  maxBarrage: 3        # 同时最多显示弹幕数
  barrageTime: 4000    # 弹幕显示间隔时间ms
  accessToken: "your-access-token"
  mailMd5: "your-mail-md5"
```

### 访客邮箱匿名化

```yaml
visitorMail:
  enable: true
  mail: "anonymous@example.com"
```

### 欢迎弹窗配置

```yaml
greetingBox:
  enable: true
  title: 欢迎来到我的博客
  content: 这里记录着我的技术学习和生活感悟
  button: 开始探索
```

## 12. 🔧 菜单和导航自定义

### 主菜单配置

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  友链: /link/ || fas fa-link
  关于: /about/ || fas fa-heart
  相册: /album/ || fas fa-images
  即刻: /essay/ || fas fa-comment-dots
  音乐: /music/ || fas fa-music
```

### 社交链接配置

```yaml
social:
  Github: https://github.com/yourusername || fab fa-github
  Email: mailto:your@email.com || fas fa-envelope
  QQ: tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=your-qq || fab fa-qq
  微信: javascript:void(0) || fab fa-weixin
  微博: https://weibo.com/yourusername || fab fa-weibo
  知乎: https://www.zhihu.com/people/yourusername || fab fa-zhihu
  哔哩哔哩: https://space.bilibili.com/your-uid || anzhiyu-icon-bilibili
  网易云音乐: https://music.163.com/#/user/home?id=your-id || fas fa-music
```

## 13. 🎯 SEO和性能优化

### SEO配置

```yaml
# Open Graph元标签
Open_Graph_meta: true

# 站点验证
site_verification:
  google: your-google-verification-code
  baidu: your-baidu-verification-code
  bing: your-bing-verification-code

# 网站地图
sitemap:
  path: sitemap.xml
  template: ./sitemap_template.xml
  rel: false
```

### 性能优化配置

```yaml
# CSS前缀
css_prefix: true

# 压缩HTML
minify:
  html:
    enable: true
    exclude:
  css:
    enable: true
    exclude:
  js:
    enable: true
    exclude:
```

### CDN配置

```yaml
CDN:
  internal_provider: local  # local/elemecdn/jsdelivr/unpkg/cdnjs
  third_party_provider: cbd # elemecdn/jsdelivr/unpkg/cdnjs
  version: true
  custom_format: # https://npm.elemecdn.com/${name}@latest/${file}
```

## 14. 📊 统计和分析

### Google Analytics

```yaml
google_analytics: your-ga-tracking-id
```

### 百度统计

```yaml
baidu_analytics: your-baidu-analytics-id
```

### Cloudflare Analytics

```yaml
cloudflare_analytics: your-cloudflare-token
```

### Microsoft Clarity

```yaml
microsoft_clarity: your-clarity-id
```

## 15. 🎪 广告和赞助

### Google AdSense

```yaml
google_adsense:
  enable: true
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client: ca-pub-your-adsense-id
  enable_page_level_ads: true
```

### 赞赏功能

```yaml
reward:
  enable: true
  text: 如果文章对您有帮助，请我喝杯咖啡吧~
  QR_code:
    - img: /img/wechat.jpg
      link:
      text: 微信
    - img: /img/alipay.jpg
      link:
      text: 支付宝
```

## 16. 🛠️ 开发者工具

### 调试模式

```yaml
debug: false  # 生产环境设为false
```

### 自定义字体

```yaml
font:
  global-font-size: 16px
  code-font-size: 14px
  font-family: '"PingFang SC", "Microsoft YaHei", sans-serif'
  code-font-family: 'Consolas, "Liberation Mono", Menlo, Courier, monospace'

blog_title_font:
  font_link: https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap
  font-family: '"Noto Serif SC", serif'
```

### 自定义图标

```yaml
icons:
  ali_iconfont_js: //at.alicdn.com/t/c/font_your_project_id.js
  fontawesome: true
  fontawesome_animation_css: https://cdn.jsdelivr.net/npm/font-awesome-animation@1.0.0/dist/font-awesome-animation.min.css
```

## 17. 📝 使用技巧和最佳实践

### 配置文件管理

1. **备份配置文件**：修改前先备份 `_config.anzhiyu.yml`
2. **分环境配置**：开发和生产环境使用不同配置
3. **版本控制**：将配置文件加入Git管理

### 性能优化建议

1. **图片优化**：使用WebP格式，启用CDN
2. **代码压缩**：启用HTML/CSS/JS压缩
3. **缓存策略**：合理设置浏览器缓存
4. **懒加载**：启用图片和评论懒加载

### 安全性建议

1. **隐私保护**：不要在配置中暴露敏感信息
2. **HTTPS**：使用HTTPS协议
3. **CSP**：配置内容安全策略
4. **定期更新**：保持主题和依赖更新

## 18. 🔍 故障排除

### 常见问题

1. **样式不生效**：检查CSS语法，清除浏览器缓存
2. **图标不显示**：检查图标库是否正确加载
3. **评论不显示**：检查评论系统配置和网络连接
4. **搜索不工作**：重新生成搜索索引

### 调试方法

1. **浏览器开发者工具**：检查控制台错误
2. **Hexo调试模式**：使用 `hexo server --debug`
3. **配置验证**：使用YAML验证工具检查语法
4. **逐步排查**：逐个禁用功能定位问题

## 19. 📚 参考资源

### 官方文档

- [AnZhiYu主题文档](https://hexo.anheyu.com/)
- [Hexo官方文档](https://hexo.io/zh-cn/)
- [Markdown语法指南](https://markdown.com.cn/)

### 社区资源

- [AnZhiYu主题GitHub](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
- [主题交流群](https://jq.qq.com/?_wv=1027&k=group-id)
- [问题反馈](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/issues)

### 工具推荐

- [图片压缩](https://tinypng.com/)
- [颜色搭配](https://coolors.co/)
- [字体选择](https://fonts.google.com/)
- [图标库](https://fontawesome.com/)

---

## 🎉 结语

通过本指南，您应该能够全面自定义您的AnZhiYu主题博客。记住，自定义是一个渐进的过程，建议先从基础配置开始，逐步添加高级功能。

如果您在自定义过程中遇到问题，欢迎查阅官方文档或在社区寻求帮助。祝您打造出独一无二的个人博客！

**最后更新时间**：2025年1月1日

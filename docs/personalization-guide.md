# Hexo博客个性化自定义指南

本文档详细介绍如何通过多种方式让您的Hexo博客更加个性化和有特色。

## 1. 基础配置个性化

### 1.1 站点信息设置
在 [_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/_config.yml) 中配置基本信息：
```yaml
title: 您的博客标题
subtitle: '博客副标题'
description: '博客描述'
keywords: '关键词1,关键词2'
author: 您的名字
language: zh-CN
timezone: 'Asia/Shanghai'
```

### 1.2 URL和路径配置
```yaml
url: https://yourname.github.io/blog
root: /blog/
```

## 2. 主题配置个性化

### 2.1 导航菜单自定义
在 [themes/anzhiyu/_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/_config.yml) 中自定义导航菜单：
```yaml
menu:
  文章:
    首页: / || anzhiyu-icon-home
    归档: /archives/ || anzhiyu-icon-box-archive
    分类: /categories/ || anzhiyu-icon-shapes
    标签: /tags/ || anzhiyu-icon-tags
  自定义:
    作品集: /portfolio/ || anzhiyu-icon-image
    关于我: /about/ || anzhiyu-icon-user
```

### 2.2 社交媒体链接
```yaml
social:
  Github: https://github.com/您的用户名 || anzhiyu-icon-github
  BiliBili: https://space.bilibili.com/您的ID || anzhiyu-icon-bilibili
  微博: https://weibo.com/您的用户名 || anzhiyu-icon-weibo
```

### 2.3 个人信息设置
```yaml
avatar:
  img: 您的头像链接
  effect: true

favicon: /img/favicon.ico
```

## 3. 视觉个性化

### 3.1 自定义CSS样式
在 [themes/anzhiyu/source/css/_extra/anzhiyu/custom.css](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/source/css/_extra/anzhiyu/custom.css) 中添加自定义样式：

```css
/* 自定义标题样式 */
h1.post-title {
  color: #ff6b6b;
  font-family: 'Microsoft YaHei', sans-serif;
  border-bottom: 2px dashed #ff6b6b;
  padding-bottom: 10px;
}

/* 自定义背景 */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 自定义代码块样式 */
.highlight {
  background: #282c34;
  border-radius: 8px;
}
```

### 3.2 主题色彩自定义
修改主题配置中的颜色设置：
```yaml
mainTone:
  enable: true
  mode: api
```

### 3.3 字体个性化
```yaml
font:
  global-font-size: 16px
  global-font-family: '"PingFang SC", "Microsoft YaHei", sans-serif'
```

## 4. 功能个性化

### 4.1 添加评论系统
```yaml
comments:
  use: Twikoo
  text: true

twikoo:
  envId: 您的环境ID
  region: ap-shanghai
```

### 4.2 启用文章字数统计
```yaml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
```

### 4.3 添加背景特效
在主题配置中注入第三方库：
```yaml
inject:
  bottom:
    - <script src="https://cdn.jsdelivr.net/npm/canvas-nest.js@1.0.1/canvas-nest.min.js"></script>
```

## 5. 内容个性化

### 5.1 使用自定义标签插件
在文章中使用内置标签插件丰富内容展示：

#### 提示框
```markdown
{% note info %}
这是一个信息提示框
{% endnote %}
```

#### 折叠内容
```markdown
{% folding 查看更多 %}
这是折叠的内容
{% endfolding %}
```

#### 按钮
```markdown
{% btn 'https://example.com', '链接按钮', 'anzhiyu-icon-link' %}
```

### 5.2 创建自定义页面
1. 创建页面源文件：
   ```bash
   hexo new page portfolio
   ```

2. 在 [themes/anzhiyu/layout](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/layout) 目录中创建自定义模板文件 `portfolio.pug`

3. 在页面源文件中指定布局：
   ```markdown
   ---
   title: 我的作品
   layout: portfolio
   ---
   ```

## 6. 交互个性化

### 6.1 添加鼠标特效
创建自定义JavaScript文件 [themes/anzhiyu/source/js/custom.js](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/source/js/custom.js)：

```javascript
// 添加鼠标点击特效
document.addEventListener('click', function(e) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = (e.clientX - 5) + 'px';
  heart.style.top = (e.clientY - 5) + 'px';
  heart.innerHTML = '❤';
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 1000);
});
```

然后在主题配置中引用：
```yaml
inject:
  bottom:
    - <script src="/js/custom.js"></script>
```

### 6.2 自定义右侧边栏
```yaml
aside:
  enable: true
  mobile: true
  position: right
```

## 7. 部署个性化

### 7.1 自定义404页面
创建 [source/404.md](file:///d:/github/anzhiyu-blog-start/blog-site/source/404.md) 文件：
```markdown
---
title: 404 Not Found
layout: 404
---
```

### 7.2 添加站点运行时间
```yaml
footer:
  runtime:
    enable: true
    launch_time: 2020/01/01 00:00:00
```

## 8. 维护个性化

### 8.1 定期备份
- 备份 [source](file:///d:/github/anzhiyu-blog-start/blog-site/source) 目录中的所有内容
- 备份 [_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/_config.yml) 和 [themes/anzhiyu/_config.yml](file:///d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/_config.yml) 配置文件

### 8.2 版本更新
```bash
# 检查过时依赖
npm outdated

# 更新依赖
npm update
```

通过以上方法，您可以打造一个完全个性化的Hexo博客，展现您的个人风格和技术特色。
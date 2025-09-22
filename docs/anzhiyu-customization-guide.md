# 🎨 AnZhiYu主题深度个性化配置指南

本指南将详细介绍AnZhiYu主题的高级个性化配置选项和版本更新管理。

## 🌟 高级个性化配置

### 1. 🎨 主题外观定制

#### 主题颜色配置
```yaml
# themes/anzhiyu/_config.yml
theme_color:
  enable: true
  main: "#425AEF"           # 主色调
  dark_main: "#f2b94b"      # 深色模式主色调
  paginator: "#425AEF"      # 分页器颜色
  text_selection: "#2128bd" # 文本选择颜色
  link_color: "var(--anzhiyu-fontcolor)"
  meta_color: "var(--anzhiyu-fontcolor)"
  hr_color: "#4259ef23"     # 分割线颜色
  code_foreground: "#fff"   # 代码前景色
  code_background: "var(--anzhiyu-code-stress)" # 代码背景色
  toc_color: "#425AEF"      # 目录颜色
  scrollbar_color: "var(--anzhiyu-scrollbar)" # 滚动条颜色
  meta_theme_color_light: "#f7f9fe" # 浅色模式主题色
  meta_theme_color_dark: "#18171d"  # 深色模式主题色
```

#### 首页顶部配置
```yaml
home_top:
  enable: true
  timemode: date # date/updated
  title: 生活明朗
  subTitle: 万物可爱。
  siteText: anheyu.com
  category:
    - name: 前端
      path: /categories/前端开发/
      shadow: var(--anzhiyu-shadow-blue)
      class: blue
      icon: anzhiyu-icon-dove
    - name: 生活
      path: /categories/生活日常/
      shadow: var(--anzhiyu-shadow-green)
      class: green
      icon: anzhiyu-icon-book
```

### 2. 🎵 音乐播放器配置

#### 左下角音乐配置
```yaml
nav_music:
  enable: true
  console_widescreen_music: false
  id: 8152976493        # 网易云音乐歌单ID
  server: netease       # 音乐平台：netease/tencent/kugou
  volume: 0.7           # 默认音量
  all_playlist: https://y.qq.com/n/ryqq/playlist/8802438608
```

### 3. 💬 评论系统高级配置

#### Valine评论系统
```yaml
valine:
  appId: xxxxx
  appKey: xxxxx
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
  visitor: false
  master:
    - xxxxx  # 博主邮箱MD5
  friends:
    - xxxxxx # 小伙伴邮箱MD5
  tagMeta: "博主,小伙伴,访客"
```

#### Waline评论系统
```yaml
waline:
  serverURL: # Waline服务器地址
  bg: # 背景图片
  pageview: false
  meta_css: false
  imageUploader: true
  option:
    # 自定义配置选项
```

### 4. 🔍 搜索功能配置

#### 本地搜索
```yaml
local_search:
  enable: true
  preload: false
  CDN:
```

#### Algolia搜索
```yaml
algolia_search:
  enable: false
  hits:
    per_page: 6
  tags:
    - 前端
    - Hexo
```

### 5. 🎭 特效和动画

#### 背景特效
```yaml
# 静止彩带背景
canvas_ribbon:
  enable: false
  size: 150
  alpha: 0.6
  zIndex: -1
  click_to_change: false
  mobile: false

# 动态彩带
canvas_fluttering_ribbon:
  enable: false
  mobile: false

# 鼠标点击烟火特效
fireworks:
  enable: false
  zIndex: 9999
  mobile: false

# 鼠标点击爱心特效
click_heart:
  enable: false
  mobile: false
```

#### 打字机效果
```yaml
subtitle:
  enable: false
  effect: true
  startDelay: 300
  typeSpeed: 150
  backSpeed: 50
  loop: true
  source: 1  # 1:一言网 2:一句网 3:今日诗词
  sub:
    - 生活明朗&#44;万物可爱&#44;人间值得&#44;未来可期.
```

### 6. 📱 移动端优化

#### 侧边栏配置
```yaml
sidebar:
  site_data:
    archive: true
    tag: true
    category: true
  menus_items: true
  tags_cloud: true
  display_mode: true
  nav_menu_project: true
```

### 7. 🔧 高级功能

#### PWA配置
```yaml
pwa:
  enable: false
  startup_image_enable: true
  manifest: /manifest.json
  theme_color: var(--anzhiyu-main)
  mask_icon: /img/siteicon/apple-icon-180.png
  apple_touch_icon: /img/siteicon/apple-icon-180.png
  bookmark_icon: /img/siteicon/apple-icon-180.png
  favicon_32_32: /img/siteicon/32.png
  favicon_16_16: /img/siteicon/16.png
```

#### 图片懒加载
```yaml
lazyload:
  enable: true
  field: site # site/post
  placeholder:
  blur: true
  progressive: true
```

## 🔄 AnZhiYu主题版本更新管理

### 方法一：Git Submodule管理（推荐）

#### 初始设置
```bash
# 删除现有主题目录
rm -rf themes/anzhiyu

# 添加为Git Submodule
git submodule add https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu

# 初始化submodule
git submodule init
git submodule update
```

#### 更新到最新版本
```bash
# 进入主题目录
cd themes/anzhiyu

# 拉取最新更新
git pull origin main

# 返回项目根目录
cd ../..

# 提交submodule更新
git add themes/anzhiyu
git commit -m "update: AnZhiYu theme to latest version"
git push origin main
```

#### 检查版本信息
```bash
# 查看当前主题版本
cd themes/anzhiyu
git log --oneline -5

# 查看远程最新版本
git fetch origin
git log --oneline origin/main -5
```

### 方法二：Release版本管理

#### 下载最新Release
```bash
# 查看最新版本
curl -s https://api.github.com/repos/anzhiyu-c/hexo-theme-anzhiyu/releases/latest | grep "tag_name"

# 下载最新版本（替换x.x.x为实际版本号）
wget https://github.com/anzhiyu-c/hexo-theme-anzhiyu/archive/refs/tags/x.x.x.zip

# 解压并替换
unzip x.x.x.zip
rm -rf themes/anzhiyu
mv hexo-theme-anzhiyu-x.x.x themes/anzhiyu
```

### 方法三：Fork仓库管理（高级用户）

#### 创建自己的Fork
1. 在GitHub上Fork AnZhiYu仓库
2. 克隆您的Fork版本
```bash
git clone https://github.com/yourusername/hexo-theme-anzhiyu.git themes/anzhiyu
```

#### 同步上游更新
```bash
cd themes/anzhiyu

# 添加上游仓库
git remote add upstream https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git

# 获取上游更新
git fetch upstream

# 合并更新
git checkout main
git merge upstream/main

# 推送到您的Fork
git push origin main
```

## ⚠️ 更新注意事项

### 1. 备份配置文件
```bash
# 更新前备份配置
cp themes/anzhiyu/_config.yml themes/anzhiyu/_config.yml.backup
cp _config.yml _config.yml.backup
```

### 2. 检查配置兼容性
```bash
# 比较配置文件差异
diff themes/anzhiyu/_config.yml.backup themes/anzhiyu/_config.yml

# 检查新增配置项
diff themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
```

### 3. 测试更新
```bash
# 清理缓存
hexo clean

# 本地测试
hexo server

# 检查是否有错误
hexo generate
```

### 4. 处理冲突
如果更新后出现问题：
```bash
# 回滚到之前版本
cd themes/anzhiyu
git reset --hard HEAD~1

# 或恢复备份配置
cp themes/anzhiyu/_config.yml.backup themes/anzhiyu/_config.yml
```

## 📋 更新检查清单

- [ ] 备份当前配置文件
- [ ] 检查AnZhiYu最新版本
- [ ] 更新主题文件
- [ ] 比较配置文件差异
- [ ] 合并新配置选项
- [ ] 本地测试功能
- [ ] 检查样式和布局
- [ ] 测试评论系统
- [ ] 验证搜索功能
- [ ] 检查移动端显示
- [ ] 部署到生产环境

## 🔗 相关资源

- [AnZhiYu官方文档](https://docs.anheyu.com/)
- [AnZhiYu GitHub仓库](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
- [AnZhiYu Releases](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases)
- [Hexo官方文档](https://hexo.io/docs/)

---

**保持主题更新，享受最新功能！** 🚀

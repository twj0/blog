# 主题自定义

Anzhiyu 主题提供了强大的自定义功能，让你可以轻松地将博客打造得独一无二。本文档将指导你如何通过不同的方式来自定义你的主题。

## 通过配置文件自定义

最简单、最安全的自定义方式是修改位于 `themes/anzhiyu/` 目录下的 `_config.yml` 文件。这个文件包含了绝大部分主题功能和样式的开关与配置。

### 颜色主题

你可以轻松修改博客的整体色调。

```yaml
# themes/anzhiyu/_config.yml

theme_color:
  enable: true
  main: "#425AEF"
  dark_main: "#f2b94b"
  paginator: "#425AEF"
  text_selection: "#2128bd"
  link_color: "var(--anzhiyu-fontcolor)"
  meta_color: "var(--anzhiyu-fontcolor)"
  hr_color: "#4259ef23"
  code_foreground: "#fff"
  code_background: "var(--anzhiyu-code-stress)"
  toc_color: "#425AEF"
  scrollbar_color: "var(--anzhiyu-scrollbar)"
  meta_theme_color_light: "#f7f9fe"
  meta_theme_color_dark: "#18171d"
```

- `main`: 网站在浅色模式下的主色调。
- `dark_main`: 网站在深色模式下的主色调。
- 其他选项允许你对分页器、文本选中、链接等颜色进行更精细的控制。

### 字体设置

你可以更改整个网站的字体。

```yaml
# themes/anzhiyu/_config.yml

font:
  global-font-size: 16px
  code-font-size:
  font-family:
  code-font-family: consolas, Menlo, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif

blog_title_font:
  font_link:
  font-family: PingFang SC, 'Hiragino Sans GB', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif```

- `font-family`: 设置全局字体。你可以引入在线字体，并通过 `font_link` 加载。
- `code-font-family`: 设置代码块的字体。

### 布局与显示

Anzhiyu 主题允许你对页面的布局进行调整。

- **首页双栏显示**:
  ```yaml
  article_double_row: true
  ```
- **侧边栏**: 你可以控制侧边栏的显示/隐藏，以及其中包含的卡片（作者信息、最新文章、标签云等）。
  ```yaml
  aside:
    enable: true
    hide: false
    position: right # left or right
    ...
  ```
- **页脚**: 自定义页脚的版权信息、运行时间、徽章等。
  ```yaml
  footer:
    owner:
      enable: true
      since: 2020
    runtime:
      enable: false
    ...
  ```

### 功能开关

你可以根据自己的喜好，开启或关闭主题内置的各种功能。

- **代码块设置**:
  ```yaml
  highlight_theme: light # 主题样式
  highlight_copy: true # 复制代码按钮
  highlight_shrink: false # 折叠代码块
  ```
- **背景特效**:
  ```yaml
  # 静止彩带
  canvas_ribbon:
    enable: false
  # 动态彩带
  canvas_fluttering_ribbon:
    enable: false
  # 鼠标点击烟花
  fireworks:
    enable: false
  ```
- **评论系统**: 选择并配置你喜欢的评论系统，如 `Twikoo`, `Waline` 等。
  ```yaml
  comments:
    use: # Twikoo/Waline
  ```

## 通过自定义 CSS/JS 文件进行高级定制

如果你希望进行更深度的样式修改，或者添加 `_config.yml` 中未提供的功能，你可以使用自定义 CSS 和 JavaScript 文件。

主题的配置文件中提供了 `inject` 选项，允许你在页面的 `<head>` 或 `<body>` 底部注入自定义代码。

1.  在你的博客根目录 `source` 文件夹下创建一个 `css` 文件夹（如果不存在），并在其中创建一个 `custom.css` 文件。
2.  在 `themes/anzhiyu/_config.yml` 中配置 `inject`:

    ```yaml
    # themes/anzhiyu/_config.yml

    inject:
      head:
        # 引入你的自定义 CSS
        - <link rel="stylesheet" href="/css/custom.css">
      bottom:
        # 引入你的自定义 JS
        # - <script src="/js/custom.js"></script>
    ```

3.  现在你可以在 `source/css/custom.css` 文件中编写你自己的 CSS 规则来覆盖主题的默认样式了。

**示例：修改文章标题颜色**

```css
/* source/css/custom.css */

.post-title {
  color: #ff6347 !important; /* 使用 !important 来确保覆盖默认样式 */
}
```

### 示例：添加全局背景图与毛玻璃效果

如果你想为整个网站添加一个固定的背景图片，并让内容区域呈现毛玻璃效果，可以添加以下 CSS 代码：

```css
/* source/css/custom.css */

body {
  background-image: url('你的图片链接'); /* 替换成你的背景图片 URL */
  background-attachment: fixed; /* 固定背景图，使其不随滚动条滚动 */
  background-size: cover; /* 覆盖整个屏幕 */
  background-position: center; /* 图片居中显示 */
}

/* 对主要内容区域应用毛玻璃效果 */
#page-header,
#content-inner,
#aside-content,
#footer {
  background: rgba(255, 255, 255, 0.8); /* 半透明的白色背景，可根据喜好调整透明度 */
  backdrop-filter: blur(10px); /* 这是实现毛玻璃效果的关键 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
  border-radius: 12px; /* 可选：为内容区域添加圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 可选：添加一些阴影以增加层次感 */
}

/* 在深色模式下，可以调整背景的透明度和颜色 */
[data-theme="dark"] #page-header,
[data-theme="dark"] #content-inner,
[data-theme="dark"] #aside-content,
[data-theme="dark"] #footer {
  background: rgba(24, 23, 29, 0.8);
}

```

**代码解释:**

1.  `body`: 我们为 `<body>` 元素设置了背景图片，并使用了 `fixed` 属性来固定它。
2.  `#page-header, #content-inner, ...`: 我们选择了一些主要的页面容器元素。
3.  `background: rgba(...)`: 为这些容器设置了一个半透明的背景色。这是毛玻璃效果的基础，透明度（`0.8`）可以根据你的背景图片和个人喜好进行调整。
4.  `backdrop-filter: blur(10px)`: 这是实现毛玻璃效果的核心 CSS 属性。它会对元素背后的内容（也就是我们的背景图片）应用模糊效果。
5.  `[data-theme="dark"] ...`: 这是一个媒体查询，用于在深色模式下应用不同的半透明背景色，以保证可读性。

## 覆盖主题文件（高级）

**注意：这是一种高级技巧，可能会在主题更新后导致问题，请谨慎使用。**

Hexo 允许你在根目录的 `source` 文件夹下创建与主题 `layout` 文件夹中同名的文件，来直接覆盖主题的布局文件（`.pug` 文件）。

例如，如果你想修改文章页面的布局，你可以：

1.  从 `themes/anzhiyu/layout/post.pug` 复制文件内容。
2.  在博客根目录 `source` 下创建一个 `_data` 文件夹（如果不存在）。
3.  在 `source/_data` 中创建一个 `post.pug` 文件，并将复制的内容粘贴进去。
4.  现在你可以修改这个新的 `post.pug` 文件，它将被用来渲染你的文章页面。

这种方法提供了最大的灵活性，但也意味着你需要自行处理主题更新可能带来的兼容性问题。

## 部署你的更改

当你完成了对博客内容或主题的自定义修改后，你需要将这些更改部署到你的在线博客上。根据项目的配置，本博客项目主要通过 **GitHub Actions** 进行自动化部署。

这意味着你不需要在本地运行 `hexo deploy` 命令。你只需按照标准的 Git 流程将你的本地更改推送到 GitHub 仓库的**主分支**（通常是 `main` 或 `master` 分支）即可。

**部署步骤：**

1.  **保存你的所有更改**：确保你已经保存了所有对文件（例如 `docs/theme-customization.md`、`themes/anzhiyu/_config.yml` 或任何自定义 CSS/JS 文件）的修改。
2.  **添加更改到 Git 暂存区**：
    ```bash
    git add .
    ```
3.  **提交更改**：
    ```bash
    git commit -m "feat: 更新主题自定义文档并添加背景图效果" # 编写有意义的提交信息
    ```
4.  **推送更改到 GitHub 仓库**：
    ```bash
    git push origin main # 或者 git push origin master，取决于你的主分支名称
    ```

一旦你的更改被推送到 GitHub 仓库的主分支，GitHub Actions 将会自动检测到这些更新，并执行以下操作：

*   运行 `hexo generate` 命令来生成最新的静态博客文件。
*   将生成的静态文件部署到你的 GitHub Pages 分支（通常是 `gh-pages`）。

稍等片刻，你的在线博客就会显示最新的更改。
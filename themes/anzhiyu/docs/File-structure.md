# 本地文件结构解读与 Hexo 部署

本文档旨在详细解读 Hexo 博客项目的本地文件结构，并结合部署过程中的关键文件进行说明。

## 1. 工作区根目录 (`d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu`)

这是您当前 VS Code 工作区的根目录，包含了 Hexo 主题 `anzhiyu` 的相关文件。

### 1.1 `d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu/` 目录下的主要文件和文件夹：

*   **`.github/`**: 包含 GitHub Actions 工作流配置，例如用于自动化部署到 GitHub Pages 的 `.github/workflows/deploy.yml` 文件。
*   **`languages/`**: 存放多语言配置文件，如 `d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu/languages/zh-CN.yml`。
*   **`layout/`**: 存放 Pug 模板文件，定义了博客页面的布局和结构。例如，`d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu/layout/index.pug` 定义了首页布局。
*   **`scripts/`**: 存放 Hexo 脚本文件，用于扩展 Hexo 的功能，例如 `d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu/scripts/events/init.js`。
*   **`source/`**: 存放主题的静态资源文件，如 CSS、JavaScript、图片等。例如，`d:/github/anzhiyu-blog-start/hexo-theme-anzhiyu/source/css/index.styl`。

## 2. Hexo 博客根目录 (`d:/github/anzhiyu-blog-start/blog-site/`)

这是 Hexo 博客的实际根目录，包含了 Hexo 博客的配置、文章、静态文件等。

### 2.1 `d:/github/anzhiyu-blog-start/blog-site/` 目录下的主要文件和文件夹：

*   **`_config.yml`**: Hexo 博客的全局配置文件。其中包含了网站标题、URL、部署配置等重要信息。
    *   **绝对路径**: `d:/github/anzhiyu-blog-start/blog-site/_config.yml`
    *   **部署相关配置**:
        *   `url`: 您的网站的 URL。例如：`https://twj0.github.io/blog`
        *   `root`: 您的网站的根路径。如果部署在子目录中，例如 GitHub Pages 的 `https://username.github.io/project`，则应设置为 `/project/`。如果部署在根目录，则设置为 `/`。
        *   `deploy`: 部署配置。
            *   `type`: 部署类型，通常为 `git`。
            *   `repo`: 您的 GitHub 仓库地址。例如：`https://github.com/twj0/blog.git`
            *   `branch`: 部署分支，通常为 `gh-pages`。
*   **`source/`**: 存放您的博客文章（Markdown 文件）、页面和其他静态资源。
    *   **绝对路径**: `d:/github/anzhiyu-blog-start/blog-site/source/`
*   **`public/`**: Hexo 生成的静态网站文件（HTML, CSS, JS, 图片等）的输出目录。这些文件最终会被部署到 GitHub Pages。
    *   **绝对路径**: `d:/github/anzhiyu-blog-start/blog-site/public/`
*   **`themes/`**: 存放 Hexo 主题的目录。在您的案例中，`anzhiyu` 主题应该位于 `d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/`。
    *   **绝对路径**: `d:/github/anzhiyu-blog-start/blog-site/themes/anzhiyu/`

## 3. 部署流程中的关键文件和目录

*   **`d:/github/anzhiyu-blog-start/blog-site/_config.yml`**: 配置部署目标分支 (`gh-pages`) 和网站根路径 (`/`)。
*   **`d:/github/anzhiyu-blog-start/blog-site/public/`**: 包含 Hexo 生成的所有静态文件，这些文件将被推送到 GitHub Pages 的 `gh-pages` 分支。
*   **GitHub 仓库 `twj0/blog` 的 `gh-pages` 分支**: 接收 `public` 目录中的静态文件，并由 GitHub Pages 提供服务。

通过理解这些文件和目录的作用，您可以更好地管理和部署您的 Hexo 博客。
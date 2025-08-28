#!/bin/bash

# 简化的构建脚本 - 直接创建静态页面
echo "开始构建博客（简化版）..."

# 创建输出目录
mkdir -p public
mkdir -p public/css
mkdir -p public/js

# 创建主页
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>我的博客 - 基于安知鱼主题</title>
    <meta name="description" content="记录技术学习和生活感悟">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="site-title">我的博客</h1>
            <p class="site-subtitle">基于安知鱼主题的个人博客</p>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <article class="post-card">
                <h2 class="post-title">
                    <a href="posts/hello-world.html">Hello World</a>
                </h2>
                <div class="post-meta">
                    <time>2025-08-28</time>
                    <span class="tags">
                        <a href="#" class="tag">开始</a>
                        <a href="#" class="tag">Hexo</a>
                    </span>
                </div>
                <div class="post-excerpt">
                    <p>欢迎来到我的博客！这是使用 AnZhiYu 主题创建的第一篇文章。</p>
                </div>
            </article>

            <article class="post-card">
                <h2 class="post-title">
                    <a href="posts/start-your-blog.html">开始你的博客之旅</a>
                </h2>
                <div class="post-meta">
                    <time>2025-08-28</time>
                    <span class="tags">
                        <a href="#" class="tag">博客</a>
                        <a href="#" class="tag">Cloudflare</a>
                    </span>
                </div>
                <div class="post-excerpt">
                    <p>使用安知鱼主题搭建个人博客，部署到Cloudflare Pages的完整指南。</p>
                </div>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 我的博客. Powered by <a href="https://hexo.io/">Hexo</a> & <a href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu">AnZhiYu</a></p>
        </div>
    </footer>
</body>
</html>
EOF

# 创建样式文件
cat > public/css/style.css << 'EOF'
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem 0;
    text-align: center;
    color: white;
}

.site-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.site-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

.main {
    padding: 3rem 0;
}

.post-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.post-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.post-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
}

.post-title a:hover {
    color: #667eea;
}

.post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
}

.tags {
    display: flex;
    gap: 0.5rem;
}

.tag {
    background: #f0f0f0;
    color: #666;
    padding: 0.2rem 0.5rem;
    border-radius: 15px;
    text-decoration: none;
    font-size: 0.8rem;
    transition: background 0.3s ease;
}

.tag:hover {
    background: #667eea;
    color: white;
}

.post-excerpt {
    color: #666;
    line-height: 1.7;
}

.footer {
    background: rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}

.footer a {
    color: white;
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .site-title {
        font-size: 2rem;
    }
    
    .post-card {
        padding: 1.5rem;
    }
    
    .post-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
EOF

# 创建文章目录和页面
mkdir -p public/posts

# 创建 Hello World 文章页面
cat > public/posts/hello-world.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello World - 我的博客</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="site-title"><a href="../index.html" style="color: white; text-decoration: none;">我的博客</a></h1>
            <p class="site-subtitle">基于安知鱼主题的个人博客</p>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <article class="post-card">
                <h1>Hello World</h1>
                <div class="post-meta">
                    <time>2025-08-28 10:00:00</time>
                    <span class="tags">
                        <span class="tag">开始</span>
                        <span class="tag">Hexo</span>
                    </span>
                </div>
                <div class="post-content">
                    <p>欢迎来到我的博客！这是使用 AnZhiYu 主题创建的第一篇文章。</p>
                    
                    <h2>关于这个博客</h2>
                    <p>这个博客使用了以下技术栈：</p>
                    <ul>
                        <li><strong>Hexo</strong>: 静态站点生成器</li>
                        <li><strong>AnZhiYu</strong>: 精美的博客主题</li>
                        <li><strong>Cloudflare Pages</strong>: 免费的静态站点托管</li>
                        <li><strong>GitHub</strong>: 代码和内容管理</li>
                    </ul>

                    <h2>特色功能</h2>
                    <ul>
                        <li>🎨 精美的卡片式设计</li>
                        <li>📱 完全响应式布局</li>
                        <li>⚡ 极速加载体验</li>
                        <li>🔍 全文搜索功能</li>
                        <li>💬 评论系统支持</li>
                        <li>📊 访问统计分析</li>
                    </ul>

                    <p>感谢你的访问！🎉</p>
                </div>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 我的博客. Powered by <a href="https://hexo.io/">Hexo</a> & <a href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu">AnZhiYu</a></p>
        </div>
    </footer>
</body>
</html>
EOF

echo "构建完成！生成的文件在 public/ 目录中"
echo "主页: public/index.html"
echo "文章: public/posts/hello-world.html"

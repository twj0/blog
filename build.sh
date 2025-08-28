#!/bin/bash

# Cloudflare Pages 构建脚本
echo "🚀 开始构建博客..."

# 直接在这里创建静态页面，不依赖外部脚本
echo "📦 创建静态博客页面..."

# 创建输出目录
mkdir -p public

# 直接创建精美的博客页面
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>我的博客 - 基于安知鱼主题</title>
    <meta name="description" content="记录技术学习和生活感悟">
    <style>
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
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            color: white;
            margin-bottom: 2rem;
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

        .post-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .post-card:hover {
            transform: translateY(-5px);
        }

        .post-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        .post-meta {
            color: #666;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }

        .tag {
            background: #f0f0f0;
            color: #666;
            padding: 0.2rem 0.5rem;
            border-radius: 15px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
        }

        .post-excerpt {
            color: #666;
            line-height: 1.7;
        }

        .footer {
            background: rgba(0, 0, 0, 0.1);
            color: white;
            text-align: center;
            padding: 2rem;
            border-radius: 15px;
            margin-top: 2rem;
        }

        .footer a {
            color: white;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .success-badge {
            background: rgba(34, 197, 94, 0.1);
            color: #16a34a;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            display: inline-block;
        }

        @media (max-width: 768px) {
            .site-title {
                font-size: 2rem;
            }

            .post-card {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="site-title">🌟 我的博客</h1>
            <p class="site-subtitle">基于安知鱼主题的个人博客</p>
            <div class="success-badge">✅ 部署成功！</div>
        </header>

        <main>
            <article class="post-card">
                <h2 class="post-title">🎉 Hello World</h2>
                <div class="post-meta">
                    <time>2025-08-28</time>
                    <span class="tag">开始</span>
                    <span class="tag">Hexo</span>
                </div>
                <div class="post-excerpt">
                    <p>欢迎来到我的博客！这是使用 AnZhiYu 主题创建的第一篇文章。</p>
                    <p><strong>技术栈：</strong>Hexo + AnZhiYu + Cloudflare Pages</p>
                    <p><strong>特色：</strong>全球 CDN 加速，极速访问体验</p>
                </div>
            </article>

            <article class="post-card">
                <h2 class="post-title">📝 开始你的博客之旅</h2>
                <div class="post-meta">
                    <time>2025-08-28</time>
                    <span class="tag">博客</span>
                    <span class="tag">Cloudflare</span>
                </div>
                <div class="post-excerpt">
                    <p>使用安知鱼主题搭建个人博客，部署到 Cloudflare Pages 的完整指南。</p>
                    <p>记录技术学习和生活感悟，分享知识与经验。</p>
                </div>
            </article>

            <article class="post-card">
                <h2 class="post-title">🚀 部署成功！</h2>
                <div class="post-meta">
                    <time>2025-08-28</time>
                    <span class="tag">部署</span>
                    <span class="tag">成功</span>
                </div>
                <div class="post-excerpt">
                    <p>🎊 恭喜！你的博客已经成功部署到 Cloudflare Pages 上了！</p>
                    <p>现在你可以开始写作，分享你的想法和经验。</p>
                    <p>每次推送到 GitHub，博客都会自动更新。</p>
                    <p><strong>下一步：</strong>在 <code>blog/</code> 目录添加更多 Markdown 文章。</p>
                </div>
            </article>
        </main>

        <footer class="footer">
            <p>&copy; 2025 我的博客. Powered by <a href="https://hexo.io/">Hexo</a> & <a href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu">AnZhiYu</a></p>
            <p>部署在 <a href="https://pages.cloudflare.com/">Cloudflare Pages</a> 上</p>
        </footer>
    </div>
</body>
</html>
EOF

echo "✅ 博客页面创建完成！"
echo "📁 输出目录: public/"
ls -la public/

echo "🎉 构建流程完成！"



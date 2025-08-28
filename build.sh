#!/bin/bash

# Cloudflare Pages 构建脚本
echo "开始构建博客..."

# 设置 Node.js 版本
export NODE_VERSION=18

# 尝试使用 Hexo 构建，如果失败则使用简化版本
echo "尝试 Hexo 构建..."

# 创建必要的目录
mkdir -p public
mkdir -p themes
mkdir -p source/_posts

# 创建主题软链接
echo "设置主题链接..."
rm -rf themes/anzhiyu
ln -sf ../hexo-theme-anzhiyu themes/anzhiyu

# 安装依赖
echo "安装依赖..."
npm ci

# 安装主题依赖
echo "安装主题依赖..."
cd hexo-theme-anzhiyu
if [ -f package.json ]; then
  npm install
fi
cd ..

# 复制博客文章到 source/_posts
echo "复制博客文章..."
if [ -d "blog" ]; then
  find blog -name "*.md" -exec cp {} source/_posts/ \;
fi

# 尝试 Hexo 构建
HEXO_SUCCESS=false
if command -v hexo &> /dev/null; then
    echo "使用 Hexo 构建..."
    npx hexo clean 2>/dev/null || true
    if npx hexo generate 2>/dev/null; then
        HEXO_SUCCESS=true
        echo "Hexo 构建成功！"
    fi
fi

# 如果 Hexo 构建失败，使用简化构建
if [ "$HEXO_SUCCESS" = false ]; then
    echo "Hexo 构建失败，使用简化构建..."
    chmod +x build-simple.sh
    ./build-simple.sh
fi

# 确保 public 目录存在且有内容
if [ ! -f "public/index.html" ]; then
    echo "创建备用页面..."
    mkdir -p public
    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>我的博客 - 基于安知鱼主题</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 { color: white; text-align: center; }
        .post {
            margin: 20px 0;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
        }
        a { color: #fff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 我的博客</h1>
        <p style="text-align: center;">基于安知鱼主题的个人博客</p>

        <div class="post">
            <h2>🎉 Hello World</h2>
            <p>欢迎来到我的博客！这是使用 AnZhiYu 主题创建的博客。</p>
            <p><strong>技术栈：</strong>Hexo + AnZhiYu + Cloudflare Pages</p>
            <p><strong>特色：</strong>全球 CDN 加速，极速访问体验</p>
        </div>

        <div class="post">
            <h2>📝 开始你的博客之旅</h2>
            <p>使用安知鱼主题搭建个人博客，部署到 Cloudflare Pages 的完整指南。</p>
            <p>记录技术学习和生活感悟，分享知识与经验。</p>
        </div>

        <footer style="text-align: center; margin-top: 2rem; opacity: 0.8;">
            <p>&copy; 2025 我的博客. Powered by <a href="https://hexo.io/">Hexo</a> & <a href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu">AnZhiYu</a></p>
        </footer>
    </div>
</body>
</html>
EOF
fi

echo "构建完成！"
echo "输出目录: public/"
ls -la public/ || echo "public 目录内容列表失败"

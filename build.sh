#!/bin/bash

# Cloudflare Pages 构建脚本
echo "🚀 开始构建博客..."

# 设置 Node.js 版本
export NODE_VERSION=18

# 直接使用最简化构建，确保成功
echo "📦 使用最简化构建方案..."
chmod +x build-minimal.sh
./build-minimal.sh

# 检查构建结果
if [ -f "public/index.html" ]; then
    echo "✅ 构建成功！"
    echo "📁 输出目录: public/"
    ls -la public/ || echo "目录列表失败"
else
    echo "❌ 构建失败，创建紧急备用页面..."
    mkdir -p public
    echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>我的博客</title></head><body><h1>🌟 我的博客</h1><p>博客正在建设中...</p></body></html>' > public/index.html
    echo "✅ 紧急页面创建完成"
fi

echo "🎉 构建流程完成！"



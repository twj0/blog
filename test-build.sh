#!/bin/bash

# 本地测试构建脚本
echo "🚀 开始本地测试构建..."

# 清理之前的构建
rm -rf public/
echo "✅ 清理完成"

# 运行构建脚本
chmod +x build.sh
./build.sh

# 检查构建结果
echo ""
echo "📋 构建结果检查："

if [ -d "public" ]; then
    echo "✅ public 目录存在"
    
    if [ -f "public/index.html" ]; then
        echo "✅ index.html 存在"
        echo "📄 文件大小: $(du -h public/index.html | cut -f1)"
    else
        echo "❌ index.html 不存在"
    fi
    
    echo "📁 public 目录内容:"
    ls -la public/
    
    echo ""
    echo "📊 总体积: $(du -sh public/ | cut -f1)"
    
else
    echo "❌ public 目录不存在"
    exit 1
fi

echo ""
echo "🎉 构建测试完成！"
echo "💡 你可以运行以下命令启动本地服务器预览："
echo "   cd public && python -m http.server 8000"
echo "   然后访问 http://localhost:8000"

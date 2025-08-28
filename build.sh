#!/bin/bash

# Cloudflare Pages 构建脚本
echo "开始构建博客..."

# 设置 Node.js 版本
export NODE_VERSION=18

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

# 清理并构建
echo "构建静态文件..."
npm run clean
npm run build

echo "构建完成！"

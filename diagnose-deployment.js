#!/usr/bin/env node

/**
 * GitHub Pages 部署诊断脚本
 * 用于检查博客部署问题的根本原因
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 GitHub Pages 部署诊断开始...\n');

// 1. 检查配置文件
console.log('📋 1. 检查配置文件');
console.log('================');

// 检查 _config.yml
if (fs.existsSync('_config.yml')) {
    const config = fs.readFileSync('_config.yml', 'utf8');
    const urlMatch = config.match(/^url:\s*(.+)$/m);
    const rootMatch = config.match(/^root:\s*(.+)$/m);
    
    console.log('✅ _config.yml 存在');
    console.log(`   URL: ${urlMatch ? urlMatch[1] : '未找到'}`);
    console.log(`   Root: ${rootMatch ? rootMatch[1] : '未找到'}`);
    
    // 检查是否有正确的 GitHub Pages 配置
    if (urlMatch && urlMatch[1].includes('twj0.github.io/blog')) {
        console.log('✅ URL 配置正确');
    } else {
        console.log('❌ URL 配置可能有问题');
    }
} else {
    console.log('❌ _config.yml 不存在');
}

// 检查主题配置
if (fs.existsSync('themes/anzhiyu/_config.yml')) {
    console.log('✅ AnZhiYu 主题配置存在');
} else {
    console.log('❌ AnZhiYu 主题配置不存在');
}

console.log('');

// 2. 检查构建输出
console.log('🏗️  2. 检查构建输出');
console.log('================');

if (fs.existsSync('public')) {
    console.log('✅ public 目录存在');
    
    // 检查关键文件
    const keyFiles = ['index.html', 'css', 'js'];
    keyFiles.forEach(file => {
        if (fs.existsSync(path.join('public', file))) {
            console.log(`✅ public/${file} 存在`);
        } else {
            console.log(`❌ public/${file} 不存在`);
        }
    });
    
    // 检查 index.html 内容
    if (fs.existsSync('public/index.html')) {
        const indexContent = fs.readFileSync('public/index.html', 'utf8');
        if (indexContent.includes('/blog/')) {
            console.log('✅ index.html 包含正确的根路径');
        } else {
            console.log('❌ index.html 可能缺少正确的根路径');
        }
    }
} else {
    console.log('❌ public 目录不存在 - 需要运行构建');
}

console.log('');

// 3. 检查 GitHub Actions 工作流
console.log('⚙️  3. 检查 GitHub Actions 工作流');
console.log('==========================');

if (fs.existsSync('.github/workflows/deploy.yml')) {
    const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');
    console.log('✅ deploy.yml 工作流存在');
    
    // 检查关键配置
    if (workflow.includes('actions/deploy-pages@v4')) {
        console.log('✅ 使用 deploy-pages@v4');
    }
    
    if (workflow.includes('path: ./public')) {
        console.log('✅ 上传路径配置正确');
    }
    
    if (workflow.includes('github-pages')) {
        console.log('✅ 环境配置正确');
    }
} else {
    console.log('❌ GitHub Actions 工作流不存在');
}

console.log('');

// 4. 生成建议
console.log('💡 4. 诊断建议');
console.log('============');

console.log('基于检查结果，建议执行以下步骤：');
console.log('');
console.log('1. 🔄 重新构建项目：');
console.log('   npm run clean && npm run build');
console.log('');
console.log('2. 📤 检查 GitHub Actions 状态：');
console.log('   访问：https://github.com/twj0/blog/actions');
console.log('');
console.log('3. ⚙️  验证 GitHub Pages 设置：');
console.log('   仓库 Settings > Pages > Source 应该是 "GitHub Actions"');
console.log('');
console.log('4. 🌐 等待部署完成：');
console.log('   GitHub Pages 部署可能需要几分钟时间');
console.log('');
console.log('5. 🔍 如果仍有问题，检查：');
console.log('   - GitHub Actions 工作流日志');
console.log('   - 仓库是否为公开状态');
console.log('   - 是否有足够的 GitHub Pages 权限');

console.log('\n🔍 诊断完成！');

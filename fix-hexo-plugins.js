/**
 * Hexo 插件修复脚本
 * 解决插件加载失败的问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复 Hexo 插件问题...\n');

// 1. 检查 node_modules 目录
console.log('📦 检查依赖包状态:');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');

if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ node_modules 目录存在');
    
    // 检查关键插件
    const requiredPlugins = [
        'hexo-generator-index',
        'hexo-generator-archive', 
        'hexo-generator-category',
        'hexo-generator-tag',
        'hexo-renderer-ejs',
        'hexo-renderer-stylus',
        'hexo-server'
    ];
    
    requiredPlugins.forEach(plugin => {
        const pluginPath = path.join(nodeModulesPath, plugin);
        if (fs.existsSync(pluginPath)) {
            console.log(`✅ ${plugin} 已安装`);
        } else {
            console.log(`❌ ${plugin} 缺失`);
        }
    });
} else {
    console.log('❌ node_modules 目录不存在');
}

// 2. 检查 package.json
console.log('\n📄 检查 package.json:');
if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('✅ package.json 存在');
    console.log('依赖包数量:', Object.keys(packageJson.dependencies || {}).length);
} else {
    console.log('❌ package.json 不存在');
}

// 3. 检查主题目录
console.log('\n🎨 检查主题状态:');
const themePath = path.join(process.cwd(), 'themes', 'anzhiyu');
if (fs.existsSync(themePath)) {
    console.log('✅ AnZhiYu 主题目录存在');
    
    // 检查主题布局文件
    const layoutPath = path.join(themePath, 'layout');
    if (fs.existsSync(layoutPath)) {
        console.log('✅ 主题布局目录存在');
        
        // 检查关键布局文件
        const layoutFiles = ['index.ejs', 'post.ejs', 'page.ejs'];
        layoutFiles.forEach(file => {
            const filePath = path.join(layoutPath, file);
            if (fs.existsSync(filePath)) {
                console.log(`✅ ${file} 存在`);
            } else {
                console.log(`❌ ${file} 缺失`);
            }
        });
    } else {
        console.log('❌ 主题布局目录不存在');
    }
} else {
    console.log('❌ AnZhiYu 主题目录不存在');
}

console.log('\n💡 修复建议:');
console.log('1. 重新安装依赖: npm install');
console.log('2. 清理缓存: npm run clean');
console.log('3. 重新生成: npm run build');
console.log('4. 检查主题完整性');

console.log('\n🔧 修复完成！');

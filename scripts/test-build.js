#!/usr/bin/env node

/**
 * 构建测试脚本
 * 验证 Hexo 项目是否能正确构建，为 Cloudflare Pages 部署做准备
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 执行命令
function runCommand(command, description) {
  try {
    log(`\n🔄 ${description}...`, 'blue');
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    log(`✅ ${description} 成功`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} 失败: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

// 检查文件是否存在
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} 存在`, 'green');
    return true;
  } else {
    log(`❌ ${description} 不存在`, 'red');
    return false;
  }
}

// 主测试函数
async function testBuild() {
  log('🧪 Hexo 构建测试开始', 'magenta');
  log('═'.repeat(50), 'cyan');
  
  let allPassed = true;
  
  // 1. 检查必要文件
  log('\n📋 检查项目文件...', 'cyan');
  const requiredFiles = [
    { path: '_config.yml', desc: 'Hexo 主配置文件' },
    { path: 'package.json', desc: 'Node.js 包配置文件' },
    { path: 'themes/anzhiyu', desc: 'AnZhiYu 主题目录' },
    { path: 'themes/anzhiyu/_config.yml', desc: '主题配置文件' }
  ];
  
  for (const file of requiredFiles) {
    if (!checkFile(file.path, file.desc)) {
      allPassed = false;
    }
  }
  
  // 2. 检查 Node.js 和 npm 版本
  log('\n🔧 检查环境版本...', 'cyan');
  const nodeResult = runCommand('node --version', '检查 Node.js 版本');
  const npmResult = runCommand('npm --version', '检查 npm 版本');
  
  if (nodeResult.success) {
    log(`   Node.js 版本: ${nodeResult.output.trim()}`, 'blue');
  }
  if (npmResult.success) {
    log(`   npm 版本: ${npmResult.output.trim()}`, 'blue');
  }
  
  // 3. 检查依赖安装
  log('\n📦 检查依赖安装...', 'cyan');
  if (!fs.existsSync('node_modules')) {
    log('⚠️ node_modules 不存在，正在安装依赖...', 'yellow');
    const installResult = runCommand('npm install', '安装项目依赖');
    if (!installResult.success) {
      allPassed = false;
    }
  } else {
    log('✅ node_modules 已存在', 'green');
  }
  
  // 4. 清理旧文件
  log('\n🧹 清理旧构建文件...', 'cyan');
  const cleanResult = runCommand('npm run clean', '清理缓存');
  if (!cleanResult.success) {
    log('⚠️ 清理失败，继续测试...', 'yellow');
  }
  
  // 5. 测试构建
  log('\n🏗️ 测试构建过程...', 'cyan');
  const buildResult = runCommand('npm run build', '构建静态文件');
  
  if (!buildResult.success) {
    allPassed = false;
    log('\n❌ 构建失败！请检查以下可能的问题:', 'red');
    log('   1. 主题文件是否完整', 'yellow');
    log('   2. _config.yml 配置是否正确', 'yellow');
    log('   3. 依赖是否正确安装', 'yellow');
    return false;
  }
  
  // 6. 检查构建结果
  log('\n📁 检查构建结果...', 'cyan');
  const publicDir = 'public';
  
  if (!fs.existsSync(publicDir)) {
    log('❌ public 目录不存在', 'red');
    allPassed = false;
  } else {
    log('✅ public 目录已生成', 'green');
    
    // 检查关键文件
    const keyFiles = ['index.html', 'css', 'js'];
    for (const file of keyFiles) {
      const filePath = path.join(publicDir, file);
      if (fs.existsSync(filePath)) {
        log(`✅ ${file} 已生成`, 'green');
      } else {
        log(`❌ ${file} 缺失`, 'red');
        allPassed = false;
      }
    }
    
    // 检查 index.html 内容
    const indexPath = path.join(publicDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const fileSize = indexContent.length;
      log(`   index.html 大小: ${fileSize} 字符`, 'blue');
      
      if (fileSize < 100) {
        log('⚠️ index.html 文件过小，可能构建不完整', 'yellow');
      }
    }
  }
  
  // 7. 显示测试结果
  log('\n📊 测试结果汇总', 'cyan');
  log('═'.repeat(30), 'cyan');
  
  if (allPassed) {
    log('\n🎉 所有测试通过！', 'green');
    log('✅ 您的项目已准备好部署到 Cloudflare Pages', 'green');
    log('\n📋 Cloudflare Pages 构建配置:', 'blue');
    log('   构建命令: npm run build', 'blue');
    log('   输出目录: public', 'blue');
    log('   Node.js 版本: 18', 'blue');
    
    log('\n🚀 下一步:', 'cyan');
    log('   1. 访问 https://dash.cloudflare.com/', 'blue');
    log('   2. 创建 Pages 项目并连接您的 GitHub 仓库', 'blue');
    log('   3. 使用上述构建配置', 'blue');
    log('   4. 开始部署！', 'blue');
  } else {
    log('\n❌ 测试失败，请解决上述问题后重试', 'red');
    log('\n🔧 建议的解决步骤:', 'yellow');
    log('   1. 检查所有必要文件是否存在', 'blue');
    log('   2. 运行 npm install 重新安装依赖', 'blue');
    log('   3. 检查 _config.yml 配置', 'blue');
    log('   4. 重新运行此测试脚本', 'blue');
  }
  
  return allPassed;
}

// 运行测试
testBuild().catch(error => {
  log(`❌ 测试过程中发生错误: ${error.message}`, 'red');
  process.exit(1);
});

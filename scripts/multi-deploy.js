#!/usr/bin/env node

/**
 * 多平台部署脚本
 * 支持同时部署到 GitHub Pages 和其他平台
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出函数
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

// 执行命令并处理错误
function executeCommand(command, description) {
  try {
    log(`\n🔄 ${description}...`, 'blue');
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    log(`✅ ${description} 完成`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} 失败: ${error.message}`, 'red');
    return false;
  }
}

// 检查必要的文件和配置
function checkPrerequisites() {
  log('\n🔍 检查部署前置条件...', 'cyan');
  
  // 检查 _config.yml
  if (!fs.existsSync('_config.yml')) {
    log('❌ _config.yml 文件不存在', 'red');
    return false;
  }
  
  // 检查 public 目录
  if (!fs.existsSync('public')) {
    log('⚠️ public 目录不存在，将先生成静态文件', 'yellow');
  }
  
  // 检查 Git 配置
  try {
    execSync('git config user.name', { encoding: 'utf8' });
    execSync('git config user.email', { encoding: 'utf8' });
  } catch (error) {
    log('❌ Git 用户信息未配置，请先配置 git config user.name 和 user.email', 'red');
    return false;
  }
  
  log('✅ 前置条件检查通过', 'green');
  return true;
}

// 主部署函数
async function deploy() {
  log('🚀 开始多平台部署流程', 'magenta');
  
  // 检查前置条件
  if (!checkPrerequisites()) {
    process.exit(1);
  }
  
  // 清理旧文件
  if (!executeCommand('npx hexo clean', '清理旧文件')) {
    process.exit(1);
  }
  
  // 生成静态文件
  if (!executeCommand('npx hexo generate', '生成静态文件')) {
    process.exit(1);
  }
  
  // 运行 HTML 格式化（如果存在）
  if (fs.existsSync('scripts/html-formatter.js')) {
    executeCommand('node scripts/html-formatter.js', '格式化 HTML 文件');
  }
  
  // 运行 DOCTYPE 修复（如果存在）
  if (fs.existsSync('scripts/doctype-fixer.js')) {
    executeCommand('node scripts/doctype-fixer.js', '修复 DOCTYPE');
  }
  
  // 部署到配置的所有目标
  if (!executeCommand('npx hexo deploy', '部署到所有配置的目标')) {
    log('❌ 部署失败，请检查配置和网络连接', 'red');
    process.exit(1);
  }
  
  log('\n🎉 多平台部署完成！', 'green');
  log('📍 部署目标:', 'cyan');
  log('  • GitHub Pages: https://twj0.github.io/blog/', 'blue');
  log('  • 其他配置的仓库（如果有）', 'blue');
}

// 显示帮助信息
function showHelp() {
  log('\n📖 多平台部署脚本使用说明', 'cyan');
  log('用法: npm run multi-deploy 或 node scripts/multi-deploy.js', 'blue');
  log('\n功能:', 'yellow');
  log('  • 自动清理和生成静态文件', 'blue');
  log('  • 同时部署到 _config.yml 中配置的所有 Git 仓库', 'blue');
  log('  • 自动运行 HTML 格式化和修复脚本', 'blue');
  log('\n配置:', 'yellow');
  log('  请在 _config.yml 的 deploy 部分配置多个部署目标', 'blue');
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// 执行部署
deploy().catch(error => {
  log(`❌ 部署过程中发生错误: ${error.message}`, 'red');
  process.exit(1);
});

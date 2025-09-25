#!/usr/bin/env node

/**
 * Cloudflare Pages 专用构建脚本
 * 使用专门的配置文件构建，确保路径正确
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
    log(`🔄 ${description}...`, 'blue');
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

async function buildForCloudflare() {
  log('🌐 开始 Cloudflare Pages 专用构建', 'magenta');
  log('═'.repeat(50), 'cyan');
  
  // 1. 检查配置文件
  log('\n📋 检查配置文件...', 'cyan');
  if (!fs.existsSync('_config.cloudflare.yml')) {
    log('❌ _config.cloudflare.yml 不存在', 'red');
    log('请确保已创建 Cloudflare Pages 专用配置文件', 'yellow');
    return false;
  }
  log('✅ Cloudflare 配置文件存在', 'green');
  
  // 2. 清理旧文件
  if (!runCommand('npx hexo clean', '清理旧构建文件')) {
    return false;
  }
  
  // 3. 使用 Cloudflare 配置生成静态文件
  log('\n🏗️ 使用 Cloudflare 配置构建...', 'cyan');
  if (!runCommand('npx hexo generate --config _config.cloudflare.yml', '生成静态文件')) {
    return false;
  }
  
  // 4. 运行后处理脚本（如果存在）
  if (fs.existsSync('scripts/html-formatter.js')) {
    runCommand('node scripts/html-formatter.js', '格式化 HTML 文件');
  }
  
  if (fs.existsSync('scripts/doctype-fixer.js')) {
    runCommand('node scripts/doctype-fixer.js', '修复 DOCTYPE');
  }
  
  // 5. 验证构建结果
  log('\n📁 验证构建结果...', 'cyan');
  const publicDir = 'public';
  
  if (!fs.existsSync(publicDir)) {
    log('❌ public 目录不存在', 'red');
    return false;
  }
  
  // 检查关键文件
  const keyFiles = ['index.html', 'css', 'js'];
  let allFilesExist = true;
  
  for (const file of keyFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      log(`✅ ${file} 已生成`, 'green');
    } else {
      log(`❌ ${file} 缺失`, 'red');
      allFilesExist = false;
    }
  }
  
  // 检查 index.html 内容
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // 检查是否包含正确的资源路径
    if (indexContent.includes('href="/css/') && indexContent.includes('src="/js/')) {
      log('✅ CSS 和 JS 路径配置正确（根路径）', 'green');
    } else if (indexContent.includes('href="/blog/css/') && indexContent.includes('src="/blog/js/')) {
      log('⚠️ 检测到 /blog/ 路径，这可能在 Cloudflare Pages 上导致资源加载失败', 'yellow');
      log('建议检查配置文件中的 root 设置', 'yellow');
    } else {
      log('⚠️ 无法确定资源路径配置', 'yellow');
    }
    
    log(`   index.html 大小: ${indexContent.length} 字符`, 'blue');
  }
  
  if (allFilesExist) {
    log('\n🎉 Cloudflare Pages 构建完成！', 'green');
    log('📁 构建文件已生成到 public 目录', 'blue');
    log('🌐 现在可以部署到 Cloudflare Pages', 'blue');
    return true;
  } else {
    log('\n❌ 构建不完整，请检查错误信息', 'red');
    return false;
  }
}

// 运行构建
buildForCloudflare().catch(error => {
  log(`❌ 构建过程中发生错误: ${error.message}`, 'red');
  process.exit(1);
});

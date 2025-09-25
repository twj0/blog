#!/usr/bin/env node

/**
 * 多平台部署设置脚本
 * 帮助用户快速配置 GitHub Actions 多平台部署
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 异步问题函数
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 检查文件是否存在
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// 主设置函数
async function setupMultiPlatform() {
  log('\n🚀 多平台部署设置向导', 'magenta');
  log('═'.repeat(50), 'cyan');
  
  // 检查当前状态
  log('\n🔍 检查当前配置状态...', 'blue');
  
  const workflowExists = fileExists('.github/workflows/multi-platform-deploy.yml');
  const backupExists = fileExists('.github/workflows/deploy.yml.backup');
  
  if (workflowExists) {
    log('✅ 多平台部署工作流已存在', 'green');
  } else {
    log('❌ 多平台部署工作流不存在', 'red');
    return;
  }
  
  if (backupExists) {
    log('✅ 原工作流已备份', 'green');
  } else {
    log('⚠️ 原工作流备份不存在', 'yellow');
  }
  
  // 询问用户配置
  log('\n📋 请提供以下配置信息:', 'cyan');
  log('（这些信息将用于生成配置指南）', 'yellow');
  
  const config = {};
  
  config.githubUsername = await question('🔹 GitHub 用户名: ');
  config.repositoryName = await question('🔹 仓库名称 (默认: blog): ') || 'blog';
  config.cloudflareProjectName = await question('🔹 Cloudflare Pages 项目名称 (默认: hexo-blog): ') || 'hexo-blog';
  
  // 生成配置指南
  log('\n📝 生成个性化配置指南...', 'blue');
  
  const configGuide = generateConfigGuide(config);
  
  // 保存配置指南
  const guideFile = 'docs/your-deployment-config.md';
  fs.writeFileSync(guideFile, configGuide);
  
  log(`✅ 个性化配置指南已保存到: ${guideFile}`, 'green');
  
  // 显示下一步操作
  log('\n🎯 下一步操作:', 'cyan');
  log('═'.repeat(30), 'cyan');
  
  log('\n1. 📖 阅读配置指南:', 'yellow');
  log(`   cat ${guideFile}`, 'blue');
  
  log('\n2. 🔑 配置 GitHub Secrets:', 'yellow');
  log('   • 访问: https://github.com/' + config.githubUsername + '/' + config.repositoryName + '/settings/secrets/actions', 'blue');
  log('   • 添加 CLOUDFLARE_API_TOKEN', 'blue');
  log('   • 添加 CLOUDFLARE_ACCOUNT_ID', 'blue');
  
  log('\n3. 📊 配置 GitHub Variables:', 'yellow');
  log('   • 访问: https://github.com/' + config.githubUsername + '/' + config.repositoryName + '/settings/variables/actions', 'blue');
  log('   • 添加 CLOUDFLARE_PROJECT_NAME = ' + config.cloudflareProjectName, 'blue');
  
  log('\n4. 🚀 推送代码触发部署:', 'yellow');
  log('   git add .', 'blue');
  log('   git commit -m "feat: enable multi-platform deployment"', 'blue');
  log('   git push origin main', 'blue');
  
  log('\n5. 🌐 访问您的博客:', 'yellow');
  log('   • GitHub Pages: https://' + config.githubUsername + '.github.io/' + config.repositoryName, 'blue');
  log('   • Cloudflare Pages: https://' + config.cloudflareProjectName + '.pages.dev', 'blue');
  
  log('\n🎉 设置完成！祝您博客之旅愉快！', 'green');
  
  rl.close();
}

// 生成个性化配置指南
function generateConfigGuide(config) {
  return `# 您的多平台部署配置指南

## 📋 项目信息
- **GitHub 用户名**: ${config.githubUsername}
- **仓库名称**: ${config.repositoryName}
- **Cloudflare 项目名称**: ${config.cloudflareProjectName}

## 🔑 GitHub Secrets 配置

访问: https://github.com/${config.githubUsername}/${config.repositoryName}/settings/secrets/actions

添加以下 Secrets:

### CLOUDFLARE_API_TOKEN
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → "My Profile"
3. 选择 "API Tokens" 标签页
4. 点击 "Create Token"
5. 选择 "Custom token" 模板
6. 配置权限：
   - **Account**: \`Cloudflare Pages:Edit\`
   - **Zone Resources**: \`Include - All zones\`
   - **Account Resources**: \`Include - All accounts\`
7. 复制生成的 Token

### CLOUDFLARE_ACCOUNT_ID
1. 在 Cloudflare Dashboard 右侧边栏找到 "Account ID"
2. 复制 Account ID

## 📊 GitHub Variables 配置

访问: https://github.com/${config.githubUsername}/${config.repositoryName}/settings/variables/actions

添加以下 Variable:
- **Name**: \`CLOUDFLARE_PROJECT_NAME\`
- **Value**: \`${config.cloudflareProjectName}\`

## 🚀 部署测试

配置完成后，推送代码测试部署:

\`\`\`bash
git add .
git commit -m "feat: enable multi-platform deployment"
git push origin main
\`\`\`

## 🌐 访问地址

部署成功后，您的博客将在以下地址可用:
- **GitHub Pages**: https://${config.githubUsername}.github.io/${config.repositoryName}
- **Cloudflare Pages**: https://${config.cloudflareProjectName}.pages.dev

## 📊 监控部署状态

- **GitHub Actions**: https://github.com/${config.githubUsername}/${config.repositoryName}/actions
- **Cloudflare Pages**: https://dash.cloudflare.com/ → Pages → ${config.cloudflareProjectName}

## 🔧 故障排除

如果遇到问题，请查看:
1. GitHub Actions 构建日志
2. Cloudflare Pages 部署日志
3. 确认 Secrets 和 Variables 配置正确

---

生成时间: ${new Date().toLocaleString()}
`;
}

// 错误处理
process.on('unhandledRejection', (error) => {
  log(`❌ 发生错误: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});

// 运行设置
setupMultiPlatform().catch(error => {
  log(`❌ 设置失败: ${error.message}`, 'red');
  process.exit(1);
});

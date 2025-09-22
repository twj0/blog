/**
 * 博客配置检查脚本
 * 验证配置文件的完整性和正确性
 */

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// 颜色输出函数
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

// 检查结果
const results = {
  passed: 0,
  warnings: 0,
  errors: 0,
  issues: []
};

// 添加检查结果
function addResult(type, category, message, suggestion = '') {
  results[type]++;
  results.issues.push({
    type,
    category,
    message,
    suggestion
  });
}

// 检查文件是否存在
function checkFileExists(filePath, required = true) {
  const exists = fs.existsSync(filePath);
  if (!exists && required) {
    addResult('errors', '文件检查', `缺少必要文件: ${filePath}`, '请确保文件存在');
  } else if (!exists) {
    addResult('warnings', '文件检查', `可选文件不存在: ${filePath}`, '如需要请创建此文件');
  } else {
    addResult('passed', '文件检查', `文件存在: ${filePath}`);
  }
  return exists;
}

// 检查YAML文件格式
function checkYamlFormat(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    yaml.load(content);
    addResult('passed', 'YAML格式', `${filePath} 格式正确`);
    return true;
  } catch (error) {
    addResult('errors', 'YAML格式', `${filePath} 格式错误: ${error.message}`, '请检查YAML语法');
    return false;
  }
}

// 检查配置项
function checkConfigValue(config, key, required = true, type = 'string') {
  const value = config[key];
  
  if (value === undefined || value === null || value === '') {
    if (required) {
      addResult('errors', '配置检查', `缺少必要配置: ${key}`, '请在配置文件中设置此项');
    } else {
      addResult('warnings', '配置检查', `可选配置未设置: ${key}`, '如需要请设置此项');
    }
    return false;
  }

  // 类型检查
  if (type === 'url' && !value.startsWith('http')) {
    addResult('warnings', '配置检查', `${key} 可能不是有效的URL: ${value}`, '请确保URL格式正确');
  }

  addResult('passed', '配置检查', `配置正确: ${key} = ${value}`);
  return true;
}

// 检查主配置文件
function checkMainConfig() {
  console.log(colors.blue('\n🔍 检查主配置文件...'));
  
  if (!checkFileExists('_config.yml')) return;
  if (!checkYamlFormat('_config.yml')) return;

  try {
    const config = yaml.load(fs.readFileSync('_config.yml', 'utf8'));
    
    // 检查必要配置
    checkConfigValue(config, 'title', true);
    checkConfigValue(config, 'author', true);
    checkConfigValue(config, 'url', true, 'url');
    checkConfigValue(config, 'root', true);
    
    // 检查部署配置
    if (config.deploy) {
      checkConfigValue(config.deploy, 'type', true);
      checkConfigValue(config.deploy, 'repo', true, 'url');
      checkConfigValue(config.deploy, 'branch', true);
    } else {
      addResult('errors', '部署配置', '缺少部署配置', '请配置deploy部分');
    }

  } catch (error) {
    addResult('errors', '配置解析', `无法解析主配置文件: ${error.message}`);
  }
}

// 检查主题配置文件
function checkThemeConfig() {
  console.log(colors.blue('\n🎨 检查主题配置文件...'));
  
  const themePath = 'themes/anzhiyu/_config.yml';
  if (!checkFileExists(themePath)) return;
  if (!checkYamlFormat(themePath)) return;

  try {
    const config = yaml.load(fs.readFileSync(themePath, 'utf8'));
    
    // 检查头像配置
    if (config.avatar && config.avatar.img) {
      checkConfigValue(config.avatar, 'img', false, 'url');
    }
    
    // 检查社交链接
    if (config.social) {
      Object.keys(config.social).forEach(platform => {
        if (config.social[platform]) {
          addResult('passed', '社交链接', `${platform}: ${config.social[platform]}`);
        }
      });
    }

    // 检查评论系统
    if (config.comments && config.comments.use) {
      addResult('passed', '评论系统', `使用: ${config.comments.use}`);
    } else {
      addResult('warnings', '评论系统', '未配置评论系统', '建议配置评论系统以增强互动');
    }

  } catch (error) {
    addResult('errors', '配置解析', `无法解析主题配置文件: ${error.message}`);
  }
}

// 检查依赖包
function checkDependencies() {
  console.log(colors.blue('\n📦 检查依赖包...'));
  
  if (!checkFileExists('package.json')) return;

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = [
      'hexo',
      'hexo-deployer-git',
      'hexo-generator-archive',
      'hexo-generator-category',
      'hexo-generator-index',
      'hexo-generator-tag',
      'hexo-renderer-ejs',
      'hexo-renderer-marked',
      'hexo-renderer-stylus',
      'hexo-server'
    ];

    requiredDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        addResult('passed', '依赖检查', `${dep}: ${packageJson.dependencies[dep]}`);
      } else {
        addResult('errors', '依赖检查', `缺少依赖: ${dep}`, '请运行 npm install 安装依赖');
      }
    });

  } catch (error) {
    addResult('errors', '依赖检查', `无法解析package.json: ${error.message}`);
  }
}

// 检查GitHub Actions配置
function checkGitHubActions() {
  console.log(colors.blue('\n⚙️  检查GitHub Actions配置...'));
  
  const workflowPath = '.github/workflows/deploy.yml';
  if (checkFileExists(workflowPath, false)) {
    if (checkYamlFormat(workflowPath)) {
      addResult('passed', 'GitHub Actions', '部署工作流配置正确');
    }
  } else {
    addResult('warnings', 'GitHub Actions', '未找到部署工作流', '建议配置自动部署');
  }
}

// 检查内容文件
function checkContent() {
  console.log(colors.blue('\n📝 检查内容文件...'));
  
  // 检查文章目录
  const postsDir = 'source/_posts';
  if (fs.existsSync(postsDir)) {
    const posts = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
    if (posts.length > 0) {
      addResult('passed', '内容检查', `找到 ${posts.length} 篇文章`);
    } else {
      addResult('warnings', '内容检查', '没有找到文章', '建议添加一些文章内容');
    }
  } else {
    addResult('errors', '内容检查', '文章目录不存在', '请确保source/_posts目录存在');
  }
}

// 输出检查结果
function printResults() {
  console.log(colors.cyan('\n📊 检查结果汇总'));
  console.log('='.repeat(50));
  
  console.log(colors.green(`✅ 通过: ${results.passed}`));
  console.log(colors.yellow(`⚠️  警告: ${results.warnings}`));
  console.log(colors.red(`❌ 错误: ${results.errors}`));
  
  if (results.issues.length > 0) {
    console.log(colors.cyan('\n📋 详细问题列表:'));
    
    results.issues.forEach((issue, index) => {
      const icon = issue.type === 'passed' ? '✅' : 
                   issue.type === 'warnings' ? '⚠️ ' : '❌';
      const color = issue.type === 'passed' ? colors.green : 
                    issue.type === 'warnings' ? colors.yellow : colors.red;
      
      console.log(`\n${index + 1}. ${icon} [${issue.category}] ${color(issue.message)}`);
      if (issue.suggestion) {
        console.log(`   💡 建议: ${issue.suggestion}`);
      }
    });
  }

  // 总结
  console.log(colors.cyan('\n🎯 总结:'));
  if (results.errors === 0) {
    if (results.warnings === 0) {
      console.log(colors.green('🎉 恭喜！所有检查都通过了，您的博客配置完美！'));
    } else {
      console.log(colors.yellow('✨ 基本配置正确，但有一些建议优化的地方。'));
    }
  } else {
    console.log(colors.red('🔧 发现一些需要修复的问题，请根据建议进行调整。'));
  }
}

// 主函数
function main() {
  console.log(colors.cyan('🔍 博客配置检查工具'));
  console.log(colors.cyan('正在检查您的博客配置...'));
  
  checkMainConfig();
  checkThemeConfig();
  checkDependencies();
  checkGitHubActions();
  checkContent();
  
  printResults();
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { main, checkMainConfig, checkThemeConfig };

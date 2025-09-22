/**
 * 博客配置初始化脚本
 * 用于快速配置个人博客信息
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建命令行接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 配置项定义
const configItems = [
  {
    key: 'SITE_TITLE',
    prompt: '请输入网站标题 (例如: 我的个人博客): ',
    default: '我的个人博客'
  },
  {
    key: 'SITE_SUBTITLE',
    prompt: '请输入网站副标题 (可选): ',
    default: ''
  },
  {
    key: 'SITE_DESCRIPTION',
    prompt: '请输入网站描述: ',
    default: '记录生活，分享技术'
  },
  {
    key: 'AUTHOR_NAME',
    prompt: '请输入作者姓名: ',
    default: 'Blog Author'
  },
  {
    key: 'GITHUB_USERNAME',
    prompt: '请输入GitHub用户名: ',
    default: '',
    required: true
  },
  {
    key: 'GITHUB_REPOSITORY',
    prompt: '请输入GitHub仓库名: ',
    default: '',
    required: true
  },
  {
    key: 'SITE_LANGUAGE',
    prompt: '请选择网站语言 (zh-CN/en): ',
    default: 'zh-CN'
  },
  {
    key: 'THEME_COLOR_MAIN',
    prompt: '请输入主题主色调 (例如: #425AEF): ',
    default: '#425AEF'
  }
];

// 存储用户输入的配置
const userConfig = {};

console.log('🚀 欢迎使用博客配置向导！');
console.log('请按照提示输入您的博客配置信息，直接回车使用默认值。\n');

// 异步询问函数
function askQuestion(question, defaultValue = '') {
  return new Promise((resolve) => {
    const promptText = defaultValue ? `${question}[${defaultValue}] ` : question;
    rl.question(promptText, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

// 主配置流程
async function runSetup() {
  try {
    // 收集用户输入
    for (const item of configItems) {
      let answer;
      do {
        answer = await askQuestion(item.prompt, item.default);
        if (item.required && !answer) {
          console.log('❌ 此项为必填项，请重新输入。');
        }
      } while (item.required && !answer);
      
      userConfig[item.key] = answer;
    }

    // 生成衍生配置
    userConfig.SITE_URL = `https://${userConfig.GITHUB_USERNAME}.github.io/${userConfig.GITHUB_REPOSITORY}`;
    userConfig.SITE_ROOT = `/${userConfig.GITHUB_REPOSITORY}/`;
    userConfig.DEPLOY_REPO = `https://github.com/${userConfig.GITHUB_USERNAME}/${userConfig.GITHUB_REPOSITORY}.git`;
    userConfig.GITHUB_URL = `https://github.com/${userConfig.GITHUB_USERNAME}`;
    userConfig.AVATAR_URL = `https://avatars.githubusercontent.com/${userConfig.GITHUB_USERNAME}`;

    console.log('\n📋 配置预览:');
    console.log('=====================================');
    Object.keys(userConfig).forEach(key => {
      console.log(`${key}: ${userConfig[key]}`);
    });
    console.log('=====================================\n');

    const confirm = await askQuestion('确认以上配置正确吗？(y/N): ');
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('❌ 配置已取消。');
      rl.close();
      return;
    }

    // 生成配置文件
    await generateConfigFiles();
    
    // 生成环境变量文件
    await generateEnvFile();

    console.log('\n✅ 配置完成！');
    console.log('\n📝 接下来的步骤:');
    console.log('1. 检查生成的配置文件是否正确');
    console.log('2. 运行 "npm run server" 本地预览');
    console.log('3. 提交代码到GitHub触发自动部署');
    console.log('4. 在GitHub仓库设置中启用Pages功能');
    console.log('\n🎉 祝您使用愉快！');

  } catch (error) {
    console.error('❌ 配置过程中出现错误:', error.message);
  } finally {
    rl.close();
  }
}

// 生成配置文件
async function generateConfigFiles() {
  console.log('\n🔧 正在生成配置文件...');

  // 处理模板文件
  const templates = [
    { template: '_config.template.yml', output: '_config.yml' },
    { template: 'themes/anzhiyu/_config.template.yml', output: 'themes/anzhiyu/_config.yml' }
  ];

  for (const { template, output } of templates) {
    if (fs.existsSync(template)) {
      let content = fs.readFileSync(template, 'utf8');
      
      // 替换占位符
      Object.keys(userConfig).forEach(key => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        content = content.replace(placeholder, userConfig[key]);
      });

      // 备份原文件
      if (fs.existsSync(output)) {
        fs.copyFileSync(output, `${output}.backup`);
        console.log(`📄 已备份原文件: ${output}.backup`);
      }

      fs.writeFileSync(output, content);
      console.log(`✅ 已生成: ${output}`);
    } else {
      console.log(`⚠️  模板文件不存在: ${template}`);
    }
  }
}

// 生成环境变量文件
async function generateEnvFile() {
  console.log('\n📝 正在生成环境变量文件...');

  const envContent = Object.keys(userConfig)
    .map(key => `${key}=${userConfig[key]}`)
    .join('\n');

  fs.writeFileSync('.env', envContent);
  console.log('✅ 已生成: .env');
}

// 验证环境
function validateEnvironment() {
  const requiredFiles = ['_config.template.yml', 'package.json'];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ 缺少必要文件: ${file}`);
      console.error('请确保在博客项目根目录下运行此脚本。');
      process.exit(1);
    }
  }
}

// 主函数
function main() {
  validateEnvironment();
  runSetup();
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { runSetup, generateConfigFiles };

/**
 * AnZhiYu主题自动更新脚本
 * 用于检查和更新AnZhiYu主题到最新版本
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

class ThemeUpdater {
  constructor() {
    this.themePath = path.join(process.cwd(), 'themes', 'anzhiyu');
    this.configPath = path.join(this.themePath, '_config.yml');
    this.backupPath = path.join(this.themePath, '_config.yml.backup');
    this.repoUrl = 'https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git';
    this.apiUrl = 'https://api.github.com/repos/anzhiyu-c/hexo-theme-anzhiyu/releases/latest';
  }

  /**
   * 检查主题目录是否存在
   */
  checkThemeExists() {
    if (!fs.existsSync(this.themePath)) {
      console.error('❌ AnZhiYu主题目录不存在！');
      console.log('请先安装主题：git clone https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu');
      process.exit(1);
    }
    console.log('✅ 找到AnZhiYu主题目录');
  }

  /**
   * 获取当前主题版本
   */
  getCurrentVersion() {
    try {
      const result = execSync('git log --oneline -1', { 
        cwd: this.themePath, 
        encoding: 'utf8' 
      });
      return result.trim();
    } catch (error) {
      console.warn('⚠️ 无法获取当前版本信息（可能不是git仓库）');
      return 'unknown';
    }
  }

  /**
   * 获取最新版本信息
   */
  async getLatestVersion() {
    return new Promise((resolve, reject) => {
      https.get(this.apiUrl, { headers: { 'User-Agent': 'AnZhiYu-Updater' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const release = JSON.parse(data);
            resolve({
              version: release.tag_name,
              name: release.name,
              publishedAt: release.published_at,
              downloadUrl: release.zipball_url,
              body: release.body
            });
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  /**
   * 备份配置文件
   */
  backupConfig() {
    if (fs.existsSync(this.configPath)) {
      fs.copyFileSync(this.configPath, this.backupPath);
      console.log('✅ 配置文件已备份');
      return true;
    }
    console.warn('⚠️ 配置文件不存在，跳过备份');
    return false;
  }

  /**
   * 恢复配置文件
   */
  restoreConfig() {
    if (fs.existsSync(this.backupPath)) {
      fs.copyFileSync(this.backupPath, this.configPath);
      console.log('✅ 配置文件已恢复');
      return true;
    }
    console.warn('⚠️ 备份文件不存在，无法恢复');
    return false;
  }

  /**
   * 检查是否为Git仓库
   */
  isGitRepo() {
    try {
      execSync('git status', { cwd: this.themePath, stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 使用Git更新主题
   */
  updateWithGit() {
    try {
      console.log('🔄 使用Git更新主题...');
      
      // 检查是否有未提交的更改
      try {
        const status = execSync('git status --porcelain', { 
          cwd: this.themePath, 
          encoding: 'utf8' 
        });
        if (status.trim()) {
          console.warn('⚠️ 检测到未提交的更改，请先处理：');
          console.log(status);
          return false;
        }
      } catch (error) {
        console.warn('⚠️ 无法检查Git状态');
      }

      // 拉取最新更新
      execSync('git fetch origin', { cwd: this.themePath, stdio: 'inherit' });
      execSync('git pull origin main', { cwd: this.themePath, stdio: 'inherit' });
      
      console.log('✅ Git更新完成');
      return true;
    } catch (error) {
      console.error('❌ Git更新失败：', error.message);
      return false;
    }
  }

  /**
   * 检查更新后的兼容性
   */
  checkCompatibility() {
    try {
      console.log('🔍 检查主题兼容性...');
      
      // 检查Hexo版本兼容性
      const hexoVersion = execSync('npx hexo version', { encoding: 'utf8' });
      console.log('当前Hexo版本信息：');
      console.log(hexoVersion);

      // 尝试生成测试
      execSync('npx hexo clean', { stdio: 'inherit' });
      execSync('npx hexo generate --silent', { stdio: 'inherit' });
      
      console.log('✅ 兼容性检查通过');
      return true;
    } catch (error) {
      console.error('❌ 兼容性检查失败：', error.message);
      return false;
    }
  }

  /**
   * 显示更新日志
   */
  showUpdateLog(latestRelease) {
    console.log('\n📋 更新日志：');
    console.log('='.repeat(50));
    console.log(`版本：${latestRelease.version}`);
    console.log(`发布时间：${new Date(latestRelease.publishedAt).toLocaleString()}`);
    console.log(`更新内容：\n${latestRelease.body || '暂无更新说明'}`);
    console.log('='.repeat(50));
  }

  /**
   * 主更新流程
   */
  async update() {
    console.log('🚀 AnZhiYu主题更新器');
    console.log('='.repeat(30));

    // 检查主题目录
    this.checkThemeExists();

    // 获取版本信息
    const currentVersion = this.getCurrentVersion();
    console.log(`📦 当前版本：${currentVersion}`);

    try {
      const latestRelease = await this.getLatestVersion();
      console.log(`🆕 最新版本：${latestRelease.version}`);

      // 显示更新日志
      this.showUpdateLog(latestRelease);

      // 询问是否更新
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise(resolve => {
        readline.question('\n是否要更新到最新版本？(y/N): ', resolve);
      });
      readline.close();

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('❌ 用户取消更新');
        return;
      }

      // 备份配置
      const hasBackup = this.backupConfig();

      // 执行更新
      let updateSuccess = false;
      if (this.isGitRepo()) {
        updateSuccess = this.updateWithGit();
      } else {
        console.log('⚠️ 不是Git仓库，请手动更新或重新克隆主题');
        return;
      }

      if (updateSuccess) {
        // 恢复配置
        if (hasBackup) {
          this.restoreConfig();
        }

        // 检查兼容性
        const compatible = this.checkCompatibility();
        
        if (compatible) {
          console.log('\n🎉 主题更新成功！');
          console.log('📝 请检查配置文件是否需要调整新增的配置项');
          console.log('🔧 建议运行 npm run server 进行本地测试');
        } else {
          console.log('\n⚠️ 更新完成但存在兼容性问题');
          console.log('请检查错误信息并手动修复');
        }
      } else {
        console.log('\n❌ 更新失败');
        if (hasBackup) {
          console.log('正在恢复配置文件...');
          this.restoreConfig();
        }
      }

    } catch (error) {
      console.error('❌ 获取版本信息失败：', error.message);
      console.log('请检查网络连接或手动访问：https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases');
    }
  }

  /**
   * 检查更新（不执行更新）
   */
  async checkUpdate() {
    console.log('🔍 检查AnZhiYu主题更新...');
    
    this.checkThemeExists();
    
    const currentVersion = this.getCurrentVersion();
    console.log(`📦 当前版本：${currentVersion}`);

    try {
      const latestRelease = await this.getLatestVersion();
      console.log(`🆕 最新版本：${latestRelease.version}`);
      console.log(`📅 发布时间：${new Date(latestRelease.publishedAt).toLocaleString()}`);
      
      if (latestRelease.body) {
        console.log(`📋 更新说明：${latestRelease.body.substring(0, 200)}...`);
      }
      
      console.log('\n💡 运行 npm run update-theme 来执行更新');
    } catch (error) {
      console.error('❌ 检查更新失败：', error.message);
    }
  }
}

// 命令行参数处理
const args = process.argv.slice(2);
const updater = new ThemeUpdater();

if (args.includes('--check') || args.includes('-c')) {
  updater.checkUpdate();
} else {
  updater.update();
}

module.exports = ThemeUpdater;

/**
 * Hexo HTML格式化插件
 * 自动在生成后格式化HTML，确保DOCTYPE声明正确
 */

const { formatHTML } = require('./html-formatter');

// 注册after_generate事件处理器
hexo.extend.filter.register('after_generate', function() {
  const fs = require('fs');
  const path = require('path');
  
  /**
   * 递归查找HTML文件
   */
  function findHTMLFiles(dir, files = []) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findHTMLFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // 忽略无法访问的目录
    }
    
    return files;
  }
  
  /**
   * 处理单个HTML文件
   */
  function processHTMLFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const formatted = formatHTML(content);
      
      // 只有内容发生变化时才写入
      if (content !== formatted) {
        fs.writeFileSync(filePath, formatted, 'utf8');
        hexo.log.debug(`HTML格式化: ${path.relative(hexo.public_dir, filePath)}`);
      }
    } catch (error) {
      hexo.log.warn(`HTML格式化失败 ${filePath}: ${error.message}`);
    }
  }
  
  // 处理public目录下的所有HTML文件
  const publicDir = hexo.public_dir;
  
  if (fs.existsSync(publicDir)) {
    const htmlFiles = findHTMLFiles(publicDir);
    
    if (htmlFiles.length > 0) {
      htmlFiles.forEach(processHTMLFile);
      hexo.log.info(`HTML格式化完成: ${htmlFiles.length} 个文件`);
    }
  }
});

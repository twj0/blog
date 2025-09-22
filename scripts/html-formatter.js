/**
 * HTML格式化处理脚本
 * 解决DOCTYPE声明和HTML格式问题
 * 确保页面在标准模式下渲染
 */

const fs = require('fs');
const path = require('path');

/**
 * 格式化HTML内容
 * @param {string} html - 原始HTML内容
 * @returns {string} - 格式化后的HTML内容
 */
function formatHTML(html) {
  // 确保DOCTYPE声明在最开头且独立成行
  let formatted = html.trim();
  
  // 移除可能的BOM
  if (formatted.charCodeAt(0) === 0xFEFF) {
    formatted = formatted.slice(1);
  }
  
  // 确保DOCTYPE声明正确且独立
  if (formatted.startsWith('<!DOCTYPE html>')) {
    // 如果DOCTYPE后面直接跟着<html>，添加换行
    formatted = formatted.replace(/^<!DOCTYPE html><html/, '<!DOCTYPE html>\n<html');
  } else if (formatted.includes('<!DOCTYPE html>')) {
    // 如果DOCTYPE不在开头，移动到开头
    formatted = formatted.replace(/<!DOCTYPE html>/, '');
    formatted = '<!DOCTYPE html>\n' + formatted.trim();
  } else {
    // 如果没有DOCTYPE，添加它
    formatted = '<!DOCTYPE html>\n' + formatted;
  }
  
  // 确保<html>标签后有换行
  formatted = formatted.replace(/<html([^>]*)><head/, '<html$1>\n<head');
  
  // 确保</head>和<body>之间有换行
  formatted = formatted.replace(/<\/head><body/, '</head>\n<body');
  
  // 确保</body>和</html>之间有换行
  formatted = formatted.replace(/<\/body><\/html>/, '</body>\n</html>');
  
  return formatted;
}

/**
 * 处理单个HTML文件
 * @param {string} filePath - 文件路径
 */
function processHTMLFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const formatted = formatHTML(content);
    
    // 只有内容发生变化时才写入
    if (content !== formatted) {
      fs.writeFileSync(filePath, formatted, 'utf8');
      console.log(`✅ 格式化完成: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ 处理文件失败 ${filePath}:`, error.message);
  }
}

/**
 * 递归查找HTML文件
 * @param {string} dir - 目录路径
 * @param {string[]} files - 文件列表
 */
function findHTMLFiles(dir, files = []) {
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

  return files;
}

/**
 * 批量处理public目录下的所有HTML文件
 */
function processAllHTMLFiles() {
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    console.log('❌ public目录不存在，请先运行 hexo generate');
    return;
  }

  try {
    // 查找所有HTML文件
    const htmlFiles = findHTMLFiles(publicDir);

    if (htmlFiles.length === 0) {
      console.log('❌ 未找到HTML文件');
      return;
    }

    console.log(`🔍 找到 ${htmlFiles.length} 个HTML文件`);

    // 处理每个HTML文件
    htmlFiles.forEach(file => {
      processHTMLFile(file);
    });

    console.log('🎉 HTML格式化处理完成！');
    console.log('💡 现在您的网站应该在标准模式下正确渲染了');

  } catch (error) {
    console.error('❌ 批量处理失败:', error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  processAllHTMLFiles();
}

module.exports = {
  formatHTML,
  processHTMLFile,
  processAllHTMLFiles
};

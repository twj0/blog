/**
 * 强力DOCTYPE修复脚本
 * 专门解决怪异模式问题
 */

const fs = require('fs');
const path = require('path');

/**
 * 强力修复HTML的DOCTYPE声明
 * @param {string} html - 原始HTML内容
 * @returns {string} - 修复后的HTML内容
 */
function forceFixDoctype(html) {
  // 移除所有可能的BOM和隐藏字符
  let fixed = html.replace(/^\uFEFF/, ''); // 移除BOM
  fixed = fixed.replace(/^[\s\r\n\t]*/, ''); // 移除开头的所有空白字符
  
  // 确保DOCTYPE声明正确且在最开头
  const doctypeRegex = /<!DOCTYPE\s+html[^>]*>/i;
  
  if (doctypeRegex.test(fixed)) {
    // 如果存在DOCTYPE，移除它
    fixed = fixed.replace(doctypeRegex, '');
  }
  
  // 移除开头的任何剩余空白
  fixed = fixed.replace(/^[\s\r\n\t]*/, '');
  
  // 在最开头添加标准的DOCTYPE声明
  fixed = '<!DOCTYPE html>\n' + fixed;
  
  // 确保HTML标签后有换行
  fixed = fixed.replace(/(<html[^>]*>)([^\n])/i, '$1\n$2');
  
  // 确保head标签后有换行
  fixed = fixed.replace(/(<head[^>]*>)([^\n])/i, '$1\n$2');
  
  // 确保body标签后有换行
  fixed = fixed.replace(/(<body[^>]*>)([^\n])/i, '$1\n$2');
  
  return fixed;
}

/**
 * 检查HTML文件是否存在问题
 * @param {string} filePath - 文件路径
 */
function diagnoseHTML(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const firstBytes = content.slice(0, 50);
    
    console.log(`\n🔍 诊断文件: ${path.relative(process.cwd(), filePath)}`);
    console.log(`📄 文件大小: ${content.length} bytes`);
    console.log(`🔤 前50个字符: "${firstBytes}"`);
    
    // 检查BOM
    if (content.charCodeAt(0) === 0xFEFF) {
      console.log('⚠️  发现BOM字符');
    }
    
    // 检查DOCTYPE
    const doctypeMatch = content.match(/<!DOCTYPE\s+html[^>]*>/i);
    if (doctypeMatch) {
      const doctypeIndex = content.indexOf(doctypeMatch[0]);
      console.log(`✅ 找到DOCTYPE: "${doctypeMatch[0]}" (位置: ${doctypeIndex})`);
      
      if (doctypeIndex > 0) {
        const beforeDoctype = content.slice(0, doctypeIndex);
        console.log(`⚠️  DOCTYPE前有内容: "${beforeDoctype}" (${beforeDoctype.length} 字符)`);
      }
    } else {
      console.log('❌ 未找到DOCTYPE声明');
    }
    
    return true;
  } catch (error) {
    console.error(`❌ 诊断失败: ${error.message}`);
    return false;
  }
}

/**
 * 修复单个HTML文件
 * @param {string} filePath - 文件路径
 */
function fixHTMLFile(filePath) {
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const fixedContent = forceFixDoctype(originalContent);
    
    if (originalContent !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ 修复完成: ${path.relative(process.cwd(), filePath)}`);
      return true;
    } else {
      console.log(`ℹ️  无需修复: ${path.relative(process.cwd(), filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}: ${error.message}`);
    return false;
  }
}

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
 * 主函数
 */
function main() {
  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    console.log('❌ public目录不存在，请先运行 hexo generate');
    return;
  }
  
  console.log('🚀 开始强力DOCTYPE修复...');
  
  const htmlFiles = findHTMLFiles(publicDir);
  
  if (htmlFiles.length === 0) {
    console.log('❌ 未找到HTML文件');
    return;
  }
  
  console.log(`🔍 找到 ${htmlFiles.length} 个HTML文件`);
  
  // 先诊断主要文件
  const indexFile = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    diagnoseHTML(indexFile);
  }
  
  // 修复所有文件
  let fixedCount = 0;
  htmlFiles.forEach(file => {
    if (fixHTMLFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 DOCTYPE强力修复完成！`);
  console.log(`📊 修复了 ${fixedCount} 个文件`);
  console.log(`💡 现在所有HTML文件都应该有正确的DOCTYPE声明`);
  
  // 再次诊断主要文件
  if (fs.existsSync(indexFile)) {
    console.log('\n🔍 修复后诊断:');
    diagnoseHTML(indexFile);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  forceFixDoctype,
  diagnoseHTML,
  fixHTMLFile,
  main
};

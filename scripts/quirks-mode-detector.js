/**
 * 怪异模式问题检测器
 * 全面检测可能导致怪异模式的问题
 */

const fs = require('fs');
const path = require('path');

/**
 * 检测可能导致怪异模式的问题
 * @param {string} html - HTML内容
 * @param {string} filePath - 文件路径
 */
function detectQuirksModeIssues(html, filePath) {
  const issues = [];
  const fileName = path.relative(process.cwd(), filePath);
  
  console.log(`\n🔍 检测文件: ${fileName}`);
  
  // 1. 检查BOM
  if (html.charCodeAt(0) === 0xFEFF) {
    issues.push('❌ 发现BOM字符 - 可能导致怪异模式');
  }
  
  // 2. 检查DOCTYPE前的内容
  const doctypeMatch = html.match(/<!DOCTYPE\s+html[^>]*>/i);
  if (doctypeMatch) {
    const doctypeIndex = html.indexOf(doctypeMatch[0]);
    if (doctypeIndex > 0) {
      const beforeDoctype = html.slice(0, doctypeIndex);
      const trimmedBefore = beforeDoctype.trim();
      
      if (trimmedBefore.length > 0) {
        issues.push(`❌ DOCTYPE前有非空白内容: "${trimmedBefore}" - 这会导致怪异模式`);
      } else if (beforeDoctype.length > 0) {
        issues.push(`⚠️  DOCTYPE前有空白字符 (${beforeDoctype.length}个) - 可能导致问题`);
      }
    }
    console.log(`✅ DOCTYPE声明: "${doctypeMatch[0]}" (位置: ${doctypeIndex})`);
  } else {
    issues.push('❌ 缺少DOCTYPE声明 - 会导致怪异模式');
  }
  
  // 3. 检查XML声明
  if (html.includes('<?xml')) {
    const xmlMatch = html.match(/<\?xml[^>]*\?>/i);
    if (xmlMatch) {
      issues.push(`❌ 发现XML声明: "${xmlMatch[0]}" - 在HTML5中会导致怪异模式`);
    }
  }
  
  // 4. 检查HTML标签
  const htmlMatch = html.match(/<html[^>]*>/i);
  if (htmlMatch) {
    console.log(`✅ HTML标签: "${htmlMatch[0]}"`);
  } else {
    issues.push('❌ 缺少HTML标签');
  }
  
  // 5. 检查meta charset
  const charsetMatch = html.match(/<meta[^>]*charset[^>]*>/i);
  if (charsetMatch) {
    console.log(`✅ 字符集声明: "${charsetMatch[0]}"`);
  } else {
    issues.push('⚠️  缺少字符集声明 - 可能影响渲染');
  }
  
  // 6. 检查文件编码
  try {
    const buffer = fs.readFileSync(filePath);
    const hasUTF8BOM = buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF;
    if (hasUTF8BOM) {
      issues.push('❌ 文件有UTF-8 BOM - 会导致怪异模式');
    }
  } catch (error) {
    console.log(`⚠️  无法检查文件编码: ${error.message}`);
  }
  
  // 7. 显示前100个字符的详细信息
  const first100 = html.slice(0, 100);
  console.log(`📄 前100个字符: "${first100}"`);
  
  // 8. 显示字符编码信息
  const firstChars = [];
  for (let i = 0; i < Math.min(20, html.length); i++) {
    const char = html[i];
    const code = html.charCodeAt(i);
    firstChars.push(`${char === '\n' ? '\\n' : char === '\r' ? '\\r' : char === '\t' ? '\\t' : char}(${code})`);
  }
  console.log(`🔤 前20个字符编码: ${firstChars.join(' ')}`);
  
  // 显示问题总结
  if (issues.length === 0) {
    console.log('✅ 未发现怪异模式问题');
  } else {
    console.log(`❌ 发现 ${issues.length} 个问题:`);
    issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  return issues;
}

/**
 * 修复检测到的问题
 * @param {string} html - 原始HTML
 * @returns {string} - 修复后的HTML
 */
function fixQuirksModeIssues(html) {
  let fixed = html;
  
  // 1. 移除BOM
  fixed = fixed.replace(/^\uFEFF/, '');
  
  // 2. 移除UTF-8 BOM字节
  if (fixed.charCodeAt(0) === 0xEF && fixed.charCodeAt(1) === 0xBB && fixed.charCodeAt(2) === 0xBF) {
    fixed = fixed.slice(3);
  }
  
  // 3. 移除XML声明
  fixed = fixed.replace(/<\?xml[^>]*\?>\s*/gi, '');
  
  // 4. 移除DOCTYPE前的所有内容
  const doctypeMatch = fixed.match(/<!DOCTYPE\s+html[^>]*>/i);
  if (doctypeMatch) {
    const doctypeIndex = fixed.indexOf(doctypeMatch[0]);
    if (doctypeIndex > 0) {
      fixed = fixed.slice(doctypeIndex);
    }
  }
  
  // 5. 确保DOCTYPE在最开头
  if (!fixed.startsWith('<!DOCTYPE html>')) {
    // 移除现有的DOCTYPE
    fixed = fixed.replace(/<!DOCTYPE\s+html[^>]*>/i, '');
    // 移除开头空白
    fixed = fixed.replace(/^[\s\r\n\t]*/, '');
    // 添加标准DOCTYPE
    fixed = '<!DOCTYPE html>\n' + fixed;
  }
  
  return fixed;
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
  
  console.log('🚀 开始怪异模式问题检测...');
  
  // 检查主要文件
  const indexFile = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, 'utf8');
    const issues = detectQuirksModeIssues(content, indexFile);
    
    if (issues.length > 0) {
      console.log('\n🔧 尝试修复问题...');
      const fixed = fixQuirksModeIssues(content);
      
      if (fixed !== content) {
        fs.writeFileSync(indexFile, fixed, 'utf8');
        console.log('✅ 修复完成，重新检测...');
        
        const newContent = fs.readFileSync(indexFile, 'utf8');
        detectQuirksModeIssues(newContent, indexFile);
      }
    }
  }
  
  console.log('\n🎉 怪异模式检测完成！');
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  detectQuirksModeIssues,
  fixQuirksModeIssues,
  main
};

// Giscus 配置检查脚本
// 在浏览器控制台中运行此脚本来检查 giscus 配置

function checkGiscusConfig() {
  console.log("=== Giscus 配置检查 ===");
  
  // 检查 giscus 脚本是否已加载
  const giscusScript = document.querySelector('script[src*="giscus.app/client.js"]');
  if (giscusScript) {
    console.log("✓ Giscus 脚本已加载");
  } else {
    console.log("✗ Giscus 脚本未加载");
  }
  
  // 检查 giscus 容器是否存在
  const giscusContainer = document.getElementById('giscus-wrap');
  if (giscusContainer) {
    console.log("✓ Giscus 容器已找到");
    
    // 检查容器中是否有 iframe
    const giscusIframe = giscusContainer.querySelector('iframe');
    if (giscusIframe) {
      console.log("✓ Giscus iframe 已创建");
      console.log("iframe src:", giscusIframe.src);
    } else {
      console.log("✗ Giscus iframe 未创建");
    }
  } else {
    console.log("✗ Giscus 容器未找到");
  }
  
  // 检查页面是否有评论相关的错误
  const errors = [];
  if (window.giscus) {
    console.log("✓ Giscus 全局对象已定义");
  } else {
    errors.push("Giscus 全局对象未定义");
  }
  
  // 检查主题切换函数
  if (window.anzhiyu && window.anzhiyu.changeGiscusTheme) {
    console.log("✓ Giscus 主题切换函数已注册");
  } else {
    console.log("✗ Giscus 主题切换函数未注册");
  }
  
  if (errors.length > 0) {
    console.error("发现以下错误:");
    errors.forEach(error => console.error("- " + error));
  } else {
    console.log("✓ 所有检查通过");
  }
  
  console.log("=== 检查完成 ===");
}

// 运行检查
checkGiscusConfig();
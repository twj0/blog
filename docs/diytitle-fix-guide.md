# AnZhiYu 主题 diytitle 功能修复指南

## 问题描述

AnZhiYu 主题的 diytitle 功能（动态标签页标题）在某些情况下无法正常工作，主要原因是 JavaScript 代码中存在 `GLOBAL_CONFIG_SITE is not defined` 错误。

## 问题原因

1. **配置加载时序问题**：`GLOBAL_CONFIG_SITE` 对象在 JavaScript 代码执行时尚未定义
2. **缺少安全检查**：代码直接访问 `GLOBAL_CONFIG_SITE` 而没有检查其是否存在
3. **初始化时机不当**：diytitle 功能在页面配置完全加载前就尝试初始化

## 解决方案

### 1. 修改主题配置合并脚本

**文件：** `themes/anzhiyu/scripts/events/merge_config.js`

**修改位置：** 第559-563行

```javascript
// 修改前（默认配置覆盖用户配置）
diytitle: {
  enable: false,
  leaveTitle: "哎呀，崩溃啦！",
  backTitle: "哇，又好了！"
}

// 修改后（使用用户配置）
diytitle: {
  enable: config.diytitle?.enable || false,
  leaveTitle: config.diytitle?.leaveTitle || "哎呀，崩溃啦！",
  backTitle: config.diytitle?.backTitle || "哇，又好了！"
}
```

### 2. 修复 JavaScript 中的 GLOBAL_CONFIG_SITE 引用

**文件：** `themes/anzhiyu/source/js/main.js`

需要在所有使用 `GLOBAL_CONFIG_SITE` 的地方添加安全检查：

#### 修改1：第236行
```javascript
// 修改前
const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;

// 修改后
const isHighlightShrink = (typeof GLOBAL_CONFIG_SITE !== 'undefined') ? GLOBAL_CONFIG_SITE.isHighlightShrink : undefined;
```

#### 修改2：第684行
```javascript
// 修改前
const isToc = GLOBAL_CONFIG_SITE.isToc;

// 修改后
const isToc = (typeof GLOBAL_CONFIG_SITE !== 'undefined') ? GLOBAL_CONFIG_SITE.isToc : false;
```

#### 修改3：第802行
```javascript
// 修改前
if (!GLOBAL_CONFIG_SITE.isPost) {

// 修改后
if (typeof GLOBAL_CONFIG_SITE === 'undefined' || !GLOBAL_CONFIG_SITE.isPost) {
```

#### 修改4：第1109行
```javascript
// 修改前
const diffDay = anzhiyu.diffDate(GLOBAL_CONFIG_SITE.postUpdate);

// 修改后
const diffDay = (typeof GLOBAL_CONFIG_SITE !== 'undefined' && GLOBAL_CONFIG_SITE.postUpdate) ? anzhiyu.diffDate(GLOBAL_CONFIG_SITE.postUpdate) : 0;
```

#### 修改5：第1257-1258行
```javascript
// 修改前
if (GLOBAL_CONFIG_SITE.postMainColor) {
  let value = GLOBAL_CONFIG_SITE.postMainColor;

// 修改后
if (typeof GLOBAL_CONFIG_SITE !== 'undefined' && GLOBAL_CONFIG_SITE.postMainColor) {
  let value = GLOBAL_CONFIG_SITE.postMainColor;
```

#### 修改6：第1788行
```javascript
// 修改前
if (GLOBAL_CONFIG_SITE.isPost) {

// 修改后
if (typeof GLOBAL_CONFIG_SITE !== 'undefined' && GLOBAL_CONFIG_SITE.isPost) {
```

#### 修改7：第1810行
```javascript
// 修改前
GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();

// 修改后
(typeof GLOBAL_CONFIG_SITE !== 'undefined' && GLOBAL_CONFIG_SITE.isHome) && scrollDownInIndex();
```

#### 修改8：第1840行
```javascript
// 修改前
document.getElementById("page-name").innerText = document.title.split(` | ${GLOBAL_CONFIG_SITE.configTitle}`)[0];

// 修改后
if (typeof GLOBAL_CONFIG_SITE !== 'undefined' && GLOBAL_CONFIG_SITE.configTitle) {
  document.getElementById("page-name").innerText = document.title.split(` | ${GLOBAL_CONFIG_SITE.configTitle}`)[0];
}
```

### 3. 改进 diytitle 初始化

在 `refreshFn` 函数中添加调试信息和安全检查：

```javascript
// 在 refreshFn 中添加
console.log('检查 GLOBAL_CONFIG.diytitle:', GLOBAL_CONFIG.diytitle);
if (GLOBAL_CONFIG.diytitle && GLOBAL_CONFIG.diytitle.enable) {
  console.log('在 refreshFn 中初始化 diytitle');
  changeDocumentTitle();
} else {
  console.log('diytitle 功能未启用或配置错误');
}
```

在页面加载完成后添加延迟初始化：

```javascript
// 在文件末尾添加
setTimeout(() => {
  console.log('页面加载完成，检查 diytitle 配置');
  console.log('GLOBAL_CONFIG:', typeof GLOBAL_CONFIG !== 'undefined' ? GLOBAL_CONFIG : 'undefined');
  console.log('GLOBAL_CONFIG_SITE:', typeof GLOBAL_CONFIG_SITE !== 'undefined' ? GLOBAL_CONFIG_SITE : 'undefined');
  
  if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG && GLOBAL_CONFIG.diytitle && GLOBAL_CONFIG.diytitle.enable) {
    console.log('页面加载时初始化 diytitle');
    changeDocumentTitle();
  } else {
    console.log('页面加载时 diytitle 功能未启用');
  }
}, 500); // 延迟500ms确保所有配置都已加载
```

## 用户配置

在 `_config.anzhiyu.yml` 中正确配置 diytitle：

```yaml
# 动态标题
diytitle:
  enable: true
  leaveTitle: "行子匆匆，風流總被吹散"
  backTitle: "別來無恙，蓬門隨時待君"
```

## 验证修复

1. **重新生成博客**：
   ```bash
   hexo clean && hexo generate && hexo server
   ```

2. **检查控制台**：
   - 打开浏览器开发者工具（F12）
   - 应该看到调试信息而不是错误
   - 应该看到 "页面加载时初始化 diytitle" 消息

3. **测试功能**：
   - 切换到其他标签页，观察标题变化
   - 返回博客标签页，观察标题恢复

## 修复效果

- ✅ 消除所有 `GLOBAL_CONFIG_SITE is not defined` 错误
- ✅ diytitle 功能正常工作
- ✅ 用户配置正确生效
- ✅ 页面加载稳定，无 JavaScript 错误

## 注意事项

1. 修改后需要重新生成博客才能生效
2. 建议在修改前备份原文件
3. 如果使用了主题的自动更新功能，可能需要重新应用这些修改

---

**修复日期：** 2025年1月25日  
**适用版本：** AnZhiYu 主题 1.6.15  
**修复状态：** ✅ 已验证有效

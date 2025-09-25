# 博客项目文档

## 项目概述

这是一个基于 Hexo 和 AnZhiYu 主题的个人博客项目。

## 文档目录

### 修复指南

- [diytitle 功能修复指南](./diytitle-fix-guide.md) - 修复 AnZhiYu 主题动态标题功能的完整指南

## 最近更新

### 2025年1月25日 - diytitle 功能修复

**问题：** AnZhiYu 主题的 diytitle（动态标签页标题）功能无法正常工作

**解决方案：**
1. 修复了 `GLOBAL_CONFIG_SITE is not defined` 错误
2. 添加了安全检查机制
3. 修正了配置合并逻辑
4. 实现了延迟初始化
5. 增加了详细的调试信息

**修复效果：**
- ✅ 消除所有 JavaScript 错误
- ✅ diytitle 功能完全正常
- ✅ 用户配置正确生效
- ✅ 页面加载稳定

**提交记录：** `ebb7dae` - fix: 修复 AnZhiYu 主题 diytitle 功能

## 功能特性

### 已实现功能

- ✅ **动态标题 (diytitle)**：切换标签页时显示自定义消息
  - 离开页面：显示 "行子匆匆，風流總被吹散"
  - 返回页面：显示 "別來無恙，蓬門隨時待君"
  - 2秒后恢复正常标题

### 配置示例

```yaml
# _config.anzhiyu.yml
diytitle:
  enable: true
  leaveTitle: "行子匆匆，風流總被吹散"
  backTitle: "別來無恙，蓬門隨時待君"
```

## 开发环境

- **框架：** Hexo 静态博客生成器
- **主题：** AnZhiYu v1.6.15
- **部署：** Cloudflare Pages
- **版本控制：** Git + GitHub

## 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/twj0/blog.git
   cd blog
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **本地预览**
   ```bash
   hexo clean && hexo generate && hexo server
   ```

4. **访问博客**
   ```
   http://localhost:4000/blog/
   ```

## 部署

项目配置了自动部署到 Cloudflare Pages：
- **生产地址：** https://blog.ttwj.qzz.io
- **自动部署：** 推送到 main 分支时自动触发

## 贡献

如果您发现问题或有改进建议，欢迎：
1. 提交 Issue
2. 创建 Pull Request
3. 参考现有的修复文档

## 许可证

本项目遵循 MIT 许可证。

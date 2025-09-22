# 🔧 故障排除指南

本指南帮助您解决博客搭建和使用过程中可能遇到的常见问题。

## 🚨 部署相关问题

### 1. GitHub Actions 部署失败

**症状**: Actions 标签页显示红色 ❌，部署工作流失败

**可能原因及解决方案**:

#### 权限问题
```bash
# 错误信息: Permission denied
```
**解决方案**:
1. 进入仓库 Settings > Actions > General
2. 在 "Workflow permissions" 部分选择 "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"
4. 保存设置并重新运行工作流

#### 配置文件错误
```bash
# 错误信息: YAML parse error
```
**解决方案**:
1. 检查 `_config.yml` 文件格式
2. 使用在线 YAML 验证器检查语法
3. 确保缩进使用空格而非制表符
4. 运行本地检查：`npm run check`

#### 依赖安装失败
```bash
# 错误信息: npm install failed
```
**解决方案**:
1. 检查 `package.json` 文件是否完整
2. 删除 `package-lock.json` 并重新提交
3. 在本地运行 `npm install` 测试

### 2. GitHub Pages 无法访问

**症状**: 博客地址返回 404 错误

**解决方案**:
1. **检查 Pages 设置**
   - 进入 Settings > Pages
   - 确认 Source 设置为 "GitHub Actions"
   - 确认分支设置正确

2. **检查部署状态**
   - 查看 Actions 是否成功运行
   - 确认 `gh-pages` 分支已创建并有内容

3. **等待生效**
   - GitHub Pages 可能需要几分钟生效
   - 清除浏览器缓存重试

### 3. 自定义域名问题

**症状**: 自定义域名无法访问或显示错误

**解决方案**:
1. **检查 CNAME 文件**
   ```bash
   # 在 source/ 目录下创建 CNAME 文件
   echo "yourdomain.com" > source/CNAME
   ```

2. **检查 DNS 设置**
   ```bash
   # 添加 CNAME 记录
   blog.yourdomain.com -> yourusername.github.io
   ```

3. **等待 DNS 生效**
   - DNS 更改可能需要24-48小时生效
   - 使用 `nslookup` 或在线工具检查 DNS

## 🎨 主题和样式问题

### 1. 主题样式异常

**症状**: 网站样式混乱，布局错误

**解决方案**:
1. **清理缓存**
   ```bash
   npx hexo clean
   npx hexo generate
   ```

2. **检查主题配置**
   - 确认 `themes/anzhiyu/_config.yml` 格式正确
   - 对比模板文件检查遗漏配置

3. **检查资源文件**
   - 确认主题文件完整
   - 检查图片链接是否有效

### 2. 图片无法显示

**症状**: 文章中的图片显示为破损图标

**解决方案**:
1. **检查图片链接**
   ```markdown
   # 使用绝对链接
   ![图片描述](https://example.com/image.jpg)
   
   # 或使用相对链接
   ![图片描述](/images/image.jpg)
   ```

2. **图片路径配置**
   ```yaml
   # _config.yml
   post_asset_folder: true
   ```

3. **使用图床服务**
   - 推荐使用 GitHub、Imgur 等图床
   - 确保图片链接可公开访问

### 3. 字体或图标异常

**症状**: 网站字体显示异常或图标无法加载

**解决方案**:
1. **检查 CDN 配置**
   ```yaml
   # themes/anzhiyu/_config.yml
   CDN:
     internal_provider: local
     third_party_provider: cbd
   ```

2. **网络连接问题**
   - 检查是否能访问外部 CDN
   - 考虑使用本地资源

## 💬 评论系统问题

### 1. 评论无法显示

**症状**: 评论区域空白或显示错误

**解决方案**:
1. **检查配置信息**
   ```yaml
   # themes/anzhiyu/_config.yml
   comments:
     use: valine  # 确认评论系统类型
   
   valine:
     appId: your_app_id      # 检查ID是否正确
     appKey: your_app_key    # 检查Key是否正确
   ```

2. **检查第三方服务**
   - 确认 LeanCloud/Waline 等服务正常
   - 检查服务配置和域名白名单

3. **浏览器控制台检查**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页的错误信息

### 2. Giscus 评论配置

**症状**: Giscus 评论系统无法加载

**解决方案**:
1. **检查仓库设置**
   - 确认仓库是公开的
   - 启用 Discussions 功能

2. **获取正确的配置**
   - 访问 [giscus.app](https://giscus.app/)
   - 按步骤获取配置信息

## 🔍 搜索功能问题

### 1. 本地搜索无法使用

**症状**: 搜索框无反应或搜索结果为空

**解决方案**:
1. **安装搜索插件**
   ```bash
   npm install hexo-generator-search --save
   ```

2. **配置搜索功能**
   ```yaml
   # _config.yml
   search:
     path: search.xml
     field: post
     content: true
   ```

3. **重新生成**
   ```bash
   npx hexo clean
   npx hexo generate
   ```

## 📱 移动端问题

### 1. 移动端显示异常

**症状**: 在手机上浏览时布局错乱

**解决方案**:
1. **检查响应式设置**
   ```yaml
   # themes/anzhiyu/_config.yml
   mobile:
     enable: true
   ```

2. **清除缓存**
   - 清除浏览器缓存
   - 使用无痕模式测试

3. **测试不同设备**
   - 使用浏览器开发者工具模拟
   - 在实际设备上测试

## 🛠️ 本地开发问题

### 1. npm install 失败

**症状**: 依赖安装过程中出现错误

**解决方案**:
1. **清理缓存**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **使用国内镜像**
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

3. **检查 Node.js 版本**
   ```bash
   node --version  # 建议使用 Node.js 16+
   ```

### 2. hexo server 启动失败

**症状**: 本地服务器无法启动

**解决方案**:
1. **检查端口占用**
   ```bash
   # 使用其他端口
   npx hexo server -p 4001
   ```

2. **检查配置文件**
   ```bash
   # 运行配置检查
   npm run check
   ```

3. **重新安装依赖**
   ```bash
   rm -rf node_modules
   npm install
   ```

## 📊 性能优化问题

### 1. 网站加载速度慢

**解决方案**:
1. **优化图片**
   - 压缩图片大小
   - 使用 WebP 格式
   - 启用图片懒加载

2. **启用缓存**
   ```yaml
   # themes/anzhiyu/_config.yml
   lazyload:
     enable: true
   ```

3. **使用 CDN**
   ```yaml
   # themes/anzhiyu/_config.yml
   CDN:
     third_party_provider: cbd
   ```

## 🆘 获取帮助

如果以上解决方案都无法解决您的问题：

1. **检查日志**
   - 查看 GitHub Actions 的详细日志
   - 检查浏览器控制台错误信息

2. **搜索已知问题**
   - 查看项目的 [Issues](../../issues)
   - 搜索相关错误信息

3. **提交新问题**
   - [创建新 Issue](../../issues/new)
   - 提供详细的错误信息和复现步骤

4. **社区支持**
   - [Hexo 官方文档](https://hexo.io/docs/)
   - [AnZhiYu 主题文档](https://docs.anheyu.com/)

---

**记住**: 大多数问题都有解决方案，保持耐心，仔细检查配置！ 💪

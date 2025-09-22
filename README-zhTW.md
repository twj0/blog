# 🚀 個人部落格模板

[![Deploy Status](https://github.com/twj0/blog/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/twj0/blog/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

基於 **Hexo** + **AnZhiYu** 主題的個人部落格模板，支援 **GitHub Actions** 自動部署，讓您快速搭建屬於自己的個人部落格！

## 🌐 多語言文件

- [English](README.md)
- [简体中文](README-zhCN.md)
- [繁體中文](README-zhTW.md) (目前)
- [日本語](README-JP.md)
- [한국어](README-ko.md)

## ✨ 特色

- 🎨 **現代化設計** - 基於AnZhiYu主題，介面美觀大方
- 🚀 **自動部署** - GitHub Actions自動建置和部署
- 📱 **響應式佈局** - 完美適配桌面端和行動端
- 💬 **多評論系統** - 支援Valine、Waline、Giscus等
- 🔍 **搜尋功能** - 內建本地搜尋，快速查找內容
- 📊 **數據統計** - 支援多種網站分析工具
- 🌙 **深色模式** - 自動切換深色/淺色主題
- ⚡ **效能優化** - 圖片延遲載入、程式碼高亮等優化

## 🎯 快速開始

### 方法一：一鍵部署（推薦）

1. **Fork 此儲存庫**
   ```bash
   點擊右上角的 "Fork" 按鈕
   ```

2. **配置個人資訊**
   ```bash
   # 複製到本地
   git clone https://github.com/twj0/blog.git
   cd blog
   
   # 安裝相依性
   npm install
   
   # 執行配置精靈
   npm run setup
   ```

3. **啟用 GitHub Pages**
   - 進入儲存庫 Settings > Pages
   - Source 選擇 "GitHub Actions"
   - 儲存設定

4. **推送程式碼，自動部署**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. **存取您的部落格**
   ```
   https://yourusername.github.io/blog
   ```

### 方法二：手動配置

<details>
<summary>點擊展開手動配置步驟</summary>

1. **複製儲存庫**
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
   npm install
   ```

2. **配置基本資訊**
   
   複製配置模板：
   ```bash
   cp _config.template.yml _config.yml
   cp themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
   ```
   
   編輯 `_config.yml` 檔案，修改以下配置：
   ```yaml
   title: 您的部落格標題
   author: 您的姓名
   url: https://yourusername.github.io/your-blog-repo
   ```

3. **配置主題**
   
   編輯 `themes/anzhiyu/_config.yml`，自訂：
   - 頭像和社交連結
   - 選單導航
   - 評論系統
   - 網站樣式

4. **本地預覽**
   ```bash
   npm run server
   ```

5. **部署到GitHub Pages**
   ```bash
   npm run deploy
   ```

</details>

## 📝 寫作指南

### 建立新文章

```bash
# 建立新文章
npx hexo new "文章標題"

# 建立新頁面
npx hexo new page "頁面名稱"
```

### 文章格式

```markdown
---
title: 文章標題
date: 2025-01-01 12:00:00
tags: 
  - 標籤1
  - 標籤2
categories: 
  - 分類名
cover: 封面圖片URL
description: 文章描述
---

文章內容...
```

### 本地預覽

```bash
# 啟動本地伺服器
npm run server

# 清理快取後啟動
npm run dev

# 產生靜態檔案後預覽
npm run preview
```

## ⚙️ 配置說明

### 環境變數配置

在GitHub儲存庫的 Settings > Secrets and variables > Actions 中配置：

| 變數名 | 說明 | 範例 |
|--------|------|------|
| `SITE_TITLE` | 網站標題 | 我的個人部落格 |
| `SITE_SUBTITLE` | 網站副標題 | 記錄生活，分享技術 |
| `SITE_DESCRIPTION` | 網站描述 | 基於Hexo和AnZhiYu主題的個人部落格 |
| `AUTHOR_NAME` | 作者姓名 | 您的姓名 |
| `SITE_URL` | 網站地址 | https://username.github.io/repo |
| `SITE_ROOT` | 根路徑 | /repo/ |

### 評論系統配置

支援多種評論系統，在 Secrets 中配置相應參數：

- **Valine**: `VALINE_APP_ID`, `VALINE_APP_KEY`
- **Waline**: `WALINE_SERVER_URL`
- **Giscus**: `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`

詳細配置請參考：[配置檢查清單](docs/configuration-checklist.md)

## 🛠️ 進階功能

### 自訂網域

1. 在 `source/` 目錄下建立 `CNAME` 檔案
2. 檔案內容為您的網域，如：`blog.example.com`
3. 在網域DNS設定中新增CNAME記錄指向 `username.github.io`

### 新增外掛

```bash
# 安裝外掛
npm install hexo-plugin-name --save

# 在 _config.yml 中配置外掛
```

### 主題自訂

- 修改 `themes/anzhiyu/_config.yml` 配置檔案
- 在 `themes/anzhiyu/source/css/` 新增自訂樣式
- 詳細說明：[主題自訂指南](docs/theme-customization.md)

## 📚 文件

- [📋 配置檢查清單](docs/configuration-checklist.md)
- [🏗️ 專案結構說明](docs/project-structure.md)
- [🚀 快速開始指南](docs/quick-start.md)
- [🔧 故障排除指南](docs/troubleshooting.md)

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 本儲存庫
2. 建立特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案基於 [MIT](LICENSE) 授權條款開源。

## 🙏 致謝

- [Hexo](https://hexo.io/) - 快速、簡潔且高效的部落格框架
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - 簡潔美觀的Hexo主題
- [GitHub Pages](https://pages.github.com/) - 免費的靜態網站託管服務

## 📞 支援

如果這個專案對您有幫助，請給個 ⭐ Star 支持一下！

有問題？歡迎：
- 📧 [提交 Issue](../../issues)
- 💬 [參與討論](../../discussions)
- 📖 [查看文件](docs/)

---

**開始您的部落格之旅吧！** 🎉

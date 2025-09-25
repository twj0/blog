# 🚀 個人ブログテンプレート

[![Deploy Status](https://github.com/twj0/blog/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/twj0/blog/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Hexo** + **AnZhiYu** テーマをベースとした個人ブログテンプレートで、**GitHub Actions** による自動デプロイをサポートし、あなた専用の個人ブログを素早く構築できます！

## 🌐 多言語ドキュメント

- [English](README.md)
- [简体中文](README-zhCN.md)
- [繁體中文](README-zhTW.md)
- [日本語](README-JP.md) (現在)
- [한국어](README-ko.md)

## ✨ 特徴

- 🎨 **モダンなデザイン** - AnZhiYuテーマベースで美しく洗練されたインターフェース
- 🚀 **マルチプラットフォーム自動デプロイ** - GitHub PagesとCloudflare Pagesに同時デプロイ
- 🌐 **デュアルCDN加速** - グローバルアクセス最適化、複数のデプロイターゲット
- 📱 **レスポンシブレイアウト** - デスクトップとモバイルデバイスに完全対応
- 💬 **複数のコメントシステム** - Valine、Waline、Giscusなどをサポート
- 🔍 **検索機能** - 内蔵ローカル検索でコンテンツを素早く検索
- 📊 **データ統計** - 様々なウェブサイト分析ツールをサポート
- 🌙 **ダークモード** - ダーク/ライトテーマの自動切り替え
- ⚡ **パフォーマンス最適化** - 画像の遅延読み込み、コードハイライトなどの最適化
- 🔄 **コンテンツ同期** - すべてのプラットフォームでコンテンツが自動同期

## 🎯 クイックスタート

### 方法1：ワンクリックデプロイ（推奨）

1. **このリポジトリをフォーク**
   ```bash
   右上の "Fork" ボタンをクリック
   ```

2. **個人情報を設定**
   ```bash
   # ローカルにクローン
   git clone https://github.com/twj0/blog.git
   cd blog
   
   # 依存関係をインストール
   npm install
   
   # セットアップウィザードを実行
   npm run setup
   ```

3. **GitHub Pagesを有効化**
   - リポジトリの Settings > Pages に移動
   - Source で "GitHub Actions" を選択
   - 設定を保存

4. **コードをプッシュして自動デプロイ**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. **ブログにアクセス**
   ```
   https://yourusername.github.io/blog
   ```

### 方法2：手動設定

<details>
<summary>手動設定手順を展開</summary>

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
   npm install
   ```

2. **基本情報を設定**
   
   設定テンプレートをコピー：
   ```bash
   cp _config.template.yml _config.yml
   cp themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
   ```
   
   `_config.yml` ファイルを編集し、以下の設定を変更：
   ```yaml
   title: あなたのブログタイトル
   author: あなたの名前
   url: https://yourusername.github.io/your-blog-repo
   ```

3. **テーマを設定**
   
   `themes/anzhiyu/_config.yml` を編集してカスタマイズ：
   - アバターとソーシャルリンク
   - メニューナビゲーション
   - コメントシステム
   - ウェブサイトスタイル

4. **ローカルプレビュー**
   ```bash
   npm run server
   ```

5. **GitHub Pagesにデプロイ**
   ```bash
   npm run deploy
   ```

</details>

## 📝 執筆ガイド

### 新しい記事を作成

```bash
# 新しい記事を作成
npx hexo new "記事タイトル"

# 新しいページを作成
npx hexo new page "ページ名"
```

### 記事フォーマット

```markdown
---
title: 記事タイトル
date: 2025-01-01 12:00:00
tags: 
  - タグ1
  - タグ2
categories: 
  - カテゴリ名
cover: カバー画像URL
description: 記事の説明
---

記事の内容...
```

### ローカルプレビュー

```bash
# ローカルサーバーを起動
npm run server

# キャッシュをクリアして起動
npm run dev

# 静的ファイルを生成してプレビュー
npm run preview
```

## ⚙️ 設定

### 環境変数の設定

GitHubリポジトリの Settings > Secrets and variables > Actions で設定：

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `SITE_TITLE` | ウェブサイトタイトル | 私の個人ブログ |
| `SITE_SUBTITLE` | ウェブサイトサブタイトル | 生活を記録し、技術を共有 |
| `SITE_DESCRIPTION` | ウェブサイト説明 | HexoとAnZhiYuテーマベースの個人ブログ |
| `AUTHOR_NAME` | 著者名 | あなたの名前 |
| `SITE_URL` | ウェブサイトURL | https://username.github.io/repo |
| `SITE_ROOT` | ルートパス | /repo/ |

### コメントシステムの設定

複数のコメントシステムをサポート、Secretsで対応するパラメータを設定：

- **Valine**: `VALINE_APP_ID`, `VALINE_APP_KEY`
- **Waline**: `WALINE_SERVER_URL`
- **Giscus**: `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`

詳細な設定については：[設定チェックリスト](docs/configuration-checklist.md)

## 🛠️ 高度な機能

### カスタムドメイン

1. `source/` ディレクトリに `CNAME` ファイルを作成
2. ファイル内容をあなたのドメインに設定、例：`blog.example.com`
3. ドメインのDNS設定でCNAMEレコードを `username.github.io` に追加

### プラグインの追加

```bash
# プラグインをインストール
npm install hexo-plugin-name --save

# _config.yml でプラグインを設定
```

### テーマのカスタマイズ

- `themes/anzhiyu/_config.yml` 設定ファイルを変更
- `themes/anzhiyu/source/css/` にカスタムスタイルを追加
- 詳細な説明：[テーマカスタマイズガイド](docs/theme-customization.md)

## 📚 ドキュメント

- [📋 設定チェックリスト](docs/configuration-checklist.md)
- [🏗️ プロジェクト構造](docs/project-structure.md)
- [🚀 クイックスタートガイド](docs/quick-start.md)
- [🔧 トラブルシューティングガイド](docs/troubleshooting.md)

## 🤝 貢献

IssueとPull Requestを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを開く

## 📄 ライセンス

このプロジェクトは [MIT](LICENSE) ライセンスの下でオープンソースです。

## 🙏 謝辞

- [Hexo](https://hexo.io/) - 高速、シンプル、強力なブログフレームワーク
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - クリーンで美しいHexoテーマ
- [GitHub Pages](https://pages.github.com/) - 無料の静的ウェブサイトホスティングサービス

## 📞 サポート

このプロジェクトが役に立った場合は、⭐ Starをお願いします！

質問がありますか？お気軽に：
- 📧 [Issueを提出](../../issues)
- 💬 [ディスカッションに参加](../../discussions)
- 📖 [ドキュメントを表示](docs/)

---

**ブログの旅を始めましょう！** 🎉

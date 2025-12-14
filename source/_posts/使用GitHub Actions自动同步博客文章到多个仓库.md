---
title: 使用 GitHub Actions 自动同步博客文章到多个仓库
date: 2025-12-14 20:30:00
tags:
  - GitHub Actions
  - 自动化
  - 博客管理
  - Git
  - SSH
  - 自动化运维
categories:
  - Tech
cover: https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800
description: 详细介绍如何使用 GitHub Actions 实现博客文章自动同步到多个仓库，包括 SSH 密钥配置、工作流编写和完整实现步骤
author: glm4.6
---

# 使用 GitHub Actions + SSH 密钥 自动同步博客文章到多个仓库 🚀

在日常博客维护中，我们可能需要将文章同步到多个仓库，比如主仓库和小号仓库。手动同步既繁琐又容易出错，本文将介绍如何使用 GitHub Actions 实现自动化同步，让你的博客管理更加高效。

## 📋 实现思路

这个自动化工作流的核心思路非常简单：

1.  **触发机制**：当主仓库的 `source/_posts` 目录下有任何 Markdown 文件被推送时，自动触发工作流
2.  **安全认证**：使用 SSH 部署密钥来安全地授权，让 GitHub Action 有权限向目标仓库写入内容
3.  **同步执行**：
    *   检出主仓库的代码
    *   克隆目标仓库到临时目录
    *   使用 `rsync` 命令同步所有 `.md` 文件
    *   检测变更并自动提交推送

## 🔧 第一步：生成 SSH 密钥

为了安全地让主仓库的 Action 能够操作目标仓库，我们需要创建一对专用的 SSH 密钥。

1.  在本地电脑上打开终端（或 Git Bash）

2.  运行以下命令生成新的 SSH 密钥（请使用你自己的邮箱）：

    ```bash
    ssh-keygen -t ed25519 -C "github-action-for-blog-sync" -f ~/.ssh/blog-sync-key
    ```
    
    > 💡 **提示**：当提示输入密码时，直接按回车键跳过，不需要设置密码
    
    这将生成两个文件：
    - `~/.ssh/blog-sync-key` (私钥)
    - `~/.ssh/blog-sync-key.pub` (公钥)

## 🔐 第二步：配置目标仓库

1.  复制刚刚生成的**公钥**文件内容：
    ```bash
    cat ~/.ssh/blog-sync-key.pub
    ```

2.  打开你的**目标仓库**页面（小号仓库）

3.  进入 `Settings` -> `Deploy keys`

4.  点击 `Add deploy key` 并填写：
    - **Title**：`Blog Sync Action Key`（或其他描述性名称）
    - **Key**：粘贴刚才复制的公钥内容
    - **⚠️ 重要**：勾选 `Allow write access`，这样 Action 才有权限推送代码

5.  点击 `Add key` 保存配置

## 🗝️ 第三步：配置主仓库密钥

1.  复制刚刚生成的**私钥**文件内容：
    ```bash
    cat ~/.ssh/blog-sync-key
    ```

2.  打开你的**主仓库**页面

3.  进入 `Settings` -> `Secrets and variables` -> `Actions`

4.  点击 `New repository secret` 并填写：
    - **Name**: `SYNC_SSH_PRIVATE_KEY`（这个名字将在工作流文件中引用）
    - **Secret**: 粘贴刚才复制的私钥内容

5.  点击 `Add secret` 保存配置

## 📝 第四步：创建 GitHub Action 工作流

1.  在主仓库中创建目录 `.github/workflows`（如果不存在）

2.  在该目录下创建新文件 `sync-posts.yml`

3.  将以下完整的 YAML 代码粘贴到文件中：

```yaml
# .github/workflows/sync-posts.yml

name: Sync Blog Posts to Secondary Repo

# 触发条件：当 source/_posts 目录下的 .md 文件有 push 时
on:
  push:
    branches:
      - main # 假设你的主分支是 main
    paths:
      - 'source/_posts/*.md'

# 允许手动触发，方便调试
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write # 允许检出代码

    steps:
      # 1. 检出主仓库代码
      - name: Checkout source repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 获取完整的提交历史，以便获取提交信息

      # 2. 设置 SSH，用于访问目标仓库
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SYNC_SSH_PRIVATE_KEY }} # 引用我们刚刚创建的 Secret

      # 3. 执行同步逻辑
      - name: Sync posts to destination repository
        run: |
          # --- 请在这里修改你的配置 ---
          # 目标仓库的 SSH 地址 (git@github.com:用户名/仓库名.git)
          DEST_REPO="git@github.com:your-username/your-secondary-repo.git"
          # 目标仓库的目标分支
          DEST_BRANCH="main"
          # 目标仓库中存放文章的目录 (如果放在根目录，则为 "")
          DEST_DIR="posts" 
          # -----------------------------

          # 源目录路径
          SOURCE_DIR="${GITHUB_WORKSPACE}/source/_posts"

          # 临时目录用于克隆目标仓库
          TEMP_DIR="/tmp/dest-repo"

          echo "Syncing from ${SOURCE_DIR} to ${DEST_REPO}:${DEST_DIR}"

          # 克隆目标仓库
          git clone --branch "${DEST_BRANCH}" "${DEST_REPO}" "${TEMP_DIR}"

          # 进入目标仓库目录
          cd "${TEMP_DIR}"

          # 如果目标目录不存在，则创建它
          if [ ! -d "${DEST_DIR}" ]; then
            mkdir -p "${DEST_DIR}"
          fi

          # 使用 rsync 同步文件
          # -a: 归档模式，保持文件属性
          # -v: 显示详细信息
          # --delete: 删除目标目录中源目录没有的文件，保持镜像同步
          rsync -av --delete "${SOURCE_DIR}/" "./${DEST_DIR}/"

          # 检查是否有文件变更
          if [ -n "$(git status --porcelain)" ]; then
            echo "Changes detected, preparing to commit..."
            
            # 配置 Git 用户信息
            git config user.name "github-actions[bot]"
            git config user.email "github-actions[bot]@users.noreply.github.com"

            # 添加所有变更
            git add .

            # 提交变更，并引用主仓库的提交哈希
            git commit -m "chore: auto-sync from main repo @ ${GITHUB_SHA}"

            # 推送到目标仓库
            git push origin "${DEST_BRANCH}"
            echo "Sync and push completed successfully."
          else
            echo "No changes to sync."
          fi
```

## ⚙️ 第五步：配置并激活工作流

在上面的 YAML 代码中，找到配置部分，**务必修改**以下三个变量：

-   `DEST_REPO`: 替换为你的**目标仓库的 SSH 地址**，格式为 `git@github.com:你的用户名/你的仓库名.git`
-   `DEST_BRANCH`: 目标仓库的目标分支名（通常是 `main` 或 `master`）
-   `DEST_DIR`: 希望将文章同步到目标仓库的哪个子目录。如果直接放在根目录，设置为 `""`

修改完成后，保存并提交工作流文件：

```bash
git add .github/workflows/sync-posts.yml
git commit -m "feat: add workflow to sync blog posts"
git push origin main
```

## 🎯 工作原理和注意事项

### 核心机制

-   **自动触发**：当你推送任何修改到 `source/_posts` 目录下的 `.md` 文件时，Action 会自动运行
-   **镜像同步**：`rsync --delete` 命令确保目标仓库与主仓库完全一致。主仓库删除的文件也会在目标仓库中删除
-   **可追溯性**：提交信息包含主仓库的提交哈希 (`${GITHUB_SHA}`)，方便追溯同步来源
-   **调试支持**：添加了 `workflow_dispatch`，可在 GitHub 仓库的 `Actions` 页面手动触发工作流

### 最佳实践

1.  **权限最小化**：仅授予必要的写入权限，避免过度授权
2.  **定期更新**：定期检查和更新 Actions 版本，确保安全性
3.  **监控日志**：定期检查工作流运行日志，及时发现和解决问题
4.  **备份策略**：虽然同步是自动的，但仍建议定期备份重要内容

## 🎉 总结

通过以上步骤，你已经成功配置了博客文章的自动同步功能！现在，每当你更新博客文章并推送到主仓库，GitHub Action 就会自动将所有文章同步到你的目标仓库。

这种自动化方案不仅提高了工作效率，还减少了人为错误的可能性，让你能够更专注于内容创作而非繁琐的同步工作。

---

> 💡 **扩展思考**：你还可以基于这个工作流进行更多扩展，比如：
> - 同步到多个目标仓库
> - 添加通知机制（如邮件、Slack 等）
> - 集成内容检查和格式化工具
> - 实现更复杂的分支管理策略
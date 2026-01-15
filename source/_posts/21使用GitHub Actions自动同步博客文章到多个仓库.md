---
title: 使用 GitHub Actions Matrix 策略自动同步博客文章到多个仓库
date: 2025-12-14 20:30:00
tags:
  - GitHub Actions
  - 自动化
  - 博客管理
  - Git
  - SSH
  - 自动化运维
  - Matrix策略
categories:
  - Tech
cover: https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800
description: 详细介绍如何使用 GitHub Actions Matrix 策略实现博客文章自动同步到多个仓库，包括 SSH 密钥配置、多仓库工作流编写和完整实现步骤
author: glm4.6
---

# 使用 GitHub Actions + Matrix 策略 自动同步博客文章到多个仓库 🚀

在日常博客维护中，我们可能需要将文章同步到多个仓库，比如主仓库和小号仓库。手动同步既繁琐又容易出错，本文将介绍如何使用 GitHub Actions 的 Matrix 策略实现自动化同步到多个仓库，让你的博客管理更加高效。

## 📋 实现思路

这个自动化工作流使用 Matrix 策略，可以同时同步到多个仓库，核心思路如下：

1.  **触发机制**：当主仓库的 `source/_posts` 目录下有任何 Markdown 文件被推送时，自动触发工作流
2.  **Matrix 策略**：使用 GitHub Actions 的 Matrix 策略，为每个目标仓库创建并行的同步任务
3.  **安全认证**：使用 SSH 部署密钥来安全地授权，让 GitHub Action 有权限向所有目标仓库写入内容
4.  **并行同步执行**：
    *   检出主仓库的代码
    *   为每个目标仓库并行执行同步任务
    *   克隆目标仓库到临时目录
    *   使用 `rsync` 命令同步所有 `.md` 文件
    *   检测变更并自动提交推送
5.  **容错机制**：设置 `fail-fast: false`，确保单个仓库同步失败不会影响其他仓库的同步任务

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
# .github/workflows/sync-posts-matrix.yml

name: Sync Blog Posts (Matrix)

on:
  push:
    branches:
      - main
    paths:
      - 'source/_posts/*.md'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    # --- 核心修改：Matrix 策略配置 ---
    strategy:
      # 如果一个仓库同步失败，不要取消其他仓库的任务
      fail-fast: false
      matrix:
        # 使用 include 语法来定义每个仓库的特定参数
        include:
          # 第 1 个小号：原来的仓库 (分支 main)
          - repo_url: git@github.com:twj011/blog.git
            repo_branch: main
            
          # 第 2 个小号：新增的 butterfly 仓库 (分支 master)
          - repo_url: git@github.com:twj011/blog-butterfly.git
            repo_branch: master

          # 你可以在这里继续添加更多...
    # -------------------------------

    steps:
      # 1. 检出源仓库（主号）
      - name: Checkout source repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # 2. 设置 SSH (假设所有小号都配置了同一个 Public Key)
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SYNC_SSH_PRIVATE_KEY }}

      # 3. 执行同步
      - name: Sync to ${{ matrix.repo_url }}
        run: |
          # --- 从 Matrix 获取动态配置 ---
          DEST_REPO="${{ matrix.repo_url }}"
          DEST_BRANCH="${{ matrix.repo_branch }}"
          # 假设所有博客的文章存放目录都是这个，如果不同也可以写进 matrix
          DEST_DIR="source/_posts"
          # ---------------------------

          SOURCE_DIR="${GITHUB_WORKSPACE}/source/_posts"
          
          # 使用哈希避免路径冲突（虽然 Matrix 是在不同 VM 跑的，但这是好习惯）
          TEMP_DIR="/tmp/sync-dest"

          echo "🚀 Starting sync..."
          echo "Target: ${DEST_REPO}"
          echo "Branch: ${DEST_BRANCH}"

          # 1. 克隆小号仓库
          # 注意：这里直接指定了分支变量
          git clone --branch "${DEST_BRANCH}" "${DEST_REPO}" "${TEMP_DIR}"

          # 2. 进入目录
          cd "${TEMP_DIR}"

          # 3. 确保目标目录存在
          if [ ! -d "${DEST_DIR}" ]; then
            mkdir -p "${DEST_DIR}"
          fi

          # 4. Rsync 同步
          # --exclude ".git": 绝对不要同步 .git 目录
          echo "📂 Syncing files..."
          rsync -av --delete --exclude ".git" "${SOURCE_DIR}/" "./${DEST_DIR}/"

          # 5. 提交并推送
          if [ -n "$(git status --porcelain)" ]; then
            echo "📝 Changes detected, committing..."
            
            git config user.name "github-actions[bot]"
            git config user.email "github-actions[bot]@users.noreply.github.com"

            git add .
            git commit -m "chore: sync posts from main repo @ ${GITHUB_SHA}"
            
            git push origin "${DEST_BRANCH}"
            echo "✅ Push successful!"
          else
            echo "💤 No changes detected."
          fi
          
          # 清理
          cd ..
          rm -rf "${TEMP_DIR}"
```

## ⚙️ 第五步：配置并激活工作流

上面的 YAML 代码使用了 Matrix 策略，可以同时同步到多个仓库。你需要修改 `matrix.include` 部分的配置：

```yaml
matrix:
  include:
    # 第一个目标仓库
    - repo_url: git@github.com:your-username/your-first-repo.git
      repo_branch: main  # 该仓库的分支
      
    # 第二个目标仓库
    - repo_url: git@github.com:your-username/your-second-repo.git
      repo_branch: master  # 该仓库的分支
      
    # 你可以继续添加更多仓库...
```

**需要修改的参数：**

-   `repo_url`: 替换为你的**目标仓库的 SSH 地址**，格式为 `git@github.com:你的用户名/你的仓库名.git`
-   `repo_branch`: 目标仓库的目标分支名（通常是 `main` 或 `master`）
-   `DEST_DIR`: 如果不同仓库的文章存放目录不同，可以将它也添加到 matrix 配置中

修改完成后，保存并提交工作流文件：

```bash
git add .github/workflows/sync-posts-matrix.yml
git commit -m "feat: add matrix workflow to sync blog posts to multiple repos"
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

## 🔧 故障排除：解决权限配置问题

在实际使用过程中，你可能会遇到权限相关的错误，特别是当你需要同步到多个仓库时。以下是一个常见问题的解决方案：

### 问题：Permission denied to deploy key

这是一个非常经典的 GitHub 权限配置问题。

#### 核心原因分析

报错信息 `ERROR: Permission to twj011/blog-butterfly.git denied to deploy key` 揭示了根本原因：

**GitHub 的 Deploy Key（部署密钥）默认是"一对一"绑定的。**

1.  **现状**：你可能在 `twj011/blog` 仓库的 Settings -> Deploy Keys 中添加了这个公钥。
2.  **限制**：GitHub **不允许**同一个公钥被添加为多个仓库的 Deploy Key。如果你尝试在 `twj011/blog-butterfly` 里添加同一个公钥，GitHub 会提示 `Key is already in use`（密钥已被使用）。
3.  **冲突**：当 Action 运行时，它使用了这个私钥。GitHub 识别出这个私钥对应的是 `twj011/blog` 的 Deploy Key。当你试图用它去推送到 `twj011/blog-butterfly` 时，GitHub 会判定："这是 blog 仓库的专用钥匙，不能用来开 blog-butterfly 的门"，于是拒绝访问。

由于你的 Matrix 策略是**共用同一个 `SYNC_SSH_PRIVATE_KEY`** 来同步所有仓库，你需要一个**能同时访问所有仓库的权限**，而不是单单属于某一个仓库的权限。

---

### 解决方案

既然你要用同一个脚本、同一个密钥同步到多个仓库，你有两种主要的方法：

#### 方法一：将 SSH Key 升级为"账户级 SSH Key"（推荐）

不要把公钥加在仓库的 Deploy Keys 里，而是加在你的 **GitHub 个人账户设置** 里。这样，持有私钥的 Action 就代表了"你本人"，拥有你账号下所有仓库的读写权限。

**操作步骤：**

1.  **删除旧配置**：
    *   去 `twj011/blog` 仓库 -> Settings -> Deploy Keys，**删除** 那个正在使用的公钥。
    *   去 `twj011/blog-butterfly` 仓库，确保里面也没有这个公钥（如果有尝试添加过）。

2.  **添加为个人 SSH Key**：
    *   点击 GitHub 右上角头像 -> **Settings**。
    *   左侧菜单找到 **SSH and GPG keys**。
    *   点击 **New SSH key**。
    *   将原本那个公钥（Public Key）粘贴进去，保存。

3.  **重新运行 Action**：
    *   现在，Action 使用私钥连接 GitHub 时，GitHub 会识别出这是"用户 twj011"的操作，而不是"某个仓库的专用机器人"，因此它就有权限同时推送到 `blog` 和 `blog-butterfly` 了。

> **注意**：这样做会赋予该 Action 对你账号下所有仓库的访问权限。对于个人博客来说通常是可以接受的。

---

#### 方法二：使用 Personal Access Token (PAT) 走 HTTPS（备选）

如果你不想管理 SSH Key，或者觉得账户级 SSH Key 权限太大，可以使用 Token 方式。

**操作步骤：**

1.  **生成 Token**：
    *   去 GitHub Settings -> Developer settings -> Personal access tokens (Tokens (classic) 比较好用)。
    *   生成一个新 Token，勾选 `repo` (Full control of private repositories) 权限。
    *   复制这个 Token。

2.  **设置 Secret**：
    *   去你的源仓库 Actions Secrets，添加一个 `PERSONAL_ACCESS_TOKEN`，填入刚才的 Token。

3.  **修改 Workflow 代码**：
    *   不再使用 SSH，改用 HTTPS URL。
    *   修改 `Sync to ...` 步骤中的 `git clone` 和 `remote` 设置：

```yaml
      # 删除 Setup SSH 步骤

      - name: Sync to Target
        run: |
          # 修改 matrix 中的 url 为 HTTPS 格式，或者在这里动态拼接
          # 假设 matrix.repo_url 依然是 SSH 格式 (git@github.com:user/repo.git)，我们需要提取 repo 名
          # 或者你直接修改 matrix 配置为 repo_name: twj011/blog-butterfly
          
          # 这里为了兼容你现在的 matrix 写法，我们手动拼接带 Token 的 URL
          # 提取仓库名 (例如 twj011/blog-butterfly)
          REPO_NAME=$(echo "${{ matrix.repo_url }}" | sed -e 's/git@github.com://' -e 's/.git$//')
          
          # 拼接带 Token 的 URL
          # 格式: `https://oauth2:TOKEN@github.com/user/repo.git` 
          GIT_URL="https://oauth2:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${REPO_NAME}.git"
          
          # 后面的操作基本不变，只是 clone 变成了：
          git clone --branch "${{ matrix.repo_branch }}" "$GIT_URL" "${TEMP_DIR}"
          
          # ... 中间代码省略 ...
          
          # push 的时候不需要改，因为 clone 下来的时候 remote origin 已经包含了 token
          git push origin "${{ matrix.repo_branch }}"
```

### 总结

因为你使用了 Matrix 同时向不同仓库推送，**方法一（删除仓库 Deploy Key，添加到个人 Settings SSH Keys）** 是最简单、改动最小的方案。它能完美解决 `Permission denied to deploy key` 的问题。

---

> 💡 **扩展思考**：你还可以基于这个工作流进行更多扩展，比如：
> - 同步到多个目标仓库
> - 添加通知机制（如邮件、Slack 等）
> - 集成内容检查和格式化工具
> - 实现更复杂的分支管理策略
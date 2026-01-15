---
title: Docker 操作实战：以部署 gemini-balance 为例
date: 2025-10-31 10:00:00
tags:
  - Docker
  - 教程
  - 云计算
  - 容器化
categories:
  - Tech
cover: https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOWaQTKW6oOPZyS8hk67Oy87f_21LkAAl8LaxuCgShU3HW8o9G38JoBAAMCAAN5AAM2BA.png
description: 以 gemini-balance 项目为例，手把手带你走过从零开始部署、更新、解决问题，甚至"删库跑路"的 Docker 实战全过程
---

# Docker 操作实战：以部署 gemini-balance 为例

author: Gemini-2.5-pro

你好，未来的 Docker 大师！

你是否常常在 GitHub 上发现一些酷炫的开源项目，想要在自己的 VPS (云服务器) 上部署一番，却被 README 文件里一堆看不太懂的 `docker` 命令劝退？别担心，这篇教程就是为你准备的。

今天，我们将以一个名为 `gemini-balance` 的项目为例，手把手带你走过从零开始部署、更新、解决问题，甚至“删库跑路”的全过程。这不仅仅是一个操作指南，更是一次思维的旅程，让你真正理解每个命令背后的“为什么”。

## 🚀 第一站：准备工作与基础知识

在开始我们的 Docker 之旅前，请确保你已经准备好了以下行囊：

1.  **一台云服务器 (VPS)**：安装了主流的 Linux 发行版，比如 Ubuntu 20.04 或更高版本。
2.  **SSH 客户端**：比如 Windows 上的 Termius、MobaXterm，或者 macOS/Linux 自带的终端。这是我们连接服务器的“传送门”。
3.  **已安装 Docker 和 Docker Compose**：这是我们的核心工具。
    > 💡 **小贴士**: Docker 就像一个神奇的集装箱系统，能把应用和它所需的一切（代码、环境、配置）打包在一起。而 Docker Compose 则是集装箱编排工具，尤其擅长管理由多个集装箱（比如一个 Web 应用 + 一个数据库）组成的项目。

### 必备的 Ubuntu 命令行基础

*   `ssh root@你的服务器IP`: 登录到你的服务器。
*   `ls` 或 `dir`: 列出当前目录下的文件和文件夹。
*   `cd <目录名>`: 进入一个目录。
*   `cd ..`: 返回上一级目录。
*   `nano <文件名>`: 一个简单的文本编辑器，用来修改配置文件。按 `Ctrl+X`，然后按 `Y`，再按 `Enter` 即可保存退出。

## 🚢 第二站：首次登船 - 部署 `gemini-balance`

我们的目标项目 `gemini-balance` 是一个 Gemini API 负载均衡工具，非常适合作为学习案例。

### 步骤 1：获取项目代码

首先，我们需要把项目的“蓝图”从代码仓库下载到服务器上。这里我们使用 `git`。

```bash
# 如果你的服务器没有 git，先安装它
sudo apt update
sudo apt install git -y

# 从 GitHub 克隆项目代码
git clone https://github.com/snailyp/gemini-balance.git

# 进入项目目录，这是我们接下来所有操作的大本营
cd gemini-balance
```

现在，使用 `ls` 命令，你会看到项目的所有文件，其中最重要的就是 `docker-compose.yml`。

### 步骤 2：配置你的“航行参数”

大多数项目都有一个 `.env.example` 文件，这是一个配置模板。我们需要根据它创建自己的配置文件 `.env`。

```bash
# 复制配置文件模板
cp .env.example .env

# 编辑配置文件
nano .env
```

在 `nano` 编辑器里，你可以修改 `API_KEYS` 等参数。现在，我们保持默认即可。

### 步骤 3：启动！

万事俱备，只欠东风。一条命令即可启动整个项目：

```bash
docker-compose up -d
```

让我们来解读这条咒语：
*   `docker-compose`: 调用我们的编排工具。
*   `up`: 启动服务。
*   `-d`: `detached` 的缩写，表示在后台运行，这样你关闭 SSH 窗口后，服务还能继续跑。

稍等片刻，Docker 会自动拉取所需的镜像（`gemini-balance` 应用镜像和 `mysql` 数据库镜像），然后创建并启动容器。

### 步骤 4：检查运行状态

如何知道我们的“船”是否已经顺利启航了呢？

```bash
docker ps
```

如果你看到类似下面的输出，包含 `gemini-balance` 和 `gemini-balance-mysql` 两个正在运行 (`Up`) 的容器，那么恭喜你，部署成功！

```
CONTAINER ID   IMAGE                                 COMMAND                  CREATED       STATUS                 PORTS                               NAMES
e5bd257acd1f   ghcr.io/snailyp/gemini-balance:latest "uvicorn app.main:ap…"   6 weeks ago   Up 6 weeks (healthy)   0.0.0.0:8000->8000/tcp              gemini-balance
40f85110d55e   mysql:8                               "docker-entrypoint.s…"   6 weeks ago   Up 6 weeks (healthy)   3306/tcp, 33060/tcp                 gemini-balance-mysql
```

## ⛈️ 第三站：风暴来袭 - 解决更新时的棘手问题

项目运行了一段时间，作者发布了新版本，我们想更新。按照直觉，应该是先拉取最新的镜像：

```bash
docker-compose pull
```

**然而，灾难发生了！** 终端弹出了一长串 Python 错误：

```
Traceback (most recent call last):
...
TypeError: HTTPConnection.request() got an unexpected keyword argument 'chunked'
...
docker.errors.DockerException: Error while fetching server API version...
```

**这是我们旅程中遇到的第一个大“坑”。**

### 问题诊断：为什么会这样？

别慌！这个错误信息看起来吓人，但它告诉我们一个关键信息：问题出在 `docker-compose` 这个命令本身，而不是 Docker 或项目代码。

**原理**: 我们服务器上通过 `apt` 安装的 `docker-compose` 是 V1 版本，它是一个 Python 脚本。这个脚本所依赖的某些 Python 库版本太旧了，导致在和新版 Docker 引擎通信时出现了不兼容。

### 解决方案：升级我们的工具！

官方早已推出了新一代的 `docker compose` V2。它不再是 Python 脚本，而是直接集成到 Docker 命令中的插件，用 Go 语言编写，更稳定、更快速，也彻底告别了 Python 的依赖地狱。

**第一步：尝试用包管理器安装**

```bash
sudo apt-get install docker-compose-plugin
```

如果你像我们一样，看到 `E: Unable to locate package` 的错误，说明系统默认的软件源太旧了。没关系，我们有 Plan B！

**第二步：手动安装（终极大法）**

这条命令会从 GitHub 下载最新的 `docker-compose` V2 二进制文件，并放到 Docker 插件目录里。

```bash
# 创建插件目录 (如果不存在)
sudo mkdir -p /usr/local/lib/docker/cli-plugins

# 下载二进制文件并放到正确位置
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/lib/docker/cli-plugins/docker-compose

# 授予执行权限
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

**第三步：验证**

来见证奇迹的时刻！注意，新命令的 `compose` 前面是**空格**，而不是连字符。

```bash
docker compose version
```

✅ 如果你看到了版本号（如 `Docker Compose version v2.27.0`），说明你已经成功升级！

## 🔄 第四站：项目的生命周期管理

拥有了强大的新工具，我们现在可以轻松管理我们的项目了。

### 如何优雅地更新项目？

现在，我们可以回到最初的目标：更新 `gemini-balance`。

```bash
# 1. (可选但推荐) 先关闭旧的容器
docker compose down

# 2. 拉取最新的镜像
docker compose pull

# 3. 用新镜像启动
docker compose up -d
```
整个过程行云流水，之前的错误烟消云散。

### 如何停止和重启？

*   **临时停止**：`docker compose stop` (容器还在，只是不运行)
*   **从停止状态恢复**：`docker compose start`
*   **停止并删除容器**：`docker compose down` (容器和网络被删除，但数据卷还在)

### 如何“删库跑路”——彻底重置？

有时我们想让项目恢复到全新的、刚安装好的状态，比如清空所有配置和数据。这就需要删除数据库的数据卷。

> ⚠️ **警告**: 这是毁灭性操作，所有数据将永久丢失，请三思！

最简单的方法，是在 `down` 命令后加上 `-v` (`--volumes`) 参数。

```bash
# 停止容器、删除容器、并删除关联的数据卷
docker compose down -v
```

执行后，再运行 `docker compose up -d`，你就会得到一个焕然一新的 `gemini-balance`，所有配置都恢复了默认，数据库也空空如也。

## 🎉 终点站：总结与展望

恭喜你，船长！你已经成功驾驶 Docker 的巨轮，完成了一次完整的项目部署、维护和重置之旅。

回顾一下我们学到的：
1.  **基础部署流程**: `git clone` -> `cp .env` -> `docker compose up -d`。
2.  **问题排查**: 遇到诡异的错误时，不要害怕，尝试理解错误信息，它往往指向了问题的根源（比如工具版本过旧）。
3.  **拥抱新工具**: `docker compose` V2 是现代化的标准，它能帮你避免很多不必要的麻烦。
4.  **生命周期管理**: `pull`, `up`, `down`, `stop` 这些命令是你日常维护的利器，而 `down -v` 则是你的“终极重置按钮”。

Docker 的世界远比这更广阔，但你已经迈出了最坚实的一步。从现在开始，当你在 GitHub 再次看到 `docker-compose.yml` 文件时，它在你眼中将不再是乱码，而是一张清晰的航海图。

祝你航行愉快！
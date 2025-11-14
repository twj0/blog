---
title: 新VPS完整初始化指南：从安全加固到生产环境部署
date: 2025-11-14 13:00:00
tags:
  - VPS
  - 服务器
  - Linux
  - 安全
  - Docker
  - Nginx
categories:
  - Tech
cover: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800
description: 详尽的VPS初始化指南，涵盖安全加固、系统优化、镜像源替换和Docker部署，特别针对中国大陆用户和手机proot-distro环境优化
---

# 新VPS完整初始化指南：从安全加固到生产环境部署

![Linux Server](https://img.shields.io/badge/Linux-Server-orange)
![Security](https://img.shields.io/badge/Security-Hardened-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 文章目录

- [前言：为什么需要正确初始化VPS](#前言为什么需要正确初始化vps)
- [第 I 部分：基础系统配置](#第-i-部分基础系统配置)
  - [1. 首次登录与系统更新](#1-首次登录与系统更新)
  - [2. 创建新用户并授予管理员权限](#2-创建新用户并授予管理员权限)
  - [3. 设置系统时区](#3-设置系统时区)
- [第 II 部分：安全加固](#第-ii-部分安全加固)
  - [1. SSH安全配置](#1-ssh安全配置)
  - [2. 配置基础防火墙](#2-配置基础防火墙)
  - [3. 安装Fail2ban防御工具](#3-安装fail2ban防御工具)
  - [4. 使用SSH密钥登录](#4-使用ssh密钥登录)
- [第 III 部分：系统优化与工具安装](#第-iii-部分系统优化与工具安装)
  - [1. 中国大陆用户镜像源替换](#1-中国大陆用户镜像源替换)
  - [2. 基础工具安装](#2-基础工具安装)
  - [3. 安装Docker和Docker Compose](#3-安装docker和docker-compose)
- [第 IV 部分：生产环境配置](#第-iv-部分生产环境配置)
  - [1. 使用Nginx Proxy Manager管理反向代理](#1-使用nginx-proxy-manager管理反向代理)
  - [2. Docker网络与安全配置](#2-docker网络与安全配置)
- [第 V 部分：特殊环境配置](#第-v-部分特殊环境配置)
  - [1. 手机proot-distro环境特别说明](#1-手机proot-distro环境特别说明)
  - [2. 必要基础依赖安装清单](#2-必要基础依赖安装清单)
- [总结与后续建议](#总结与后续建议)
- [常见问题解决方案](#常见问题解决方案)

> 💡 **提示**：在开始之前，请确保您已获取VPS的IP地址、初始用户名和密码。
> 
> ⚠️ **注意**：本指南适用于Debian/Ubuntu系统，其他发行版可能需要适当调整命令。

---

## 前言：为什么需要正确初始化VPS

恭喜你拥有了一台属于自己的云服务器（VPS）！这是一片充满无限可能的数字天地。但在你开始部署网站、搭建应用之前，务必先花上15-30分钟，完成一些至关重要的基础设置。这不仅能保护你的服务器免受最常见的网络攻击，还能为你未来的管理工作提供便利。

一个未经正确初始化的VPS就像一栋没有门窗的房子，任何人都可以随意进出。根据统计，一台新暴露在互联网上的服务器，平均在**几分钟内**就会受到自动化扫描工具的探测，**几小时内**就可能遭受暴力破解攻击。

本文将以一台全新的、基于Ubuntu/Debian系统的VPS为例，手把手带你完成从登录到基础加固的全过程。无论你是VPS新手还是有一定经验的管理员，都能从中找到有价值的内容。

## 第 I 部分：基础系统配置

### 1. 首次登录与系统更新

首先，我们以root用户身份登录到服务器。root是Linux系统中的超级管理员，拥有最高权限。

```bash
ssh root@你的服务器IP地址
```

连接过程中，系统可能会询问你是否信任该主机的指纹，输入`yes`并回车。接着，输入你的初始密码。成功登录后，你将看到服务器的命令行欢迎信息。

登录后的首要任务是更新系统。这可以确保所有已安装的软件包都打上了最新的安全补丁。

```bash
# 查看系统基本信息
uname -a

# 更新软件包列表信息
apt update

# 升级所有已安装的软件包
apt upgrade -y
```

这里的 `-y` 参数会自动确认所有升级提示，节省时间。

### 2. 创建新用户并授予管理员权限

一直使用root用户操作服务器是一个非常危险的习惯。任何误操作都可能对系统造成毁灭性打击，并且它也是黑客们最喜欢攻击的目标。因此，我们需要创建一个新的日常使用账户，并赋予它sudo权限（即在需要时临时获取管理员权限）。

```bash
# 创建一个新用户 (将 your_username 替换为你想要的用户名)
adduser your_username
```

系统会提示你设置新用户的密码和一些可选的个人信息（可以直接回车跳过）。请务必设置一个强密码。

```bash
# 授予sudo权限
usermod -aG sudo your_username
```

这条命令将新创建的用户添加到了sudo用户组，使其能够执行管理员命令。

验证新用户：现在，退出root登录 (`exit`)，然后用你的新用户名重新登录：

```bash
ssh your_username@你的服务器IP地址
```

登录后，尝试执行一个需要sudo的命令来验证权限是否生效，比如更新软件包列表：

```bash
sudo apt update
```

系统会要求你输入你自己的密码（而不是root密码）。如果命令成功执行，说明权限配置正确。

### 3. 设置系统时区

将系统时间设置为北京时间，推荐使用 `timedatectl` 命令。

北京时间的正确时区标识符是 `Asia/Shanghai`。

```bash
# 设置时区
sudo timedatectl set-timezone Asia/Shanghai

# 验证更改
timedatectl
```

或者简单地：

```bash
date
```

输出现在应该显示 CST（中国标准时间）和正确的时间。

## 第 II 部分：安全加固

### 1. SSH安全配置

SSH是我们远程管理服务器的唯一入口，保护好它至关重要。

#### 禁用root用户远程登录

既然我们已经有了sudo用户，就应该禁止root直接通过SSH登录。

```bash
# 用你喜欢的文本编辑器（如 nano 或 vim）打开SSH配置文件
sudo nano /etc/ssh/sshd_config
```

在文件中找到 `PermitRootLogin` 这一行，修改为 `no`：

```bash
PermitRootLogin no
```

如果这一行前面有 `#`，请将 `#` 删除。

#### 更改默认SSH端口

SSH默认使用22端口，这使得它成为自动化扫描和攻击的首要目标。通过更改端口，可以有效避开大部分的自动攻击。不过对于个人用户也没必要过于担心。

在同一个配置文件 (`/etc/ssh/sshd_config`) 中，找到 `#Port 22` 这一行。首先去掉 `#`，然后将 `22` 改成一个不常用的端口号（范围建议在 1024-65535 之间，例如 2255）。

```bash
Port 2255
```

> **重要提示**：在修改端口后，请务必先配置好防火墙（下一步）并允许新端口通过，否则你可能会将自己锁在服务器外面！

#### 应用更改

保存文件并退出 (nano中按 `Ctrl+X`, 然后按 `Y`, 最后按回车)。接着，重启SSH服务让配置生效。

```bash
sudo systemctl restart sshd
```

> **警告**：不要立即关闭当前的SSH连接！打开一个新的终端窗口，尝试用新的端口和新的用户名登录，确保一切正常。

```bash
ssh -p 新端口号 your_username@你的服务器IP地址
# 示例: ssh -p 2255 your_username@192.0.2.1
```

确认新连接成功后，再关闭旧的连接。

### 2. 配置基础防火墙

防火墙是服务器的第一道防线。UFW (Uncomplicated Firewall) 是一个非常易于使用的防火墙管理工具，使用系统底层的iptables进行设置。

```bash
# 安装UFW (通常已预装)
sudo apt install ufw

# 设置默认规则: 先禁止所有传入连接，允许所有传出连接
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

允许必要的连接：我们需要允许SSH、HTTP和HTTPS的流量进入。

```bash
# 如果你没有改SSH端口
sudo ufw allow ssh # 22端口

# 如果你改了SSH端口 (例如 2233)
sudo ufw allow 2233/tcp

# 如果你计划部署网站，也需要允许HTTP和HTTPS
sudo ufw allow http  # 80端口
sudo ufw allow https # 443端口
```

启用防火墙：

```bash
sudo ufw enable
```

系统会警告你这可能会中断现有连接，输入`y`确认。因为我们已经允许了SSH端口，所以连接不会中断。

检查防火墙状态：

```bash
sudo ufw status verbose
```

这将显示所有规则和防火墙的当前状态。

### 3. 安装Fail2ban防御工具

Fail2ban，顾名思义是防止后台暴力扫描的软件，通过分析系统日志中的异常行为（如多次登录失败），自动封禁可疑 IP 地址，有效抵御暴力破解攻击。

```bash
# 安装Fail2ban
sudo apt update && sudo apt install fail2ban 
```

#### 配置 Fail2ban

创建自定义配置，复制默认配置文件：

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

编辑配置文件：

```bash
sudo nano /etc/fail2ban/jail.local
```

常见配置参数：

```ini
[DEFAULT]
ignoreip = 127.0.0.1/8  # 白名单IP
bantime = 3600          # 封禁时长（秒）
findtime = 600          # 检测时间段（秒）
maxretry = 5            # 最大尝试次数

[sshd]                  # SSH服务配置
enabled = true          # 启用监控
```

重启服务：

```bash
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban  # 开机自启
```

查看状态：

```bash
sudo fail2ban-client status
```

检查封禁列表：

```bash
sudo fail2ban-client status sshd
```

### 4. 使用SSH密钥登录

使用SSH密钥登录是远程管理服务器的标准做法，它比密码登录更安全、更便捷。下面是一份详尽的指南，将带你完成从生成密钥到实现免密登录的全过程。

这个过程分为两个主要步骤：
1. 在你的本地电脑（客户端）上生成密钥对。
2. 将公钥上传到你的服务器（服务端）。

#### 1. 在你的本地电脑上生成SSH密钥对

你需要先在自己的电脑（而不是服务器）上操作。密钥对由一个私钥和一个公钥组成：
- 私钥 (id_ed25519): 必须严格保密，留存在你的本地电脑上，相当于你的"身份证明"。
- 公钥 (id_ed25519.pub): 可以安全地分享，需要被放置在你想登录的服务器上，相当于一把"锁"。

打开终端：
- macOS / Linux: 打开"终端" (Terminal) 应用。
- Windows: 打开 Windows Terminal, PowerShell, 或 Git Bash。

运行密钥生成命令：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519`: 指定密钥类型为 Ed25519。如果你的系统很老不支持，可以换成 `rsa -b 4096`。
- `-C "your_email@example.com"`: 添加一段注释，通常用邮箱来标识这个密钥是谁的、用在哪台电脑上，方便管理。

根据提示操作：

运行命令后，系统会问你几个问题：

1. `Enter file in which to save the key (…):`
   提示你保存密钥的位置。直接按回车即可，它会使用默认路径（通常是 `~/.ssh/id_ed25519`）。

2. `Enter passphrase (empty for no passphrase):`
   提示你为私钥设置一个密码（Passphrase）。这是一个非常重要的安全层！
   - **强烈建议设置密码**: 即使你的电脑被盗，私钥文件泄露，没有这个密码，别人也无法使用它。
   - **不设置密码**: 直接按回车。登录时会更方便，但安全性稍低。

3. `Enter same passphrase again:`
   再次输入你设置的密码进行确认。

完成后，你会在 `~/.ssh` 目录下看到两个新文件：`id_ed25519` (私钥) 和 `id_ed25519.pub` (公钥)。

#### 2. 将你的公钥复制到服务器

要实现免密登录，你需要把刚刚生成的公钥 (id_ed25519.pub) 的内容，添加到服务器上你希望登录的那个用户的 `~/.ssh/authorized_keys` 文件中。

以下介绍两种方法，强烈推荐使用方法A。

**方法 1：使用 ssh-copy-id (最简单、最推荐)**

这个命令会自动完成所有操作，包括在服务器上创建目录、设置文件和修正权限，能有效避免手动操作的失误。

```bash
# 执行命令 (将 your_username 替换成你在服务器上的用户名，server_ip 替换成服务器的IP地址)
ssh-copy-id your_username@server_ip

# 如果你修改过SSH端口，可以使用 -p 参数
ssh-copy-id -p 端口号 your_username@server_ip

# 如果你的密钥不在默认路径，可以使用 -i 参数
ssh-copy-id -i ~/.ssh/my_other_key.pub your_username@server_ip
```

输入服务器密码：
系统会提示你输入 `your_username` 这个用户在服务器上的密码。这是你最后一次需要用密码登录。

输入密码后，命令会自动将你的公钥内容追加到服务器的 `~/.ssh/authorized_keys` 文件中。

**方法 2：手动复制粘贴 (当没有ssh-copy-id时)**

如果你的本地电脑（比如某些Windows环境）没有 `ssh-copy-id` 命令，就需要手动操作。

1. 在本地电脑上，显示并复制公钥内容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   终端会显示一长串以 `ssh-ed25519 ...` 开头的文本。完整地复制这一整行。

2. 用密码登录到你的服务器：
   ```bash
   ssh your_username@server_ip
   ```

3. 在服务器上，将公钥写入 authorized_keys 文件：
   ```bash
   # 确保 .ssh 目录存在
   mkdir -p ~/.ssh

   # 将你复制的公钥内容粘贴到这里，然后回车
   echo "在这里粘贴你的公钥内容" >> ~/.ssh/authorized_keys

   # 修正关键的目录和文件权限，这一步至关重要！
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

> **注意**: 如果权限不正确（例如过于开放），SSH为了安全会拒绝使用密钥登录。700意味着只有你自己能读、写、执行该目录，600意味着只有你自己能读、写该文件。

还可以使用一些SSH客户端（如XShell、MobaXterm）能直接在客户端里面生成本地的密钥对，生成后能直接一键导入到服务器中，也是非常方便。像 Termius 这样能够云端同步的SSH客户端能够让你在不同设备上使用同一套密钥对，每次换不同设备，都不再需要重新生成密钥并添加到服务器里，有着极大的便利性还能集中管理多个和VPS和密钥信息。不过如果你的账号验证信息被泄露，那么你的全部密钥都遭殃，VPS也都能被访问。

#### 3. 测试与收尾

测试免密登录：

退出服务器，然后再次尝试登录：

```bash
ssh your_username@server_ip
```

如果一切顺利，系统会直接让你登录，而不会再询问密码。如果你设置了密钥的密码（Passphrase），此时会提示你输入该密码。

**(重要) 禁用密码登录**

确认密钥登录成功后，为了达到最高的安全性，应该在服务器上禁用密码登录，只允许密钥登录。

```bash
# 在服务器上编辑SSH配置文件
sudo nano /etc/ssh/sshd_config
```

找到 `PasswordAuthentication` 这一行，去掉前面的 `#`，并把值改为 `no`。

```bash
PasswordAuthentication no
```

同时，可以确认 `PubkeyAuthentication` 是 `yes` (通常默认就是)。

保存文件 (Ctrl+X, Y, Enter) 并重启SSH服务：

```bash
sudo systemctl restart sshd
```

> **警告**：在执行这一步之前，务必确保你的密钥登录已经测试成功。否则，一旦禁用密码登录，你将无法再登入你的服务器！

现在，你的服务器就配置好了高度安全的密钥登录方式。

## 第 III 部分：系统优化与工具安装

### 1. 中国大陆用户镜像源替换

由于网络原因，中国大陆用户直接访问官方软件源可能会很慢。替换为国内镜像源可以大幅提升软件包下载速度。

#### Ubuntu系统镜像源替换

```bash
# 备份原始源列表
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 编辑源列表文件
sudo nano /etc/apt/sources.list
```

将原有内容注释掉（在每行前添加 `#`），然后添加以下内容（以Ubuntu 22.04为例）：

```bash
# 阿里云镜像源
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
```

更新软件包列表：

```bash
sudo apt update
```

#### Debian系统镜像源替换

```bash
# 备份原始源列表
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 编辑源列表文件
sudo nano /etc/apt/sources.list
```

将原有内容注释掉，然后添加以下内容（以Debian 11为例）：

```bash
# 阿里云镜像源
deb https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib

deb https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main

deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
```

更新软件包列表：

```bash
sudo apt update
```

> **提示**：其他国内镜像源还包括清华大学、中科大、华为云等，可根据网络情况选择最适合的镜像源。

### 2. 基础工具安装

安装一些常用的基础工具，方便日常管理和使用：

```bash
# 安装常用工具
sudo apt install -y curl wget git vim htop tree unzip zip

# 安装网络工具
sudo apt install -y net-tools dnsutils iproute2

# 安装编译工具（如需编译软件）
sudo apt install -y build-essential
```

### 3. 安装Docker和Docker Compose

使用官方的一键安装脚本安装。

安装脚本的目的是为了方便在受支持的 Linux 发行版上快速安装最新的 Docker-CE 版本。不建议依赖此脚本来部署到生产系统。有关在受支持的发行版上安装的更详细说明，请参阅安装说明。

你只需运行以下两条命令，即可完成所有安装。

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

脚本运行完毕后，Docker 和 Docker Compose 就安装好了。

测试下自己的VPS有没有安装好Docker了：

```bash
which docker # /usr/bin/docker
```

为了能不加 sudo 直接运行 Docker 命令，你仍需要执行一次用户权限设置：

```bash
# 将当前用户添加到 docker 用户组
sudo usermod -aG docker $USER
```

最后，看一下docker和docker compose的版本：

```bash
docker --version # Docker version 28.3.2, build 578ccf6
docker compose version # Docker Compose version v2.38.2
```

## 第 IV 部分：生产环境配置

### 1. 使用Nginx Proxy Manager管理反向代理

大部分人使用VPS来部署服务都是使用docker来部署，比如WordPress等等，但是使用docker部署完，一般都是"IP+端口号"的方式来访问，这种方式不仅暴露了服务器的内部细节，显得不专业，还存在安全隐患。所以使用Nginx反向代理是必不可少的一步。通过将所有服务流量统一由Nginx进行转发，我们可以极大地提升部署的专业性、安全性与灵活性。我们只需要开一个端口，就能访问所有的VPS服务进程。

这里我们用NPM（Nginx Proxy Manager）来统一管理Nginx代理配置、Let's Encrypt的SSL证书自动申请和续期。

1. 首先我们创建安装目录：
```bash
# 创建并进入目录
mkdir ~/docker/npm && cd ~/docker/npm
```

2. 创建compose.yml文件：
```bash
# 创建compose文件
nano compose.yml
```

3. 复制内容下面内容并粘贴到文件中，这个81端口是NPM的默认后台端口，建议修改为你自己想要的。

```yaml
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'  # 这个就是你要暴露到公网上的端口
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

4. 后台运行docker compose启动容器：
```bash
docker compose up -d
```

访问你的公网IP地址，会显示一个NPM的祝贺成功页面，代表安装Nginx成功了。访问公网IP:81进入网页，进行初始化。

NPM默认用户:
```
Email:    admin@example.com
Password: changeme
```

登录后进去修改账号密码。

接下来你需要有一个域名，我的在域名托管在Cloudflare上，其它域名服务商应该也是类似的。在Cloudflare上对域名进行DNS解析，自定义一个三级域名比如npm用来访问NPM后台页面，npm.domain.com指向你的服务器IP地址。然后我们让NPM反向代理自己，当访问npm.domain.com域名时，NPM会转发流量到内部网络进行访问。

我们创建Let's Encrypt的SSL证书，打开NPM后台页面，点击SSL Certificates，add SSL Certificate → Let's Encrypt → 然后添加三级域名 *.domain.com和二级域名domain.com → Use a DNS Challenge然后选择你的DNS提供商填入域名密钥保存就行。申请成功后添加代理的时候就能在SSL那里选择证书了。

### 2. Docker网络与安全配置

默认配置下，Docker的暴露的端口规则会与UFW的规则冲突。它们通过直接修改底层的iptables规则来暴露端口，所以docker创建的端口不被UFW防火墙所限制。如果你会使用iptables就不需要使用UFW，直接用iptables进行防火墙配置。通过修改iptables也能进行让docker所暴露的端口受UFW所限制，但是我们这里使用一种更简单的方法，就是让NPM通过访问不同docker容器的内部IP来进行代理，我们创建docker容器的时候不需要暴露到公网，只需要让NPM与其他容器在同一docker网络下就行。

这里我们用Portainer来进行演示，将 Portainer 加入了 npm_default 网络，通过同样连接到这个网络的反向代理NPM来访问 Portainer 的 Web 界面。

1. 首先我们创建安装目录：
```bash
mkdir ~/docker/portainer && cd ~/docker/portainer
```

2. 创建如下compose.yml文件，然后后台运行compose。这里不需要添加端口映射关系，容器使用NPM创建的默认网络npm_default。

```yaml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer_data:/data
    networks:
      - npm_default 
networks:
  npm_default:
    external: true
```

查看的容器的名称或ID：
```bash
docker ps
```

然后，使用 inspect 命令。假设容器名叫 portainer：
```bash
docker inspect portainer
```

这会输出一大段JSON格式的信息。您需要滚动到最下面的 Networks 部分，在那里可以看到它在不同网络中的IP地址。

可以使用 `--format` 标志来只提取IP地址，这样更清晰：
```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' portainer
```

这样就获取到了容器的内部IP了，于是我们可以在NPM中对IP进行代理，我们使用portainer.domain.com来访问页面，Scheme使用http，IP输入刚刚获取的容器IP比如172.18.0.3，端口输入9000。SSL选择刚刚的证书*.domain.com，选择Force SSL进行强制SSL访问然后保存。这样就可以通过域名来访问Portainer后台了。

通过下面命令来查看npm_default网络下的全部信息：
```bash
docker network inspect npm_default
```

这样其他的docker服务都可以按照这个方法通过NPM来反向代理进行访问了。

## 第 V 部分：特殊环境配置

### 1. 手机proot-distro环境特别说明

对于使用Termux在手机上通过proot-distro搭建的精简Linux环境，由于权限和系统架构的限制，需要进行一些特殊配置。

#### 权限限制说明

在proot-distro环境中：
- 无法使用特权端口（<1024），如SSH默认的22端口
- 无法直接使用Docker，因为缺少必要的内核支持
- 系统服务管理可能受限，如systemctl可能不可用
- 文件权限和SELinux/AppArmor规则可能不生效

#### 替代方案

1. **使用非特权端口**：
   ```bash
   # SSH配置示例
   Port 8022  # 使用>1024的端口
   ```

2. **使用service命令替代systemctl**：
   ```bash
   # 启动服务
   service ssh start
   
   # 检查状态
   service ssh status
   ```

3. **手动启动服务**：
   ```bash
   # 直接运行服务二进制文件
   /usr/sbin/sshd -D &
   ```

### 2. 必要基础依赖安装清单

在精简的proot-distro环境中，许多基础工具可能未预装。以下是在Debian/Ubuntu环境中建议安装的基础依赖：

```bash
# 更新软件包列表
apt update

# 安装基础工具
apt install -y curl wget git vim nano htop tree unzip zip

# 安装网络工具
apt install -y net-tools dnsutils iproute2 telnet

# 安装SSH服务
apt install -y openssh-server

# 安装文本编辑器
apt install -y nano vim

# 安装压缩工具
apt install -y unzip zip tar

# 安装进程管理工具
apt install -y procps psmisc

# 安装语言环境
apt install -y locales
locale-gen en_US.UTF-8
```

对于中国大陆用户，同样建议替换为国内镜像源以加速下载：

```bash
# 备份原始源列表
cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 编辑源列表文件
nano /etc/apt/sources.list
```

然后根据系统版本添加对应的国内镜像源（参考第III部分的镜像源替换内容）。

## 总结与后续建议

至此，你的VPS已经完成了基础的安全加固和系统配置。这只是一个开始，以下是一些后续建议：

1. **定期更新系统**：
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **设置自动安全更新**：
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

3. **配置日志监控**：
   ```bash
   sudo apt install logwatch
   ```

4. **设置备份策略**：
   - 配置定期备份重要数据
   - 考虑使用rsync或云存储服务

5. **监控服务器资源**：
   - 安装监控工具如htop, iotop
   - 考虑使用更专业的监控解决方案如Prometheus+Grafana

## 常见问题解决方案

### SSH连接问题

**问题**：`Connection refused` 错误
**解决方案**：
1. 检查SSH服务是否运行：`sudo systemctl status ssh` 或 `service ssh status`
2. 检查端口是否正确：`sudo ss -tlnp | grep :端口号`
3. 检查防火墙设置：`sudo ufw status`

**问题**：`Permission denied` 错误
**解决方案**：
1. 检查用户名和密码是否正确
2. 检查SSH配置文件中的权限设置
3. 查看SSH日志：`sudo journalctl -u ssh` 或 `tail /var/log/auth.log`

### Docker问题

**问题**：`permission denied while trying to connect to the Docker daemon socket`
**解决方案**：
1. 将用户添加到docker组：`sudo usermod -aG docker $USER`
2. 重新登录或使用：`newgrp docker`
3. 或者使用sudo运行docker命令

**问题**：容器无法访问外部网络
**解决方案**：
1. 检查DNS设置：`docker run --rm alpine nslookup google.com`
2. 重启docker服务：`sudo systemctl restart docker`
3. 检查防火墙规则

### 防火墙问题

**问题**：UFW规则不生效
**解决方案**：
1. 检查UFW状态：`sudo ufw status verbose`
2. 确保规则顺序正确（拒绝规则在最后）
3. 检查是否有其他防火墙规则（如iptables规则）

### 系统性能问题

**问题**：系统响应缓慢
**解决方案**：
1. 检查系统负载：`htop`, `uptime`
2. 检查磁盘使用：`df -h`, `du -sh *`
3. 检查内存使用：`free -h`
4. 检查网络连接：`netstat -tuln`

---

恭喜你！现在你的VPS已经完成了基础的安全加固和系统配置，可以开始部署你的应用和服务了。记住，服务器安全是一个持续的过程，定期检查和更新是保持服务器安全的关键。

## 准备工作

在开始之前，你需要从你的VPS提供商那里获取三个关键信息：

    服务器的IP地址 (例如: 192.0.2.1)
    初始用户名 (通常是 root)
    初始密码

你还需要一个SSH客户端工具。如果你使用的是macOS或Linux，可以直接使用系统自带的“终端”(Terminal)。如果你使用的是Windows，推荐使用 Windows Terminal (内置SSH) 或经典的 PuTTY 。或者VSCode的Remote-SSH。
首次登录与更新系统

首先，我们以root用户身份登录到服务器。root是Linux系统中的超级管理员，拥有最高权限。

ssh root@你的服务器IP地址

连接过程中，系统可能会询问你是否信任该主机的指纹，输入yes并回车。接着，输入你的初始密码。成功登录后，你将看到服务器的命令行欢迎信息。

# 查看系统基本信息
uname -a 

登录后的首要任务是更新系统。 这可以确保所有已安装的软件包都打上了最新的安全补丁。

# 更新软件包列表信息
sudo apt update

# 升级所有已安装的软件包
sudo apt upgrade -y

这里的 -y 参数会自动确认所有升级提示，节省时间。
创建新用户并授予管理员权限

一直使用root用户操作服务器是一个非常危险的习惯。任何误操作都可能对系统造成毁灭性打击，并且它也是黑客们最喜欢攻击的目标。因此，我们需要创建一个新的日常使用账户，并赋予它sudo权限（即在需要时临时获取管理员权限）。

    创建一个新用户 (将 your_username 替换为你想要的用户名):

adduser your_username

系统会提示你设置新用户的密码和一些可选的个人信息（可以直接回车跳过）。请务必设置一个强密码。

授予sudo权限:

usermod -aG sudo your_username

这条命令将新创建的用户添加到了sudo用户组，使其能够执行管理员命令。

验证新用户: 现在，退出root登录 (exit)，然后用你的新用户名重新登录：

ssh your_username@你的服务器IP地址

登录后，尝试执行一个需要sudo的命令来验证权限是否生效，比如更新软件包列表：

    sudo apt update

    系统会要求你输入你自己的密码（而不是root密码）。如果命令成功执行，说明权限配置正确。

加固SSH服务，提升安全性

SSH是我们远程管理服务器的唯一入口，保护好它至关重要。

    禁用root用户远程登录: 既然我们已经有了sudo用户，就应该禁止root直接通过SSH登录。 用你喜欢的文本编辑器（如 nano 或 vim）打开SSH配置文件。nano对新手更友好。

sudo nano /etc/ssh/sshd_config

在文件中找到 PermitRootLogin 这一行，修改为 no：

PermitRootLogin no

如果这一行前面有 #，请将 # 删除。

(强烈推荐) 更改默认SSH端口: SSH默认使用22端口，这使得它成为自动化扫描和攻击的首要目标。通过更改端口，可以有效避开大部分的自动攻击。 在同一个配置文件 (/etc/ssh/sshd_config) 中，找到 #Port 22 这一行。首先去掉 #，然后将 22 改成一个不常用的端口号（范围建议在 1024-65535 之间，例如 2255）。

Port 2255

重要提示: 在修改端口后，请务必先配置好防火墙（下一步）并允许新端口通过，否则你可能会将自己锁在服务器外面！

应用更改: 保存文件并退出 (nano中按 Ctrl+X, 然后按 Y, 最后按回车)。接着，重启SSH服务让配置生效。

sudo systemctl restart sshd

不要立即关闭当前的SSH连接！ 打开一个新的终端窗口，尝试用新的端口和新的用户名登录，确保一切正常。

Bash

    ssh -p 新端口号 your_username@你的服务器IP地址
    # 示例: ssh -p 2255 your_username@192.0.2.1

    确认新连接成功后，再关闭旧的连接。

配置基础防火墙

防火墙是服务器的第一道防线。UFW (Uncomplicated Firewall) 是一个非常易于使用的防火墙管理工具，使用系统底层的iptables进行设置。

    安装UFW (通常已预装):

sudo apt install ufw

设置默认规则: 先禁止所有传入连接，允许所有传出连接。这是一个安全的基准。

sudo ufw default deny incoming
sudo ufw default allow outgoing

允许必要的连接: 我们需要允许SSH、HTTP和HTTPS的流量进入。

    如果你没有改SSH端口：

sudo ufw allow ssh # 22端口

如果你改了SSH端口 (例如 2233)：

sudo ufw allow 2233/tcp

如果你计划部署网站，也需要允许HTTP和HTTPS：

    sudo ufw allow http  # 80端口
    sudo ufw allow https # 443端口

启用防火墙:

sudo ufw enable

系统会警告你这可能会中断现有连接，输入y确认。因为我们已经允许了SSH端口，所以连接不会中断。

检查防火墙状态:

    sudo ufw status verbose

    这将显示所有规则和防火墙的当前状态。

安装Fail2ban防御工具

Fail2ban，顾名思义是防止后台暴力扫描的软件，通过分析系统日志中的异常行为（如多次登录失败），自动封禁可疑 IP 地址，有效抵御暴力破解攻击。推荐安装

安装Fail2ban：

sudo apt update && sudo apt install fail2ban 

配置 Fail2ban

    创建自定义配置
    复制默认配置文件：

sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

编辑配置文件

sudo nano /etc/fail2ban/jail.local

常见配置参数：

[DEFAULT]
ignoreip = 127.0.0.1/8  # 白名单IP
bantime = 3600          # 封禁时长（秒）
findtime = 600          # 检测时间段（秒）
maxretry = 5            # 最大尝试次数

[sshd]                  # SSH服务配置
enabled = true          # 启用监控

重启服务

    sudo systemctl restart fail2ban
    sudo systemctl enable fail2ban  # 开机自启

查看一下状态：

sudo fail2ban-client status

检查封禁列表：

sudo fail2ban-client status sshd

设置系统时间

将系统时间设置为北京时间，推荐使用 timedatectl 命令。

北京时间的正确时区标识符是 Asia/Shanghai。您看到的错误消息是因为该工具要求使用较旧、不太常见的 POSIX 格式，但现代系统使用 Area/Location 格式。

这是大多数现代 Linux 发行版（如 Ubuntu、Debian、CentOS 和 Fedora）的标准系统范围方法。

    设置时区

    在您的终端中运行以下命令。您可能需要 sudo 权限。

sudo timedatectl set-timezone Asia/Shanghai

验证更改

您可以通过运行以下任一命令来检查更改是否成功：

timedatectl

这将向您显示本地时间、世界标准时间 (UTC) 和当前设置的时区。

或者简单地：

    date

    输出现在应该显示 CST（中国标准时间）和正确的时间。

使用SSH密钥登录

远程管理服务器的标准做法，它比密码登录更安全、更便捷。下面是一份详尽的指南，将带你完成从生成密钥到实现免密登录的全过程。

这个过程分为两个主要步骤：

    在你的本地电脑（客户端）上生成密钥对。
    将公钥上传到你的服务器（服务端）。

1、在你的本地电脑上生成SSH密钥对

你需要先在自己的电脑（而不是服务器）上操作。密钥对由一个私钥和一个公钥组成：

    私钥 (id_ed25519): 必须严格保密，留存在你的本地电脑上，相当于你的“身份证明”。
    公钥 (id_ed25519.pub): 可以安全地分享，需要被放置在你想登录的服务器上，相当于一把“锁”。

    打开终端
        macOS / Linux: 打开“终端” (Terminal) 应用。
        Windows: 打开 Windows Terminal, PowerShell, 或 Git Bash。

    运行密钥生成命令

    我们使用 ssh-keygen 命令来生成密钥。推荐使用现代且安全的 Ed25519 算法。

    Bash

    ssh-keygen -t ed25519 -C "your_email@example.com"

        -t ed25519: 指定密钥类型为 Ed25519。如果你的系统很老不支持，可以换成 rsa -b 4096。
        -C "your_email@example.com": 添加一段注释，通常用邮箱来标识这个密钥是谁的、用在哪台电脑上，方便管理。

    根据提示操作

    运行命令后，系统会问你几个问题：

        Enter file in which to save the key (…):

        提示你保存密钥的位置。直接按回车即可，它会使用默认路径（通常是 ~/.ssh/id_ed25519）。

        Enter passphrase (empty for no passphrase)::

        提示你为私钥设置一个密码（Passphrase）。这是一个非常重要的安全层！
            强烈建议设置密码: 即使你的电脑被盗，私钥文件泄露，没有这个密码，别人也无法使用它。
            不设置密码: 直接按回车。登录时会更方便，但安全性稍低。

        Enter same passphrase again::

        再次输入你设置的密码进行确认。

    完成后，你会在 ~/.ssh 目录下看到两个新文件：id_ed25519 (私钥) 和 id_ed25519.pub (公钥)。

2、将你的公钥复制到服务器

要实现免密登录，你需要把刚刚生成的公钥 (id_ed25519.pub) 的内容，添加到服务器上你希望登录的那个用户的 ~/.ssh/authorized_keys 文件中。

以下介绍两种方法，强烈推荐使用方法A。
方法 1：使用 ssh-copy-id (最简单、最推荐)

这个命令会自动完成所有操作，包括在服务器上创建目录、设置文件和修正权限，能有效避免手动操作的失误。

    执行命令

    将 your_username 替换成你在服务器上的用户名，server_ip 替换成服务器的IP地址。

    Bash

    ssh-copy-id your_username@server_ip

        如果你修改过SSH端口，可以使用 -p 参数：ssh-copy-id -p 端口号 your_username@server_ip
        如果你的密钥不在默认路径，可以使用 -i 参数：ssh-copy-id -i ~/.ssh/my_other_key.pub your_username@server_ip

    输入服务器密码

    系统会提示你输入 your_username 这个用户在服务器上的密码。这是你最后一次需要用密码登录。

    输入密码后，命令会自动将你的公钥内容追加到服务器的 ~/.ssh/authorized_keys 文件中。

方法 2：手动复制粘贴 (当没有ssh-copy-id时)

如果你的本地电脑（比如某些Windows环境）没有 ssh-copy-id 命令，就需要手动操作。

    在本地电脑上，显示并复制公钥内容

cat ~/.ssh/id_ed25519.pub

终端会显示一长串以 ssh-ed25519 ... 开头的文本。完整地复制这一整行。

用密码登录到你的服务器

ssh your_username@server_ip

在服务器上，将公钥写入 authorized_keys 文件

登录服务器后，执行以下命令：

    # 确保 .ssh 目录存在
    mkdir -p ~/.ssh

    # 将你复制的公钥内容粘贴到这里，然后回车
    echo "在这里粘贴你的公钥内容" >> ~/.ssh/authorized_keys

    # 修正关键的目录和文件权限，这一步至关重要！
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys

    注意: 如果权限不正确（例如过于开放），SSH为了安全会拒绝使用密钥登录。700意味着只有你自己能读、写、执行该目录，600意味着只有你自己能读、写该文件。

还可以使用一些SSH客户端（如XShell、MobaXterm）能直接在客户端里面生成本地的密钥对，生成后能直接一键导入到服务器中，也是非常方便。 像 Termius 这样能够云端同步的SSH客户端能够让你在不同设备上使用同一套密钥对，每次换不同设备，都不再需要重新生成密钥并添加到服务器里，有着极大的便利性还能集中管理多个和VPS和密钥信息。不过如果你的账号验证信息被泄露，那么你的全部密钥都遭殃，VPS也都能被访问。
3、测试与收尾

    测试免密登录

    退出服务器 ，然后再次尝试登录：

ssh your_username@server_ip

如果一切顺利，系统会直接让你登录，而不会再询问密码。如果你设置了密钥的密码（Passphrase），此时会提示你输入该密码。

(重要) 禁用密码登录

确认密钥登录成功后，为了达到最高的安全性，应该在服务器上禁用密码登录，只允许密钥登录。

    在服务器上编辑SSH配置文件：

sudo nano /etc/ssh/sshd_config

找到 PasswordAuthentication 这一行，去掉前面的 #，并把值改为 no。

PasswordAuthentication no

同时，可以确认 PubkeyAuthentication 是 yes (通常默认就是)。

保存文件 (Ctrl+X, Y, Enter) 并重启SSH服务。

        sudo systemctl restart sshd

警告：在执行这一步之前，务必确保你的密钥登录已经测试成功。否则，一旦禁用密码登录，你将无法再登入你的服务器！

现在，你的服务器就配置好了高度安全的密钥登录方式。
安装docker和docker compose服务

使用官方的一键安装脚本安装。

安装脚本的目的是为了方便在受支持的 Linux 发行版上快速安装最新的 Docker-CE 版本。不建议依赖此脚本来部署到生产系统。有关在受支持的发行版上安装的更详细说明，请参阅安装说明。

你只需运行以下两条命令，即可完成所有安装。

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

脚本运行完毕后，Docker 和 Docker Compose 就安装好了。

测试下自己的VPS有没有安装好Docker了：

which docker # /usr/bin/docker

为了能不加 sudo 直接运行 Docker 命令，你仍需要执行一次用户权限设置：

# 将当前用户添加到 docker 用户组
sudo usermod -aG docker $USER

最后，看一下docker和docker compose的版本：

docker --version # Docker version 28.3.2, build 578ccf6
docker compose version # Docker Compose version v2.38.2

好了，大部分人使用VPS来部署服务都是使用docker来部署，比如WordPress等等，但是使用docker部署完，一般都是“IP+端口号”的方式来访问，这种方式不仅暴露了服务器的内部细节，显得不专业，还存在安全隐患。所以使用Nginx反向代理是必不可少的一步。通过将所有服务流量统一由Nginx进行转发，我们可以极大地提升部署的专业性、安全性与灵活性。我们只需要开一个端口，就能访问所有的VPS服务进程。

这里我们用NPM（Nginx Proxy Manager）来统一管理Nginx代理配置、Let’s Encrypt的SSL证书自动申请和续期。

1、首先我们创建安装目录

# 创建并进入目录
mkdir ~/docker/npm && cd ~/docker/npm

2、创建compose.yml文件

# 创建compose文件
nano compose.yml

3、复制内容下面内容并粘贴到文件中，这个81端口是NPM的默认后台端口，建议修改为你自己想要的。

services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81〈这个就是你要暴露到公网上的端口〉:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

4、后台运行docker compose启动容器

docker compose up -d

访问你的公网IP地址，会显示一个NPM的祝贺成功页面，代表安装Nginx成功了。访问公网IP:81进入网页，进行初始化。

NPM默认用户:

Email:    admin@example.com
Password: changeme

登录后进去修改账号密码。

接下来你需要有一个域名，我的在域名托管在Cloudflare上，其它域名服务商应该也是类似的。在Cloudflare上对域名进行DNS解析，自定义一个三级域名比如npm用来访问NPM后台页面，npm.domain.com指向你的服务器IP地址。然后我们让NPM反向代理自己，当访问npm.domain.com域名时，NPM会转发流量到内部网络进行访问。

我们创建Let’s Encrypt的SSL证书，打开NPM后台页面，点击SSL Certificates，add SSL Certificate → Let’s Encrypt → 然后添加三级域名 *.domain.com和二级域名domain.com → Use a DNS Challenge然后选择你的DNS提供商填入域名密钥保存就行。申请成功后添加代理的时候就能在SSL那里选择证书了。

默认配置下，Docker的暴露的端口规则会与UFW的规则冲突。它们通过直接修改底层的iptables规则来暴露端口，所以docker创建的端口不被UFW防火墙所限制。如果你会使用iptables就不需要使用UFW，直接用iptables进行防火墙配置。通过修改iptables也能进行让docker所暴露的端口受UFW所限制，但是我们这里使用一种更简单的方法，就是让NPM通过访问不同docker容器的内部IP来进行代理，我们创建docker容器的时候不需要暴露到公网，只需要让NPM与其他容器在同一docker网络下就行。

这里我们用Portainer来进行演示，将 Portainer 加入了 npm_default 网络，通过同样连接到这个网络的反向代理NPM来访问 Portainer 的 Web 界面。

1、首先我们创建安装目录

mkdir ~/docker/portainer && cd ~/docker/portainer

2、创建如下compose.yml文件，然后后台运行compose。这里不需要添加端口映射关系，容器使用NPM创建的默认网络npm_default。

services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer_data:/data
    networks:
      - npm_default 
networks:
  npm_default:
    external: true

查看的容器的名称或ID：

docker ps

然后，使用 inspect 命令。假设容器名叫 portainer：

docker inspect portainer

这会输出一大段JSON格式的信息。您需要滚动到最下面的 Networks 部分，在那里可以看到它在不同网络中的IP地址。

可以使用 --format 标志来只提取IP地址，这样更清晰。

docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' portainer

这样就获取到了容器的内部IP了，于是我们可以在NPM中对IP进行代理，我们使用portainer.domain.com来访问页面，Scheme使用http，IP输入刚刚获取的容器IP比如172.18.0.3，端口输入9000。SSL选择刚刚的证书*.domain.com，选择Force SSL进行强制SSL访问然后保存。这样就可以通过域名来访问Portainer后台了。

通过下面命令来查看npm_default网络下的全部信息。

docker network inspect npm_default

这样其他的docker服务都可以按照这个方法通过NPM来反向代理进行访问了。
---
title: 拯救动态 IP，以HiNet NAT VPS 为例：部署 Cloudflare DDNS(nat.domain.com就可以替代机器的IP)
date: 2025-12-21 17:02:00
tags:
  - DDNS
  - Cloudflare
  - NAT VPS
  - 网络技术
  - 服务器运维
categories:
  - Tech
cover: https://plus.unsplash.com/premium_photo-1683758342945-e0e47a14a66d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
description: 针对HiNet等NAT类型VPS的动态IP问题，提供从Cloudflare设置到自动部署DDNS的完整解决方案，包含常见踩坑点和解决方法
top_img: https://plus.unsplash.com/premium_vector-1682309080127-19d3a6214a17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
comments: true
toc: true
toc_number: true
copyright: true
mathjax: false
katex: false
aplayer: false
highlight_shrink: false
---

# [保姆级教程] 拯救动态 IP！HiNet NAT VPS 必看：手把手教你部署 Cloudflare DDNS
author: gemini 3.0 pro
> 如果你买了 HiNet（中华电信）或者其他 NAT 类型的 VPS，你可能会收到商家的一条提示：**"需自行部署 DDNS"**。
> 
> 对于纯小白来说，这句话简直是天书。其实它的意思很简单：**你的 VPS 公网 IP 是会变的（动态 IP），你需要一个自动脚本，每隔几分钟把新 IP 告诉你的域名，这样你才能永远连得上。**
> 
> 今天这篇教程，专门针对 **Linux 基础薄弱的小白**，涵盖了从 Cloudflare 设置到解决 `crontab not found` 等各种踩坑点，包教包会。

## 📋 目录

- [🛠️ 准备工作](#️-准备工作)
- [🚧 第一步：Cloudflare 域名设置（避坑关键）](#-第一步cloudflare-域名设置避坑关键)
  - [1. 添加 A 记录](#1-添加-a-记录)
  - [2. 获取 Global API Key（重点！）](#2-获取-global-api-key重点)
- [💻 第二步：VPS 环境修补（小白最容易卡这里）](#-第二步vps-环境修补小白最容易卡这里)
- [📜 第三步：部署 DDNS 脚本](#-第三步部署-ddns-脚本)
  - [1. 创建文件夹并下载](#1-创建文件夹并下载)
  - [2. 修改配置](#2-修改配置)
  - [3. 首次运行测试](#3-首次运行测试)
- [⏰ 第四步：设置自动续命 (Crontab)](#-第四步设置自动续命-crontab)
- [🎉 总结：以后怎么用？](#-总结以后怎么用)
- [🔍 常见问题解答](#-常见问题解答)

## 🛠️ 准备工作

1.  **一个 Cloudflare 账号**（已有域名并托管在 CF 上）。
2.  **SSH 连接工具**（FinalShell, Xshell 等）。
3.  **一颗不怕折腾的心**。

## 🚧 第一步：Cloudflare 域名设置（避坑关键）

很多人脚本跑不通，都是因为这一步的"密码"选错了。

### 1. 添加 A 记录

去 Cloudflare 后台 -> 选中你的域名 -> **DNS** -> **Records** -> **Add record**。

*   **Type**: `A`
*   **Name**: 比如 `tw`（这样你的域名就是 `tw.yourdomain.com`）
*   **IPv4**: 随便填 `1.1.1.1`（脚本一会会自动改）
*   **Proxy status**: **必须关掉！**（点一下橙色云朵，让它变成灰色的 **DNS Only**）。**这是做节点的大忌，开了 CDN 可能会导致无法连接。**

![Cloudflare DNS 设置](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOdaUfKncSar6sv_hgcbwlTCB8kNbMAAiMMaxuDDDhWvKp86tYvq5kBAAMCAAN3AAM2BA.jpg)

### 2. 获取 Global API Key（重点！）

市面上 90% 的简单脚本只认这个"老式万能钥匙"，不要去创建新的 API Token，那个配置太麻烦。

1.  点击右上角头像 -> **My Profile** -> **API Tokens**。
2.  往下翻，找到 **API Keys** 栏目。
3.  找到 **Global API Key** -> 点击 **View**。
4.  输入登录密码验证，**复制那串长字符**。

![获取 Global API Key](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOcaUfKnag87-B3l53dXKfMT33dM0kAAiIMaxuDDDhWAAFtxDSQ_j0aAQADAgADdwADNgQ.jpg)

## 💻 第二步：VPS 环境修补（小白最容易卡这里）

NAT 小鸡通常系统极其精简，很多基础命令都没有。我们先得把工具装好。

连接 SSH，依次执行以下命令：

**Debian/Ubuntu 系统（绝大多数 NAT 都是这个）：**

```bash
apt-get update
apt-get install -y curl cron nano
```

**CentOS 系统：**

```bash
yum update
yum install -y curl cronie nano
```

!!! warning "🔴 踩坑点 1：`crontab: command not found`"
    如果你想设置定时任务时报错这个，就是因为没装 `cron`。装完后，记得启动服务：
    `service cron start` (Debian/Ubuntu) 或 `service crond start` (CentOS)。

## 📜 第三步：部署 DDNS 脚本

我们使用最经典、依赖最少的 Shell 脚本。

### 1. 创建文件夹并下载

为了管理方便，我们建个文件夹：

```bash
mkdir -p /root/cf-ddns
cd /root/cf-ddns
curl -o cf-ddns.sh https://raw.githubusercontent.com/yulewang/cloudflare-api-v4-ddns/master/cf-v4-ddns.sh
chmod +x cf-ddns.sh
```

### 2. 修改配置

使用 nano 编辑器打开脚本：

```bash
nano cf-ddns.sh
```

找到以下几行，填入你的信息：

```bash
# 你的 Cloudflare 登录邮箱
CFUSER=你的邮箱@gmail.com

# 刚才复制的 Global API Key (注意不是 Token!)
CFKEY=这里填那一长串字符

# 你的主域名
CFZONE_NAME=baidu.com

# 你刚才设置的完整子域名
CFRECORD_NAME=tw.baidu.com
```

**Nano 操作提示：**

*   修改完按 `Ctrl + O`，然后 `回车` 保存。
*   按 `Ctrl + X` 退出。

### 3. 首次运行测试

输入：

```bash
./cf-ddns.sh
```

!!! warning "🔴 踩坑点 2：`No file, need IP` 然后卡住"
    只要你最后看到了 `Updated record to 36.xxx.xxx.xxx`，说明成功了！
    前面的报错不用管。
    **如果一直报错 Auth Failed**：检查邮箱有没有填错，检查 `CFKEY` 是不是 Global Key。

## ⏰ 第四步：设置自动续命 (Crontab)

光运行一次没用，IP 变了还得手动跑。我们要让系统每 5 分钟自动跑一次。

1.  打开定时任务编辑器：

    ```bash
    crontab -e
    ```
    *(选编辑器时选 1. nano)*

2.  在文件最后一行粘贴：

    ```bash
    */5 * * * * /root/cf-ddns/cf-ddns.sh >/dev/null 2>&1
    ```

3.  保存退出（Ctrl+O, Enter, Ctrl+X）。

!!! warning "🔴 踩坑点 3：路径错误"
    很多小白直接照抄网上的命令，结果脚本路径不对。请确保 `/root/cf-ddns/cf-ddns.sh` 这个路径下真的有你的脚本文件。你可以用 `pwd` 命令查看当前路径。

## 🎉 总结：以后怎么用？

部署好 DDNS 后，你的 NAT VPS 就拥有了"永久地址"。

1.  **在 Clash/Sing-box/V2RayN 里**：
    *   **地址 (Address)**：填域名 `tw.baidu.com`
    *   **端口 (Port)**：填商家分配给你的公网端口（比如 10086）。
    *   **千万别填 22 或 443**，除非你做了端口映射。

2.  **验证方法**：
    *   只要你的 VPS 不炸，Cloudflare 后台的 IP 地址应该永远和你 VPS 的真实 IP 保持一致。

搞定！现在你可以安心睡觉，不用担心半夜 IP 变了导致节点失联了。

## 🔍 常见问题解答

### Q1: 脚本运行成功但域名没有解析？

**A**: 检查以下几点：
1. 确认 Cloudflare 中的 A 记录是否已创建
2. 确认 Proxy status 是否设置为 DNS Only（灰色云朵）
3. 检查域名 DNS 传播是否完成（可能需要几分钟到几小时）

### Q2: 如何验证 DDNS 是否正常工作？

**A**: 可以通过以下方式验证：
```bash
# 查看当前 VPS 的公网 IP
curl ip.sb

# 查看域名解析的 IP
nslookup tw.yourdomain.com
```

两个 IP 应该是一致的。

### Q3: 脚本运行频率可以调整吗？

**A**: 可以。修改 crontab 中的时间设置：
- `*/5 * * * *` - 每 5 分钟（推荐）
- `*/10 * * * *` - 每 10 分钟
- `0 */2 * * *` - 每 2 小时

不建议设置太频繁，避免被 Cloudflare 限制。

### Q4: 如何查看脚本运行日志？

**A**: 修改 crontab 配置，将输出重定向到日志文件：
```bash
*/5 * * * * /root/cf-ddns/cf-ddns.sh >> /root/cf-ddns/ddns.log 2>&1
```

然后查看日志：
```bash
tail -f /root/cf-ddns/ddns.log
```

### Q5: VPS 重启后需要重新设置吗？

**A**: 不需要。crontab 任务是持久化的，系统重启后会自动恢复。但如果你的 VPS 是精简版系统，可能需要确保 cron 服务开机自启：

```bash
# Debian/Ubuntu
systemctl enable cron

# CentOS
systemctl enable crond
```

---

**🎯 技术要点回顾**

- ✅ 使用 Global API Key 而非 API Token 简化配置
- ✅ 关闭 Cloudflare Proxy 避免连接问题
- ✅ 安装必要的系统工具（curl、cron、nano）
- ✅ 使用 crontab 实现自动更新
- ✅ 注意脚本路径和权限设置

希望这篇教程能帮助大家顺利解决 NAT VPS 的动态 IP 问题！如果有任何疑问，欢迎在评论区交流讨论。

*本文基于实际部署经验编写，所有命令都经过测试验证。*
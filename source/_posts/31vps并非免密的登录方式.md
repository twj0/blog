---
title: 新手必看：VPS购买后如何登录？从密码直连到SSH密钥免密登录全指南
date: 2026-01-15 10:00:00
tags:
  - VPS
  - SSH
  - 服务器
  - Linux
  - 安全
categories:
  - Tech
cover: https://img2022.cnblogs.com/blog/2173981/202208/2173981-20220828153529668-2098452406.png
description: 详尽的VPS登录指南,从基础的密码登录到进阶的SSH密钥免密配置,帮助新手快速掌握VPS连接技巧
---

![Linux Server](https://img.shields.io/badge/Linux-Server-orange)
![SSH](https://img.shields.io/badge/SSH-Secure-green)
![Beginner Friendly](https://img.shields.io/badge/Level-Beginner-blue)

## 文章目录

- [前言：恭喜你拥有了自己的VPS](#前言恭喜你拥有了自己的vps)
- [第一阶段：初次见面（密码登录）](#第一阶段初次见面密码登录)
  - [1. 启动 PowerShell](#1-启动-powershell)
  - [2. 输入连接命令](#2-输入连接命令)
  - [3. 接受指纹与输入密码](#3-接受指纹与输入密码)
- [第二阶段：进阶操作（为什么需要密钥登录？）](#第二阶段进阶操作为什么需要密钥登录)
- [第三阶段：实战配置免密登录](#第三阶段实战配置免密登录)
  - [Step 1: 在本地生成"锁"和"钥匙"](#step-1-在本地生成锁和钥匙)
  - [Step 2: 把"锁"（公钥）装到服务器上](#step-2-把锁公钥装到服务器上)
  - [Step 3: 见证奇迹](#step-3-见证奇迹)
- [总结](#总结)
- [常见问题](#常见问题)

---

## 前言：恭喜你拥有了自己的VPS

恭喜你,终于入手了人生中第一台（或者第N台）VPS！但在你准备搭建博客、部署服务或者科学学习之前,横在面前的第一道关卡就是：**怎么连接并控制这台远在天边的服务器？**

不用下载庞大的Xshell或Putty,现在的Windows自带的 **PowerShell** 就已经足够强大。本文将带你通过SSH协议,从最基础的密码登录开始,进阶到黑客范儿十足的"密钥免密登录"。

> 💡 **提示**：在开始之前,请确保您已获取VPS的IP地址、初始用户名和密码。
> 
> ⚠️ **注意**：本指南适用于所有Linux系统的VPS,包括Ubuntu、Debian、CentOS等。

---

## 第一阶段：初次见面（密码登录）

购买VPS后,服务商通常会通过邮件或者控制面板（Panel）提供三个关键信息：

1.  **公网IP地址** (IP Address)
2.  **用户名** (User,通常是 `root`)
3.  **初始密码** (Password)

### 1. 启动 PowerShell

在Windows搜索栏输入 `PowerShell` 并打开。

### 2. 输入连接命令

SSH（Secure Shell）是我们连接服务器的桥梁。在命令行中输入以下格式的命令：

```powershell
ssh root@ip.ip.ip.ip -p 22
```

> **注意几个细节：**
> *   `root` 是用户名,`@` 后面跟的是你的服务器IP。
> *   `-p 22` 代表端口。默认SSH端口是 **22**。
> *   **特殊情况（NAT机）：** 如果你买的是便宜的NAT小鸡,或者是为了安全修改过端口,这里的 `22` 需要改成服务商指定的映射端口（比如 10022、35000等）。

### 3. 接受指纹与输入密码

首次连接时,系统会提示你服务器的指纹未知,询问是否继续：

```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 `yes` 并回车。

接着提示输入密码：

```
root@xx.xx.xx.xx's password:
```

**关键点来了：** 在Linux终端输入密码时,**屏幕上是不会显示任何字符（连星号也没有）的**。你只管精准地输入（或粘贴）,然后回车即可。*你可以提前把密码写在记事本，然后直接复制粘贴就好了。*

如果看到 `[root@vps ~]#` 这样的提示符,恭喜你,登录成功！

---

## 第二阶段：进阶操作（为什么需要密钥登录？）

使用密码登录虽然简单,但有两个痛点：

1.  **麻烦**：每次登录都要复制粘贴那串复杂的随机密码。
2.  **不安全**：密码可能被暴力破解。

为了实现**以后想登录就秒进**,我们需要使用 **"私钥+公钥"** 的方式进行验证。

你可以把它想象成"锁"和"钥匙"：

*   **公钥（Public Key）**：是你配好的锁,你要把它上传并安装在服务器上。
*   **私钥（Private Key）**：是你手里的钥匙,保存在你自己的电脑里。

只要钥匙和锁匹配,门就会自动打开,无需喊口令（输入密码）。

> 💡 **安全提示**：SSH密钥认证比密码认证更安全,因为它基于非对称加密算法,即使公钥被泄露,攻击者也无法在没有私钥的情况下登录。

---

## 第三阶段：实战配置免密登录

### Step 1: 在本地生成"锁"和"钥匙"

不要关闭 PowerShell,确保你是在**自己的电脑**上操作（如果你还在连接服务器的状态,输入 `exit` 退回本地）。

输入以下命令生成密钥对：

```powershell
ssh-keygen -t rsa -b 4096
```

系统会问你几个问题,**一路回车**即可：

1.  保存路径：默认即可（通常在 `C:\Users\你的用户名\.ssh\id_rsa`）。
2.  设置密码（Passphrase）：为了实现完全免密,**直接回车留空**。

完成后,你的 `.ssh` 文件夹里会多出两个文件：

*   `id_rsa` (私钥,千万保存好,不要给别人)
*   `id_rsa.pub` (公钥,这是我们要传给服务器的)

> ⚠️ **重要警告**：私钥文件 `id_rsa` 必须严格保密,不要分享给任何人或上传到公共仓库！

### Step 2: 把"锁"（公钥）装到服务器上

我们需要把 `id_rsa.pub` 里的内容,写入服务器的 `~/.ssh/authorized_keys` 文件中。

#### Windows PowerShell 简单方法：

1.  **查看公钥内容**：

    在 PowerShell 输入：

    ```powershell
    Get-Content $env:USERPROFILE\.ssh\id_rsa.pub
    ```

    你会看到一串以 `ssh-rsa` 开头的乱码,**完整复制它**。

2.  **再次登录服务器**：

    ```powershell
    ssh root@你的IP -p 端口
    ```

    (这是你最后一次需要输入密码)

3.  **在服务器上写入公钥**：

    登录成功后,在服务器端依次执行以下命令（一行一行执行）：

    ```bash
    # 创建.ssh目录（如果没有的话）
    mkdir -p ~/.ssh
    ```
    ```bash
    # 使用echo命令写入公钥（注意：把下面的"你的公钥内容"替换成刚才复制的那一大串字符）
    echo "你的公钥内容" >> ~/.ssh/authorized_keys
    ```
    ```bash
    # 赋予正确的权限（非常重要,否则不生效）
    chmod 600 ~/.ssh/authorized_keys
    chmod 700 ~/.ssh
    ```

> 💡 **权限说明**：
> *   `chmod 600`：只有文件所有者可以读写该文件
> *   `chmod 700`：只有文件所有者可以访问该目录
> *   如果权限设置不当,SSH服务会拒绝使用密钥登录

#### 更简单的方法（推荐）：

如果你使用的是 Linux 或 macOS,或者安装了 Git Bash,可以使用 `ssh-copy-id` 命令：

```bash
ssh-copy-id root@你的IP -p 端口
```

这条命令会自动完成所有操作,包括创建目录、写入公钥和设置权限。

### Step 3: 见证奇迹

现在,输入 `exit` 退出服务器。

再次尝试连接命令：

```powershell
ssh root@ip.ip.ip.ip -p 22
```

此时,你应该会发现,**不需要输入密码,直接就进入了系统！**

> 🎉 **恭喜你！** 你已经成功配置了SSH密钥免密登录。

---

## 总结

对于新手来说,购买VPS后的登录流程可以总结为：

1.  **查IP**：看邮件或面板。
2.  **直连**：`ssh root@ip -p 端口`,输入密码确认环境正常。
3.  **生成密钥**：本地执行 `ssh-keygen`。
4.  **上传公钥**：将公钥内容写入服务器的 `authorized_keys`。

配置好免密登录后,你不仅省去了输入密码的时间,还为后续使用 VSCode Remote 等工具进行远程开发打下了基础。这才是玩转VPS的第一步！

---

## 常见问题

### Q1: 密钥登录还是需要输入密码怎么办？

**A:** 检查以下几点：

1.  确认公钥已正确添加到服务器的 `~/.ssh/authorized_keys` 文件中
2.  检查文件权限是否正确：
    ```bash
    ls -la ~/.ssh/authorized_keys
    # 应该显示 -rw------- (600权限)
    ```
3.  检查SSH服务配置：
    ```bash
    sudo grep "PubkeyAuthentication" /etc/ssh/sshd_config
    # 应该显示 PubkeyAuthentication yes
    ```
4.  重启SSH服务：
    ```bash
    sudo systemctl restart sshd
    ```

### Q2: 如何禁用密码登录,只允许密钥登录？

**A:** 在服务器上编辑SSH配置文件：

```bash
sudo nano /etc/ssh/sshd_config
```

找到以下配置项并修改：

```bash
PasswordAuthentication no
PubkeyAuthentication yes
```

保存后重启SSH服务：

```bash
sudo systemctl restart sshd
```

> ⚠️ **警告**：在禁用密码登录之前,务必确保密钥登录已经测试成功,否则你可能会被锁在服务器外面！

### Q3: 如何在多台电脑上使用密钥登录？

**A:** 有两种方法：

1.  **复制私钥**：将私钥文件 `id_rsa` 复制到其他电脑的 `.ssh` 目录中
2.  **生成新密钥对**：在新电脑上生成新的密钥对,然后将新的公钥添加到服务器的 `authorized_keys` 文件中（推荐）

### Q4: 忘记了私钥密码怎么办？

**A:** 如果你在生成密钥时设置了Passphrase（私钥密码）但忘记了,你只能重新生成新的密钥对,并将新的公钥添加到服务器上。

### Q5: NAT VPS如何配置免密登录？

**A:** NAT VPS的配置流程与普通VPS完全相同,只是在连接时需要使用服务商提供的映射端口：

```powershell
ssh root@你的IP -p 映射端口
```

其他步骤（生成密钥、上传公钥）都是一样的。

---

## 进阶技巧

### 使用 SSH Config 简化连接

如果你有多台服务器,可以在本地创建 `~/.ssh/config` 文件来简化连接命令：

```bash
Host myserver
    HostName 你的IP
    Port 端口
    User root
    IdentityFile ~/.ssh/id_rsa
```

之后只需要输入：

```powershell
ssh myserver
```

### 使用 SSH Agent 管理密钥

如果你有多个密钥,可以使用 SSH Agent 来管理：

```powershell
# 启动 SSH Agent
ssh-agent bash

# 添加私钥
ssh-add ~/.ssh/id_rsa
```

### 配置 SSH 超时断开

为了安全起见,可以配置SSH在一段时间无操作后自动断开：

在服务器上编辑 `/etc/ssh/sshd_config`：

```bash
ClientAliveInterval 300
ClientAliveCountMax 2
```

这表示5分钟（300秒）无操作后,SSH会发送心跳包,连续2次失败后断开连接。

---

## 参考资料

- [OpenSSH 官方文档](https://www.openssh.com/manual.html)
- [SSH 密钥管理最佳实践](https://www.ssh.com/academy/ssh/key)
- [Linux 文件权限详解](https://linuxize.com/post/how-to-manage-file-permissions-on-linux/)

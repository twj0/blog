---
title: Cococloud 尼日利亚 5元小鸡 搭建节点 
date: 2025-10-25 15:26:10
categories:
  - Tech
tags:
  - 小鸡
  - 云服务器
  - nat
  - vps
  - 教程
cover: https://cdn.nodeimage.com/i/6MWEhS4hBplxhOst4B6wWPvOD2RziCaU.webp
description: 详细图文教程：使用Cococloud小鸡搭建自己的节点，适合新手小白

---

# Cococloud小鸡使用完全新手教程 🐔

欢迎来到Cococloud小鸡使用完全新手教程！本教程将手把手教你如何使用Cococloud小鸡搭建自己的代理节点，即使你是完全没有技术基础的新手也能轻松上手。

> ⚠️ 注意：本教程仅用于学习和技术研究，请遵守相关法律法规，不要用于非法用途。

*结果就是，使用老王的脚本，只有vless是通的，但是也不想管那么多了，能用就行*
![V2rayN](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOOaPyF2qzydm7IiBfr7Jv7fqbR6nYAAt0LaxtaGelXcFxKlcZohQUBAAMCAAN3AAM2BA.png)

相关测评可以参考
![ipdata](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOPaPyHDPbU7xqTnUy-3GwBhsCh2ZsAAt8LaxtaGelX9KwuUQgOfpYBAAMCAAN4AAM2BA.png)

[nodeloc](https://www.nodeloc.com/t/topic/64985)

## 📘 教程目录

1. [购买和初始化小鸡](#购买和初始化小鸡)
2. [连接到你的小鸡](#连接到你的小鸡)
3. [搭建代理节点](#搭建代理节点)
4. [使用代理节点](#使用代理节点)
5. [常见问题解答](#常见问题解答)

---

## 购买和初始化小鸡

### 第一步：访问官网

首先，我们需要访问Cococloud的官网：

[点击访问Cococloud官网](https://973700.xyz/)


![登录后的界面](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOHaPx879M4uaXgvbIacZehD6prSgEAAsQLaxtaGelXXOOKo4v4t3UBAAMCAAN3AAM2BA.png)

登录后，你会看到购买页面，选择适合你的套餐：

![购买页面](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOGaPx876sJB1B4H2oxmJsBuSI0_eYAAsMLaxtaGelXaFkRfOTmO6sBAAMCAAN3AAM2BA.png)

### 第二步：访问服务并重置系统

购买完成后，进入服务管理页面：

[点击进入服务管理页面](https://973700.xyz/clientarea.php?action=services)

在这里你会看到你购买的小鸡（VPS）：

![尼日利亚机器](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOIaPx91Bbw3zTFm8PasKr-I2me0mgAAsYLaxtaGelXjgg4zRXcJQEBAAMCAAN5AAM2BA.png)

点击进入你的小鸡详情页面，先进行系统重装并设置密码：

![重装系统](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOKaPyALgEMiqqkGivYNueRNRQ6SPYAAs8LaxtaGelXd_k9gpKwUuEBAAMCAAN5AAM2BA.png)

设置一个强密码，建议包含大小写字母、数字和特殊字符：

![设置密码](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOLaPyA3WNRajFR5ey7U0dBho7gAmwAAtELaxtaGelXR6gMpZyVn2sBAAMCAAN4AAM2BA.png)

### 第三步：配置端口转发

端口转发是NAT小鸡的关键配置，我们需要将公网端口映射到小鸡的内网端口。

参考这篇详细的端口转发教程：[端口转发blog](https://www.973700.xyz/2025/07/25/87/.html)

---

## 连接到你的小鸡

### 什么是SSH？

SSH是一种网络协议，用于安全地访问网络服务，特别是远程登录到服务器。简单来说，它就是你连接到小鸡的"遥控器"。

### 连接信息

在进行端口转发后，你将获得以下连接信息：
*   **主机 (Host):** `102.207.41.151` (这是公网IP)
*   **端口 (Port):** `55555` (这是你设置的转发端口)
*   **用户名 (Username):** `root` (默认管理员账户)
*   **密码 (Password):** 你刚才设置的密码

### 使用SSH客户端连接

#### Windows用户推荐工具：
- [PuTTY](https://www.putty.org/) - 免费小巧
- [MobaXterm](https://mobaxterm.mobatek.net/) - 功能强大

#### macOS/Linux用户：
系统自带终端即可使用

在终端中输入以下命令连接：

```shell
ssh root@102.207.41.151 -p 55555
```

连接成功后，你会看到类似这样的提示符：

```
root@servername:~#
```

这表示你已经成功登录到你的小鸡了！

### 基础Linux命令

作为新手，你只需要掌握这几个简单的命令：

*   `ls`: 查看当前目录下的文件和文件夹
*   `cd [目录名]`: 进入指定的目录
*   `apt update && apt upgrade -y`: (适用于Debian/Ubuntu系统) 更新软件
*   `yum update -y`: (适用于CentOS/Red Hat系统) 更新软件

> 💡 小贴士：在SSH客户端中，通常**右键单击**就是粘贴

---

## 搭建代理节点

现在我们开始搭建代理节点，这里我们使用强大的Sing-box脚本。

### 步骤1：规划端口

这是最关键的一步！Sing-box脚本默认会占用 **4个连续的端口**。

你需要在服务商的端口转发管理页面，为代理服务规划好端口。

例如，我们选择从 `20001` 开始，那么需要使用 `20001`, `20002`, `20003`, `20004` 这四个端口。

> ⚠️ 注意：避免使用服务商的保留端口（如21,22,23,25,26,53等）

### 步骤2：执行安装脚本

连接到你的小鸡后，在命令行中运行以下命令：

```shell
PORT=20001 bash <(curl -Ls https://raw.githubusercontent.com/eooce/sing-box/main/sing-box.sh)
```

解释一下这个命令：
*   `PORT=20001`: 告诉脚本使用20001作为起始端口
*   `bash <(curl -Ls ...)`: 下载并执行远程脚本

脚本会自动下载、安装并配置好所有服务，这个过程可能需要几分钟，请耐心等待。

### 步骤3：配置端口转发

示例图片[添加端口转发示例](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOMaPyEKsmkrkMJNRWQ_ZYm9Ojye0kAAtoLaxtaGelXsU10PBmSlfQBAAMCAAN5AAM2BA.png)
脚本安装完成后，你需要回到服务商的网页控制面板，添加端口转发规则：

| 协议(Protocol) | 公网IP(Source IP) | 公网端口(Source Port) | 内网IP(Destination IP) | 内网端口(Destination Port) |
| :------- | :------------- | :---------- | :------------- | :--------------- |
| TCP      | 102.207.41.151 | **20001**   | 10.0.0.107     | **20001**        |
| TCP      | 102.207.41.151 | **20002**   | 10.0.0.107     | **20002**        |
| TCP      | 102.207.41.151 | **20003**   | 10.0.0.107     | **20003**        |
| TCP      | 102.207.41.151 | **20004**   | 10.0.0.107     | **20004**        |

> ✅ 请务必确保这4条规则都添加成功并生效！

如图所示
![端口转发使用图片](https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAONaPyEXwrIoObuG21IhuRNOwFu7PEAAtsLaxtaGelXbNQd55Jb1qMBAAMCAAN4AAM2BA.png)

### 步骤4：获取节点信息

脚本执行完毕后，通常会在屏幕上直接显示节点的订阅链接或者二维码。

如果没有自动显示，你可以输入以下命令查看：

```shell
sb
```

然后选择"查看订阅信息"选项。

你会看到类似这样的订阅链接：

```
https://subscribe.example.com/xxxxx
```

---

## 使用代理节点

### 第一步：下载客户端

根据你的设备选择合适的客户端：

- **Windows**: [v2rayN](https://github.com/2dust/v2rayN/releases) 或 [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases)
- **macOS**: [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) 或 [ClashX](https://github.com/yichengchen/clashX/releases)
- **Android**: [v2rayNG](https://github.com/2dust/v2rayNG/releases) 或 [Clash for Android](https://github.com/Kr328/ClashForAndroid/releases)
- **iOS**: Shadowrocket (需要美区Apple ID)

### 第二步：导入节点

1. 打开客户端
2. 找到"从URL导入订阅"或"添加订阅"功能
3. 将你获得的订阅链接粘贴进去
4. 点击更新订阅

### 第三步：连接测试

1. 选择一个节点
2. 点击连接或开启代理
3. 尝试访问Google等网站测试是否成功

---

## 常见问题解答

### Q: 连接不上SSH怎么办？
A: 检查以下几点：
1. 确认公网IP和端口是否正确
2. 检查防火墙设置
3. 确认密码是否正确
4. 检查端口转发规则是否生效

### Q: 节点连接失败怎么办？
A: 检查以下几点：
1. 确认4个端口转发规则是否都已添加并生效
2. 检查脚本是否执行成功
3. 确认订阅链接是否正确

### Q: 如何管理Sing-box服务？
A: 在SSH中输入 `sb` 命令，会出现管理菜单，你可以：
- 查看运行状态
- 重启服务
- 查看订阅信息
- 卸载服务

---

## 🎉 恭喜你！

至此，你已经成功完成了从购买小鸡到搭建并使用代理节点的全部流程！

### 重点回顾：

1. **理解NAT工作原理**：通过`公网IP:转发端口`访问`内网IP:服务端口`
2. **合理规划端口**：选择服务商允许且未被占用的端口
3. **正确执行脚本**：使用`PORT=xxxx`变量指定端口运行安装脚本
4. **配置端口转发**：在服务商面板上添加正确的转发规则

如果在使用过程中遇到任何问题，欢迎随时查阅本教程或寻求技术支持。
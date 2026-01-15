---
title: WSL2 (Ubuntu 22.04为例) 安装到D盘完全指南
date: 2025-12-01 12:00:00
tags:
  - WSL
  - Linux
  - Windows
  - 系统配置
  - Ubuntu
  - 开发环境
categories:
  - Tech
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800
description: 详细记录如何在D盘安装WSL2 Ubuntu 22.04，包括环境清理、性能优化和GUI软件配置的个人实践经验
---

# WSL2 Ubuntu 22.04 全攻略：安装到D盘、性能优化与GUI软件配置

作为一个经常在Windows环境下进行开发的技术爱好者，我深深被WSL2的魅力所吸引。但是默认安装在C盘、内存占用过高、国内源下载慢这些问题确实让人头疼。经过几次折腾，我总结出了一套完整的解决方案，在这里分享给大家。



## 为什么需要把WSL安装到D盘？

相信很多朋友都遇到过这些问题：
- C盘空间告急，WSL动辄占用几十GB
- 系统重装后WSL环境需要重新配置
- 想要更好的性能控制和资源管理

把WSL安装到D盘不仅能解决空间问题，还能让我们更灵活地管理开发环境。

## 📋 准备工作：彻底卸载旧版 Ubuntu (可选)

如果你之前折腾过WSL但把环境弄乱了，或者想节省空间重来，建议先执行清理操作。**⚠️ 警告：此操作会删除Linux内所有文件，请提前备份重要数据！**

### 1. 查看当前安装的发行版

打开Windows PowerShell (管理员)，输入：
```powershell
wsl --list --verbose
```

你可能会看到状态为`Stopped`或`Running`的Ubuntu-22.04。

### 2. 注销（卸载）发行版

输入以下命令，将旧系统连同其虚拟磁盘文件彻底删除：
```powershell
wsl --unregister Ubuntu-22.04
```

再次输入`wsl --list`确认已无残留。

## 🚀 核心步骤：安装Ubuntu 22.04到D盘

WSL默认安装在C盘`AppData`目录下，动辄占用几十GB。最稳妥的"安装到D盘"方法是：**先安装默认版 -> 导出镜像 -> 注销默认版 -> 导入到D盘**。

### 初次安装与导出

在PowerShell中执行：
```powershell
# 安装Ubuntu 22.04 (默认在C盘)
wsl --install -d Ubuntu-22.04
```

安装完成后，系统会自动弹出终端窗口，请按提示设置用户名和密码。设置完成后关闭该窗口。

接着，导出系统镜像到D盘（作为搬家中转）：
```powershell
# 导出镜像 (文件名任意，不要有中文路径)
wsl --export Ubuntu-22.04 d:\ubuntu_backup.tar
```
```powershell
# 注销原C盘系统
wsl --unregister Ubuntu-22.04
```

### 导入到D盘 (永久安家)

假设我们要安装在`D:\WSL\Ubuntu2204`：

```powershell
# 创建目录
mkdir D:\WSL\Ubuntu2204
```
```powershell
# 导入系统 (格式: wsl --import <名称> <安装路径> <tar包路径>)
wsl --import Ubuntu-22.04 D:\WSL\Ubuntu2204 d:\ubuntu_backup.tar
```

### 恢复默认用户

使用`import`导入的系统默认会以root身份登录，我们需要改回你的普通用户。

1. 启动Ubuntu：在PowerShell输入`wsl -d Ubuntu-22.04`
2. 编辑配置文件：
```bash
nano /etc/wsl.conf
```

3. 写入以下内容（**将`your_username`替换为你刚才设置的用户名**）：
```ini
[user]
default=your_username
```

4. 保存退出（Ctrl+O -> 回车 -> Ctrl+X）
5. 重启WSL生效：在PowerShell输入`wsl --shutdown`

## ⚡ 基础使用与国内源加速

### 必备：更换国内镜像源

Ubuntu默认源在国外，速度极慢。进入Ubuntu终端，执行以下命令一键替换为清华源（适用于22.04）：

```bash
# 备份原文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```
```bash
# 替换源地址
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.tuna.tsinghua.edu.cn@g' /etc/apt/sources.list
sudo sed -i 's@//.*security.ubuntu.com@//mirrors.tuna.tsinghua.edu.cn@g' /etc/apt/sources.list
```
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y
```

### 常用操作技巧

**访问Windows文件**：Windows的磁盘挂载在`/mnt`下。例如D盘就是`/mnt/d`。
```bash
cd /mnt/d/Downloads
```

**打开Windows文件夹**：在Ubuntu当前目录下输入：
```bash
explorer.exe .
```

## 🔧 进阶配置：.wslconfig (限制内存与性能)

默认情况下，WSL2会占用宿主机50%或更多的内存，且释放不及时，容易导致Windows变卡。我们需要通过`.wslconfig`文件来约束它。

### 创建配置文件

在Windows中，按下`Win + R`，输入`%UserProfile%`打开用户主目录。在此目录下新建一个文件，命名为`.wslconfig`（注意前面有点，没有后缀）。

### 推荐配置

用记事本打开它，填入以下推荐配置：

```ini
[wsl2]
# 限制最大内存为4GB (根据你电脑实际内存调整，推荐4GB-8GB)
memory=4GB

# 限制使用CPU核心数
processors=2

# 0GB交换空间 (也就是虚拟内存)，由于读写慢，建议设置为0或者少量
swap=0

# 【新特性】开启内存自动回收 (Windows 11 22H2+ 支持)
autoMemoryReclaim=gradual
```

个人使用配置
```ini
# Settings apply across all Linux distros running on WSL 2
[wsl2]
# Allocate 8GB of memory to WSL (adjust as needed)
memory=8GB
# Use 4 logical processors (adjust based on your CPU core count)
# 使用多少个cpu的核心
processors=4
# Set the swap file to 4GB and store it on the D drive
swap=4GB
swapfile=D:\\wsl\\swap.vhdx
# Enable localhost forwarding (for development/debugging)
# 是否允许通过 localhost 访问 WSL2 的网络端口。默认为 true。
localhostForwarding=true
# Enable GUI application support (WSLg)
guiApplications=true
# Disable nested virtualization (unless you need to run virtual machines)
# 开启嵌套虚拟化（在 WSL2 里跑 Docker 或其他虚拟机）。默认为 true。
nestedVirtualization=true
# Enable experimental features: automatic memory reclamation and sparse VHD
[experimental]
# 开启空闲内存自动回收 (强烈推荐)
autoMemoryReclaim=gradual
# 开启镜像网络 (解决 VPN 和 局域网问题)
networkingMode=mirrored
# 开启 DNS 隧道 (提升网络稳定性)
dnsTunneling=true
# 开启防火墙同步
firewall=true
# 自动回收磁盘空间
sparseVhd=true
autoProxy=true
```

### 生效配置

保存文件后，在PowerShell中彻底重启WSL：
```powershell
wsl --shutdown
```

## 🎨 可选：下载GUI软件 (以火狐浏览器为例)

Windows 10 (高版本)和Windows 11已经原生支持**WSLg**，这意味着你可以在WSL里直接运行Linux的图形界面程序，它会直接以窗口形式显示在Windows桌面上。

### 开启systemd (推荐)

Firefox在Ubuntu 22.04中通常以Snap包形式安装，需要systemd支持。
检查`/etc/wsl.conf`，确保有以下内容：
```ini
[boot]
systemd=true
```

如果有修改，记得`wsl --shutdown`重启。

### 安装Firefox

在Ubuntu终端输入：
```bash
sudo apt update
sudo apt install firefox
```

### 运行测试

直接在终端输入：
```bash
firefox
```

稍等片刻，一个Linux版的火狐浏览器窗口就会出现在你的Windows桌面上！你可以用它来测试Linux环境下的网页开发效果。




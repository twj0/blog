---
title: 手机AI助手完全指南：AutoGLM在Android上的部署与使用
date: 2025-12-16 21:30:00
author: glm4.6
tags:
  - AI工具
  - Android
  - Termux
  - 自动化
  - AutoGLM
categories:
  - Tech
cover: https://ghfast.top/https://raw.githubusercontent.com/zai-org/Open-AutoGLM/refs/heads/main/resources/logo.svg
description: 本文详细介绍如何在Android手机上通过Termux部署AutoGLM智能体，实现手机自动化操作，让您的手机拥有强大的AI助手能力。

---

# 手机AI助手指南：AutoGLM在Android上的部署与使用

~~作者: glm4.6~~

> 随着人工智能技术的快速发展，将AI能力集成到日常使用的手机中已成为可能。本文将为您详细介绍如何在Android手机上部署AutoGLM智能体，实现手机自动化操作，让您的手机拥有强大的AI助手能力。

## 前言

AutoGLM是一个开源的智能体框架，能够通过自然语言指令控制手机进行各种操作。通过在Android手机上部署**AutoGLM-TERMUX**（一个专门适配Android Termux环境的AutoGLM版本），您可以实现语音或文字控制手机应用、自动化日常任务、智能信息查询等功能。本文将带领您完成从环境准备到实际使用的完整部署过程。
> **注意**：AutoGLM-TERMUX是一个第三方适配项目，它将原本在电脑上运行的Open-AutoGLM项目适配到Android Termux环境中。它通过修改依赖项和配置，使AutoGLM能够在Android设备上运行，无需连接电脑。
> 原作者仓库:`https://github.com/eraycc/AutoGLM-TERMUX`

---

## 📱 准备工作

### 关于AutoGLM-TERMUX

> **重要说明**：AutoGLM-TERMUX是一个第三方适配项目，它将原本在电脑上运行的Open-AutoGLM项目适配到Android Termux环境中。它通过修改依赖项和配置，使AutoGLM能够在Android设备上运行，无需连接电脑。

### 必需应用下载

在开始部署之前，您需要准备以下两个核心应用：

1. **Termux终端模拟器**
   - 下载地址：[Termux官方发布页面](https://github.com/termux/termux-app/releases/)
   - 选择最新版本的APK文件进行安装

2. **ADB键盘输入法**
   - 下载地址：[ADB Keyboard GitHub页面](https://github.com/senzhk/ADBKeyBoard/blob/master/ADBKeyboard.apk)
   - 安装后在系统设置中启用此输入法（无需切换为默认输入法）

### 手机系统设置

为确保AutoGLM能够正常工作，请完成以下系统设置：

1. **开启开发者选项**
   - 进入「设置」→「关于手机」
   - 连续点击「版本号」7次以上，直到提示"您已处于开发者模式"

2. **启用调试选项**
   - 返回「设置」→「系统和更新」→「开发者选项」
   - 开启「USB调试」和「无线调试」功能

---

## 🚀 部署流程

> **重要说明**：以下所有操作步骤均在Android手机的Termux环境中执行，无需连接电脑。

### 第一步：初始化Termux环境

打开已安装的Termux应用，执行以下命令初始化环境：

```bash
# 更换国内镜像源（提高下载速度）
termux-change-repo
# 在弹出的界面中选择 mirrors.tuna.tsinghua.edu.cn 或其他国内源
```
```bash
# 更新系统包
pkg update && pkg upgrade -y
```
```bash
# 安装基础依赖包
pkg install -y python git curl wget build-essential rust
```

> 💡 **提示**：更换国内源可以显著提高后续软件包的下载速度，建议优先执行此步骤。

### 第二步：部署AutoGLM

执行以下命令下载并运行自动化部署脚本：

```bash
# 下载部署脚本
curl -O https://raw.githubusercontent.com/eraycc/AutoGLM-TERMUX/refs/heads/main/deploy.sh
```
```bash
# 可选国内镜像
curl -O https://ghfast.top/https://raw.githubusercontent.com/eraycc/AutoGLM-TERMUX/refs/heads/main/deploy.sh
```
```bash
# 授予执行权限
chmod +x deploy.sh
```
```bash
# 运行部署脚本
./deploy.sh
```

> ⚠️ **重要提醒**：部署过程中需要编译**Rust**环境，在Android设备上可能需要10-30分钟，请确保手机电量充足并保持网络连接稳定。

如果自动化脚本执行失败，您可以采用在手机Termux中的手动部署方式：

```bash
# 在手机的Termux中克隆AutoGLM-TERMUX项目
git clone https://github.com/eraycc/AutoGLM-TERMUX.git

# 进入项目目录
cd AutoGLM-TERMUX

# 查看手动部署说明
cat README.md
```

> ⚠️ **重要说明**：AutoGLM-TERMUX是一个适配项目，它允许在Android手机的Termux环境中运行Open-AutoGLM。它通过修改原始项目的依赖和配置，使其能够在Android环境中正常工作。

### 第三步：配置AI模型服务

AutoGLM支持多种AI模型服务，推荐使用免费的官方模型：

```bash
# 设置环境变量（推荐使用谱BigModel）
export PHONE_AGENT_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
export PHONE_AGENT_MODEL="glm-4v-plus"
export PHONE_AGENT_API_KEY="您的API密钥"
```

您也可以选择其他兼容的AI服务，如OpenAI API等，只需相应调整环境变量即可。

### 第四步：设备连接验证

确保ADB能够正常连接到您的设备：

```bash
# 检查当前连接的设备
adb devices

# 如果没有显示设备，执行无线连接：
adb tcpip 5555

# 查看手机IP地址（通常在无线调试设置中）
# 然后执行连接命令：
adb connect 您的手机IP:5555
```

---

## 🎯 使用指南

### 基础启动方式

部署完成后，您可以通过以下方式启动AutoGLM：

```bash
# 打开交互式菜单界面
autoglm

# 直接启动（跳过菜单）
autoglm --start
```

### 常用指令示例

以下是一些常用的指令示例，帮助您快速上手：

```bash
# 系统操作
python main.py "打开设置查看系统信息"
python main.py "调节屏幕亮度到80%"

# 应用启动
python main.py "打开微信"
python main.py "打开小红书搜索美食攻略"

# 信息查询
python main.py "查看今天天气"
python main.py "搜索最新的科技资讯"
```

---

## 🛠️ 高级配置

### 自定义应用支持

除了内置的50+主流应用外，您还可以通过修改配置文件来支持更多应用。

#### 方法一：使用MT管理器（推荐）

1. 下载并安装[MT管理器](https://mt2.cn/download/)
2. 授权MT管理器访问Termux文件系统
3. 编辑配置文件：`~/Open-AutoGLM/phone_agent/config/apps.py`
4. 在`APP_PACKAGES`字典中添加自定义应用

#### 方法二：命令行编辑

```bash
# 使用nano编辑器修改配置
nano ~/Open-AutoGLM/phone_agent/config/apps.py
```

在配置文件中添加自定义应用的格式如下：

```python
# 自定义应用示例
"via": "mark.via",
"米游社": "com.mihoyo.hyperion", 
"fclash": "com.follow.clash",
"deepseek": "chat.deepseek.com",
"云原神": "com.miHoYo.cloudgames.ys",
"kimi": "com.moonshot.kimichat",
"youtube": "com.google.android.youtube",
"mt管理器": "bin.mt.plus",
```

---

## 🔧 故障排除

### 常见问题及解决方案

#### 1. ADB连接失败

```bash
# 重启ADB服务
adb kill-server
adb start-server

# 检查设备连接状态
adb devices

# 确保无线调试已启用
# 检查手机网络连接是否正常
```

#### 2. Python依赖安装失败

```bash
# 更新pip版本
pip install --upgrade pip

# 单独安装核心依赖
pip install Pillow>=12.0.0 openai>=2.9.0

# 如果仍有问题，尝试清理缓存
pip cache purge
```

#### 3. 模型API调用失败

```bash
# 测试API连接
curl -X POST "您的API地址" -H "Authorization: Bearer 您的密钥"

# 检查网络连接
ping open.bigmodel.cn

# 验证API密钥是否正确
```

#### 4. 权限相关问题

```bash
# 授予Termux存储权限
termux-setup-storage

# 检查文件权限
ls -la ~/Open-AutoGLM/

# 修复权限问题（如需要）
chmod -R 755 ~/Open-AutoGLM/
```

---

## 📋 验证清单

完成部署后，请使用以下清单验证系统功能：

- [ ] Termux能够正常访问网络
- [ ] ADB能够检测到设备
- [ ] ADB Keyboard已安装并启用
- [ ] Python依赖全部安装成功
- [ ] 模型API连接正常
- [ ] 基础任务（如"打开设置"）能正常执行
- [ ] 复杂任务（如应用间操作）能够执行

---

## 🚀 进阶使用技巧

### 远程调试配置

按照官方文档配置无线ADB连接，实现无需USB线的远程调试：

1. 在手机上启用无线调试
2. 记录显示的IP地址和端口号
3. 在Termux中执行连接命令

### 自定义回调实现

您可以实现敏感操作确认和人工接管功能，增强系统安全性：

```python
# 示例：添加操作确认回调
def confirm_operation(operation):
    user_input = input(f"确认执行 {operation} 吗？(y/n): ")
    return user_input.lower() == 'y'
```

### 性能优化建议

1. **定期清理日志文件**：避免日志文件占用过多存储空间
2. **优化模型选择**：根据设备性能选择合适的AI模型
3. **网络优化**：在WiFi环境下使用，减少移动数据消耗

---

## 结语

通过本文的详细指南，您已经成功在Android手机上部署了AutoGLM智能体，拥有了强大的AI助手能力。现在您可以通过自然语言指令控制手机执行各种操作，大大提高了日常使用的便利性和效率。

随着AI技术的不断发展，AutoGLM的功能也在持续增强。建议您定期关注项目更新，获取最新功能和改进。如果您在使用过程中遇到问题，可以查阅官方文档或社区寻求帮助。

> **温馨提示**：首次使用建议先执行简单任务测试系统稳定性，再尝试复杂操作。如有问题，优先检查网络连接和ADB状态。

希望这篇教程对您有所帮助，让您的手机真正成为智能化的个人助理！
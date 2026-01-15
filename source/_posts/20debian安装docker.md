---
title: Debian 安装 Docker 完全指南：从零到生产环境
date: 2025-12-14 21:00:00
tags:
  - Docker
  - Debian
  - 容器化
  - DevOps
  - Linux
categories:
  - Tech
cover: https://www.runoob.com/wp-content/uploads/2016/04/docker01.png
description: 详尽的 Debian Docker 安装指南，涵盖官方一键安装脚本、权限配置、镜像加速、生产环境优化以及常见问题解决方案，特别针对中国大陆用户优化
author: glm4.7
---

# Debian 安装 Docker 完全指南：从零到生产环境

![Docker](https://img.shields.io/badge/Docker-Engine-blue)
![Debian](https://img.shields.io/badge/Debian-Stable-red)
![Compose](https://img.shields.io/badge/Docker-Compose-green)

## 文章目录

- [前言：为什么选择 Docker](#前言为什么选择-docker)
- [第 I 部分：快速安装](#第-i-部分快速安装)
  - [1. 官方一键安装脚本](#1-官方一键安装脚本)
  - [2. 验证安装结果](#2-验证安装结果)
- [第 II 部分：基础配置](#第-ii-部分基础配置)
  - [1. 用户权限配置](#1-用户权限配置)
  - [2. 服务自启配置](#2-服务自启配置)
  - [3. 镜像加速配置](#3-镜像加速配置)
- [第 III 部分：进阶优化](#第-iii-部分进阶优化)
  - [1. 生产环境配置](#1-生产环境配置)
  - [2. 日志与存储管理](#2-日志与存储管理)
  - [3. 网络与安全配置](#3-网络与安全配置)
- [第 IV 部分：实战演练](#第-iv-部分实战演练)
  - [1. 运行第一个容器](#1-运行第一个容器)
  - [2. 使用 Docker Compose](#2-使用-docker-compose)
- [常见问题解决方案](#常见问题解决方案)
- [总结与最佳实践](#总结与最佳实践)

> 💡 **提示**：本指南适用于 Debian 10+ 及 Ubuntu 18.04+ 系统，使用官方最新稳定版 Docker。
>
> ⚠️ **注意**：在生产环境部署前，请务必完成所有安全配置章节的内容。

---

## 前言：为什么选择 Docker

Docker 已经成为现代应用部署的标准工具。它通过容器化技术，让应用程序能够在任何环境中以相同的方式运行，彻底解决了"在我的机器上能运行"的难题。

### Docker 的核心优势

- **环境一致性**：开发、测试、生产环境完全一致
- **快速部署**：秒级启动应用，大幅提升部署效率
- **资源隔离**：轻量级虚拟化，比传统虚拟机更节省资源
- **易于扩展**：支持水平扩展，轻松应对流量高峰
- **生态丰富**：Docker Hub 拥有数百万个官方镜像

在 Debian 上安装 Docker，符合 **最简单、最快、最强**（即：官方最新版 + 自动配置源 + 集成 Docker Compose）的方法只有一种：

## 第 I 部分：快速安装

### 1. 官方一键安装脚本

不需要手动添加 GPG key，不需要手动写 apt 源，只需一行命令。

#### 核心指令（最快方法）

打开终端，直接执行以下命令：

```bash
curl -fsSL https://get.docker.com | bash
```

> **原理说明**：这行命令会自动识别你的 Debian 版本，配置官方的稳定版源，安装最新的 Docker Engine、containerd 和 Docker Compose 插件。

#### 安装过程详解

脚本执行时会自动完成以下步骤：

1. **检测系统信息**：识别 Debian/Ubuntu 版本和架构
2. **配置官方源**：自动添加 Docker 官方 APT 仓库
3. **安装依赖包**：安装必要的系统依赖
4. **安装 Docker**：安装 Docker Engine、CLI、containerd
5. **安装 Compose**：安装 Docker Compose V2 插件
6. **启动服务**：自动启动 Docker 服务

#### 预期安装时间

- **国内网络**：5-15 分钟（取决于网络速度）
- **海外网络**：2-5 分钟

### 2. 验证安装结果

安装完成后，执行以下命令验证安装是否成功：

```bash
# 查看 Docker 版本信息
docker version

# 查看 Docker Compose 版本
docker compose version

# 查看 Docker 系统信息
docker info
```

**预期输出示例**：

```bash
$ docker version
Client: Docker Engine - Community
 Version:           28.3.2
 API version:       1.48
 Go version:        go1.23.3
 Git commit:        578ccf6
 Built:             Mon Jan  6 14:22:01 2025
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Engine - Community
 Engine:
  Version:          28.3.2
  API version:      1.48 (minimum version 1.24)
  Go version:       go1.23.3
  Git commit:       578ccf6
  Built:            Mon Jan  6 14:22:01 2025
  OS/Arch:          linux/amd64
  Experimental:     false
```

如果看到版本号信息，说明安装成功！

---

## 第 II 部分：基础配置

### 1. 用户权限配置

默认情况下，只有 root 用户和 docker 组的成员才能执行 Docker 命令。每次都要加 `sudo` 很麻烦，我们可以将当前用户加入 docker 组。

#### 添加用户到 docker 组

```bash
# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

#### 验证组配置

```bash
# 查看当前用户所属的组
groups
```

输出中应该包含 `docker`。

#### ⚠️ 重要提示：重新登录

执行完上述命令后，**必须注销并重新登录**（或重启服务器）才能生效。

```bash
# 方法 1：注销重新登录
exit
# 然后重新 SSH 登录

# 方法 2：刷新用户组（临时生效）
newgrp docker
```

#### 测试免 sudo 使用

```bash
# 不加 sudo 运行 Docker 命令
docker run hello-world
```

如果成功输出欢迎信息，说明权限配置正确。

### 2. 服务自启配置

为了确保 Docker 服务在系统重启后自动启动，我们需要配置开机自启。

#### 启用并启动 Docker 服务

```bash
# 启用开机自启
sudo systemctl enable docker

# 立即启动 Docker 服务
sudo systemctl start docker
```

#### 检查服务状态

```bash
# 查看 Docker 服务状态
sudo systemctl status docker
```

**预期输出**：

```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-12-14 21:30:00 CST; 5s ago
     Docs: https://docs.docker.com
 Main PID: 12345 (dockerd)
    Tasks: 8
   Memory: 45.2M
   CGroup: /system.slice/docker.service
           └─12345 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

状态应该显示 `enabled` 和 `active (running)`。

### 3. 镜像加速配置

如果你身处中国大陆，直接从 Docker Hub 拉取镜像可能会很慢或超时。配置镜像加速器可以大幅提升下载速度。

#### 方案 A：使用 DaoCloud 镜像加速（推荐）

```bash
# 创建 Docker 配置目录
sudo mkdir -p /etc/docker

# 配置镜像加速器
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://huecker.io",
    "https://dockerhub.timeweb.cloud"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
```

#### 方案 B：使用阿里云镜像加速

如果你有阿里云账号，可以使用阿里云提供的专属镜像加速器。

```bash
# 访问 https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors 获取专属加速地址
# 替换下面的 YOUR_ACCELERATOR_ADDRESS

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://YOUR_ACCELERATOR_ADDRESS.mirror.aliyuncs.com"
  ]
}
EOF
```

#### 重启 Docker 服务

```bash
# 重新加载配置
sudo systemctl daemon-reload

# 重启 Docker 服务
sudo systemctl restart docker
```

#### 验证镜像加速

```bash
# 查看 Docker 信息，确认镜像源已生效
docker info | grep -A 10 "Registry Mirrors"
```

**预期输出**：

```
 Registry Mirrors:
  https://docker.m.daocloud.io/
  https://huecker.io/
  https://dockerhub.timeweb.cloud/
```

#### 测试拉取速度

```bash
# 拉取一个常用镜像测试速度
time docker pull nginx:alpine
```

---

## 第 III 部分：进阶优化

### 1. 生产环境配置

在生产环境中，我们需要对 Docker 进行更细致的配置，以确保性能、安全和稳定性。

#### 完整的 daemon.json 配置示例

```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://huecker.io"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5,
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  },
  "dns": ["8.8.8.8", "8.8.4.4"],
  "ip-forward": true,
  "iptables": true,
  "userland-proxy": false
}
EOF
```

#### 配置参数说明

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `registry-mirrors` | 镜像加速器地址 | 根据网络环境选择 |
| `log-driver` | 日志驱动 | `json-file` |
| `log-opts.max-size` | 单个日志文件最大大小 | `10m` |
| `log-opts.max-file` | 保留的日志文件数量 | `3` |
| `storage-driver` | 存储驱动 | `overlay2` |
| `live-restore` | 守护进程重启时保持容器运行 | `true` |
| `max-concurrent-downloads` | 最大并发下载数 | `10` |
| `max-concurrent-uploads` | 最大并发上传数 | `5` |
| `dns` | DNS 服务器 | `8.8.8.8`, `8.8.4.4` |
| `userland-proxy` | 禁用用户态代理 | `false` |

#### 应用配置

```bash
# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 重启 Docker 服务
sudo systemctl restart docker
```

### 2. 日志与存储管理

Docker 容器的日志和镜像会占用大量磁盘空间，需要定期清理和管理。

#### 查看磁盘使用情况

```bash
# 查看 Docker 磁盘使用情况
docker system df

# 查看详细信息
docker system df -v
```

**输出示例**：

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          10        5         2.5GB     1.2GB (48%)
Containers      5         3         500MB     200MB (40%)
Local Volumes   3         1         1GB       800MB (80%)
Build Cache     0         0         0B        0B
```

#### 清理未使用的资源

```bash
# 清理所有未使用的镜像、容器、网络和构建缓存
docker system prune -a

# 清理未使用的卷
docker volume prune

# 清理所有未使用的内容（包括停止的容器和未使用的镜像）
docker system prune -a --volumes
```

> ⚠️ **警告**：`docker system prune -a` 会删除所有停止的容器和未使用的镜像，请谨慎使用！

#### 设置日志轮转

在 `daemon.json` 中已经配置了日志轮转，确保日志不会无限增长：

```json
"log-opts": {
  "max-size": "10m",
  "max-file": "3"
}
```

这表示每个容器的日志文件最大 10MB，最多保留 3 个文件。

### 3. 网络与安全配置

#### 创建自定义网络

```bash
# 创建一个桥接网络
docker network create app-network

# 查看网络列表
docker network ls

# 查看网络详细信息
docker network inspect app-network
```

#### 配置防火墙规则

```bash
# 使用 UFW 配置防火墙
sudo ufw allow 2375/tcp  # Docker API 端口（如果需要远程访问）
sudo ufw allow 2376/tcp  # Docker API TLS 端口
sudo ufw reload
```

> ⚠️ **安全警告**：不要在公网开放 Docker API 端口（2375/2376），除非你配置了 TLS 认证！

#### 限制容器资源

在运行容器时，可以限制 CPU 和内存使用：

```bash
# 限制容器使用 1 个 CPU 核心和 512MB 内存
docker run -d --name myapp \
  --cpus="1.0" \
  --memory="512m" \
  nginx:alpine
```

---

## 第 IV 部分：实战演练

### 1. 运行第一个容器

让我们运行一个简单的 Nginx 容器来验证 Docker 是否正常工作。

#### 运行 Nginx 容器

```bash
# 后台运行 Nginx 容器
docker run -d --name my-nginx -p 8080:80 nginx:alpine
```

参数说明：
- `-d`：后台运行
- `--name my-nginx`：指定容器名称
- `-p 8080:80`：端口映射，将容器的 80 端口映射到主机的 8080 端口
- `nginx:alpine`：使用 Alpine 版本的 Nginx 镜像

#### 查看容器状态

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器日志
docker logs my-nginx

# 查看容器详细信息
docker inspect my-nginx
```

#### 访问测试

```bash
# 使用 curl 测试
curl http://localhost:8080

# 或在浏览器中访问
# http://your-server-ip:8080
```

#### 停止和删除容器

```bash
# 停止容器
docker stop my-nginx

# 删除容器
docker rm my-nginx

# 强制删除运行中的容器
docker rm -f my-nginx
```

### 2. 使用 Docker Compose

Docker Compose 让我们能够通过 YAML 文件定义和运行多容器应用。

#### 创建项目目录

```bash
mkdir ~/docker-demo && cd ~/docker-demo
```

#### 创建 docker-compose.yml 文件

```bash
nano docker-compose.yml
```

#### 编写 Compose 配置

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: myapp
      MYSQL_USER: myuser
      MYSQL_PASSWORD: mypassword
    volumes:
      - db-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db-data:
```

#### 创建测试页面

```bash
mkdir html
echo "<h1>Hello from Docker Compose!</h1>" > html/index.html
```

#### 启动服务

```bash
# 启动所有服务（后台运行）
docker compose up -d

# 查看服务状态
docker compose ps

# 查看服务日志
docker compose logs -f

# 停止所有服务
docker compose down

# 停止并删除数据卷
docker compose down -v
```

---

## 常见问题解决方案

### 问题 1：权限被拒绝 (Permission denied)

**症状**：
```bash
$ docker ps
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock
```

**解决方案**：

1. 将用户添加到 docker 组：
```bash
sudo usermod -aG docker $USER
```

2. 重新登录或刷新用户组：
```bash
newgrp docker
```

3. 验证权限：
```bash
groups
```

### 问题 2：无法连接到 Docker 守护进程

**症状**：
```bash
$ docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

**解决方案**：

1. 检查 Docker 服务状态：
```bash
sudo systemctl status docker
```

2. 启动 Docker 服务：
```bash
sudo systemctl start docker
```

3. 启用开机自启：
```bash
sudo systemctl enable docker
```

### 问题 3：镜像拉取失败或超时

**症状**：
```bash
$ docker pull nginx
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled
```

**解决方案**：

1. 配置镜像加速器（参考第 II 部分-3）

2. 使用代理：
```bash
# 设置代理
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

# 拉取镜像
docker pull nginx

# 取消代理
unset HTTP_PROXY
unset HTTPS_PROXY
```

### 问题 4：磁盘空间不足

**症状**：
```bash
$ docker run hello-world
no space left on device
```

**解决方案**：

1. 查看磁盘使用情况：
```bash
docker system df
```

2. 清理未使用的资源：
```bash
docker system prune -a --volumes
```

3. 更改 Docker 数据目录（需要修改 daemon.json）：
```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "data-root": "/mnt/docker-data"
}
EOF

sudo systemctl restart docker
```

### 问题 5：容器无法访问外网

**症状**：
```bash
$ docker run alpine ping -c 3 8.8.8.8
ping: bad address '8.8.8.8'
```

**解决方案**：

1. 检查防火墙规则：
```bash
sudo ufw status
```

2. 检查 DNS 配置：
```bash
docker run alpine cat /etc/resolv.conf
```

3. 在 daemon.json 中配置 DNS：
```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
EOF

sudo systemctl restart docker
```

### 问题 6：容器启动后立即退出

**症状**：
```bash
$ docker run myapp
$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS                     PORTS     NAMES
abc123         myapp     "/bin/sh -c 'exit 1'"    5 seconds ago   Exited (1) 4 seconds ago             myapp
```

**解决方案**：

1. 查看容器日志：
```bash
docker logs myapp
```

2. 交互式运行容器进行调试：
```bash
docker run -it myapp /bin/sh
```

3. 检查容器入口点：
```bash
docker inspect myapp | grep -A 10 "Entrypoint"
```

---

## 总结与最佳实践

### 快速回顾

通过本文的学习，你已经掌握了：

1. ✅ 使用官方一键脚本快速安装 Docker
2. ✅ 配置用户权限和服务自启
3. ✅ 配置镜像加速提升下载速度
4. ✅ 运行和管理 Docker 容器
5. ✅ 使用 Docker Compose 编排多容器应用
6. ✅ 解决常见的 Docker 问题

### 生产环境最佳实践

#### 1. 安全性

- ✅ 不要使用 root 用户运行容器
- ✅ 限制容器的资源使用（CPU、内存）
- ✅ 使用只读文件系统
- ✅ 定期更新镜像和容器
- ✅ 不要在容器中存储敏感信息

#### 2. 性能优化

- ✅ 使用 Alpine 镜像减小镜像体积
- ✅ 合理使用多阶段构建
- ✅ 配置日志轮转避免日志膨胀
- ✅ 使用 Docker Compose 管理多容器应用
- ✅ 定期清理未使用的资源

#### 3. 监控与维护

- ✅ 定期检查磁盘使用情况
- ✅ 监控容器资源使用情况
- ✅ 设置容器健康检查
- ✅ 配置日志收集和分析
- ✅ 定期备份重要数据卷

#### 4. 开发工作流

- ✅ 使用 Dockerfile 定义镜像构建过程
- ✅ 使用 .dockerignore 排除不需要的文件
- ✅ 使用 Docker Compose 简化本地开发
- ✅ 使用多阶段构建优化镜像大小
- ✅ 使用标签管理镜像版本

### 下一步学习

如果你想深入学习 Docker，可以探索以下主题：

1. **Dockerfile 最佳实践**：学习如何编写高效的 Dockerfile
2. **Docker 网络**：深入了解 Docker 网络模式和配置
3. **Docker 存储**：学习数据卷和存储驱动的使用
4. **容器编排**：了解 Kubernetes 和 Docker Swarm
5. **CI/CD 集成**：将 Docker 集成到持续集成流程中

### 参考资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)

---

**恭喜你！** 你已经成功在 Debian 上安装并配置了 Docker，并掌握了从基础到进阶的使用方法。现在，你可以开始使用 Docker 来部署你的应用了！

如果你在实践过程中遇到任何问题，欢迎查阅本文的"常见问题解决方案"部分，或者参考 Docker 官方文档获取更多帮助。

祝你使用愉快！🎉
Dockerizing
===========

[TOC]

## Overview

确保安装最新的Docker应用。

利用虚拟技术，统一镜像即统一容器，统一编译依赖和环境，实现稳定到跨平台开发。

## Usage

主要在开发环境中使用，默认具有监听文件的功能。

因为使用了docker的Volume方式在容器之间和主机之间共享文件，所以项目所在的根目录（或项目目录的父层目录）必须是共享文件，可以查看 **Preferences -> File sharing** (见文档说明 [File system sharing](https://docs.docker.com/docker-for-mac/osxfs/))

构建镜像并启动容器方式有：

1. `docker-compose up`
2. `docker-compose up -d` 和 `docker logs -f <container_name>`

在主机打开地址 `http://localhost:9000`， 默认端口为 **9000**，如果有设置docker-machine，通过`docker-machine ip default`查看默认的映射ip。

对应开发初期，依赖包添加或升级时，可以如下操作：

1. 生成镜像 `test:v1`: `docker build -f docker/web/Dockerfile -t test:v1 .`
2. 进入容器：`docker run --rm -it --mount type=bind,source=$PWD,target=/usr/src/mplus test:v1 sh`, 然后可操作更新依赖。

## Gitlab-runner: CI/CD

以下都是在当前README文件所在的目录下执行。

- `docker-compose -f ./gitlab-runner/docker-compose.yml up`  或者：
	```
	docker run -d --name gitlab-runner --restart always \
	    -w /etc/gitlab-runner/ \
	    -v $PWD/caches/gitlab-runner/config:/etc/gitlab-runner \
	    -v /var/run/docker.sock:/var/run/docker.sock \
	    gitlab/gitlab-runner:alpine-v1.11.4
	```
- `docker exec -it gitlab-runner /bin/bash`
- `gitlab-ci-multi-runner register` 
    - name: `develop-mplus-admin`
	- tags: `mplus,fe-ci`
	- Whether to run untagged builds [true/false]: `true`
    - executor: `docker`
    - image: `node:10.9.0-jessie`
    

具体可以查看配置文件：`./caches/gitlab-runner/config.toml`

> 注：因为受限于Gitlab-CE版本的限制，这里使用的镜像版本是`gitlab/gitlab-runner:alpine-v1.11.4` 

最后在项目的根目录添加`.gitlab-ci.yml`并进行配置，见官方 [配置文档](https://docs.gitlab.com/ce/ci/yaml/README.html) 和 [GitLab Runner Commands](https://docs.gitlab.com/runner/commands/)

> [Using a private container registry](https://docs.gitlab.com/runner/configuration/advanced-configuration.html#using-a-private-container-registry)

- `gitlab-ci-multi-runner list`
- `gitlab-runner unregister --name <name>`
- `gitlab-runner verify`

将编译后的结果文件通过 **rsync** 同步到指定服务器，需要定义 gitlab variables (比如这里定义的 `CI_PRIVATE_KEY)`, 以致免账号密码登录服务器。（不过要事先设置对应的SSH）

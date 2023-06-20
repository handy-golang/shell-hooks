# ShellHooks.net

非嵌入式的服务器脚本执行器

源码: https://github.com/EasyGolang/ShellHooks.net

## 安装

```bash
wget -qO- https://raw.githubusercontent.com/mo7static/ShellHooks/main/install_shellhook.sh | bash
```

## 配置文件讲解

app_env.yaml

```yaml
# 服务启动的端口号
Port: '9999'
# 需要扫描的脚本目录
ShellPath: '/root/myShell'
# 设置访问密码
Password: '123456'
```

> 程序每 2 分钟会自动扫描一次 `/root/myShell` 目录下的 .sh 文件
> 修改配置文件后,请执行目录下的 ./start.sh 脚本 或点击页面上的 `重启并更新 ShellHooks.net` 按钮

## 脚本规范

```bash
#!/bin/bash
##WebHook:~部署ShellHooks.net~

#############

npm run build

npm run git

npm run sync

```

> 程序会读取文件中的 `##WebHook:~***~` 的 shell 文件，将其中的 `***` 作为脚本的名称，具有名称的脚本才会被程序所读取

## Github Webhooks

```

http://xxxxxxx:9999/api/public/github

```

## 使用的一些第三方库

https://github.com/fabiospampinato/cash

https://purecss.io/

https://github.com/EasyGolang/goTools

## 程序运行示例

![](https://mo7static.github.io/file/ShellHooks_sample.png)

## 配置 github 自动部署

填写链接

http://itpo.mo7.cc:9999/api/public/github

## 脚本案例

```bash

#!/bin/bash
##WebHook:~ 更新并部署 WebClientPackage ~

# git 远程 仓库
gitRemote="git@github.com:AItrade-mo7/WebClientPackage.git"

# 部署目录
projectPath="/root/ProdProject"

# 运行目录
runPath=${projectPath}"/trade.mo7.cc"

cd ${projectPath} || exit

rm -rf ${runPath}

git clone ${gitRemote}
mv WebClientPackage trade.mo7.cc

```

> 其中 `WebClientPackage` 为仓库名字
> 然后 nginx 配置静态文件指向目录为 `trade.mo7.cc`

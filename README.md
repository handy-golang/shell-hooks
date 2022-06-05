# WebHook.net

非嵌入式的服务器脚本执行器

## 安装

```bash
wget -qO- https://raw.githubusercontent.com/EasyGolang/WebHook.net/main/_shell/install_webhook.sh | bash
```

## 配置文件讲解

user_config.yaml

```yaml
# 服务启动的端口号
Port: '9999'
# 需要扫描的脚本目录
ShellPath: '/root/myShell'
# 设置访问密码
Password: '123456'
```

> 程序会自动扫描 ShellPath 目录下的所有文件

## 脚本规范

```bash
#!/bin/bash
##WebHook:~部署WebHook.net~

#############

npm run build

npm run git

npm run sync

```

> 程序会读取文件中的 `##WebHook:~***~` 的 shell 文件，将其中的 `***` 作为脚本的名称，具有名称的脚本才会被程序所读取

## 使用一些第三方库为

https://github.com/fabiospampinato/cash

https://purecss.io/

https://github.com/EasyGolang/goTools

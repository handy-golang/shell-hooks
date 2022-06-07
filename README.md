# ShellHooks.net

非嵌入式的服务器脚本执行器

源码: https://github.com/EasyGolang/ShellHooks.net

## 安装

```bash
wget -qO- https://raw.githubusercontent.com/mo7static/ShellHooks/main/install_shellhook.sh | bash
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

> 程序每 2 分钟会自动扫描一次 ShellPath 目录
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

## 使用的一些第三方库

https://github.com/fabiospampinato/cash

https://purecss.io/

https://github.com/EasyGolang/goTools

## 程序运行示例

![](https://mo7static.github.io/file/ShellHooks_sample.png)

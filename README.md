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
Port: "9999"
# 需要扫描的脚本目录
ShellPath: "/root/myShell"
# 设置访问密码
Password: "123456"
```

> 程序会自动扫描 ShellPath 目录下的所有文件 

## start.sh

更新并重启服务
> 修改配置文件之后请执行该脚本重启服务

程序启动后，打开对应端口的服务即可

## stop.sh

停止并删除服务

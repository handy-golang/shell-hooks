#!/bin/bash

rm -rf "ShellHooks.net"
mkdir "ShellHooks.net"
cd "ShellHooks.net"

startName="ShellHooks.net"

startFilePath="./start.sh"
stopFilePath="./stop.sh"
configFilePath="./app_env.yaml"

################## 环境搭建环节 ########################

echo "======== 环境检测 ========"

if [[ $(command -v npm) ]]; then
  echo "检测到已安装 npm , 继续执行"
else
  echo "未安装 npm , 开始安装 nodejs"
  curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if [[ $(command -v pm2) ]]; then
  echo "已安装 pm2 , 继续执行"
else
  echo "未安装 pm2 , 开始安装"
  npm install -g pm2
fi

if [[ $(command -v pm2) ]]; then
  echo ""
else
  echo -e "
pm2 安装失败
请手动依次执行以下命令,然后再重新执行该脚本:
\033[32m

  curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

  sudo apt-get install -y nodejs

  npm install -g pm2

\033[0m
"
  exit 1
fi

################ 侦测系统环境 ##########################

SystemType=$(arch)
downLoadPath="https://raw.githubusercontent.com/mo7static/ShellHooks/main/ShellHooks.net_x86_64"

if [[ ${SystemType} =~ "aarch64" ]]; then
  downLoadPath="https://raw.githubusercontent.com/mo7static/ShellHooks/main/ShellHooks.net_aarch64"
fi

################ 启动脚本 ##########################
echo "======== 生成 启动脚本 ========"

sudo cat >${startFilePath} <<END

#!/bin/bash

echo "===== 下载可执行文件 ====="

cd $(pwd)

pm2 delete ${startName}

rm -rf ${startName} &&
  wget -O ${startName} ${downLoadPath}

sudo chmod 777 ${startName}

echo "===== 启动服务 ====="

pm2 start ${startName} --name ${startName}

END
sudo chmod 777 ${startFilePath}

################ 停止脚本 ##########################
echo "
======== 生成 停止脚本 ========
"

sudo cat >${stopFilePath} <<END
#!/bin/bash

pm2 delete ${startName}
rm -rf $(pwd)

END
sudo chmod 777 ${stopFilePath}

################ 配置文件 ##########################
echo "
======== 生成 配置文件 ========
"

sudo cat >${configFilePath} <<END

# 服务启动端口号
Port: "9999"
# 存放脚本的目录
ShellPath: "./"
# 执行脚本时需要验证的密码
Password: "123456"

END
sudo chmod 777 ${configFilePath}

source ${startFilePath}

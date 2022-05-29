#!/bin/bash

# 项目根目录
path=$(pwd)

# 项目的名字和编译时的名字
startName=${path##*/}
buildName=${startName}

# log 目录
logPath=${path}"/logs"

# 最终的输出目录
outPutPath=${path}"/release"

# 配置文件
userEnv=${path}"/user_config.yaml"

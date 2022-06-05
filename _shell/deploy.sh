#!/bin/bash
##name:开始部署
# 加载变量
source "./_shell/init.sh"
#############

npm run build

npm run git

npm run sync

#!/bin/bash
# 加载变量
source "./_shell/init.sh"
#############

npm run build

npm run git

npm run sync

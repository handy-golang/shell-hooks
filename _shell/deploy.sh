#!/bin/bash
##WebHook:~部署ShellHooks.net~
# 加载变量
source "./_shell/init.sh"
#############

npm run build &&
  npm run git &&
  node ${path}"/_shell/sftp.mjs"

exit

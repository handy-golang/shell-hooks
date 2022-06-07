#!/bin/bash
##WebHook:~发布 ShellHooks.net~
# 加载变量
source "./_shell/init.sh"
#############

npm run build &&
  npm run git

nowTime=$(date +%Y-%m-%d\T%H:%M:%S)

cd ${outPutPath}

git init
git add .
git commit -m ${nowTime}
git remote add origin git@github.com:mo7static/ShellHooks.git
git push -f --set-upstream origin master:main
echo "同步完成"

exit

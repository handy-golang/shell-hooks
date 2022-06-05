#!/bin/bash

path=$(pwd)

startName="WebHook.net"

pm2 delete ${startName}
pm2 start ${startName} --name ${startName}

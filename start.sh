#!/bin/bash

path=$(pwd)

startName="ShellHooks.net"

pm2 delete ${startName}
pm2 start ${startName} --name ${startName}

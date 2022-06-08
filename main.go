package main

import (
	_ "embed"

	"ShellHooks.net/server/global"
	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/ready"
	jsoniter "github.com/json-iterator/go"
)

// https://juejin.cn/post/6987204577879654407

//go:embed package.json
var AppPackage []byte

func main() {
	jsoniter.Unmarshal(AppPackage, &config.AppInfo)
	// 初始化系统参数
	global.Start()

	ready.Start()

	// router.Start()
}

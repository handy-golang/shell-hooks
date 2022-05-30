package main

import (
	_ "embed"

	"WebHook.net/global"
	"WebHook.net/ready"
	"WebHook.net/router"
	jsoniter "github.com/json-iterator/go"
)

// https://juejin.cn/post/6987204577879654407

//go:embed package.json
var AppPackage []byte

func main() {
	jsoniter.Unmarshal(AppPackage, &global.AppPackage)
	// 初始化系统参数
	global.Start()

	ready.Start()

	router.Start()
}

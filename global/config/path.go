package config

import (
	"os"

	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

type DirType struct {
	Home string `json:"Home"` // Home 根目录
	App  string `json:"App"`  // APP 根目录
	Log  string `json:"Log"`  // 日志文件目录
}

type FileType struct {
	ServerEnv    string `json:"ServerEnv"`    // /root/server_env.yaml
	AppServerEnv string `json:"AppServerEnv"` // ./server_env.yaml
	UserConfig   string `json:"UserConfig"`   // ./user_config.yaml
	StartShell   string `json:"StartShell"`   // ./start.sh
	StopShell    string `json:"StopShell"`    // ./stop.sh
}

var (
	Dir  DirType
	File FileType
)

func PathInit() {
	Dir.Home = mPath.HomePath()

	Dir.App, _ = os.Getwd()

	Dir.Log = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"logs",
	)

	File.ServerEnv = mStr.Join(
		Dir.Home,
		mStr.ToStr(os.PathSeparator),
		"server_env.yaml",
	)
	File.AppServerEnv = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"server_env.yaml",
	)

	File.UserConfig = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"user_config.yaml",
	)

	File.StartShell = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"start.sh",
	)

	File.StopShell = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"stop.sh",
	)
}

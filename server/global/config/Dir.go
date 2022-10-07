package config

import (
	"os"

	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

type DirType struct {
	Home string `bson:"Home"` // Home 根目录
	App  string `bson:"App"`  // APP 根目录
	Log  string `bson:"Log"`  // 日志文件目录
}

type FileType struct {
	SysEnv     string `bson:"SysEnv"`     // /root/server_env.yaml
	AppSysEnv  string `bson:"AppSysEnv"`  // ./server_env.yaml
	AppEnv     string `bson:"AppEnv"`     // ./user_config.yaml
	StartShell string `bson:"StartShell"` // ./start.sh
	StopShell  string `bson:"StopShell"`  // ./stop.sh
}

var (
	Dir  DirType
	File FileType
)

func DirInit() {
	Dir.Home = mPath.HomePath()

	Dir.App, _ = os.Getwd()

	Dir.Log = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"logs",
	)

	File.SysEnv = mStr.Join(
		Dir.Home,
		mStr.ToStr(os.PathSeparator),
		"sys_env.yaml",
	)
	File.AppSysEnv = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"sys_env.yaml",
	)

	File.AppEnv = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"app_env.yaml",
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

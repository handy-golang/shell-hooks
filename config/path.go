package config

import (
	"os"

	"github.com/EasyGolang/goTools/mStr"
)

type DirType struct {
	App string `json:"App"` // APP 根目录
	Log string `json:"Log"` // 日志文件目录
}

type FileType struct {
	UserConfig string `json:"UserConfig"` // ./user_config.yaml
	StartShell string `json:"StartShell"` // ./start.sh
	StopShell  string `json:"StopShell"`  // ./stop.sh
}

var (
	Dir  DirType
	File FileType
)

func PathInit() {
	Dir.App, _ = os.Getwd()

	Dir.Log = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"logs",
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

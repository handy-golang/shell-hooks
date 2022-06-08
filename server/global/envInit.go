package global

import (
	"ShellHooks.net/server/global/config"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
)

func AppEnvInt() {
	// 检查配置文件在不在
	isUserEnvPath := mPath.Exists(config.File.AppEnv)
	if isUserEnvPath {
		config.LoadAppEnv()
	}

	if config.AppEnv.Port < 80 {
		config.AppEnv.Port = 9876
	}

	Log.Println("加载 AppEnv : ", mJson.JsonFormat(mJson.ToJson(config.AppEnv)))
}

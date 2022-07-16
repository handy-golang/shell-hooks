package global

import (
	"fmt"

	"ShellHooks.net/server/global/config"
	"github.com/EasyGolang/goTools/mEncrypt"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
)

func AppEnvInt() {
	// 检查配置文件在不在
	isUserEnvPath := mPath.Exists(config.File.AppEnv)
	if !isUserEnvPath {
		errStr := fmt.Errorf("缺少文件:" + config.File.AppEnv)
		LogErr(errStr)
		panic(errStr)
	}

	config.LoadAppEnv()

	config.AppEnv.Password = mEncrypt.MD5(config.AppEnv.Password)

	Log.Println("加载 AppEnv : ", mJson.JsonFormat(mJson.ToJson(config.AppEnv)))
}

package global

import (
	"fmt"

	"ShellHooks.net/global/config"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
	viper "github.com/spf13/viper"
)

/* ==================================================================== */
/* ================= UserEnv ================= */
/* ==================================================================== */

type UserEnvType struct {
	Port      string `json:"Port"`
	ShellPath string `json:"ShellPath"`
	Password  string `json:"Password"`
}

var UserEnv UserEnvType

// 加载本地配置(设置默认值)
func UserEnvInit() {
	// 检查配置文件在不在
	isUserEnvPath := mPath.Exists(config.File.UserConfig)
	if !isUserEnvPath {
		errStr := fmt.Errorf("缺少文件: " + config.File.UserConfig)
		LogErr(errStr)
		panic(errStr)
	}

	LoadUserEnv()

	Log.Println("加载 UserEnv : ", mJson.JsonFormat(mJson.ToJson(UserEnv)))
}

func LoadUserEnv() {
	viper.SetConfigFile(config.File.UserConfig)

	err := viper.ReadInConfig()
	if err != nil {
		LogErr(" UserEnv 读取配置文件出错 ", err)
		return
	}
	viper.Unmarshal(&UserEnv)
}

/* ==================================================================== */
/* ================= App 的 package.json ================= */
/* ==================================================================== */

type AppPackageType struct {
	Name    string `json:"Name"`
	Version string `json:"Version"`
}

var AppPackage AppPackageType

package global

import (
	"fmt"

	"WebHook.net/config"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
	viper "github.com/spf13/viper"
)

/* ==================================================================== */
/* ================= ServerEnv ================= */
/* ==================================================================== */
var ServerEnv struct {
	ShellPath string
}

func LoadServerEnv(envPath string) {
	viper.SetConfigFile(envPath)
	err := viper.ReadInConfig()
	if err != nil {
		LogErr(" ServerEnv 读取配置文件出错 ", err)
		return
	}
	viper.Unmarshal(&ServerEnv)
}

func ServerEnvInt() {
	isHomeEnvFile := mPath.Exists(config.File.ServerEnv)
	isAppEnvFile := mPath.Exists(config.File.AppServerEnv)

	if isHomeEnvFile {
		LoadServerEnv(config.File.ServerEnv)
	}
	if isAppEnvFile {
		LoadServerEnv(config.File.AppServerEnv)
	}

	if !isHomeEnvFile && !isAppEnvFile {
		errStr := fmt.Errorf(" 没找到 server_env.yaml 配置文件")
		LogErr(errStr)
		panic(errStr)
	}

	Log.Println("加载 ServerEnv : ", mJson.JsonFormat(mJson.ToJson(ServerEnv)))
}

/* ==================================================================== */
/* ================= UserEnv ================= */
/* ==================================================================== */

type UserEnvType struct {
	Port string `json:"Port"`
}

var UserEnv UserEnvType

// 加载本地配置(设置默认值)
func UserEnvInit() {
	// 检查配置文件在不在
	isUserEnvPath := mPath.Exists(config.File.UserConfig)
	if !isUserEnvPath {
		errStr := fmt.Errorf("配置文件不存在")
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

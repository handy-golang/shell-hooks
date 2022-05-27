package global

import (
	"fmt"

	"WebHook.net/config"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
	viper "github.com/spf13/viper"
)

type EmailInfo struct {
	Account  string   `json:"Account"`
	Password string   `json:"Password"`
	To       []string `json:"To"`
}

type UserEnvType struct {
	Port           string    `json:"Port"`
	UserID         string    `json:"UserID"`
	HunterServerID string    `json:"HunterServerID"`
	Email          EmailInfo `json:"Email"`
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

	// 设置发件的 Email 信息
	UserEnv.Email.Account = "hunter_data_center@mo7.cc"
	UserEnv.Email.Password = "hIXY2pYSuxEz6Y5k"
	UserEnv.Email.To = []string{
		"meichangliang@mo7.cc",
	}

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

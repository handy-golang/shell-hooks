package config

import (
	"fmt"

	"github.com/spf13/viper"
)

var AppEnv struct {
	Port      int    `bson:"Port"`
	ShellPath string `bson:"ShellPath"`
	Password  string `bson:"Password"`
}
var AppInfo struct {
	Name    string `bson:"name"`
	Version string `bson:"version"`
}

func LoadAppEnv() {
	viper.SetConfigFile(File.AppEnv)

	err := viper.ReadInConfig()
	if err != nil {
		errStr := fmt.Errorf("AppEnv 读取配置文件出错: %+v", err)
		LogErr(errStr)
		panic(errStr)
	}
	viper.Unmarshal(&AppEnv)
}

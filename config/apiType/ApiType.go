package apiType

import (
	"WebHook.net/config"
	"WebHook.net/global"
)

type SysConfig struct {
	UserEnv    global.UserEnvType    `json:"UserEnv"`
	AppPackage global.AppPackageType `json:"AppPackage"`
	Dir        config.DirType        `json:"Dir"`
	File       config.FileType       `json:"File"`
}

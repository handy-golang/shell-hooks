package apiType

import (
	"ShellHooks.net/global"
	"ShellHooks.net/global/config"
)

type SysConfig struct {
	UserEnv    global.UserEnvType    `json:"UserEnv"`
	AppPackage global.AppPackageType `json:"AppPackage"`
	Dir        config.DirType        `json:"Dir"`
	File       config.FileType       `json:"File"`
}

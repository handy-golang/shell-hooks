package observe

import (
	"fmt"
	"io/ioutil"

	"WebHook.net/config/public"
	"WebHook.net/global"
	"github.com/EasyGolang/goTools/mPath"
)

func Start() {
	// 在这里读取文件列表,并打印 shell 文件
	isShellPath := mPath.Exists(global.ServerEnv.ShellPath)

	if !isShellPath {
		errStr := fmt.Errorf("配置文件不存在")
		global.LogErr(errStr)
		panic(errStr)
	}

	fileInfoList, err := ioutil.ReadDir(global.ServerEnv.ShellPath)
	if err != nil {
		errorsStr := fmt.Errorf("目录读取失败")
		panic(errorsStr)
	}

	for i := range fileInfoList {
		name := fileInfoList[i].Name()
		path := global.ServerEnv.ShellPath + "/" + name

		if mPath.IsFile(path) {
			SObj := public.ShellType{
				ID:   i,
				Name: name,
				Path: path,
			}
			public.ShellFile = append(public.ShellFile, SObj)
		}
	}
}

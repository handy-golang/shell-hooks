package observe

import (
	"fmt"

	"WebHook.net/global"
	"github.com/EasyGolang/goTools/mPath"
)

func Start() {
	// 在这里读取文件列表,并打印 shell 文件
	isShellPath := mPath.Exists(global.ServerEnv.ShellPath)

	fmt.Println(isShellPath)
}

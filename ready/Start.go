package ready

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"WebHook.net/global"
	"WebHook.net/global/config/public"
	"github.com/EasyGolang/goTools/mCycle"
	"github.com/EasyGolang/goTools/mPath"
)

func Start() {
	mCycle.New(mCycle.Opt{
		Func:      SetShell,
		SleepTime: time.Minute * 2,
	}).Start()
}

func SetShell() {
	// 在这里读取文件列表,并打印 shell 文件
	isShellPath := mPath.Exists(global.UserEnv.ShellPath)

	if !isShellPath {
		errStr := fmt.Errorf("目录不存在: " + global.UserEnv.ShellPath)
		global.LogErr(errStr)
		panic(errStr)
	}

	var files []string
	root := global.UserEnv.ShellPath

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		files = append(files, path)
		return nil
	})
	if err != nil {
		panic(err)
	}

	shellArr := []public.ShellType{}
	for key, file := range files {
		if mPath.IsFile(file) {

			fullPath, _ := filepath.Abs(file)

			SObj := public.ShellType{
				ID:   key,
				Name: file,
				Path: fullPath,
			}

			shellArr = append(shellArr, SObj)
		}
	}

	public.ShellFiles = shellArr
}

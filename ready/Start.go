package ready

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"WebHook.net/global"
	"WebHook.net/global/config/public"
	"github.com/EasyGolang/goTools/mCycle"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

func Start() {
	mCycle.New(mCycle.Opt{
		Func:      SetShell,
		SleepTime: time.Minute * 2,
	}).Start()
}

func SetShell() {
	// 在这里读取文件列表,并打印 shell 文件
	ShellDir, _ := filepath.Abs(global.UserEnv.ShellPath)
	isShellDir := mPath.Exists(ShellDir)

	if !isShellDir {
		errStr := fmt.Errorf("目录不存在: " + ShellDir)
		global.LogErr(errStr)
		panic(errStr)
	}

	var files []string

	err := filepath.Walk(ShellDir, func(path string, info os.FileInfo, err error) error {
		files = append(files, path)
		return nil
	})
	if err != nil {
		panic(err)
	}

	shellArr := []public.ShellType{}
	for key, file := range files {
		if mPath.IsFile(file) {

			filePath, _ := filepath.Abs(file)
			pathArr := strings.Split(filePath, mStr.ToStr(os.PathSeparator))

			SObj := public.ShellType{
				ID: key,
				Name: mStr.Join(
					pathArr[len(pathArr)-2],
					mStr.ToStr(os.PathSeparator),
					pathArr[len(pathArr)-1],
				),
				Path: filePath,
			}

			shellArr = append(shellArr, SObj)
		}
	}

	public.ShellFiles = shellArr
}

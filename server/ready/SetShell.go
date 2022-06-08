package ready

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"

	"ShellHooks.net/server/global"
	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/global/config/public"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

func SetShell() {
	// 在这里读取文件列表,并打印 shell 文件
	ShellDir, _ := filepath.Abs(config.AppEnv.ShellPath)
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
		shellName := ReadShellName(file)
		if len(shellName) > 0 {

			filePath, _ := filepath.Abs(file)

			SObj := public.ShellType{
				ID:   key,
				Name: shellName,
				Path: filePath,
			}

			shellArr = append(shellArr, SObj)
		}
	}

	public.ShellFiles = shellArr
}

func ReadShellName(filePath string) string {
	isFile := mPath.IsFile(filePath)
	if !isFile {
		return ""
	}

	fileData, err := ioutil.ReadFile(filePath)
	if err != nil {
		return ""
	}

	fileStr := mStr.ToStr(fileData)

	compileRegex := regexp.MustCompile(`##WebHook:~(.*?)~`)
	matchArr := compileRegex.FindStringSubmatch(fileStr)

	if len(matchArr) > 1 {
		return matchArr[1]
	}

	return ""
}

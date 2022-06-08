package public

import (
	"net/http"
	"os/exec"

	"ShellHooks.net/global"
	"ShellHooks.net/global/config"
	"ShellHooks.net/global/config/public"
	"ShellHooks.net/router/ginResult"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

type RunShellParam struct {
	Password string
	ShellID  int
}

func RunShell(c *gin.Context) {
	var json RunShellParam
	c.ShouldBind(&json)

	if json.Password != config.Encrypt(global.UserEnv.Password) {
		c.JSON(http.StatusOK, ginResult.ErrPassword.WithData("密码错误"))
		return
	}

	ShellPath := ""
	for i := 0; i < len(public.ShellFiles); i++ {
		item := public.ShellFiles[i]
		if item.ID == json.ShellID {
			ShellPath = item.Path
			break
		}
	}

	isShellPath := mPath.Exists(ShellPath)

	if !isShellPath {
		c.JSON(http.StatusOK, ginResult.Fail.WithData("脚本未找到"))
		return
	}

	// 执行 start.sh 文件
	Succeed, err := exec.Command("/bin/bash", ShellPath).Output()
	if err != nil {
		c.JSON(http.StatusOK, ginResult.Fail.WithData(mStr.ToStr(err)))
		return
	} else {
		c.JSON(http.StatusOK, ginResult.OK.WithData(mStr.ToStr(Succeed)))
		return
	}
}

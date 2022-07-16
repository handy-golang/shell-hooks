package private

import (
	"os/exec"

	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/global/config/public"
	"ShellHooks.net/server/router/result"
	"github.com/EasyGolang/goTools/mEncrypt"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mRes/mFiber"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
)

type RunShellParam struct {
	Password string
	ShellID  int
}

func RunShell(c *fiber.Ctx) error {
	var json RunShellParam
	mFiber.DataParser(c, &json)

	if json.Password != mEncrypt.MD5(config.AppEnv.Password) {
		return c.JSON(result.ErrPassword.WithData("密码错误"))
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
		return c.JSON(result.Fail.WithData("脚本未找到"))
	}

	// 执行 start.sh 文件
	Succeed, err := exec.Command("/bin/bash", ShellPath).Output()
	if err != nil {
		return c.JSON(result.Fail.WithData(mStr.ToStr(err)))
	} else {
		return c.JSON(result.OK.WithData(mStr.ToStr(Succeed)))
	}
}

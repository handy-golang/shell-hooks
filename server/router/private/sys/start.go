package sys

import (
	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/router/result"
	"ShellHooks.net/server/utils/shellControl"
	"github.com/EasyGolang/goTools/mRes/mFiber"
	"github.com/gofiber/fiber/v2"
)

type SysAuthParam struct {
	Password string
}

func Start(c *fiber.Ctx) error {
	var json SysAuthParam
	mFiber.DataParser(c, &json)

	if json.Password != config.AppEnv.Password {
		return c.JSON(result.ErrPassword.WithData("密码错误"))
	}

	go shellControl.SysStart()
	return c.JSON(result.OK.WithMsg("指令已发送"))
}

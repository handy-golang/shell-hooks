package sys

import (
	"net/http"

	"ShellHooks.net/global"
	"ShellHooks.net/global/config"
	"ShellHooks.net/router/ginResult"
	"ShellHooks.net/utils/shellControl"
	"github.com/gin-gonic/gin"
)

type SysAuthParam struct {
	Password string
}

func Start(c *gin.Context) {
	var json SysAuthParam
	c.ShouldBind(&json)

	if json.Password != config.Encrypt(global.UserEnv.Password) {
		c.JSON(http.StatusOK, ginResult.ErrPassword.WithData("密码错误"))
		return
	}

	go shellControl.SysStart()
	c.JSON(http.StatusOK, ginResult.OK.WithMsg("指令已发送"))
}

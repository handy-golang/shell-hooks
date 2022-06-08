package private

import (
	"ShellHooks.net/server/router/midst"
	"ShellHooks.net/server/router/result"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
)

func MiddleWare(c *fiber.Ctx) error {
	c.Set("Data-Type", "ShellHooks.net/api/private")

	// 授权验证
	err := midst.EncryptAuth(c)
	if err != nil {
		return c.JSON(result.ErrApiAuth.WithData(mStr.ToStr(err)))
	}

	// Token 验证
	// _, err = midst.TokenAuth(c)
	// if err != nil {
	// 	return c.JSON(result.ErrToken.WithData(mStr.ToStr(err)))
	// }

	return c.Next()
}

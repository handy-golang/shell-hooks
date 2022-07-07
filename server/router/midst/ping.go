package midst

import (
	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/router/result"
	"github.com/EasyGolang/goTools/mRes/mFiber"
	"github.com/gofiber/fiber/v2"
)

func Ping(c *fiber.Ctx) error {
	json := mFiber.DataParser(c)

	ReturnData := make(map[string]any)
	ReturnData["ResParam"] = json
	ReturnData["Method"] = c.Method()
	ReturnData["AppInfo"] = config.AppInfo

	ReturnData["UserAgent"] = c.Get("User-Agent")
	ReturnData["FullPath"] = c.BaseURL() + c.OriginalURL()
	ReturnData["ContentType"] = c.Get("Content-Type")

	// 获取 token

	return c.JSON(result.OK.WithData(ReturnData))
}

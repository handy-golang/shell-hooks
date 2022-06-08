package public

import (
	"fmt"

	"ShellHooks.net/server/router/result"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mRes/mFiber"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
)

func GitHun(c *fiber.Ctx) error {
	json := mFiber.DataParser(c)

	jsonStr := mJson.ToJson(json)

	fmt.Println(mStr.ToStr(jsonStr))

	// 执行 start.sh 文件
	return c.JSON(result.Fail.WithData(json))
}

package public

import (
	"fmt"
	"net/http"

	"ShellHooks.net/router/ginResult"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

func GitHun(c *gin.Context) {
	var json map[string]any

	c.ShouldBind(&json)

	jsonStr := mJson.ToJson(json)

	fmt.Println(mStr.ToStr(jsonStr))

	// 执行 start.sh 文件
	c.JSON(http.StatusOK, ginResult.Fail.WithData(json))
}

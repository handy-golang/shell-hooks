package middleWare

import (
	"net/http"

	"WebHook.net/global/config"
	"WebHook.net/router/ginResult"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

func EncryptAuth(c *gin.Context) {
	AuthEncrypt := c.Request.Header["Auth-Encrypt"]

	if len(AuthEncrypt) < 1 {

		EncryptDataReturn(c, "需要授权码")

		c.Abort()
		return
	}

	shaStr := config.Encrypt(c.Request.URL.Path)

	if AuthEncrypt[0] != shaStr {
		EncryptDataReturn(c, "授权验证错误")
		c.Abort()
		return
	}
}

func EncryptDataReturn(c *gin.Context, content string) {
	Method := c.Request.Method
	if Method == "GET" {
		dev := map[string]string{
			"Content": content,
		}
		Str := mStr.Temp(TempStr, dev)
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(Str))
	} else {
		c.JSON(http.StatusOK, ginResult.ErrApiAuth.WithData(content))
	}
}

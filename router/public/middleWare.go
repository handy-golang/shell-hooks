package public

import (
	"WebHook.net/router/middleWare"
	"github.com/gin-gonic/gin"
)

func MiddleWare(c *gin.Context) {
	c.Writer.Header().Del("Data-Type")
	c.Header("Data-Type", "WebHook.net/api/public")

	// 授权验证
	middleWare.EncryptAuth(c)

	c.Next()
}

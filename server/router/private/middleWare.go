package private

import (
	"ShellHooks.net/router/middleWare"
	"github.com/gin-gonic/gin"
)

func MiddleWare(c *gin.Context) {
	c.Writer.Header().Del("Data-Type")
	c.Header("Data-Type", "ShellHooks.net/api/private")

	// 授权验证
	middleWare.EncryptAuth(c)

	c.Next()
}

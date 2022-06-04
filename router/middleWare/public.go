package middleWare

import (
	"WebHook.net/global/config"
	"github.com/gin-gonic/gin"
)

func Public(c *gin.Context) {
	// 添加访问头
	AddHeader(c)

	config.Encrypt(c.Request.URL.Path)

	// 授权验证
	// EncryptAuth(c)

	c.Next()
}

func AddHeader(c *gin.Context) {
	c.Writer.Header().Del("Data-Type")
	c.Header("Data-Type", "WebHook.net")
}

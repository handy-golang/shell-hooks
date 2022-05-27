package private

import (
	"github.com/gin-gonic/gin"
)

func MiddleWare(c *gin.Context) {
	c.Writer.Header().Del("Data-Type")
	c.Header("Data-Type", "WebHook.net/api/private")
	// 身份校验

	c.Next()
}

package public

import (
	"WebHook.net/router/middleWare"
	"github.com/gin-gonic/gin"
)

/*
/api/public
*/
func Router(router *gin.RouterGroup) {
	router.GET("", middleWare.Index(" /api/public 接口首页 "))
	router.GET("/", middleWare.Index(" /api/public 接口首页 "))

	router.GET("/ping", middleWare.GetPing)
	router.POST("/ping", middleWare.PostPing)
}

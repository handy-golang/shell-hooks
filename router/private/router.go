package private

import (
	"WebHook.net/router/middleWare"
	"github.com/gin-gonic/gin"
)

/*

/api/private

*/
func Router(router *gin.RouterGroup) {
	router.GET("", middleWare.Index(" /api/private 接口首页 "))
	router.GET("/", middleWare.Index(" /api/private 接口首页 "))

	router.GET("/ping", middleWare.GetPing)
	router.POST("/ping", middleWare.PostPing)
}

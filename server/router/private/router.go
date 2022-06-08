package private

import (
	"ShellHooks.net/router/middleWare"
	"ShellHooks.net/router/private/sys"
	"github.com/gin-gonic/gin"
)

/*

/api/private

*/
func Router(router *gin.RouterGroup) {
	router.GET("", middleWare.Index(" /api/private 接口首页 "))
	router.GET("/", middleWare.Index(" /api/private 接口首页 "))

	router.POST("/sys/start", sys.Start)

	router.GET("/ping", middleWare.GetPing)
	router.POST("/ping", middleWare.PostPing)
}

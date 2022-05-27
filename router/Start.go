package router

import (
	"fmt"
	"io"
	"os"
	"time"

	"WebHook.net/config"
	"WebHook.net/global"
	"WebHook.net/router/middleWare"
	"WebHook.net/router/private"
	"WebHook.net/router/public"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

var FilePathArr []string

func Start() {
	logFile, _ := os.Create(config.Dir.Log + "/WebServer-" + time.Now().Format("06年1月02日15时") + ".log")

	gin.DefaultWriter = io.MultiWriter(logFile)

	router := gin.Default()
	router.Use(
		middleWare.Public,
		middleWare.RateLimitMiddleware(time.Second, 100, 100),
	)

	router.GET("/", middleWare.Index("欢迎访问 WebHook.net 服务"))

	api_g := router.Group("/api")
	api_g.GET("/", middleWare.Index("这里是 WebHook.net/api 服务首页"))

	// public
	public_g := api_g.Group("/public")
	public_g.Use(public.MiddleWare)
	{
		public.Router(public_g)
	}

	// private
	private_g := api_g.Group("/private")
	private_g.Use(private.MiddleWare)
	{
		private.Router(private_g)
	}

	port := global.UserEnv.Port

	logStr := mStr.Join(`启动服务:  http://localhost:`, port)

	fmt.Println(logStr)
	global.Log.Println(logStr)
	router.Run(":" + port)
}

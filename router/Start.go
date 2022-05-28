package router

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"time"

	"WebHook.net/config"
	"WebHook.net/global"
	"WebHook.net/router/middleWare"
	"WebHook.net/router/private"
	"WebHook.net/router/public"
	"WebHook.net/tmpl"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

func Start() {
	logFile, _ := os.Create(config.Dir.Log + "/WebServer-" + time.Now().Format("06年1月02日15时") + ".log")

	gin.DefaultWriter = io.MultiWriter(logFile)

	router := gin.Default()

	// 模板渲染
	tmplObj := template.Must(template.New("").ParseFS(tmpl.Html, "**/*"))
	router.SetHTMLTemplate(tmplObj)

	router.StaticFS("/static", http.FS(tmpl.Static))

	// page index 首页
	router.GET("/", Index)
	router.GET("/index", Index)

	router.Use(
		middleWare.Public,
		middleWare.RateLimitMiddleware(time.Second, 100, 100),
	)

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

	// 404 处理
	router.NoRoute(NotFund)

	port := global.UserEnv.Port

	logStr := mStr.Join(`启动服务:  http://localhost:`, port)

	fmt.Println(logStr)
	global.Log.Println(logStr)
	router.Run(":" + port)
}

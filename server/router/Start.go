package router

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"time"

	"ShellHooks.net/global"
	"ShellHooks.net/global/config"
	"ShellHooks.net/router/middleWare"
	"ShellHooks.net/router/private"
	"ShellHooks.net/router/public"
	"ShellHooks.net/tmpl"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

func Start() {
	logFile, _ := os.Create(config.Dir.Log + "/WebServer-" + time.Now().Format("06年1月02日15时") + ".log")

	gin.DefaultWriter = io.MultiWriter(logFile)

	router := gin.Default()
	router.Use(
		middleWare.Public,
		middleWare.RateLimitMiddleware(time.Second, 100, 100),
	)

	// 模板渲染
	tmplObj := template.Must(template.New("").ParseFS(tmpl.Html, "**/*"))
	router.SetHTMLTemplate(tmplObj)

	router.StaticFS("/assets", http.FS(tmpl.Assets))

	// 404 处理
	router.NoRoute(NotFund)

	// page index 首页
	router.GET("/", Index)
	router.GET("/index", Index)

	api_g := router.Group("/api")
	api_g.GET("/", middleWare.Index("这里是 ShellHooks.net/api 服务首页"))

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

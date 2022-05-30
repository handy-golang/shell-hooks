package router

import (
	"net/http"

	"WebHook.net/global"
	"WebHook.net/global/config/public"
	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index/index.tmpl", gin.H{
		"title":     "WebHook.net",
		"ShellList": public.ShellFiles,
		"Ping":      global.AppPackage.Version,
	})
}

func NotFund(c *gin.Context) {
	c.HTML(http.StatusOK, "404/404.tmpl", gin.H{
		"title": "404 not found",
	})
}

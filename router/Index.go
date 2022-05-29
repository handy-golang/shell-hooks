package router

import (
	"net/http"

	"WebHook.net/config/public"
	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index/index.tmpl", gin.H{
		"title":     "WebHook.net",
		"ShellList": public.ShellFile,
	})
}

func NotFund(c *gin.Context) {
	c.HTML(http.StatusOK, "404/404.tmpl", gin.H{
		"title": "404 not found",
	})
}

package router

import (
	"net/http"

	"ShellHooks.net/global"
	"ShellHooks.net/global/config/public"
	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index/index.tmpl", gin.H{
		"ShellList":  public.ShellFiles,
		"AppPackage": global.AppPackage,
	})
}

func NotFund(c *gin.Context) {
	c.HTML(http.StatusOK, "404/404.tmpl", gin.H{
		"title": "404 not found",
	})
}

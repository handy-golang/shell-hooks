package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index/index.tmpl", gin.H{
		"title":    "WebHook.net",
		"keywords": "WebHook.net,mo7,墨七",
		"imgUrl":   "//bz.mo7.cc/api/public/bz?idx=1",
	})
}

func NotFund(c *gin.Context) {
	c.HTML(http.StatusOK, "404/404.tmpl", gin.H{
		"title": "404 not found",
	})
}

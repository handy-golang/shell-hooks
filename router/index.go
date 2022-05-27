package router

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	imgStr, _ := json.Marshal([]string{"1", "2", "4", "6"})
	c.HTML(http.StatusOK, "index/index.tmpl", gin.H{
		"title":    "必应每日一图v0.1",
		"keywords": "壁纸,bing,每日一图,必应,mo7,墨七",
		"imgUrl":   string(imgStr),
	})
}

func NotFund(c *gin.Context) {
	c.HTML(http.StatusOK, "404/404.tmpl", gin.H{
		"title": "404 not found",
	})
}

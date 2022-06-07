package middleWare

import (
	"net/http"

	"ShellHooks.net/global"
	"ShellHooks.net/router/ginResult"
	"github.com/gin-gonic/gin"
)

// get
func GetPing(c *gin.Context) {
	json := make(map[string]string)
	c.Bind(&json)
	PingAction(c, json)
}

// post
func PostPing(c *gin.Context) {
	json := make(map[string]string)
	c.ShouldBind(&json)

	PingAction(c, json)
}

func PingAction(c *gin.Context, json map[string]string) {
	ReturnData := make(map[string]any)
	ReturnData["ResParam"] = json

	ReturnData["AppVersion"] = global.AppPackage.Version

	ReturnData["ClientApi"] = c.ClientIP()

	Request := make(map[string]any)
	Request["URL"] = c.Request.URL
	Request["Header"] = c.Request.Header
	Request["Host"] = c.Request.Host
	Request["Method"] = c.Request.Method
	Request["UserAgent"] = c.Request.UserAgent()
	Request["RequestURI"] = c.Request.RequestURI
	ReturnData["Request"] = Request

	AuthToken := c.Request.Header["Auth-Token"]

	if len(AuthToken) > 0 && len(AuthToken[0]) > 20 {
		c.JSON(http.StatusOK, ginResult.OK.WithData(ReturnData))
	} else {
		c.JSON(http.StatusOK, ginResult.OK.WithData(ReturnData))
	}
}

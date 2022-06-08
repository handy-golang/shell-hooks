package middleWare

import (
	"net/http"

	"github.com/EasyGolang/goTools/mStr"
	"github.com/gin-gonic/gin"
)

var TempStr = `
<a href="//mo7.cc"> ${Content} </a>
`

func Index(Content string) gin.HandlerFunc {
	dev := map[string]string{
		"Content": Content,
	}

	Str := mStr.Temp(TempStr, dev)

	return func(c *gin.Context) {
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(Str))
	}
}

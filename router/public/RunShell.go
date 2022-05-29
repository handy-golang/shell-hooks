package public

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func RunShell(c *gin.Context) {
	json := make(map[string]string)
	c.ShouldBind(&json)

	fmt.Println(json)
}

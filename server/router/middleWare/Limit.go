package middleWare

import (
	"net/http"
	"time"

	"ShellHooks.net/router/ginResult"
	"github.com/gin-gonic/gin"
	"github.com/juju/ratelimit"
)

func RateLimitMiddleware(fillInterval time.Duration, cap, quantum int64) gin.HandlerFunc {
	bucket := ratelimit.NewBucketWithQuantum(fillInterval, cap, quantum)
	return func(c *gin.Context) {
		if bucket.TakeAvailable(1) < 1 {
			c.JSON(http.StatusOK, ginResult.ErrHz.WithData("请求太频繁"))
			c.Abort()
			return
		}
		c.Next()
	}
}

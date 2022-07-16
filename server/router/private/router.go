package private

import (
	"ShellHooks.net/server/router/private/sys"
	"github.com/gofiber/fiber/v2"
)

/*

/api/private

*/

func Router(api fiber.Router) {
	r := api.Group("/private", MiddleWare)
	r.Post("/sys/start", sys.Start)
	r.Post("/shell_run", RunShell)
}

package public

import (
	"ShellHooks.net/server/router/midst"
	"github.com/gofiber/fiber/v2"
)

/*
/api/public
*/
func Router(api fiber.Router) {
	r := api.Group("/public", MiddleWare)

	r.Post("/shell_run", RunShell)

	r.Post("/github_webhooks", GitHun)

	r.Get("/ping", midst.Ping)
	r.Post("/ping", midst.Ping)
}

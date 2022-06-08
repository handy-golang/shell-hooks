package router

import (
	"ShellHooks.net/server/global/config"
	"ShellHooks.net/server/global/config/public"
	"github.com/gofiber/fiber/v2"
)

func Index(c *fiber.Ctx) error {
	return c.Render("index/index.tmpl", fiber.Map{
		"ShellList": public.ShellFiles,
		"AppInfo":   config.AppInfo,
	})
}

func NotFund(c *fiber.Ctx) error {
	return c.Render("404/404.tmpl", fiber.Map{
		"title": "404 not found",
	})
}

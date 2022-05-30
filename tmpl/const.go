package tmpl

import (
	"embed"

	"WebHook.net/static"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

var Static = static.Templates

//go:embed *
var Html embed.FS

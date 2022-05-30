package tmpl

import (
	"embed"

	"WebHook.net/assets"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

var Assets = assets.Templates

//go:embed *
var Html embed.FS

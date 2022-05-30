package tmpl

import (
	_ "embed"

	"WebHook.net/static"
	"WebHook.net/tmpl/html"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

var Html = html.Templates

var Static = static.Templates

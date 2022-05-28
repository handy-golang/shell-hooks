package tmpl

import (
	_ "embed"

	"WebHook.net/tmpl/html"
	"WebHook.net/tmpl/static"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

var Html = html.Templates

var Static = static.Templates

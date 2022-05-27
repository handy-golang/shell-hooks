package tmpl

import (
	_ "embed"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

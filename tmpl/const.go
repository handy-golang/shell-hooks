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

//go:embed tikker.sh
var TikkerSh string

type TikkerShParam struct {
	Path      string
	ShellCont string
}

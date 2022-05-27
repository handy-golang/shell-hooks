package tmpl

import (
	"embed"
)

//go:embed email.html
var Email string

type EmailParam struct {
	Message string
	SysTime string
}

//go:embed html/*
var Templates embed.FS

//go:embed static/*
var Static embed.FS

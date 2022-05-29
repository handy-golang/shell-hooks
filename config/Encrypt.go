package config

import (
	"github.com/EasyGolang/goTools/mEncrypt"
	"github.com/EasyGolang/goTools/mStr"
)

var SecretKey = mEncrypt.MD5("WebHook is good")

func Encrypt(msg string) string {
	return mEncrypt.Sha256(
		mStr.Join(msg, "mo7"),
		SecretKey)
}

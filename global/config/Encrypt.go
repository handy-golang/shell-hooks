package config

import (
	"fmt"
	"time"

	"github.com/EasyGolang/goTools/mEncrypt"
	"github.com/EasyGolang/goTools/mStr"
)

var SecretKey = mEncrypt.MD5("WebHook is good")

func Encrypt(msg string) string {
	now := time.Now().Unix() / 60

	fmt.Println(now)

	return mEncrypt.Sha256(
		mStr.Join(msg, "mo7"),
		SecretKey)
}

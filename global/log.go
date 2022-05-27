package global

import (
	"fmt"
	"log"
	"os"

	"WebHook.net/config"
	"WebHook.net/tmpl"
	"github.com/EasyGolang/goTools/mLog"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mTime"
)

var Log *log.Logger // 系统日志& 重大错误或者事件

func LogInt() {
	// 检测 logs 目录
	isLogPath := mPath.Exists(config.Dir.Log)
	if !isLogPath {
		// 不存在则创建 logs 目录
		os.Mkdir(config.Dir.Log, 0o777)
	}

	Log = mLog.NewLog(mLog.NewLogParam{
		Path: config.Dir.Log,
		Name: "Sys",
	})
}

func LogErr(sum ...any) {
	str := fmt.Sprintf("系统错误 : %+v", sum)
	Log.Println(str)

	Email := Email(EmailOpt{
		To:       UserEnv.Email.To,
		Subject:  "LogErr",
		Template: tmpl.Email,
		SendData: tmpl.EmailParam{
			Message: str,
			SysTime: mTime.UnixFormat(""),
		},
	})

	go Email.Send()
}

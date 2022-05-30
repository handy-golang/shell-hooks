package global

import (
	"time"

	"WebHook.net/global/config"
	"github.com/EasyGolang/goTools/mCycle"
	"github.com/EasyGolang/goTools/mJson"
)

func Start() {
	// 初始化目录列表
	config.PathInit()

	// 初始化日志系统 保证日志可用
	mCycle.New(mCycle.Opt{
		Func:      LogInt,
		SleepTime: time.Hour * 8,
	}).Start()

	Log.Println(mJson.JsonFormat(mJson.ToJson(AppPackage)))
	Log.Println(mJson.JsonFormat(mJson.ToJson(config.Dir)))

	// 加载用户配置文件
	UserEnvInit()

	logStr := `系统初始化完成`
	Log.Println(logStr)
}

package global

import (
	"fmt"
	"time"

	"ShellHooks.net/global/config"
	"github.com/EasyGolang/goTools/mCycle"
	"github.com/EasyGolang/goTools/mJson"
	"github.com/EasyGolang/goTools/mPath"
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

	isStartShell := mPath.Exists(config.File.StartShell)
	if !isStartShell {
		errStr := fmt.Errorf("缺少文件:" + config.File.StartShell)
		LogErr(errStr)
		panic(errStr)
	}
	isStoptShell := mPath.Exists(config.File.StopShell)
	if !isStoptShell {
		errStr := fmt.Errorf("缺少文件:" + config.File.StopShell)
		LogErr(errStr)
		panic(errStr)
	}

	// 加载用户配置文件
	UserEnvInit()

	logStr := `系统初始化完成`
	Log.Println(logStr)
}

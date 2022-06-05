package ready

import (
	"fmt"
	"time"

	"github.com/EasyGolang/goTools/mCycle"
	"github.com/EasyGolang/goTools/mFetch"
	"github.com/EasyGolang/goTools/mStr"
)

func Start() {
	mCycle.New(mCycle.Opt{
		Func:      SetShell,
		SleepTime: time.Minute * 2,
	}).Start()
	// 读取项目的最新版本
}

func ReadVersion() {
	//

	resData := mFetch.NewHttp(mFetch.HttpOpt{
		Origin: "https://github.com",
		Path:   "/EasyGolang/WebHook.net/raw/main/package.json",
	}).Get()

	fmt.Println("resData", mStr.ToStr(resData))
}

package ready

import (
	"time"

	"github.com/EasyGolang/goTools/mCycle"
)

func Start() {
	mCycle.New(mCycle.Opt{
		Func:      SetShell,
		SleepTime: time.Minute * 2,
	}).Start()
}

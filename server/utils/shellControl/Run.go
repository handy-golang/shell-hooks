package shellControl

import (
	"ShellHooks.net/global/config"
	"github.com/EasyGolang/goTools/mTikker"
)

// https://blog.csdn.net/raoxiaoya/article/details/109014347

func SysStart() {
	mTikker.NewTikker(mTikker.TikkerOpt{
		LogPath: config.Dir.Log,
		ShellContent: `
source ./start.sh
		`,
	}).RunToPm2()
}

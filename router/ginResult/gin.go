package ginResult

import "github.com/EasyGolang/goTools/mGin"

var (
	Not                 = mGin.Response(0, "Not")     // 无响应
	OK                  = mGin.Response(1, "Succeed") // 通用成功
	LoginSucceed        = mGin.Response(2, "登录成功")
	RegisterSucceed     = mGin.Response(3, "用户数据录入成功")
	EditPasswordSucceed = mGin.Response(4, "修改成功")
	SendCodeSucceed     = mGin.Response(5, "验证码已发送")
	UploadSucceed       = mGin.Response(6, "上传成功")
	EditUserSucceed     = mGin.Response(7, "修改成功")
	CreateHunterSucceed = mGin.Response(8, "创建成功")
	CreateHunterShell   = mGin.Response(9, "脚本已生成")

	Fail           = mGin.Response(-1, "Fail") // 通用错误
	ErrToken       = mGin.Response(-2, "Token验证失败")
	ErrApiAuth     = mGin.Response(-3, "授权验证失败")
	ErrCodeExpired = mGin.Response(-4, "验证码已过期")
	ErrPassword    = mGin.Response(-6, "密码错误")
	ErrHz          = mGin.Response(-7, "请求太频繁")
	ErrName        = mGin.Response(-8, "5-10位小写字母或数字")
	ErrDB          = mGin.Response(-9, "数据库出错")
	ErrRole        = mGin.Response(-10, "角色不正确!")
	ErrUserNote    = mGin.Response(-11, "请输入角色描述")
	ErrRoleAuth    = mGin.Response(-12, "当前用户无权限")
	ErrUserNot     = mGin.Response(-13, "该账号不存在")
	ErrUserYet     = mGin.Response(-14, "该账号已存在")
	ErrRmUser      = mGin.Response(-15, "注销账户失败")
	// -15
	// -16
	ErrUpload       = mGin.Response(-17, "上传失败")
	ErrEditUser     = mGin.Response(-18, "用户信息修改失败")
	ErrCreateHunter = mGin.Response(-19, "Hunter创建失败")
)

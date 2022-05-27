import { Form, Input, Button } from 'antd';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

interface verifyType {
  validateStatus: ValidateStatus;
  help: string | null;
}
//  https://blog.csdn.net/yufengaotian/article/details/90230452
export function verifyConfig(label: string, val: string, val2?: string): verifyType {
  const passwordReg = /^[a-zA-Z0-9]{6,16}$/g;
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  const nickNameReg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/g;

  if (label === 'Email') {
    if (!emailReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '请输入有效的邮箱地址',
      };
    }
  }

  if (label === 'NickName') {
    if (!nickNameReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '1-12位汉字、数字、字母、下划线',
      };
    }
  }

  if (label === 'NewEmail') {
    if (!emailReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '请输入有效的邮箱地址',
      };
    }
  }

  if (label === 'OldEmailCode') {
    if (val.length < 6) {
      return {
        validateStatus: 'error',
        help: '请输入有效的验证码',
      };
    }
  }

  if (label === 'NewEmailCode') {
    if (val.length < 6) {
      return {
        validateStatus: 'error',
        help: '请输入有效的验证码',
      };
    }
  }

  if (label === 'Code') {
    if (val.length < 6) {
      return {
        validateStatus: 'error',
        help: '请输入有效的验证码',
      };
    }
  }

  if (label === 'AgainPassword') {
    if (val !== val2) {
      return {
        validateStatus: 'error',
        help: '两次输入的密码不一致',
      };
    }
  }

  if (label.indexOf('Password') > -1) {
    if (!passwordReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '请输入6-16位字母或数字',
      };
    }
  }

  return {
    validateStatus: '',
    help: null,
  };
}

export function hunterVerifyConfig(label: string, val: string): verifyType {
  const passwordReg = /^[a-zA-Z0-9]{6,16}$/g;
  const nickNameReg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/g;

  if (label === 'Name') {
    if (!nickNameReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '1-12位汉字、数字、字母、下划线',
      };
    }
  }

  if (label === 'ApiKey') {
    if (val.length < 30) {
      return {
        validateStatus: 'error',
        help: '请输入有效的 ApiKey ',
      };
    }
  }
  if (label === 'SecretKey') {
    if (val.length < 30) {
      return {
        validateStatus: 'error',
        help: '请输入有效的 SecretKey ',
      };
    }
  }
  if (label === 'Passphrase') {
    if (val.length < 4) {
      return {
        validateStatus: 'error',
        help: '请输入 Passphrase ',
      };
    }
  }

  if (label.indexOf('Password') > -1) {
    if (!passwordReg.test(val)) {
      return {
        validateStatus: 'error',
        help: '请输入6-16位字母或数字',
      };
    }
  }

  return {
    validateStatus: '',
    help: null,
  };
}

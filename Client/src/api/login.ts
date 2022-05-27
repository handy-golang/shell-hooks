import { ajax_json } from '@/utils/http';
import { removeToken } from '@/utils/utils';
import { Encrypt } from '@/config';

interface registerData {
  Email: string;
  Code: string;
}
export const Register = (data: registerData) => {
  const param = {
    ...data,
    Code: Encrypt(data.Code),
  };

  return ajax_json({
    url: '/public/register',
    data: param,
    method: 'post',
  });
};

interface editPasswordData {
  Email: string;
  Code: string;
  Password: string;
  AgainPassword: string;
}
export const editPassword = (data: editPasswordData) => {
  const param = {
    ...data,
    Code: Encrypt(data.Code),
    Password: Encrypt(data.Password),
    AgainPassword: Encrypt(data.AgainPassword),
  };

  return ajax_json({
    url: '/public/edit_password',
    data: param,
    method: 'post',
  });
};

interface loginData {
  Email: string;
  Password: string;
}
export const login = (data: loginData) => {
  const param = {
    ...data,
    Password: Encrypt(data.Password),
  };

  return ajax_json({
    url: '/public/login',
    data: param,
    method: 'post',
  });
};

export const outLogin = () => {
  removeToken();
  window.location.replace('/login');
};

interface sendCodeData {
  Email: string;
  Action: string;
}
export const sendCode = (data: sendCodeData) => {
  return ajax_json({
    url: '/public/send_code',
    data,
    method: 'post',
  });
};

// 用户信息的获取与编辑
export const getUserInfo = () => {
  return ajax_json({
    url: '/private/get_user_info',
    data: {},
    method: 'get',
  });
};

interface editUserInfo {
  OldEmailCode: string;
  NewEmail: string;
  NewEmailCode: string;
  Avatar: string;
  NickName: string;
  AuthCode: string;
}
export const editUserInfo = (data: editUserInfo) => {
  const param = {
    ...data,
    OldEmailCode: Encrypt(data.OldEmailCode),
    NewEmailCode: Encrypt(data.NewEmailCode),
  };

  return ajax_json({
    url: '/private/edit_user_info',
    data: param,
    method: 'post',
  });
};

interface SysPointParam {
  Email: string;
  Password: string;
  Code: string;
}
export const removeAccount = (data: SysPointParam) => {
  const param = {
    ...data,
    Email: window.ViteConst.rmAgin + data.Email,
    Password: Encrypt(data.Password),
    Code: Encrypt(data.Code),
  };

  return ajax_json({
    url: '/private/remove_user',
    data: param,
    method: 'post',
  });
};

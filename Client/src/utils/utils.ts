import store from 'store';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

import { getUserInfo } from '@/api/login';
import { resDataType } from '@/utils/utils.d';

import { HunterLogo } from '@/config/constant';
import _ from 'lodash';

import Qs from 'qs';

export const mStorage = store;

export const getUrlParams = () => {
  const url = window.location.href;
  const index = url.indexOf('?');
  if (index === -1) {
    return {};
  }
  const params = url.slice(index + 1);
  const paramObj = Qs.parse(params);
  return paramObj;
};

export const isPwa = (): boolean => {
  return ['fullscreen', 'standalone', 'minimal-ui'].some(
    (displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches,
  );
};

export const cloneDeep = (data: any): any => {
  return JSON.parse(JSON.stringify(data));
};

export const $lg = (obj: any, path: string, defaultValue: any = ''): any => {
  const data = _.get(obj, path, defaultValue);
  return data;
};
export const $lcg = (obj: any, path: string, defaultValue: any = ''): any => {
  const data = _.get(obj, path, defaultValue);
  return cloneDeep(data);
};

export const getToken = (): string => {
  const token: string = mStorage.get('token');
  if (token) {
    return token;
  } else {
    return '';
  }
};

export const removeToken = () => {
  mStorage.clearAll();
};

import { UserInfoType } from '@/store';
export const getLocalUserInfo = (): UserInfoType => {
  let UserInfo = {
    Avatar: '',
    CreateTime: '',
    Email: '',
    NickName: '',
    UserID: '',
    UpdateTime: '',
    Token: '',
  };
  const Token = getToken();
  const localV = mStorage.get('user_info');
  if (localV?.UserID.length > 10) {
    UserInfo = {
      ...localV,
      Token,
    };
  }

  if (!UserInfo.Avatar) {
    UserInfo.Avatar = HunterLogo;
  }

  return UserInfo;
};

export const setToken = async (tokenStr: string) => {
  mStorage.set('token', tokenStr);
  return new Promise<resDataType>((resolve, reject) => {
    const localToken = getToken();
    if (localToken) {
      getUserInfo().then((res) => {
        if (res.Code > 0 && res.Data.UserID) {
          mStorage.set('user_info', res.Data);
          resolve(res);
        } else {
          removeToken();
          reject(res);
        }
      });
    }
  });
};

export const CopyText = (text: string) => {
  copy(text);
  message.success('已复制到剪切板');
};

export const Shield = (str: string): string => {
  let last = str.substring(str.length - 3);

  const pre = str.substring(0, 3);

  if (str.indexOf('@') > -1) {
    last = str.split('@')[1];
  }

  return `${pre}***${last}`;
};

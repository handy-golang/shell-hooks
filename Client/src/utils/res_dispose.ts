import { message } from 'antd';
import { resType, resDataType } from './utils.d';
import { setToken, removeToken } from './utils';

import { outLogin } from '@/api/login';

export const res_dispose = (response: resType): resDataType => {
  const config = response.config;
  const data = response.data;

  if (data.Code === -8) {
    message.warning(data.Msg);
    return data;
  }

  if (config.message !== -1) {
    if (data.Code < 0) {
      message.error(data.Msg);
      return data;
    }
  }

  if (data.Code === 2) {
    setToken(data.Data.Token);
    return data;
  }

  if (data.Code === -2 || data.Code === -6) {
    setTimeout(() => {
      outLogin();
    }, 1000);
    return data;
  }

  return data;
};

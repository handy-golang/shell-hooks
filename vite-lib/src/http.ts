import axios from 'axios';
import { mo7Encrypt } from '@/tools';

const service = axios.create();
const $axios_set_default = () => {
  // service.defaults.timeout = 8000; //超时 8 秒
  //请求拦截
  service.interceptors.request.use(
    (config) => {
      // console.info('请求开始');
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  //响应拦截
  service.interceptors.response.use(
    (response) => {
      // console.info('请求结束');
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

$axios_set_default();

import type { axiosParam, resDataType } from '@/vite-env.d';

const ajax = (param: axiosParam): Promise<resDataType> => {
  const config: axiosParam = {
    headers: {
      'Auth-Encrypt': mo7Encrypt(param.url + window.navigator.userAgent),
    },
    ...param,
  };
  //请求参数转换
  if (config.method === 'get' || !config.method) {
    config.params = config.data;
    delete config.data;
  }
  return service(config);
};
export { ajax };

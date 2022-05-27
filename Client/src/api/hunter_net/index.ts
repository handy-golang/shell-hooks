import { ajax_json } from '@/utils/http';
import { HunterServer } from '@/api/hunter';
import { Encrypt } from '@/config';

interface HunterNetParam {
  ServerInfo: HunterServer;
}

export const getHunterConfig = (data: HunterNetParam) => {
  return ajax_json({
    url: '/hunter_net/private/get_config',
    data: null,
    method: 'get',
    HunterNet: data.ServerInfo,
  });
};

export const postPing = (data: HunterNetParam) => {
  return ajax_json({
    url: '/hunter_net/private/ping',
    data: null,
    method: 'post',
    HunterNet: data.ServerInfo,
  });
};

interface SysPointParam {
  ServerInfo: HunterServer;
  Password: string;
  Code: string;
}
export const sysStart = (data: SysPointParam) => {
  const param = {
    ...data,
    Password: Encrypt(data.Password),
    Code: Encrypt(data.Code),
  };

  return ajax_json({
    url: '/hunter_net/private/sys/start',
    data: param,
    method: 'post',
    HunterNet: data.ServerInfo,
  });
};

export const sysStop = (data: SysPointParam) => {
  const param = {
    ...data,
    Password: Encrypt(data.Password),
    Code: Encrypt(data.Code),
  };
  return ajax_json({
    url: '/hunter_net/private/sys/stop',
    data: param,
    method: 'post',
    HunterNet: data.ServerInfo,
  });
};

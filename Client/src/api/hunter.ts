import { ajax_json } from '@/utils/http';
import { Encrypt } from '@/config';

export interface OkxKey {
  OkxKeyID?: string;
  ApiKey: string;
  Name: string;
  IP: string;
  SecretKey: string;
  Passphrase: string;
  Note: string;
  UpdateTime?: number;
  CreateTime?: number;
  Password?: string;
}
export interface HunterServer {
  HunterServerID?: string;
  OkxKeyID: string;
  Port: string;
  Host?: string;
  Note: string;
  CreateTime?: number;
  Password?: string;
}
export interface HunterDataType {
  Password?: string;
  OkxKeyList: Array<OkxKey>;
  HunterServerList: Array<HunterServer>;
}

export interface HunterParamType {
  Password: string;
}
export const getHunterInfo = (data?: HunterParamType) => {
  const param: any = {};

  if (data && data.Password.length > 0) {
    param.Password = Encrypt(data.Password);
  }

  return ajax_json({
    url: '/private/hunter_info',
    data: param,
    method: 'post',
  });
};

export const createHunterServer = (data: HunterServer) => {
  const param = {
    ...data,
  };
  if (data.Password) {
    param.Password = Encrypt(data.Password);
  }
  return ajax_json({
    url: '/private/hunter_create_server',
    data: param,
    method: 'post',
  });
};

export const createOkxKey = (data: OkxKey) => {
  const param = {
    ...data,
  };
  if (data.Password) {
    param.Password = Encrypt(data.Password);
  }

  return ajax_json({
    url: '/private/hunter_create_okxkey',
    data: param,
    method: 'post',
  });
};

interface RemoveParamType {
  ID: string;
  Type: 'HunterServer' | 'OkxKey';
  Password: string;
}

export const hunterDataRemove = (data: RemoveParamType) => {
  const param = {
    ...data,
  };
  if (data.Password) {
    param.Password = Encrypt(data.Password);
  }

  return ajax_json({
    url: '/private/hunter_remove_info',
    data: param,
    method: 'post',
  });
};

export const serverPing = (data: { HunterServerID: HunterServer['HunterServerID'] }) => {
  return ajax_json({
    url: '/private/hunter_ping',
    data,
    message: -1,
    method: 'post',
  });
};

export const startHunterServer = (data: {
  HunterServerID: HunterServer['HunterServerID'];
  Password: RemoveParamType['Password'];
}) => {
  const param = {
    ...data,
  };
  if (data.Password) {
    param.Password = Encrypt(data.Password);
  }

  return ajax_json({
    url: '/private/hunter_start',
    data: param,
    method: 'post',
  });
};

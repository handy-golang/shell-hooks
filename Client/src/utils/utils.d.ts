import { HunterServer } from '@/api/hunter';

export interface axiosParam {
  url: string;
  data: any;
  method: 'get' | 'post';
  [any: string]: any;
  HunterNet?: HunterServer;
}

export interface resDataType {
  Code: number;
  Data: any;
  Msg: string;
}

export interface resConfig {
  message: number;
  [key: string]: any;
}
export interface resType {
  data: resDataType;
  config: resConfig;
}

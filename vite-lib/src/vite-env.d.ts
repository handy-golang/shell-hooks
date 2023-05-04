/// <reference types="vite/client" />
import $ from 'cash-dom';
import axios from 'axios';
import { ajax } from '@/http';

declare global {
  declare const $ref: any;
  declare const ViteConst: any;

  interface Window {
    mo7Encrypt: (msg: string) => string;
    mo7Md5: (msg: string) => string;
    ViteConst: {
      AppVersion: string;
      AppName: string;
    };
    $Event: {
      [string]: any;
    };
    $: $;
    $ajax: ajax;
  }
}

export interface axiosParam {
  BaseUrl?: string;
  url: string;
  data: any;
  method: 'get' | 'post';
  [any: string]: any;
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
  headers: any;
}

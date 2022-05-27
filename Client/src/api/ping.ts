import { ajax_json, axios } from '@/utils/http';

export const getPing = (data?: any) => {
  return ajax_json({
    url: '/public/ping',
    data,
    method: 'get',
  });
};

export const postPing = (data?: any) => {
  return ajax_json({
    url: '/public/ping',
    data,
    method: 'post',
  });
};

import dayjs from 'dayjs';
import { OkxKey, HunterServer } from '@/api/hunter';

export const amountFormat = (val: string): string => {
  interface paramType {
    value: number | string;
    unit: string;
  }

  const value = parseInt(val, 10);

  const param: paramType = {
    value: 0,
    unit: '',
  };

  const k = 10000;
  const sizes = ['', '万', '亿', '万亿'];
  let i;

  if (value < k) {
    param.value = value;
    param.unit = '';
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    param.value = (value / Math.pow(k, i)).toFixed(2);
    param.unit = sizes[i];
  }

  return param.value + param.unit;
};

export const dateFormat = (val: number, isMill = false): string => {
  const time = new Date(Number(val));
  const dayJsVal = dayjs(time);
  const year = dayJsVal.year();
  const mon = dayJsVal.month();
  const day = dayJsVal.date();
  const h = dayJsVal.hour();
  const m = dayJsVal.minute();
  const s = dayJsVal.second();
  const mill = dayJsVal.millisecond();
  if (isMill) {
    return `${year}-${mon}-${day} ${h}:${m}:${s} ${mill}`;
  } else {
    return `${year}-${mon}-${day} ${h}:${m}:${s}`;
  }
};

export const ChartToStr = (val: string): string => {
  let txt = '';
  switch (val) {
    case 'Register':
      txt = `注册`;
      break;
    case 'Login':
      txt = `登录`;
      break;
    case 'EditPassword':
      txt = `修改密码`;
      break;
    default:
      break;
  }
  return txt;
};

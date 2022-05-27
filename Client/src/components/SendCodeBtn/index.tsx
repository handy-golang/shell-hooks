import { Button, message } from 'antd';
import React from 'react';

import { sendCode } from '@/api/login';
import { verifyConfig } from '@/utils/verify';

function FilterNum(num: Number): string {
  if (num === 0) {
    return '发送验证码';
  } else {
    return `重新发送${num}`;
  }
}

let timer: any = null;

interface PropsType {
  Email: string;
  Action: string;
  onClick: Function;
}
const SendCodeBtn = (props: PropsType) => {
  const [num, setNum] = React.useState(0);

  React.useEffect(() => {
    clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (num === 60) {
      timer = setInterval(() => {
        setNum((num) => {
          return num - 1;
        });
      }, 1000);
    } else if (num < 1) {
      clearInterval(timer);
      setNum(0);
    }
  }, [num]);

  const sendCodeFunc = async () => {
    clearInterval(timer);
    setNum(60);
    const v = verifyConfig('Email', props.Email);
    props.onClick();

    if (v.help) {
      setNum(0);
      return;
    }

    const res = await sendCode({
      Email: props.Email,
      Action: props.Action,
    });

    if (res.Code > 0) {
      message.success(res.Msg);
      if (num === 0) {
        clearInterval(timer);
        setNum(60);
      }
    } else {
      setNum(0);
    }
  };

  return (
    <Button disabled={!!num} className="SendCodeBtn" type="primary" onClick={sendCodeFunc}>
      {FilterNum(num)}
    </Button>
  );
};

export default SendCodeBtn;

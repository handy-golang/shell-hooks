import React, { ReactNode } from 'react';
import { Card, Empty, Button, Modal, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { sendCode } from '@/api/login';

import { getLocalUserInfo, Shield } from '@/utils/utils';

export interface BackData {
  Email: string;
  Password: string;
  Code: string;
}

export interface Config {
  Title?: string;
  Info?: ReactNode;
  IsPassword?: boolean;
  IsEmail?: boolean;
  EmailAction?: string;
  OkBack: (res: BackData) => Promise<any>;
}
export const AuthModal = (opt: Config) => {
  const userInfo = getLocalUserInfo();
  const { Title = '需要验证', Info, EmailAction = '', IsPassword = true, IsEmail = false } = opt;
  if (EmailAction) {
    sendCode({
      Email: userInfo.Email,
      Action: EmailAction,
    });
  }

  let formData = {
    Email: '',
    Password: '',
    Code: '',
  };
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Elm = event.target;
    const value = Elm.value;
    const label = Elm.name;
    const valStr = value.replace(/\s*/g, '');
    formData = {
      ...formData,
      [label]: valStr,
    };
  };

  const TitleNode = () => {
    return (
      <div>
        {Title}
        <LockOutlined />
      </div>
    );
  };

  Modal.confirm({
    title: <TitleNode />,
    icon: null,
    wrapClassName: style.AuthModal,
    cancelText: '取消',
    okText: '提交',
    content: (
      <div className={style.AuthModalContent}>
        {IsEmail && (
          <Input
            name="Email"
            className={style.Input}
            onChange={inputChange}
            autoComplete="new-password"
            placeholder="请输入完整的Email"
          />
        )}
        {IsPassword && (
          <Input.Password
            name="Password"
            className={style.Input}
            onChange={inputChange}
            autoComplete="new-password"
            placeholder="请输入密码"
          />
        )}

        {EmailAction && (
          <Input
            name="Code"
            className={style.Input}
            onChange={inputChange}
            autoComplete="new-password"
            placeholder={`验证码已发送至${Shield(userInfo.Email)}`}
          />
        )}

        <div className={style.Info}>{Info}</div>
      </div>
    ),
    onOk() {
      return opt.OkBack(formData);
    },
  });
};

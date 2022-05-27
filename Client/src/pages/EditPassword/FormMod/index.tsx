import { Form, Input, Button, message } from 'antd';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';

import { verifyConfig } from '@/utils/verify';

import { removeToken } from '@/utils/utils';

import { editPassword } from '@/api/login';
const SendCodeBtn = React.lazy(() => import('@/components/SendCodeBtn'));

import './index.less';

import { useNavigate } from 'react-router-dom';
import { StoreContext } from '@/store';

const FormMod = () => {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formValue, setFormValue] = React.useState({
    Email: UserInfo.Email,
    Code: '',
    Password: '',
    AgainPassword: '',
  });

  const [verify, setVerify] = React.useState({
    Email: {},
    Code: {},
    Password: {},
    AgainPassword: {},
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Elm = event.target;
    const value = Elm.value;
    const label = Elm.name;
    const valStr = value.replace(/\s*/g, '');

    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        [label]: valStr,
      };
      return nowVal;
    });
    setVerify({
      Email: {},
      Code: {},
      Password: {},
      AgainPassword: {},
    });
  };

  const verifyChange = (label: string, val: string, val2?: string) => {
    const verify = verifyConfig(label, val, val2);
    setVerify((preVal) => {
      const nowVal = {
        ...preVal,
        [label]: verify,
      };

      return nowVal;
    });

    return verify;
  };

  const [submitBtnStatus, setSubmitBtnStatus] = React.useState(false);
  const submitFunc = async () => {
    setSubmitBtnStatus(true);

    const v1 = verifyChange('Email', formValue.Email);
    const v2 = verifyChange('Code', formValue.Code);
    const v3 = verifyChange('Password', formValue.Password);
    const v4 = verifyChange('AgainPassword', formValue.Password, formValue.AgainPassword);
    if (v1.help || v2.help || v3.help || v4.help) {
      setSubmitBtnStatus(false);
      return;
    }

    const res = await editPassword({
      Email: formValue.Email,
      Code: formValue.Code,
      Password: formValue.Password,
      AgainPassword: formValue.AgainPassword,
    });

    if (res.Code > 0) {
      message.success(res.Msg);
      removeToken();
      setTimeout(() => {
        setFormValue({
          Email: '',
          Code: '',
          Password: '',
          AgainPassword: '',
        });
        navigate(`/login`, { replace: true });
      });
    }
    setSubmitBtnStatus(false);
  };
  const SendCodeClick = () => {
    verifyChange('Email', formValue.Email);
  };

  return (
    <div className="EditPassword__formMod">
      <Form form={form} name="login" autoComplete="off">
        <Form.Item className="EditPassword__inputG" {...verify.Email}>
          <Input.Group compact>
            <Input
              name="Email"
              autoComplete="new-password"
              prefix={<MailOutlined />}
              onChange={inputChange}
              value={formValue.Email}
              disabled={!!UserInfo.Email}
              placeholder="请输入邮箱地址"
            />
          </Input.Group>
        </Form.Item>

        <Form.Item className="EditPassword__inputG" {...verify.Code}>
          <Input.Group compact>
            <Input
              className="EditPassword__Code"
              prefix={<MessageOutlined />}
              onChange={inputChange}
              name="Code"
              value={formValue.Code}
              autoComplete="new-password"
              placeholder="请输入6位验证码"
              maxLength={6}
            />
            <SendCodeBtn Action="修改密码" Email={formValue.Email} onClick={SendCodeClick} />
          </Input.Group>
        </Form.Item>

        <Form.Item className="EditPassword__inputG" {...verify.Password}>
          <Input.Group compact>
            <Input.Password
              name="Password"
              onChange={inputChange}
              value={formValue.Password}
              autoComplete="new-password"
              placeholder="请输入新密码"
            />
          </Input.Group>
        </Form.Item>

        <Form.Item className="EditPassword__inputG" {...verify.AgainPassword}>
          <Input.Group compact>
            <Input.Password
              name="AgainPassword"
              onChange={inputChange}
              value={formValue.AgainPassword}
              autoComplete="new-password"
              placeholder="再次输入新密码"
            />
          </Input.Group>
        </Form.Item>

        <Form.Item className="EditPassword__inputG">
          <Input.Group compact>
            <Button
              disabled={submitBtnStatus}
              onClick={submitFunc}
              className="EditPassword__submit"
              type="primary"
              htmlType="submit"
            >
              确认修改
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMod;

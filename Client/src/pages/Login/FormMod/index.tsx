import { Modal, Form, Input, Button, message } from 'antd';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { resDataType } from '@/utils/utils.d';

import { verifyConfig } from '@/utils/verify';
import { ChartToStr } from '@/utils/filters';

import { setToken } from '@/utils/utils';

import { Register, login } from '@/api/login';

const SendCodeBtn = React.lazy(() => import('@/components/SendCodeBtn'));

import './index.less';

interface PropsType {
  type: 'Login' | 'Register';
}
import { useNavigate } from 'react-router-dom';

import { StoreUpdate } from '@/store';

const FormMod = (props: PropsType) => {
  const dispatch = React.useContext(StoreUpdate);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formValue, setFormValue] = React.useState({
    Email: '',
    Code: '',
    Password: '',
  });

  const [verify, setVerify] = React.useState({
    Email: {},
    Code: {},
    Password: {},
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
    });
  };

  const verifyChange = (label: string, val: string) => {
    const verify = verifyConfig(label, val);
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

    let res: resDataType;
    if (props.type === 'Login') {
      const v1 = verifyChange('Email', formValue.Email);
      const v2 = verifyChange('Password', formValue.Password);
      if (v1.help || v2.help) {
        setSubmitBtnStatus(false);
        return;
      }

      res = await login({
        Email: formValue.Email,
        Password: formValue.Password,
      });

      if (res.Code > 0) {
        // 去首页
        await setToken(res.Data.Token);
        dispatch({ type: 'UserInfoUpdate' });
        message.success(res.Msg);
        navigate(`/`, { replace: true });
      } else if (res.Code === -13) {
        setTimeout(() => {
          navigate(`/register`, { replace: true });
        }, 300);
      }
    } else {
      const v1 = verifyChange('Email', formValue.Email);
      const v2 = verifyChange('Code', formValue.Code);
      if (v1.help || v2.help) {
        setSubmitBtnStatus(false);
        return;
      }

      res = await Register({
        Email: formValue.Email,
        Code: formValue.Code,
      });

      if (res.Code > 0) {
        Modal.success({
          title: '注册成功!',
          content: (
            <div>
              <p>密码已发送至您的邮箱,请注意查收。</p>
            </div>
          ),
          onOk() {
            navigate(`/login`, { replace: true });
          },
        });
      } else if (res.Code === -14) {
        setTimeout(() => {
          navigate(`/login`, { replace: true });
        }, 300);
      }
    }

    setSubmitBtnStatus(false);
    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        Code: '',
        Password: '',
      };
      return nowVal;
    });
  };

  const SendCodeClick = () => {
    verifyChange('Email', formValue.Email);
  };

  return (
    <div className="Login__formMod">
      <Form form={form} name="login" autoComplete="off">
        <Form.Item className="Login__inputG" {...verify.Email}>
          <Input.Group compact>
            <Input
              name="Email"
              autoComplete="new-password"
              onChange={inputChange}
              prefix={<MailOutlined />}
              value={formValue.Email}
              placeholder="请输入邮箱地址"
            />
          </Input.Group>
        </Form.Item>

        {props.type === 'Register' && (
          <Form.Item className="Login__inputG" {...verify.Code}>
            <Input.Group compact>
              <Input
                className="Login__Code"
                prefix={<MessageOutlined />}
                onChange={inputChange}
                name="Code"
                value={formValue.Code}
                autoComplete="new-password"
                placeholder="请输入6位验证码"
                maxLength={6}
              />
              <SendCodeBtn Action={ChartToStr(props.type)} Email={formValue.Email} onClick={SendCodeClick} />
            </Input.Group>
          </Form.Item>
        )}

        {props.type === 'Login' && (
          <Form.Item className="Login__inputG" {...verify.Password}>
            <Input.Group compact>
              <Input.Password
                name="Password"
                onChange={inputChange}
                value={formValue.Password}
                autoComplete="new-password"
                placeholder="请输入密码"
              />
            </Input.Group>
          </Form.Item>
        )}

        <Form.Item className="Login__inputG">
          <Input.Group compact>
            <Button
              disabled={submitBtnStatus}
              onClick={submitFunc}
              className="Login__submit"
              type="primary"
              htmlType="submit"
            >
              {ChartToStr(props.type)}
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMod;

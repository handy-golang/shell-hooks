import { Form, Input, Button, message } from 'antd';
import { FileDoneOutlined, FileTextOutlined } from '@ant-design/icons';
import React from 'react';
import { createOkxKey } from '@/api/hunter';
import Logo from '@/components/Logo';
import { OkxLogo } from '@/config/constant';

import { hunterVerifyConfig } from '@/utils/verify';
import { Link, useNavigate } from 'react-router-dom';

import './index.less';
import { UpdateHunter } from '@/pages/Hunter/HunterContext';
import { StoreContext } from '@/store';
const FormMod = () => {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;
  const navigate = useNavigate();

  const handleUpdate = React.useContext(UpdateHunter);

  const [form] = Form.useForm();

  const [formValue, setFormValue] = React.useState({
    ApiKey: '',
    Name: '',
    IP: '',
    SecretKey: '',
    Passphrase: '',
    Note: '',
    Password: '',
  });

  const [verify, setVerify] = React.useState({
    ApiKey: {},
    Name: {},
    IP: {},
    SecretKey: {},
    Passphrase: {},
    Note: {},
    Password: {},
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const Elm = event.target;
    const value = Elm.value;
    const label = Elm.name;
    let valStr = '';
    if (label === 'Note') {
      valStr = value;
    } else {
      valStr = value.replace(/\s*/g, '');
    }

    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        [label]: valStr,
      };
      return nowVal;
    });
    setVerify({
      ApiKey: {},
      Name: {},
      IP: {},
      SecretKey: {},
      Passphrase: {},
      Note: {},
      Password: {},
    });
  };

  const verifyChange = (label: string, val: string) => {
    const verify = hunterVerifyConfig(label, val);
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

    const v2 = verifyChange('Password', formValue.Password);
    if (v2.help) {
      setSubmitBtnStatus(false);
      return;
    }

    const res = await createOkxKey(formValue);
    if (res.Code > 0) {
      message.success(res.Msg);
      navigate(`/hunter`, { replace: true });
      res.Data.Password = formValue.Password;
      handleUpdate(res.Data);
    }

    setSubmitBtnStatus(false);
  };

  return (
    <div className="Hunter__formMod">
      <Form form={form} name="OkxKey" autoComplete="off">
        <Form.Item label="备注名" className="Hunter__inputG" {...verify.Name}>
          <Input
            name="Name"
            autoComplete="new-password"
            prefix={<FileDoneOutlined />}
            onChange={inputChange}
            value={formValue.Name}
            placeholder="给密钥组起一个名字"
          />
        </Form.Item>

        <Form.Item label="ApiKey" className="Hunter__inputG" {...verify.ApiKey}>
          <Input
            name="ApiKey"
            autoComplete="new-password"
            prefix={<Logo className="logo-input" url={OkxLogo} />}
            onChange={inputChange}
            value={formValue.ApiKey}
            placeholder="在 okx 申请的 [Api Key]"
          />
        </Form.Item>

        <Form.Item label="SecretKey" className="Hunter__inputG" {...verify.SecretKey}>
          <Input
            name="SecretKey"
            autoComplete="new-password"
            prefix={<Logo className="logo-input" url={OkxLogo} />}
            onChange={inputChange}
            value={formValue.SecretKey}
            placeholder="在 okx 申请的 [密钥]"
          />
        </Form.Item>

        <Form.Item label="Passphrase" className="Hunter__inputG" {...verify.Passphrase}>
          <Input.Password
            name="Passphrase"
            autoComplete="new-password"
            prefix={<Logo className="logo-input" url={OkxLogo} />}
            onChange={inputChange}
            value={formValue.Passphrase}
            placeholder="申请密钥时设置的密码"
          />
        </Form.Item>

        <Form.Item label="IP" className="Hunter__inputG" {...verify.IP}>
          <Input
            name="IP"
            autoComplete="new-password"
            prefix={<Logo className="logo-input" url={OkxLogo} />}
            onChange={inputChange}
            value={formValue.IP}
            placeholder="申请密钥时绑定的IP地址"
          />
        </Form.Item>

        <Form.Item label="备注" className="Hunter__inputG" {...verify.Note}>
          <Input.TextArea
            name="Note"
            autoSize
            autoComplete="new-password"
            onChange={inputChange}
            value={formValue.Note}
            placeholder="自定义描述"
          />
        </Form.Item>

        <Form.Item label="Hunter的密码" className="Hunter__inputG" {...verify.Password}>
          <Input.Password
            name="Password"
            autoComplete="new-password"
            prefix={<Logo className="logo-input" url={UserInfo.Avatar} />}
            onChange={inputChange}
            value={formValue.Password}
            placeholder="当前 Hunter 账户的密码"
          />
        </Form.Item>

        <Form.Item className="Hunter__inputG">
          <Input.Group compact>
            <Button
              disabled={submitBtnStatus}
              onClick={submitFunc}
              className="Hunter__submit"
              type="primary"
              htmlType="submit"
            >
              确认提交
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>

      <Link to="/about/okxkey" className="CreateOkxKey__about">
        <Button size="small" type="link">
          阅读 okx 秘钥申请指南
        </Button>
      </Link>
    </div>
  );
};

export default FormMod;

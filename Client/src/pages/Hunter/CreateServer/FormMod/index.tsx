import { Form, Input, Button, message, Select } from 'antd';
import { FileDoneOutlined, FileTextOutlined, PartitionOutlined } from '@ant-design/icons';
import React from 'react';
import { createHunterServer, OkxKey } from '@/api/hunter';
import Logo from '@/components/Logo';

import { cloneDeep } from '@/utils/utils';

import { hunterVerifyConfig } from '@/utils/verify';
import { Link, useNavigate } from 'react-router-dom';

import './index.less';
import { HunterContext, UpdateHunter } from '@/pages/Hunter/HunterContext';
import { StoreContext } from '@/store';
const FormMod = () => {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;
  const navigate = useNavigate();

  const { OkxKeyList, HunterServerList } = React.useContext(HunterContext);
  const handleUpdate = React.useContext(UpdateHunter);

  const [form] = Form.useForm();

  const [formValue, setFormValue] = React.useState({
    OkxKeyID: '',
    Port: '',
    Note: '',
    Password: '',
  });

  const [verify, setVerify] = React.useState({
    OkxKeyID: {},
    Port: {},
    Note: {},
    Password: {},
  });

  const SelectChange = (val: OkxKey['OkxKeyID']) => {
    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        OkxKeyID: val || '',
      };
      return nowVal;
    });
  };

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
      OkxKeyID: {},
      Port: {},
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

    const res = await createHunterServer(formValue);
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
      <Form form={form} name="CreateServer" autoComplete="off">
        <Form.Item label="选择一个秘钥" className="Hunter__inputG" {...verify.OkxKeyID}>
          <Select onChange={SelectChange}>
            {OkxKeyList.map((item) => {
              return (
                <Select.Option key={item.OkxKeyID} value={item.OkxKeyID}>
                  {item.Name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="访问服务的端口号" className="Hunter__inputG" {...verify.Port}>
          <Input
            name="Port"
            autoComplete="new-password"
            prefix={<PartitionOutlined />}
            onChange={inputChange}
            value={formValue.Port}
            placeholder="服务启动后的端口"
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

      <Link to="/about/hunter_server" className="CreateOkxKey__about">
        <Button size="small" type="link">
          阅读 HunterServer 工作原理
        </Button>
      </Link>
    </div>
  );
};

export default FormMod;

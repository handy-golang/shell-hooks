import React from 'react';
import { Upload, message, Avatar, Button, Form, Input, Modal } from 'antd';
import { SmileOutlined, MailOutlined, SkinOutlined, MessageOutlined, SafetyOutlined } from '@ant-design/icons';
import { uploadParam } from '@/api/upload';

import { mStorage } from '@/utils/utils';
const SendCodeBtn = React.lazy(() => import('@/components/SendCodeBtn'));

import './index.less';
import { AuthModal, BackData } from '@/components/AuthModal';

import { StoreContext, StoreUpdate } from '@/store';

import { editUserInfo, outLogin } from '@/api/login';
import { verifyConfig } from '@/utils/verify';

function EditUserInfo() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);
  const { UserInfo } = StoreData;

  const [avatar, setAvatar] = React.useState(UserInfo.Avatar);

  const [formValue, setFormValue] = React.useState({
    NewEmail: '1',
    NewEmailCode: '',
    AuthCode: '',
    NickName: UserInfo.NickName,
  });

  // 数据回填
  React.useEffect(() => {
    setAvatar(UserInfo.Avatar);

    setFormValue({
      NewEmail: '',
      NewEmailCode: '',
      AuthCode: '',
      NickName: UserInfo.NickName,
    });

    return () => {};
  }, [UserInfo]);

  const [verify, setVerify] = React.useState({
    NewEmail: {},
    NewEmailCode: {},
    NickName: {},
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
      NewEmail: {},
      NewEmailCode: {},
      NickName: {},
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

  const SendData = async (val?: BackData) => {
    setSubmitBtnStatus(true);
    const res = await editUserInfo({
      OldEmailCode: val?.Code || '',
      NewEmail: formValue.NewEmail,
      NewEmailCode: formValue.NewEmailCode,
      Avatar: avatar,
      NickName: formValue.NickName,
      AuthCode: formValue.AuthCode,
    });

    if (res.Code > 0) {
      mStorage.set('user_info', res.Data);

      if (formValue.NewEmail.length > 0 && formValue.NewEmail !== UserInfo.Email) {
        message.success(`${res.Msg},需要重新登录`).then(() => {
          outLogin();
        });
      } else {
        message.success(res.Msg);
        dispatch({ type: 'UserInfoUpdate' });
      }
    }
    setSubmitBtnStatus(false);
  };

  const submitFunc = async () => {
    setSubmitBtnStatus(true);

    const v5 = verifyChange('NickName', formValue.NickName);
    let v3: any = {};
    let v4: any = {};

    const NewEmail_edit = formValue.NewEmail.length > 0 && formValue.NewEmail !== UserInfo.Email;
    const AuthCode_edit = formValue.AuthCode.length > 0;

    if (NewEmail_edit) {
      v3 = verifyChange('NewEmail', formValue.NewEmail, UserInfo.Email);
      v4 = verifyChange('NewEmailCode', formValue.NewEmailCode);
    }

    if (v3.help || v4.help || v5.help) {
      setSubmitBtnStatus(false);
      return;
    }

    if (AuthCode_edit || NewEmail_edit) {
      AuthModal({
        Info: '修改防伪标识或者邮箱需要验证',
        EmailAction: '修改资料',
        IsPassword: false,
        async OkBack(val) {
          await SendData(val);
        },
      });
    } else {
      SendData();
    }
    setSubmitBtnStatus(false);
  };

  const upLoadChange = (info: any) => {
    const res = info.file.response;
    if (res) {
      if (res.Code > 0) {
        message.success(res.Msg);
        setAvatar(res.Data.Url);
      } else {
        message.error(res.Msg);
        setAvatar('');
      }
    }
  };

  const SendNewCodeClick = () => {
    verifyChange('NewEmail', formValue.NewEmail);
  };

  return (
    <div className="EditUserInfo">
      <h1 className="PageTitle">Edit Profile</h1>
      <div className="EditUserInfo__avatar">
        <Avatar size={100} alt="" src={avatar} icon={<SmileOutlined />} />
      </div>
      <div className="EditUserInfo__avatarBtn">
        <Upload {...uploadParam} onChange={upLoadChange} maxCount={1} accept="image/*">
          <Button type="primary">修改头像</Button>
        </Upload>
      </div>
      <Form className="EditUserInfo__form" name="login" autoComplete="off">
        <Form.Item className="EditUserInfo__inputG" {...verify.NickName}>
          <Input.Group compact>
            <Input
              name="NickName"
              autoComplete="new-password"
              prefix={<SkinOutlined />}
              onChange={inputChange}
              value={formValue.NickName}
              placeholder="昵称"
            />
          </Input.Group>
        </Form.Item>
        <Form.Item className="EditUserInfo__inputG">
          <Input.Group compact>
            <Input
              name="AuthCode"
              autoComplete="new-password"
              prefix={<SafetyOutlined />}
              onChange={inputChange}
              value={formValue.AuthCode}
              placeholder="自定义防伪标识符"
            />
          </Input.Group>
          <div className="AuthCode">系统发送的信息会带有该标识符</div>
        </Form.Item>

        <Form.Item className="EditUserInfo__inputG Email" {...verify.NewEmail}>
          <Input.Group compact>
            <Input
              name="NewEmail"
              autoComplete="new-password"
              prefix={<MailOutlined />}
              onChange={inputChange}
              value={formValue.NewEmail}
              placeholder="修改邮箱"
            />
          </Input.Group>
        </Form.Item>
        {formValue.NewEmail.length > 0 && (
          <Form.Item className="EditUserInfo__inputG" {...verify.NewEmailCode}>
            <Input.Group compact>
              <Input
                className="EditUserInfo__Code"
                prefix={<MessageOutlined />}
                onChange={inputChange}
                name="NewEmailCode"
                value={formValue.NewEmailCode}
                autoComplete="new-password"
                placeholder="新邮箱验证码"
                maxLength={6}
              />
              <SendCodeBtn Action="修改邮箱" Email={formValue.NewEmail} onClick={SendNewCodeClick} />
            </Input.Group>
          </Form.Item>
        )}
        <Form.Item className="EditUserInfo__inputG">
          <Input.Group compact>
            <Button
              className="EditUserInfo__submit"
              disabled={submitBtnStatus}
              type="primary"
              htmlType="submit"
              onClick={submitFunc}
            >
              确认修改
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditUserInfo;

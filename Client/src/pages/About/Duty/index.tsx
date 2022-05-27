import React from 'react';
import { Button } from 'antd';
const BackPage = React.lazy(() => import('@/components/BackPage'));

import { removeAccount, outLogin } from '@/api/login';

import { AuthModal } from '@/components/AuthModal';
import { StoreContext, StoreUpdate } from '@/store';

function AboutDuty() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);
  const { UserInfo, PingData, TopBarVisible } = StoreData;

  const handleRemoveUser = async () => {
    AuthModal({
      Title: '需要验证身份',
      Info: <div className="dutyModalInfo">该操作不可逆！</div>,
      IsPassword: true,
      IsEmail: true,
      EmailAction: '注销账户',
      async OkBack(val) {
        const res = await removeAccount({
          ...val,
        });
        if (res.Code > 0) {
          outLogin();
        }
        window.ViteConst.rmAgin = '';
      },
    });
  };

  return (
    <div className="AboutDuty">
      <BackPage>Back</BackPage>
      <h3> 用户协议与免责声明 </h3>

      {UserInfo.Token && (
        <Button type="primary" danger onClick={handleRemoveUser}>
          注销账户
        </Button>
      )}
    </div>
  );
}

export default AboutDuty;

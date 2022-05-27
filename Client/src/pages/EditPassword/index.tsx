import React from 'react';
import './index.less';
import { SmileOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const FormMod = React.lazy(() => import('./FormMod'));

import { StoreContext } from '@/store';

function DemoFunc() {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;

  let AvatarUrl = '//file.mo7.cc/hunter_logo/safari-pinned-tab.svg';
  if (UserInfo.Avatar.length > 5) {
    AvatarUrl = UserInfo.Avatar;
  }

  return (
    <div className="EditPassword">
      <h1 className="PageTitle">Change Password</h1>
      <div className="EditPassword__logo-box">
        <Avatar size={100} className="EditPassword__logo" alt="" src={UserInfo.Avatar} icon={<SmileOutlined />} />
      </div>
      <h1 className="EditPassword__title">修改密码</h1>
      <FormMod />
    </div>
  );
}

export default DemoFunc;

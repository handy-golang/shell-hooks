import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, Button } from 'antd';
import { LogoutOutlined, KeyOutlined, EditOutlined, SmileOutlined, DeleteOutlined } from '@ant-design/icons';
import { outLogin } from '@/api/login';

import './index.less';
import { StoreContext, StoreUpdate } from '@/store';

function Personal() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);
  const { UserInfo, PingData, TopBarVisible } = StoreData;

  return (
    <div className="Personal">
      <h1 className="PageTitle">Personal</h1>

      <div className="Personal__info">
        <Avatar icon={<SmileOutlined />} src={UserInfo.Avatar} size={70} alt="" />
        <div className="Personal__NickName">{UserInfo.NickName}</div>
        <div className="Personal__Email">{UserInfo.Email}</div>
      </div>

      <div className="Personal__link">
        <Link to="/edit_user_info">
          <Button icon={<EditOutlined />} block type="primary">
            编辑资料
          </Button>
        </Link>
        <Link to="/edit_password">
          <Button icon={<KeyOutlined />} block>
            修改密码
          </Button>
        </Link>
        <Link to="/about/duty">
          <Button icon={<DeleteOutlined />} type="primary" danger block>
            注销账户
          </Button>
        </Link>
        <Button icon={<LogoutOutlined />} block onClick={outLogin} danger>
          退出登录
        </Button>
      </div>
    </div>
  );
}

export default Personal;

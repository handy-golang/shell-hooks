import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, Button } from 'antd';

import './index.less';

function AboutList() {
  return (
    <div className="AboutList">
      <h1 className="PageTitle">About</h1>
      <Link to="/about/pwa">
        <Button type="link" block>
          PWA 应用安装指南
        </Button>
      </Link>

      <Link to="/about/release_notes">
        <Button type="link" block>
          版本说明
        </Button>
      </Link>

      <Link to="/about/okxkey">
        <Button type="link" block>
          okx 密钥申请指南
        </Button>
      </Link>

      <Link to="/about/hunter_server">
        <Button type="link" block>
          Hunter 工作原理
        </Button>
      </Link>

      <Link to="/about/duty">
        <Button type="link" block>
          用户协议
        </Button>
      </Link>
    </div>
  );
}

export default AboutList;

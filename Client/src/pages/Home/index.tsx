import './index.less';
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { StoreContext } from '@/store';
import { NewSocket, ResFunc } from '@/utils/wss';

function Home() {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;

  return (
    <div className="Home">
      <h1 className="PageTitle">Home</h1>
      Home 主页
      <Market />
      {UserInfo.UserID.length > 20 && (
        <Link to="/hunter">
          <Button type="primary"> 查看我的密钥与服务 </Button>
        </Link>
      )}
    </div>
  );
}

// 今日行情
function Market() {
  return <div>今日行情,新闻,摘要</div>;
}

export default Home;

import React from 'react';

import './index.less';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, Button } from 'antd';
import Logo from '@/components/Logo';

import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  ExclamationCircleOutlined,
  VerticalAlignBottomOutlined,
  SmileOutlined,
  MenuUnfoldOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
const PWAInstall = React.lazy(() => import('@/components/PWAInstall'));
import { StoreContext, StoreUpdate } from '@/store';
import { mStorage, $lg } from '@/utils/utils';

function TopBar() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);
  const { UserInfo, PingData, TopBarVisible } = StoreData;
  const navigate = useNavigate();

  let topBarBtn = mStorage.get('topBarBtn');
  if (topBarBtn) {
    topBarBtn = { ...topBarBtn };
  } else {
    topBarBtn = {};
  }

  let isVersionLast = false;
  if (PingData.ClientVersion) {
    if (PingData.ClientVersion !== window.ViteConst.version) {
      isVersionLast = true;
    }
  }

  const onClose = () => {
    dispatch({ type: 'TopBarHide' });
  };
  const showDrawer = () => {
    dispatch({ type: 'TopBarShow' });
  };

  return (
    <div className="TopBar">
      <div onClick={showDrawer}>
        <Avatar className="TopBar__Avatar" icon={<SmileOutlined />} size={36} src={UserInfo.Avatar} alt="" />
      </div>
      <Drawer
        placement="right"
        visible={TopBarVisible}
        onClose={onClose}
        forceRender={true}
        width="38%"
        closable={false}
        className="TopBar__Drawer"
      >
        <div className="TopBar__header">
          <div>
            <Link to="/personal">
              <Avatar icon={<SmileOutlined />} src={UserInfo.Avatar} size={50} alt="" />
              <div className="TopBar__NickName">{UserInfo.NickName}</div>
            </Link>
          </div>
        </div>
        <div className="TopBar__ul">
          <div className="TopBar__item">
            <Link to="/about">
              <Button icon={<ExclamationCircleOutlined />} type="link" block>
                About
              </Button>
            </Link>
          </div>

          {UserInfo.Token && (
            <div className="TopBar__item">
              <Link to="/hunter">
                <Button className="customBtn" icon={<Logo className="logo anticon" />} type="link" block>
                  Server
                </Button>
              </Link>
            </div>
          )}

          {!UserInfo.Token && (
            <div className="TopBar__item">
              <Link to="/register">
                <Button icon={<UserAddOutlined />} type="link" block>
                  Register
                </Button>
              </Link>
            </div>
          )}

          {!UserInfo.Token && (
            <div className="TopBar__item">
              <Link to="/login">
                <Button icon={<LoginOutlined />} type="link" block>
                  Login
                </Button>
              </Link>
            </div>
          )}

          {Object.keys(topBarBtn).map((key) => {
            const item = topBarBtn[key];

            return (
              <div className="TopBar__item" key={key}>
                <Link to={item.link}>
                  <Button icon={<FundViewOutlined />} type="link" block>
                    服务：{item.Port}
                  </Button>
                </Link>
              </div>
            );
          })}

          <div className="TopBar__item">
            <Link to="/">
              <Button icon={<HomeOutlined />} type="link" block>
                Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="TopBar__Info">
          <div className="TopBar__Info-icp">
            <div className="copyright"> ©2022 墨七 </div>
            <a href="//beian.miit.gov.cn" target="_blank" className="icp-link">
              <img className="icp-icon" src="//file.mo7.cc/blog/icp.png" />
              <span>陕ICP备20002897号</span>
            </a>
          </div>
        </div>

        <div className="TopBar__footer">
          <div className="TopBar__footer-Info">
            <PWAInstall className="TopBar__instPWA">
              <Button icon={<VerticalAlignBottomOutlined />} type="primary">
                安装此程序
              </Button>
            </PWAInstall>
          </div>
          <div className="TopBar__footer-wrapper">
            <div className="TopBar__footer-close">
              <MenuUnfoldOutlined className="TopBar__closeBtn" onClick={onClose} />
              <div
                className="TopBar__version"
                onClick={() => {
                  navigate('/about/release_notes');
                }}
              >
                <span>当前版本: {window.ViteConst.version}</span>
                {isVersionLast && <span>最新版本: {PingData.ClientVersion}</span>}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default TopBar;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { HunterServer, startHunterServer } from '@/api/hunter';
import { Button, Modal, Badge, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { SyncOutlined, SettingOutlined } from '@ant-design/icons';
import { StoreUpdate } from '@/store';

import { AuthModal } from '@/components/AuthModal';
import { mStorage, $lg } from '@/utils/utils';

import { SysStar, SysStop } from '@/components/HunterOperate';

const ShellAbout = React.lazy(() => import('./ShellAbout'));

export interface PropsType {
  data: HunterServer;
  status?: number;
  event?: Function;
  config?: any;
}

export const Title = (props: PropsType) => {
  const dispatch = React.useContext(StoreUpdate);
  let topBarBtn = mStorage.get('topBarBtn');
  if (topBarBtn) {
    topBarBtn = { ...topBarBtn };
  } else {
    topBarBtn = {};
  }

  const ServerInfo = props.data;
  const Status = props.status;
  const config = props.config;

  const DataCenterConfig = mStorage.get('ping');
  const newVersion = DataCenterConfig.HunterVersion;

  const nowVersion = $lg(config, 'AppPackage.Version', '');

  const isAreVersion = newVersion === nowVersion;

  const [visible, setVisible] = React.useState(false);

  const AddTopBar = () => {
    if (ServerInfo.HunterServerID) {
      topBarBtn[`Btn_${ServerInfo.HunterServerID}`] = {
        ...config,
        ...ServerInfo,
        link: `/hunter/info/${ServerInfo.HunterServerID}`,
      };
    }
    mStorage.set('topBarBtn', topBarBtn);
    setVisible(false);
    dispatch({ type: 'TopBarShow' });
  };

  const RemoveTopBar = () => {
    delete topBarBtn[`Btn_${ServerInfo.HunterServerID}`];

    mStorage.set('topBarBtn', topBarBtn);
    setVisible(false);
    dispatch({ type: 'TopBarShow' });
  };

  return (
    <h3 className="ServerInfo_title">
      <div className="ServerInfo_host">
        <span>{`${ServerInfo.Host}:${ServerInfo.Port}`}</span>
        {Status === 1 && (
          <Badge dot={!isAreVersion}>
            <SettingOutlined
              className="HunterSet"
              onClick={() => {
                setVisible(true);
              }}
            />
          </Badge>
        )}
      </div>
      <div className="ServerInfo_note">
        Note: <br />
        {ServerInfo.Note}
      </div>
      <Modal
        title=""
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className="ServerInfoOpt">
          <div>
            <div className="ServerInfoOpt__hint">当前版本：{nowVersion}</div>
            <div className="ServerInfoOpt__hint new">最新版本：{newVersion}</div>
            {!isAreVersion && (
              <div className="ServerInfoOpt__hint">
                建议执行<span className="lineHeight">更新并重启</span>操作或
                <Link to="/about/release_notes" className="lineHeight">
                  查看《更新日志》
                </Link>
              </div>
            )}
          </div>

          <div className="btnWrapper">
            <SysStar {...props} />
            <SysStop {...props} />

            {topBarBtn[`Btn_${ServerInfo.HunterServerID}`] ? (
              <Button className="AddTop" size="small" block onClick={RemoveTopBar}>
                从侧栏移除该服务
              </Button>
            ) : (
              <Button className="AddTop" size="small" block onClick={AddTopBar}>
                将该服务添加至侧栏
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </h3>
  );
};

export const Status = (props: PropsType) => {
  const { status, data, event } = props;
  const dispatch = React.useContext(StoreUpdate);

  const [shellUrl, setShellUrl] = React.useState('');

  React.useEffect(() => {
    const deployShell = mStorage.get(`Shell_${data.HunterServerID}`);
    if (deployShell) {
      setShellUrl(deployShell);
    }
    return () => {};
  }, [data.HunterServerID]);

  const deployFunc = async () => {
    AuthModal({
      Title: '请输入密码',
      Info: '开启 Hunter 服务',
      async OkBack(val) {
        dispatch({ type: 'LoadOpen' });
        const res = await startHunterServer({
          HunterServerID: data.HunterServerID,
          Password: val.Password,
        });
        dispatch({ type: 'LoadClose' });

        if (res.Code === 9 && res.Data?.Url) {
          setShellUrl(res.Data.Url);
          mStorage.set(`Shell_${data.HunterServerID}`, res.Data.Url);
        }

        if (event) {
          event('StatusUpdate', res.Code);
          return;
        }
      },
    });
  };

  if (!status) {
    return (
      <div className="ServerInfo_Status">
        <SyncOutlined spin />
        <div className="ServerInfo_hint">正在检查服务运行状态</div>
      </div>
    );
  }

  if (shellUrl) {
    return (
      <div className="ServerInfo_Status">
        <ShellAbout url={shellUrl} data={data} />
      </div>
    );
  }

  if (status < 0) {
    return (
      <div className="ServerInfo_Status">
        <div className="ServerInfo_hint">服务状态检查失败, 您可能需要:</div>
        <Button type="primary" onClick={deployFunc}>
          一键部署 Hunter 服务
        </Button>
      </div>
    );
  }

  return null;
};

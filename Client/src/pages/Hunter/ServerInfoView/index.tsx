/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { useParams } from 'react-router-dom';
import { HunterServer, serverPing } from '@/api/hunter';

import { Title, Status } from './part';

import './index.less';
import { HunterContext } from '@/pages/Hunter/HunterContext';
import { mStorage } from '@/utils/utils';

const Content = React.lazy(() => import('./Content'));
import { getHunterConfig } from '@/api/hunter_net';

const ServerInfoView = () => {
  const { id } = useParams();
  const { HunterServerList } = React.useContext(HunterContext);
  const [status, setStatus] = React.useState(0);
  const [hunterConfig, setHunterConfig] = React.useState<any>({});

  let ServerInfo: HunterServer = {
    OkxKeyID: '',
    Port: '',
    Note: '',
  };

  for (const item of HunterServerList) {
    if (item.HunterServerID === id) {
      ServerInfo = item;
      break;
    }
  }
  const getConfig = () => {
    getHunterConfig({
      ServerInfo,
    }).then((res) => {
      if (res.Code > 0) {
        setHunterConfig(res.Data);
      }
    });
  };

  const actionPing = () => {
    setStatus(0);
    serverPing({
      HunterServerID: id,
    })
      .then((res) => {
        setStatus(res.Code);
        if (res.Code > 0) {
          mStorage.remove(`Shell_${id}`);
          getConfig();
        }
      })
      .catch((err) => {
        setStatus(-1);
      });
  };

  React.useEffect(() => {
    if (ServerInfo.HunterServerID) {
      actionPing();
    }
    return () => {};
  }, [ServerInfo]);

  const eventFunc = (lType: string, val: any) => {
    if (lType === 'StatusUpdate') {
      setStatus(val);
      if (val === 8) {
        window.location.reload();
      }
    }
  };

  if (!ServerInfo.HunterServerID) {
    return null;
  }

  return (
    <div className="ServerInfo">
      <Title data={ServerInfo} status={status} config={hunterConfig} />
      <Status data={ServerInfo} status={status} event={eventFunc} />
      {status === 1 && <Content data={ServerInfo} />}
    </div>
  );
};

export default ServerInfoView;

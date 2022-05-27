import React from 'react';

import { PropsType } from '@/pages/Hunter/ServerInfoView/part';

import './index.less';

import { NewSocket, ResFunc } from '@/utils/wss';

function Content(props: PropsType) {
  const { data } = props;

  const [wssData, setWssData] = React.useState<any>({});

  const SocketMsg: ResFunc = ({ Response }) => {
    if (Response.Code === 1) {
      setWssData(Response.Data);
    }
  };

  React.useEffect(() => {
    if (!data.HunterServerID) {
      return;
    }
    const Socket = NewSocket({
      ServerInfo: data,
      MessageEvent: SocketMsg,
    });

    return () => {
      Socket.close();
    };
  }, [data]);

  return (
    <div className="Hunter__Content">
      <div>{JSON.stringify(wssData)}</div>
    </div>
  );
}

export default Content;

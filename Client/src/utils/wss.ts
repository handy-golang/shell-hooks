import { getToken } from '@/utils/utils';
import { Encrypt } from '@/config';
import { HunterServer } from '@/api/hunter';

import { resDataType } from '@/utils/utils.d';

interface ReturnType {
  Socket: WebSocket;
  Event: 'open' | 'message';
  Response: resDataType;
}

export type ResFunc = (res: ReturnType) => void;

interface WssType {
  ServerInfo?: HunterServer;
  MessageEvent: ResFunc;
  OpenEvent?: ResFunc;
}

export function NewSocket(opt: WssType) {
  // const socketUrl = 'wss://hunt.mo7.cc/wss';
  // const socketUrl = 'ws://hunt.mo7.cc/wss';
  // const socketUrl = 'ws://localhost:8999/wss';
  // const socketUrl = 'ws://localhost:9010/hunter_net/wss';
  let protocol = 'wss://';
  let host = 'hunt.mo7.cc';
  let pathname = '/wss';

  const location = window.location;
  const ProxyUrl = window.ViteConst.ProxyUrl;

  if (location.protocol === 'http:') {
    protocol = 'ws://';
  }

  if (opt.ServerInfo?.HunterServerID) {
    pathname = `/hunter_net/wss?host=${opt.ServerInfo.Host}&port=${opt.ServerInfo.Port}`;
  }

  if (location.origin.indexOf('mo7.cc') > -1) {
    // 生产环境 ...
  } else {
    const urlArr = ProxyUrl.split('://');
    host = urlArr[1];
  }

  const socketUrl = protocol + host + pathname;

  const Auth = {
    Token: getToken(),
    Encrypt: Encrypt('/wss'),
  };

  console.info(socketUrl);

  const SocketObj = new WebSocket(socketUrl);

  // Connection opened
  SocketObj.addEventListener('open', (event) => {
    SocketObj.send(JSON.stringify(Auth));
    if (opt.OpenEvent) {
      opt.OpenEvent({
        Socket: SocketObj,
        Event: 'open',
        Response: {
          Code: 1,
          Data: event,
          Msg: 'open',
        },
      });
    }
  });

  // Listen for messages
  SocketObj.addEventListener('message', (event) => {
    let dataObj: resDataType = {
      Code: -1,
      Data: {},
      Msg: 'message',
    };

    try {
      const data = event.data;
      const dataJson = JSON.parse(data);
      dataObj = dataJson;
    } catch {
      dataObj = {
        Code: 1,
        Data: {},
        Msg: event.data,
      };
    }

    opt.MessageEvent({
      Socket: SocketObj,
      Event: 'message',
      Response: dataObj,
    });
  });

  return SocketObj;
}

/* 

  const SocketMsg: ResFunc = ({ Socket, Response }) => {
    if (Response.Code > 0) {
      console.log(Response.Data);
    }
  };

  React.useEffect(() => {
    const Socket = NewSocket({
      Path: 'ws://localhost:8999/wss',
      MessageEvent: SocketMsg,
    });

    return () => {
      Socket.close();
    };
  }, []);



*/

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './index.less';
import { Card, Empty, Button, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import { PlusCircleOutlined, ConsoleSqlOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { HunterServer, serverPing } from '@/api/hunter';
import { HunterContext, UpdateHunter } from '@/pages/Hunter/HunterContext';

import { dateFormat } from '@/utils/filters';

interface StatusProps {
  status: number;
  data: HunterServer;
}
function ShowStatus(props: StatusProps) {
  if (!props.status) {
    return (
      <div className="serverStatus">
        <SyncOutlined spin />
        <span>正在检查服务状态</span>
      </div>
    );
  }
  if (props.status === 2) {
    return (
      <Link to={`/hunter/info/${props.data.HunterServerID}`}>
        <Button size="small" type="link">
          查看服务详情
        </Button>
      </Link>
    );
  }

  if (props.status > 0) {
    return (
      <div className="serverStatus">
        <span>服务正在运行</span>
        <Link to={`/hunter/info/${props.data.HunterServerID}`}>
          <Button size="small">查看服务</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="serverStatus">
        <span>服务尚未运行</span>
        <Link to={`/hunter/info/${props.data.HunterServerID}`}>
          <Button type="primary" size="small">
            部署服务
          </Button>
        </Link>
      </div>
    );
  }
}

function OkxKeyName(props: { OkxKeyID: string; [key: string]: any }) {
  const { OkxKeyList } = React.useContext(HunterContext);
  let name = '';
  for (const el of OkxKeyList) {
    if (el.OkxKeyID === props.OkxKeyID) {
      name = el.Name;
      break;
    }
  }

  const attribute: any = { ...props };
  delete attribute.OkxKeyID;
  return <div {...attribute}>{name}</div>;
}

interface ServerPropsType {
  data: HunterServer;
  Event: Function;
}

const Server = (props: ServerPropsType) => {
  const [info, setInfo] = React.useState(props.data);
  const [status, setStatus] = React.useState(2);

  // React.useEffect(() => {
  //   serverPing({
  //     HunterServerID: info.HunterServerID,
  //   })
  //     .then((res) => {
  //       setStatus(res.Code);
  //     })
  //     .catch((err) => {
  //       setStatus(-1);
  //     });
  //   return () => {};
  // }, []);

  return (
    <Card
      className="HunterList__card"
      size="small"
      title={<a href={`http://${info.Host}:${info.Port}`} target="_blank">{`${info.Host}:${info.Port}`}</a>}
      key={info.HunterServerID}
      extra={<DeleteOutlined onClick={() => props.Event()} />}
      actions={[<ShowStatus key={info.HunterServerID} status={status} data={info} />]}
      hoverable={true}
    >
      <div className="HunterList__item">
        <span className="label">IP地址</span>
        <span className="value">{info.Host}</span>
      </div>
      <div className="HunterList__item">
        <span className="label">端口</span>
        <span className="value">{info.Port}</span>
      </div>

      <div className="HunterList__item">
        <div className="label">绑定的密钥</div>
        <OkxKeyName className="value" OkxKeyID={info.OkxKeyID} />
      </div>

      <div className="HunterList__item">
        <span className="label">创建时间</span>
        {info.CreateTime && <span className="value">{dateFormat(info.CreateTime)}</span>}
      </div>

      <div className="HunterList__item">
        <div className="label">备注</div>
        <div className="value">{info.Note}</div>
      </div>
    </Card>
  );
};

interface PropsTypes {
  List: Array<HunterServer>;
  Event: Function;
}
const ServerList = (props: PropsTypes) => {
  return (
    <div className="HunterList__cardGroup HunterList__ServerList">
      <div className="HunterList__cardGroup-header">
        <div className="HunterList__cardGroup-title">服务管理</div>
        <Link to="/hunter/create_server">
          <Button shape="circle" type="primary" icon={<PlusCircleOutlined />} />
        </Link>
      </div>
      {props.List.length < 1 && (
        <div>
          <Empty description="" image={<ConsoleSqlOutlined className="Server_none" />}>
            <Link to="/hunter/create_server">
              <Button type="primary">创建一个服务</Button>
            </Link>
          </Empty>
        </div>
      )}
      <div className="CardGroup">
        {props.List.map((item) => {
          return (
            <Server
              key={item.HunterServerID}
              data={item}
              Event={() => {
                props.Event('del-Server', item.HunterServerID);
              }}
            />
          );
        })}
      </div>
      <hr className="Hr-line" />
    </div>
  );
};

export default ServerList;

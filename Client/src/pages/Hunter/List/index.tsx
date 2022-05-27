import React from 'react';
import { HunterContext, UpdateHunter } from '@/pages/Hunter/HunterContext';
import './index.less';
import { Card, Empty, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusCircleOutlined, ConsoleSqlOutlined, DeleteOutlined } from '@ant-design/icons';
import { HunterServer, OkxKey, hunterDataRemove } from '@/api/hunter';

import { dateFormat } from '@/utils/filters';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { StoreUpdate } from '@/store';

import ServerList from './ServerList';

import { AuthModal, BackData } from '@/components/AuthModal';

function List() {
  const { OkxKeyList, HunterServerList, Password } = React.useContext(HunterContext);
  const handleUpdate = React.useContext(UpdateHunter);
  const dispatch = React.useContext(StoreUpdate);

  const showPriv = () => {
    AuthModal({
      Info: '访问敏感信息均需密码验证',
      async OkBack(val) {
        handleUpdate({
          Password: val.Password,
          OkxKeyList,
          HunterServerList,
        });
      },
    });
  };

  const EventFun = (lType: string, param: any) => {
    const updateEvent = async (val: BackData) => {
      dispatch({ type: 'LoadOpen' });
      let Type: any = '';
      let ID = '';
      if (lType === 'del-Server') {
        Type = 'HunterServer';
        ID = param;
      }
      if (lType === 'del-OkxKey') {
        Type = 'OkxKey';
        ID = param;
      }
      hunterDataRemove({
        ID,
        Type,
        Password: val.Password,
      }).then((res) => {
        if (res.Code > 0) {
          handleUpdate({
            ...res.Data,
            Password: val.Password,
          });
        }
        dispatch({ type: 'LoadClose' });
      });
    };

    AuthModal({
      Info: '访问敏感信息均需密码验证',
      OkBack: updateEvent,
    });
  };

  return (
    <div className="HunterList">
      <h1 className="PageTitle">Hunter</h1>

      {OkxKeyList.length > 0 && <ServerList List={HunterServerList} Event={EventFun} />}

      {OkxKeys(OkxKeyList, EventFun)}

      <Footer onClick={showPriv} />
    </div>
  );
}

function OkxKeys(OkxKeyList: Array<OkxKey>, EventFun: Function) {
  return (
    <div className="HunterList__cardGroup HunterList__OkxKeys">
      <div className="HunterList__cardGroup-header">
        <div className="HunterList__cardGroup-title">密钥管理</div>
        <Link to="/hunter/create_okx_keys">
          <Button shape="circle" type="primary" icon={<PlusCircleOutlined />} />
        </Link>
      </div>
      {OkxKeyList.length < 1 && (
        <div>
          <Empty description="">
            <Link to="/hunter/create_okx_keys">
              <Button type="primary">新增密钥</Button>
            </Link>
          </Empty>
        </div>
      )}
      <div className="CardGroup">
        {OkxKeyList.map((OkxKey) => {
          return (
            <Card
              className="HunterList__card"
              size="small"
              key={OkxKey.OkxKeyID}
              title={OkxKey.Name}
              extra={
                <DeleteOutlined
                  onClick={() => {
                    EventFun('del-OkxKey', OkxKey.OkxKeyID);
                  }}
                />
              }
              hoverable={true}
            >
              <div className="HunterList__item">
                <span className="label">密码</span>
                <span className="value">{OkxKey.Passphrase}</span>
              </div>
              <div className="HunterList__item">
                <span className="label">Api Key</span>
                <span className="value">{OkxKey.ApiKey}</span>
              </div>
              <div className="HunterList__item">
                <span className="label">IP地址</span>
                <span className="value">{OkxKey.IP}</span>
              </div>
              <div className="HunterList__item">
                <span className="label">密钥</span>
                <span className="value">{OkxKey.SecretKey}</span>
              </div>

              <div className="HunterList__item">
                <span className="label">创建时间</span>
                {OkxKey.CreateTime && <span className="value">{dateFormat(OkxKey.CreateTime)}</span>}
              </div>

              <div className="HunterList__item">
                <div className="label">备注</div>
                <div className="value">{OkxKey.Note}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Footer(props: any) {
  const { OkxKeyList } = React.useContext(HunterContext);

  if (OkxKeyList.length < 1) {
    return null;
  }

  if (OkxKeyList[0].Passphrase.indexOf('**') > -1) {
    return (
      <div className="HunterList__footer">
        <Button type="dashed" onClick={props.onClick}>
          显示全部字段
        </Button>
      </div>
    );
  } else {
    return null;
  }
}

export default List;

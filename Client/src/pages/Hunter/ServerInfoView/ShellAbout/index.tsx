import React from 'react';
import { Card, Button, message } from 'antd';
import './index.less';
import { HunterServer, serverPing } from '@/api/hunter';
import { CopyText, mStorage } from '@/utils/utils';

interface propsType {
  data: HunterServer;
  url: string;
}
import { StoreUpdate } from '@/store';

function ShellAbout(props: propsType) {
  const dispatch = React.useContext(StoreUpdate);
  const { url, data } = props;

  const httpUrl = `http:${url}`;

  const wgetSh = `wget -qO- ${httpUrl} | bash`;

  const pingTest = () => {
    dispatch({ type: 'LoadOpen' });
    mStorage.remove(`Shell_${data.HunterServerID}`);
    serverPing({
      HunterServerID: data.HunterServerID,
    })
      .then((res) => {
        if (res.Code > 0) {
          message.success(res.Msg).then(() => {
            window.location.reload();
          });
        } else {
          message.warning(res.Msg);
        }
        dispatch({ type: 'LoadClose' });
      })
      .catch((err) => {
        message.error(err);
        dispatch({ type: 'LoadClose' });
      });
  };
  return (
    <div className="ShellAbout">
      <h3>Hunter.net 部署文档</h3>

      <div className="ShellAbout_hint">系统已为您生成了一键部署指令:</div>

      <div className="ShellAbout__urlBox">
        <code>
          <span>{wgetSh}</span>
        </code>
        <Button
          size="small"
          type="primary"
          onClick={() => {
            CopyText(wgetSh);
          }}
        >
          复制
        </Button>
      </div>

      <div className="ShellAbout_desc">
        复制该指令，并在 ip 为
        <div className="ShellAbout_desc-ip">
          <code>
            <a href={`http://${data.Host}:${data.Port}`} target="_blank">
              {data.Host}:{data.Port}
            </a>
          </code>
        </div>
        的主机上执行。
        <br />
        请开放该主机的 <span className="lineHight">{data.Port}</span> 端口。
        <br />
        <br />
        主机硬件要求：
        <br />
        <span className="lineHight">64位(x86)</span>或<span className="lineHight">64位(ARM)</span>的
        <span className="lineHight">Linux</span>
        系统
        <br />
        <br />
        系统版本：
        <br />
        <span className="lineHight">Ubuntu 20.04 LTS</span> 或以上版本
        <br />
        <br />
        硬件配置：
        <br />
        <span className="lineHight">1GB</span> 以上内存 <span className="lineHight">15GB</span> 以上存储,
        <br />
        <br />
        位置要求：
        <br />
        优先推荐 AWS
        <span className="lineHight">美国西部 (加利福尼亚北部)</span> 的云主机
        <br />
        <span className="lineHight">日本</span>或<span className="lineHight">香港</span>等地的 海外 主机均可
      </div>
      <br />
      <br />

      <div>
        <Button type="primary" onClick={pingTest}>
          我已部署完成
        </Button>
      </div>
    </div>
  );
}

export default ShellAbout;

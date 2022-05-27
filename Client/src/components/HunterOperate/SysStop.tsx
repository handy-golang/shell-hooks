import { Button, message } from 'antd';
import { AuthModal } from '@/components/AuthModal';
import { sysStop } from '@/api/hunter_net';
import { PropsType } from '@/pages/Hunter/ServerInfoView/part';

const SysStop = (props: PropsType) => {
  const { data } = props;

  const handleSysStop = () => {
    AuthModal({
      EmailAction: '注销服务',
      Info: (
        <div className="Hunter__Content__modal-info">
          <span className="Hunter__Content__modal-lineHight">这将彻底注销您的服务，并删除对应的日志和文件！</span>
        </div>
      ),
      async OkBack(val) {
        const res = await sysStop({
          ServerInfo: data,
          ...val,
        });
        if (res.Code > 0) {
          message.success({
            content: `${res.Msg},5秒后页面自动刷新`,
            duration: 5,
            onClose() {
              window.location.reload();
            },
          });
        }
      },
    });
  };
  return (
    <Button size="small" type="primary" onClick={handleSysStop} danger>
      释放该服务
    </Button>
  );
};

export default SysStop;

import { sysStart } from '@/api/hunter_net';
import { AuthModal } from '@/components/AuthModal';
import { PropsType } from '@/pages/Hunter/ServerInfoView/part';
import { Button, message } from 'antd';
const SysStart = (props: PropsType) => {
  const { data } = props;
  const handleSysStart = () => {
    AuthModal({
      EmailAction: '重启并更新',
      Info: (
        <div className="Hunter__Content__modal-info">
          该操作将会
          <span className="Hunter__Content__modal-lineHight">关闭</span>
          当前服务，并从远端下载最新代码并
          <span className="Hunter__Content__modal-lineHight">重新启动</span>
          ，操作前建议
          <span className="Hunter__Content__modal-lineHight">手动清仓</span>
        </div>
      ),
      async OkBack(val) {
        const res = await sysStart({
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
    <Button size="small" type="primary" onClick={handleSysStart}>
      更新并重启
    </Button>
  );
};

export default SysStart;

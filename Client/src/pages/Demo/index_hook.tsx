import React from 'react';
import './index.less';

import { getUserInfo } from '@/api/login';
import { Button } from 'antd';
import { removeToken } from '@/utils/utils';
// https://blog.csdn.net/imber___zsk/article/details/121580559

import { StoreContext, StoreUpdate } from '@/store';
function DemoFunc() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);

  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = React.useState(2);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [value, setValue] = React.useState('初始值');
  const [myDate, setDate] = React.useState(new Date().toLocaleTimeString());

  const setCountFunc = () => {
    const a = count * 2;
    setCount(a);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Elm = event.target;
    const value = Elm.value;
    setValue(value);
  };

  const handleClick = () => {
    setDate('生效了');
  };

  React.useEffect(() => {
    console.info('创建组件22', document.getElementById('Demo'));

    return () => {
      console.info('销毁组件');
    };
  }, []);

  const [asyncData, setAsyncData] = React.useState('');
  const [asyncCount, setAsyncCount] = React.useState(0);
  const [asyncHunterData, setHunterAsyncData] = React.useState('');
  const [asyncHunterCount, setHunterAsyncCount] = React.useState(0);

  function asyncCountFun() {
    setAsyncCount((data) => {
      return data + 1;
    });
  }

  function asyncHunterCountFun() {
    setHunterAsyncCount((data) => {
      return data + 1;
    });
  }

  React.useEffect(() => {
    console.info('asyncCount', asyncCount);

    setLoadingStatus(true);
    setTimeout(() => {
      setLoadingStatus(false);
    }, 1000);

    return () => {};
  }, [asyncCount]);

  React.useEffect(() => {
    console.info(asyncHunterCount);
    return () => {};
  }, [asyncHunterCount]);

  const get_user_info = async () => {
    const res = await getUserInfo();
    asyncCountFun();

    setAsyncData(JSON.stringify(res));
  };

  const showLoading = () => {
    dispatch({ type: 'LoadOpen' });
    setTimeout(() => {
      dispatch({ type: 'LoadClose' });
    }, 2000);
  };

  return (
    <div className="Demo" id="Demo">
      <h1 className="PageTitle">Demo</h1>

      <br />
      <br />
      <br />

      <Button type="primary" onClick={showLoading}>
        showLoading
      </Button>
      <div>
        <p>You clicked {count} times</p>
        <Button type="primary" onClick={setCountFunc}>
          Click me
        </Button>
      </div>
      <br />
      <br />
      <div>
        <input value={value} onChange={handleChange} />
        {value}
      </div>
      <br />
      <br />
      <div>
        <Button type="primary" onClick={handleClick}>
          点我
        </Button>
        {myDate}
      </div>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          removeToken();
        }}
      >
        退户登录
      </Button>
      <div>
        <Button type="primary" onClick={get_user_info}>
          get_user_info
        </Button>
        <br />
        <br />
        <div>Request count: {asyncCount}</div>
        <div className="TestPage__res">{asyncData}</div>
      </div>
    </div>
  );
}

export default DemoFunc;

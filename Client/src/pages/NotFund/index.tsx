import { useState } from 'react';
import './index.less';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="NotFundApp">
      <h1 className="PageTitle">404</h1>
      <div>
        <div className="NotFundApp__logo-box">
          <img className="NotFundApp__logo" src="//file.mo7.cc/hunter_logo/safari-pinned-tab.svg" alt="" />
        </div>
        <h1>404 Not Found</h1>
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
  );
}

export default App;

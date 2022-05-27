import './index.less';
import { ChartToStr } from '@/utils/filters';
import React from 'react';

const FormMod = React.lazy(() => import('./FormMod'));

interface PropsType {
  type: 'Login' | 'Register';
}
import { Link } from 'react-router-dom';

function Login(props: PropsType) {
  const pageType = props.type;

  return (
    <div className="Login">
      <h1 className="PageTitle">{pageType}</h1>
      <div className="Login__logo-box">
        <img className="Login__logo" src="//file.mo7.cc/hunter_logo/safari-pinned-tab.svg" alt="" />
      </div>
      <h1 className="Login__title">
        <div>{ChartToStr(pageType)}</div>
      </h1>
      <FormMod type={pageType} />
      {pageType === 'Login' && (
        <div className="Login__forget">
          <Link to="/edit_password">忘记密码?</Link>
        </div>
      )}
    </div>
  );
}

export default Login;

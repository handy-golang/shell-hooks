import React from 'react';
import { Link } from 'react-router-dom';
const BackPage = React.lazy(() => import('@/components/BackPage'));
import { QuestionCircleOutlined } from '@ant-design/icons';

import './index.less';

import FormMod from './FormMod';

const CreateServer = () => {
  return (
    <div className="CreateServer">
      <BackPage to="/hunter">Hunter</BackPage>
      <h3 className="CreateServer__title">
        填写 HunterServer 信息
        <Link to="/about/hunter_server" className="CreateServer__about">
          <QuestionCircleOutlined />
        </Link>
      </h3>
      <FormMod />
    </div>
  );
};

export default CreateServer;

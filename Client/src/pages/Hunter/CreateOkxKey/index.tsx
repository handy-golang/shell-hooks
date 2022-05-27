import React from 'react';
import { Link } from 'react-router-dom';
const BackPage = React.lazy(() => import('@/components/BackPage'));
import { QuestionCircleOutlined } from '@ant-design/icons';

import './index.less';

import FormMod from './FormMod';

const CreateOkxKey = () => {
  return (
    <div className="CreateOkxKey">
      <BackPage to="/hunter">Hunter</BackPage>
      <h3 className="CreateOkxKey__title">
        新增 okx 密钥组
        <Link to="/about/okxkey" className="CreateOkxKey__about">
          <QuestionCircleOutlined />
        </Link>
      </h3>
      <FormMod />
    </div>
  );
};

export default CreateOkxKey;

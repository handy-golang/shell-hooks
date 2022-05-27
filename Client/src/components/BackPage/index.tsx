import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface propsType {
  className?: string;
  children?: ReactNode;
  onClick?: Function;
  to?: string;
}
function BackPage(props: propsType) {
  const navigate = useNavigate();

  const handle = () => {
    if (props.onClick) {
      props.onClick();
    } else if (props.to) {
      navigate(props.to);
    } else {
      navigate(-1);
    }
  };

  return (
    <h1 className="PageTitle">
      <Button type="link" size="small" icon={<ArrowLeftOutlined />} onClick={handle}>
        {props.children || 'Back'}
      </Button>
    </h1>
  );
}

export default BackPage;

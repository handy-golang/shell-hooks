import React from 'react';
import './index.less';

interface PropsType {
  visible: boolean;
}

let timer: any;
function Loading(props: PropsType) {
  const [isShow, setIsShow] = React.useState(props.visible);
  React.useEffect(() => {
    clearTimeout(timer);
    if (props.visible) {
      setIsShow(true);
    } else {
      timer = setTimeout(() => {
        setIsShow(false);
      }, 350);
    }
    return () => {};
  }, [props.visible]);

  if (isShow) {
    return (
      <div className={`Loading ${props.visible ? 'show' : 'hide'}`}>
        <i className="Loading__icon" />
      </div>
    );
  } else {
    return null;
  }
}

export default Loading;

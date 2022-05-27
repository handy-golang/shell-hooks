import React, { ReactNode } from 'react';

import { isPwa } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';

interface propsType {
  className: string;
  children: ReactNode;
}

function PWAInstall(props: propsType) {
  const navigate = useNavigate();

  const installPwa = async () => {
    console.info('window.deferredPrompt', window.deferredPrompt);
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        window.deferredPrompt = null;
      }
    } else {
      navigate('/about/pwa');
    }
  };

  if (isPwa()) {
    return null;
  } else {
    return (
      <div className={props.className} onClick={installPwa}>
        {props.children || '将此应用安装到桌面'}
      </div>
    );
  }
}

export default PWAInstall;

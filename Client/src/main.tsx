import React from 'react';
import { createRoot } from 'react-dom/client';

import { version } from '../package.json';
import { ProxyUrl } from '../viteOpt.mjs';

if (version) {
  window.ViteConst = {
    version,
    ProxyUrl,
    rmAgin: 'mo777',
  };
}

import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

import 'antd/dist/antd.less';
import '@/assets/style/global.less';

// https://juejin.cn/post/7033313711947251743

import Loading from '@/components/Loading';
const App = React.lazy(() => import('@/components/Routes/App'));
const ReactRoot = window.document.getElementById('ReactRoot');

if (ReactRoot !== null) {
  const Root = createRoot(ReactRoot);
  Root.render(
    <React.StrictMode>
      <React.Suspense fallback={<Loading visible={true} />}>
        <App />
      </React.Suspense>
    </React.StrictMode>,
  );
} else {
  console.error('没有获取到应用根元素');
}

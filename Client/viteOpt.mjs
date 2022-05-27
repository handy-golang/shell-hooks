//  https://juejin.cn/post/7039258299086143524

export const PwaConfig = {
  workbox: {
    sourcemap: true,
  },
  manifest: {
    name: 'Hunter',
    short_name: 'Hunter',
    theme_color: '#F0B90B',
    description: 'Hunter, 像猎手一样去做交易',
    lang: 'zh',
    icons: [
      {
        src: 'https://file.mo7.cc/hunter_logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://file.mo7.cc/hunter_logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'https://file.mo7.cc/hunter_logo/android-chrome-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://file.mo7.cc/hunter_logo/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: './?mode=pwa',
    display: 'standalone',
    background_color: '#333333',
  },
};

// export const ProxyUrl = 'http://localhost:8999';
export const ProxyUrl = 'https://hunt.mo7.cc';

export const Port = 9999;

export const Proxy = {
  '/public': {
    // 设置你调用的接口域名和端口号 别忘了加http
    target: ProxyUrl,
    changeOrigin: true, // 允许跨域
  },
  '/private': {
    // 设置你调用的接口域名和端口号 别忘了加http
    target: ProxyUrl,
    changeOrigin: true, // 允许跨域
  },
  '/hunter_net': {
    // 设置你调用的接口域名和端口号 别忘了加http
    target: ProxyUrl,
    changeOrigin: true, // 允许跨域
  },
};

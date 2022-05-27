/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
// shims-global.d.ts

export {};

declare global {
  interface Window {
    deferredPrompt: any;
    ViteConst: {
      version: string;
      ProxyUrl: string;
      rmAgin: string;
    };
  }
}

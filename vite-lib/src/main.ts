import 'normalize.css';
import 'picnic';
import '@/ShellHooks.net';
import $ from 'cash-dom';
import { ajax } from '@/http';

if (ViteConst) {
  window.ViteConst = {
    ...ViteConst,
  };
  window.$Event = {};
  window.$ = $;
  window.$ajax = ajax;
}

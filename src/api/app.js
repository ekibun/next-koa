/* eslint-disable import/no-cycle */
/*
 * @Description: api main
 * @Author: ekibun
 * @Date: 2019-11-19 15:54:17
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-10 16:45:30
 */
import apiRouter from '@api/router';
import socket from '@api/socket';
import aria2c from '@api/aria2c';
import webRouter from '@web/routes';

/**
 * @type { { app: import("@config/server").App } }
 */
const Global = {
  routes: webRouter,
  init: app => {
    Global.app = app;
    Global.router = apiRouter();
    socket.setSocket(app.socket);
    aria2c.init();
  },
  destory: () => {
    aria2c.destory();
  }
};
export default Global;

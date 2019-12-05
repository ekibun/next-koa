/* eslint-disable import/no-cycle */
/*
 * @Description: api main
 * @Author: ekibun
 * @Date: 2019-11-19 15:54:17
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 15:29:45
 */
import router from '@api/router';
import socket from '@api/socket';
import aria2c from '@api/aria2c';

/**
 * @type { { app: import("@config/server").App } }
 */
const Global = {
  init: app => {
    Global.app = app;
    Global.router = router();
    socket.setSocket(app.socket);
    aria2c.init();
  },
  destory: () => {
    aria2c.destory();
  }
};
export default Global;

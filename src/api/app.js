/* eslint-disable import/no-cycle */
/*
 * @Description: api main
 * @Author: ekibun
 * @Date: 2019-11-19 15:54:17
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-26 11:00:01
 */
import router from '@api/router';
import socket from '@api/socket';

/**
 * @type { { app: import("@config/server").App } }
 */
const Global = {
  init: app => {
    Global.app = app;
    Global.router = router();
    socket.setSocket(app.socket);
  }
};
export default Global;

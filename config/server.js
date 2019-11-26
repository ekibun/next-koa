/*
 * @Description: server entry
 * @Author: ekibun
 * @Date: 2019-10-31 15:58:05
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-25 19:16:44
 */
const chalk = require('chalk');
const Koa = require('koa');
const http = require('http');
const WebSocket = require('ws');
const log = require('./logger')(`[ ${chalk.blue('servr')} ]`);
const SetupServer = require('./setup-server');
const conf = require('./app');

/**
 * 定义全局参数
 * @typedef { Object } App
 * @property { import("@config/logger").Logger } log
 * @property { import('ws').Server } socket
 */

/**
 * @type { App & import("koa") }
 */
const app = new Koa();
app.log = log;

// error catch middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || 'server error';
    ctx.status = status;
    ctx.body = { status, message };
    if (status === 500) log.e(e.stack || e);
  }
});

const server = http.createServer(app.callback());
app.socket = new WebSocket.Server({
  server
});

SetupServer(app).then(() => {
  server.listen(conf.server.port, conf.server.host, () => {
    log.v('server is running at http://localhost:3000');
  });
});

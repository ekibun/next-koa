/*
 * @Description: next middleware
 * @Author: ekibun
 * @Date: 2019-10-31 16:23:00
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-11 17:23:04
 */
const next = require('next');
const SetupAria2daemon = require('./setup-aria2');
const SetupApiServer = require('./setup-api-server');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev,
  dir: './'
});

/**
 * @param { import("@config/server").App } app
 */
module.exports = app => new Promise(resolve => {
  let handle = null;
  let API = null;
  let nextPrepared = false;
  const checkResolve = () => {
    if (API && nextPrepared) {
      handle = API.routes.getRequestHandler(nextApp);
      resolve();
    }
  };
  // aria2
  SetupAria2daemon();
  // api
  SetupApiServer(apiMain => {
    try {
      if (API && API.destory) API.destory();
      // eslint-disable-next-line no-eval
      API = eval(apiMain).default;
      API.init(app);
      checkResolve();
    } catch (e) {
      app.log.e(e);
    }
  });
  // next
  nextApp.prepare().then(() => {
    nextPrepared = true;
    checkResolve();
  });

  app.use(async (ctx, next) => {
    if (/^\/api\//.test(ctx.url)) {
      return API && API.router(ctx, next);
    }
    if (handle) {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    }
  });
});

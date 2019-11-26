/*
 * @Description: next middleware
 * @Author: ekibun
 * @Date: 2019-10-31 16:23:00
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-26 11:01:34
 */
const next = require('next');
const SetupApiServer = require('./setup-api-server');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev,
  dir: './src/web'
});

/**
 * @param { import("@config/server").App } app
 */
module.exports = app => new Promise(resolve => {
  let handle = null;
  let API = null;
  const checkResolve = () => {
    if (API && handle) resolve();
  };
  SetupApiServer(apiMain => {
    try {
      // eslint-disable-next-line no-eval
      API = eval(apiMain).default;
      API.init(app);
      checkResolve();
    } catch (e) {
      app.log.e(e);
    }
  });
  nextApp.prepare().then(() => {
    handle = nextApp.getRequestHandler();
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

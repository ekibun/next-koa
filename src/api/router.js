/*
 * @Description: map controllers and return router
 * @Author: ekibun
 * @Date: 2019-11-22 18:43:17
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-26 10:41:34
 */
// eslint-disable-next-line import/no-cycle
import Global from '@api/app';
import Router from 'koa-router';

function addMapping(router, mapping) {
  Object.keys(mapping).forEach(key => {
    const [type, path] = key.split(' ');
    switch (type) {
      case 'GET':
        router.get(path, mapping[key]);
        break;
      case 'POST':
        router.post(path, mapping[key]);
        break;
      case 'PUT':
        router.put(path, mapping[key]);
        break;
      case 'DELETE':
        router.del(path, mapping[key]);
        break;
      default:
        Global.app.log.e(`invalid URL: ${key}`);
        return;
    }
    Global.app.log.v(`register URL mapping: ${key}`);
  });
}

export default () => {
  const router = new Router();
  // add controllers
  const context = require.context('./controllers', false, /.js$/);
  context.keys().forEach(key => {
    Global.app.log.v(`process controller: ${key}...`);
    addMapping(router, context(key).default);
  });
  return router.routes();
};

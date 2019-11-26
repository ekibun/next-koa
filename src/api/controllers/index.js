/*
 * @Description: index api
 * @Author: ekibun
 * @Date: 2019-11-26 10:42:27
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-26 10:47:06
 */
export default {
  'GET /api/:name': async ctx => {
    const name = ctx.params.name;
    ctx.response.body = `<h1>Hello,${name}!</h1>`;
  }
};

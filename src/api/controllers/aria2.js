/* eslint-disable no-throw-literal */
/*
 * @Description: index api
 * @Author: ekibun
 * @Date: 2019-11-26 10:42:27
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 19:21:51
 */
import path from 'path';
import file from '@api/utils/file';
import aria2c from '@api/aria2c';

const filePrefix = './aria2/files';

export default {
  'GET /api/fs/ls': async ctx => {
    const list = await file.ls(`${filePrefix}${ctx.query.path}`);
    const stat = aria2c.getStat();
    [...(stat.active || []), ...(stat.waitting || []), ...(stat.stopped || [])].forEach(item => {
      item.files.forEach(f => {
        if (path.dirname(f.path) === `./files${ctx.query.path}`.replace(/\/+$/g, '')) {
          const name = path.basename(f.path);
          const file = list.find(v => v.name === name);
          if (file) {
            file.aria2 = [...(file.aria2 || []), item];
          } else {
            list.push({
              name,
              isDirectory: false,
              isLink: false,
              size: -1,
              aria2: [item]
            });
          }
        }
      });
    });
    ctx.response.body = list;
  }
};

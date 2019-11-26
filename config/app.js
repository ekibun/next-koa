/*
 * @Description: app config
 * @Author: ekibun
 * @Date: 2019-11-22 18:59:33
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-25 17:16:09
 */
const path = require('path');

module.exports = {
  server: {
    port: 3000, // listening port
    host: '0.0.0.0' // listening host
  },
  alias: {
    '@web': path.join(__dirname, '../src/web'),
    '@api': path.join(__dirname, '../src/api'),
    '@config': __dirname
  }
};

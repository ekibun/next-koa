/*
 * @Description: setup aria2 server
 * @Author: ekibun
 * @Date: 2019-10-31 16:30:14
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 20:20:47
 */
const path = require('path');
const daemon = require('./daemon');
const log = require('./logger')('aria2', '#FF8800');

module.exports = () => daemon.startDaemon('aria2c --conf-path=./aria2.conf', {
  log,
  cwd: path.join(__dirname, '../aria2'),
  shell: true
}, proc => {
  proc.stdout.on('data', data => {
    data.toString().split('\n').map(v => v && log.v(v));
  });
  proc.stderr.on('data', data => {
    data.toString().split('\n').map(v => v && log.e(v));
  });
});

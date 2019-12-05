/*
 * @Description: start daemon process
 * @Author: ekibun
 * @Date: 2019-12-05 11:25:00
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 14:55:56
 */
const spawn = require('child_process').spawn;

/**
 * start daemon process
 * @param { string } command
 * @param { {log: import("@config/logger").Logger } & import('child_process').SpawnOptionsWithoutStdio } options
 * @param { (proc: import('child_process').ChildProcessWithoutNullStreams)=>void } onCreate
 */
function startDaemon(command, options, onCreate) {
  options.log.v('starting process...');
  const proc = spawn(command, options);
  onCreate(proc);
  proc.on('close', code => {
    options.log.e(`process close with code ${code}`);
    setTimeout(() => startDaemon(command, options, onCreate), 1000);
  });
}

module.exports = {
  startDaemon
};

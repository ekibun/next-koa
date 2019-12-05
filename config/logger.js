/* eslint-disable no-console */
/*
 * @Description: logger
 * @Author: ekibun
 * @Date: 2019-10-31 16:34:39
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 20:19:35
 */
const chalk = new (require('chalk')).Instance({ level: 2 });

/**
 * @typedef Logger
 * @type { { v: (...)=>void, e: (...)=>void, w: (...)=>void } }
 */

/**
 * @returns { Logger }
 */
module.exports = (_tag, color) => {
  const tag = `[ ${(chalk[color] || chalk.hex(color))(_tag)} ]`;
  return {
    v(...data) {
      console.log(tag, ...data);
    },
    e(...data) {
      console.log(tag, ...data.map(chalk.red));
    },
    w(...data) {
      console.log(tag, ...data.map(chalk.yellow));
    }
  };
};

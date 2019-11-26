/*
 * @Description: logger
 * @Author: ekibun
 * @Date: 2019-10-31 16:34:39
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-25 18:53:01
 */
const chalk = require('chalk');

/**
 * @typedef Logger
 * @type { { v: (...)=>void, e: (...)=>void, w: (...)=>void } }
 */

/* eslint-disable no-console */
/**
 * @returns { Logger }
 */
module.exports = tag => ({
  v(...data) {
    console.log(tag, ...data);
  },
  e(...data) {
    console.log(tag, ...data.map(chalk.red));
  },
  w(...data) {
    console.log(tag, ...data.map(chalk.yellow));
  }
});

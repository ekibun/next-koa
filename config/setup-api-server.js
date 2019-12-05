/*
 * @Description: setup api server
 * @Author: ekibun
 * @Date: 2019-10-31 16:30:14
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 20:22:18
 */
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const log = require('./logger')('apicp', 'cyan');

module.exports = update => {
  const apiConfig = require('./webpack.api.config');
  const apiCompiler = webpack(apiConfig);
  const apiMfs = new MFS();
  apiCompiler.outputFileSystem = apiMfs;
  apiCompiler.watch({}, (err, _stats) => {
    if (err) throw err;
    const stats = _stats.toJson();
    stats.errors.forEach(err => log.e(err));
    stats.warnings.forEach(err => log.w(err));
    if (stats.errors.length) return;
    log.v('compiled successfully');
    update(apiMfs.readFileSync(path.join(apiConfig.output.path, 'api.js'), 'utf-8'));
  });
  apiCompiler.hooks.watchRun.tap('dev_run_api', () => {
    log.v('compiling ...');
  });
};

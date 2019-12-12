/* eslint-disable no-param-reassign */
/*
 * @Description: next config with antd
 * @Author: ekibun
 * @Date: 2019-12-05 20:27:30
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-10 15:55:42
 */
const withLess = require('@zeit/next-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const conf = require('./config/app');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = { ...conf.alias, ...config.resolve.alias };
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];
      config.plugins.push(new AntdDayjsWebpackPlugin());
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }
    return config;
  }
});

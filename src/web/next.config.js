/*
 * @Description: next config with antd
 * @Author: ekibun
 * @Date: 2019-12-05 20:27:30
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 21:53:28
 */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      // eslint-disable-next-line no-param-reassign
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

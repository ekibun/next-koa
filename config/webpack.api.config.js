/*
 * @Description: webpack config for API
 * @Author: ekibun
 * @Date: 2019-06-27 16:42:39
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-22 20:51:56
 */
const path = require('path');
const fs = require('fs');
const conf = require('./app');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  name: 'api',
  target: 'node',
  devtool: '#cheap-module-source-map',
  mode: isProd ? 'production' : 'development',
  entry: path.join(__dirname, '../src/api/app.js'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/api'),
    filename: 'api.js',
    publicPath: '/'
  },
  resolve: {
    alias: conf.alias,
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  externals: Object.assign({}, ...fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .map(mod => ({ [mod]: `commonjs ${mod}` })))
};

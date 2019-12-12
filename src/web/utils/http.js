/**
 * @Description: http utils
 * @Author: ekibun
 * @Date: 2019-07-30 17:26:54
 * @LastEditors: ekibun
 * @LastEditTime: 2019-07-30 18:15:50
 */
import axios from 'axios';
import conf from '@config/app';

const http = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `http://${typeof window === 'undefined' ? `${conf.server.host}:${conf.server.port}` : window.location.host}`
});

export default class Http {
  static get(url, config) {
    return new Promise((resolve, reject) => {
      http.get(url, config).then(res => {
        if (res.status === 200) resolve(res.data);
        else throw res;
      }).catch(error => {
        reject(error);
      });
    });
  }
  static post(url, data, config) {
    return new Promise((resolve, reject) => {
      http.post(url, data, config).then(res => {
        if (res.status === 200) resolve(res.data);
        else throw res;
      }).catch(error => {
        reject(error);
      });
    });
  }
}

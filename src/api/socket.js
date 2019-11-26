/*
 * @Description: socket
 * @Author: ekibun
 * @Date: 2019-11-22 18:45:21
 * @LastEditors: ekibun
 * @LastEditTime: 2019-11-26 10:42:30
 */
// eslint-disable-next-line import/no-cycle
import Global from '@api/app';

const routeMap = new Map();
let socket = null;

export default class Socket {
  /**
   * initialization, exported to server
   * @param { import('ws').Server } server
   */
  static setSocket(server) {
    socket = server;
    socket.removeAllListeners('connection');
    socket.on('connection', (ws, req) => {
      // eslint-disable-next-line no-param-reassign
      ws.url = req.url || ws.url;
      Global.app.log(`WS ${ws.url}...`);
      const onConnect = routeMap.get(ws.url);
      if (onConnect) onConnect(ws);
    });
  }

  /**
   * register on connection listener
   * @param {string} route
   * @param { (ws: import('ws'))=>void } onConnect
   */
  static onConnection(route, onConnect) {
    routeMap.set(route, onConnect);
  }

  /**
   * un-register on connection listener
   * @param {string} route
   */
  static offConnection(route) {
    routeMap.delete(route);
  }

  /**
   * send `data` to specified `route`
   * @param {string} route
   * @param {SocketData} data
   */
  static broadcast(route, data) {
    const jsonData = JSON.stringify(data);
    if (socket) {
      socket.clients.forEach(ws => {
        if (ws.url === route) ws.send(jsonData);
      });
    }
  }
}

/*
 * @Description: aria2 socket
 * @Author: ekibun
 * @Date: 2019-12-05 15:04:30
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 19:30:27
 */
import Aria2c from 'aria2';

export const log = require('@config/logger')('aria2', '#FF8800');

const aria2 = new Aria2c({
  host: 'localhost',
  port: 6800,
  secure: false,
  secret: 'ekibun',
  path: '/jsonrpc'
});

let retry = () => setTimeout(() => aria2Open(), 1000);
function aria2Open() {
  log.v('starting socket...');
  aria2.open().catch(e => {
    log.e(e.stack || e);
    retry();
  });
}

/**
 * @typedef { Object } Aria2Stat
 * @property { string } downloadSpeed
 * @property { string } uploadSpeed
 * @property { string } numActive
 * @property { string } numWaiting
 * @property { string } numStopped
 * @property { string } numStoppedTotal
 * @property { any[] } active
 * @property { any[] } waitting
 * @property { any[] } stopped
}
 */

/**
 * @type { Aria2Stat }
 */
let stat = {};

async function syncStatus() {
  log.v('sync status');
  stat = { ...stat, ...await aria2.call('getGlobalStat') };
  stat.active = await aria2.call('tellActive');
  stat.waitting = await aria2.call('tellWaiting', 0, Number(stat.numWaiting));
  stat.stopped = await aria2.call('tellStopped', 0, Number(stat.numStopped));
  if (stat.active && stat.active.length > 0) {
    setTimeout(syncStatus, 1000);
  }
}

export default {
  init: () => {
    aria2.on('open', () => {
      log.v('socket OPEN');
      (async () => {
        const notifications = await aria2.listNotifications();
        // notifications logger example
        notifications.forEach(notification => {
          aria2.on(notification, params => {
            log.v(notification, JSON.stringify(params));
            if (aria2[notification]) aria2[notification]();
          });
        });
      })();
    });

    // emitted when the WebSocket is closed.
    aria2.on('close', m => {
      log.v('socket CLOSE', m);
      retry();
    });

    // emitted for every message sent.
    aria2.on('output', m => {
      log.v('output', m);
    });

    // emitted for every message received.
    aria2.on('input', m => {
      log.v('input', m);
    });

    aria2Open();
    syncStatus();
  },
  destory: () => {
    retry = () => { };
    aria2.close().catch(e => {
      log.e(e.stack || e);
    });
  },
  getStat: () => stat
};

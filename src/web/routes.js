/*
 * @Description: next route
 * @Author: ekibun
 * @Date: 2019-12-10 16:42:41
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-12 09:51:23
 */
import routes from 'next-routes';

export default routes()
  .add('fs', '/fs/:path*');

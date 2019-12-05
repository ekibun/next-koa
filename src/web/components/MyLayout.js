/*
 * @Description: 
 * @Author: ekibun
 * @Date: 2019-12-05 10:56:05
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 10:58:01
 */
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
/*
 * @Description: 
 * @Author: ekibun
 * @Date: 2019-11-26 17:24:23
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-05 10:54:28
 */
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;

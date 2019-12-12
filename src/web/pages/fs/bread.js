/*
 * @Description: create path bread crumb
 * @Author: ekibun
 * @Date: 2019-12-11 19:52:38
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-11 20:00:28
 */
import React from 'react';
import { Breadcrumb } from 'antd';

function Bread(props) {
  return (
    <Breadcrumb separator=">">
      {
        (props.path || '').split('/').map(folder => (
          <Breadcrumb.Item href={`./${folder}`} key={folder}>{folder}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
}

export default Bread;

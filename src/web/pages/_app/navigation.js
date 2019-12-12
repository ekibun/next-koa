/*
 * @Description: navigation
 * @Author: ekibun
 * @Date: 2019-12-09 19:11:29
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-10 16:04:06
 */
import React from 'react';
import { Menu, Icon } from 'antd';

export const navigates = [
  {
    title: '下载',
    items: [
      {
        path: 'active',
        title: '下载',
        icon: 'down-circle'
      },
      {
        path: 'waitting',
        title: '等待',
        icon: 'clock-circle'
      },
      {
        path: 'stopped',
        title: '完成/停止',
        icon: 'check-circle'
      }
    ]
  },
  {
    title: '资源',
    items: [
      {
        path: 'fs',
        title: '文件',
        icon: 'folder'
      }
    ]
  }
];

export default () => (
  <Menu theme="dark" defaultSelectedKeys={['active']} mode="inline">
    {
      navigates.map(group =>
        <Menu.ItemGroup title={group.title} key={group.title}>
          {
            group.items.map(item =>
              <Menu.Item key={item.path}>
                <Icon type={item.icon} />
                {item.title}
              </Menu.Item>
            )
          }
        </Menu.ItemGroup>
      )
    }
  </Menu>
);

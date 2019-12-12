/*
 * @Description: main
 * @Author: ekibun
 * @Date: 2019-11-26 17:13:09
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-11 19:47:15
 */
import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default class SiderDemo extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: "20px", overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            2
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Description: main
 * @Author: ekibun
 * @Date: 2019-11-26 17:13:09
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-11 10:23:57
 */
import React from 'react';
import App from 'next/app';
import { Layout } from 'antd';

import Navigation from './navigation';

const { Sider } = Layout;

export default class SiderDemo extends App {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    pageProps.url = { ...pageProps.url, query: ctx.query };
    return { pageProps };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Sider
          breakpoint="md"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Navigation />
        </Sider>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

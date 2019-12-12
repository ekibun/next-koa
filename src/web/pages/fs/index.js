/*
 * @Description: main
 * @Author: ekibun
 * @Date: 2019-11-26 17:13:09
 * @LastEditors: ekibun
 * @LastEditTime: 2019-12-11 19:59:26
 */
import React from 'react';
import { Layout } from 'antd';
import useSWR from 'swr';
import http from '@web/utils/http';
import Bread from './bread';

const { Header, Content, Footer } = Layout;

const apiFsLs = path => `/api/fs/ls?path=/${path || ''}`;

function Page(props) {
  const initialData = props.data;
  const { data } = useSWR(apiFsLs(props.url.query.path), http.get, { initialData });
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '20px', overflow: 'auto' }}>
        <Bread path={props.url.query.path} />
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          {JSON.stringify(data)}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

Page.getInitialProps = async ({ query }) => {
  const data = await http.get(apiFsLs(query.path));
  return { data };
};

export default Page;

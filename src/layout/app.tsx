import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

interface IProps {
  header?: any;
  footer?: any;
  children: any;
}
export default function AppLayout(props: IProps) {
  return (
    <Layout>
      {props.header && <Header> {props.header} </Header>}
      <Content style={{ minHeight: '100%', padding: '20px' }}>{props.children}</Content>
      <Footer style={{ textAlign: 'center' }}> ©2020 Created by Rajnish Singh</Footer>
    </Layout>
  );
}

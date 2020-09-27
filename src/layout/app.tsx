import { Layout } from 'antd';
import React from 'react';
const { Content } = Layout;
export default function AppLayout(props: any) {
  return (
    <Layout>
      <Content style={{ minHeight: '100%', padding: '20px' }}>{props.children}</Content>
    </Layout>
  );
}

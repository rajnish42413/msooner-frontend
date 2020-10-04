import React from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import ReactFlow from 'react-flow-renderer';

export default function CampaignCreate() {
  // const onLoad = (reactFlowInstance: any) => {
  //   reactFlowInstance.fitView();
  // };
  return (
    <AppLayout header={<Header />}>
      <RenderBreadcrumb />
      <ReactFlow elements={elements} style={{ height: '600px', border: '1px dotted #ddd' }} />
    </AppLayout>
  );
}

const Header = (props: any) => {
  const history = useHistory();
  return (
    <div>
      <Button type="text" style={{ color: '#fff' }} onClick={() => history.goBack()}>
        <ArrowLeftOutlined style={{ color: '#fff' }} /> Test Campaign 001
      </Button>
    </div>
  );
};

const RenderBreadcrumb = () => (
  <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Campaigns</Breadcrumb.Item>
    <Breadcrumb.Item>Design Automation</Breadcrumb.Item>
  </Breadcrumb>
);

const elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          + <strong> Design Automation!</strong>
        </>
      )
    },
    position: { x: 250, y: 0 }
  },
  { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true }
];

import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Menu, Tag, Space, Table, Button, Modal, Typography, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Campaign() {
  const [createCampaignVisibility, setCreateCampaignVisibility] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Button type="text">{text}</Button>
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => <span>{moment(text).fromNow()}</span>
    },
    {
      title: 'People',
      dataIndex: 'people',
      key: 'people'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="/campaigns/001/design">
            <Button type="primary" size="small">
              Design Automation
            </Button>
          </Link>
          <Link to="/campaigns/001/design">
            <Button type="primary" size="small">
              Add Users
            </Button>
          </Link>
          <Button type="dashed" size="small">
            Edit
          </Button>
          <Button type="dashed" danger size="small">
            Delete
          </Button>
        </Space>
      )
    }
  ];
  return (
    <AppLayout header={<Header />}>
      <RenderBreadcrumb />
      <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'row-reverse', gap: '1rem' }}>
        <Button type="primary" onClick={() => setCreateCampaignVisibility(true)}>
          <PlusOutlined /> New Campaign
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '1rem' }}>
              <Table columns={templateColumns} dataSource={templetData} size="small" pagination={false} />
            </div>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable'
        }}
      />
      <CreateCampaign visible={createCampaignVisibility} setVisible={setCreateCampaignVisibility} />
    </AppLayout>
  );
}

const RenderBreadcrumb = () => (
  <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Campaigns</Breadcrumb.Item>
  </Breadcrumb>
);

const Header = () => (
  <>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1">Home</Menu.Item>
      <Menu.Item key="2">Campaigns</Menu.Item>
    </Menu>
  </>
);

interface IPropsCreateCampaign {
  visible: boolean;
  setVisible: any;
}

const CreateCampaign = ({ visible, setVisible }: IPropsCreateCampaign) => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <Typography>
        <Typography.Title level={3}>What should we call your new Campaign?</Typography.Title>
        <Typography.Paragraph>
          Just give your Campaign a name and you'll be on your way! You can always change the name later.
        </Typography.Paragraph>
      </Typography>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" size="large">
        <Form.Item
          label="Campaign Name"
          name="campaign"
          rules={[{ required: true, message: 'Please input your campaign!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const data = [
  {
    key: '1',
    name: 'Test Campaign 001',
    people: 32,
    created_at: '2020-09-07 10:40:43',
    tags: ['nice', 'important', 'daily']
  },

  {
    key: '2',
    name: 'Test Campaign 002',
    people: 42,
    created_at: '2020-09-27 10:40:43',
    tags: ['weekly']
  },
  {
    key: '3',
    name: 'Test Campaign 003',
    people: 32,
    created_at: '2020-10-02 10:40:43',
    tags: ['cool', 'daily']
  }
];

const templateColumns = [
  {
    title: 'Template id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Template Nname',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: string) => <span>{moment(text).fromNow()}</span>
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <Button type="dashed" danger size="small">
          Delete
        </Button>
      </Space>
    )
  }
];

const templetData = [
  {
    id: 'fnjkdsngkfd_2953494285_23',
    name: 'CMPJ Email Template 001',
    created_at: '2020-09-07 10:40:43'
  },
  {
    id: 'fnjkdsngkfd_2953494285_23',
    name: 'CMPJ Email Template 002',
    created_at: '2020-09-07 10:40:43'
  }
];

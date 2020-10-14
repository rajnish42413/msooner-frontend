import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, Drawer, Form, Input, Modal, Select, Space, Tabs } from 'antd';
import { ArrowLeftOutlined ,PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import ReactFlow, { Background, Controls, Handle, MiniMap } from 'react-flow-renderer';

export default function CampaignCreate() {
  // const onLoad = (reactFlowInstance: any) => {
  //   reactFlowInstance.fitView();
  // };

  const [elements, setElements] = useState(initialElements);
  const [addVisible ,setAddVisible] = useState(false);
  const [editVisible ,seteditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(Object)

  const onConnect = (params: any) => console.log(params);

  const onElementClick = (event:any, element:any) =>{

    setSelectedData(element);
    console.log(element);
     if(element.data.type === "add") {setAddVisible(true); return ;}
     seteditVisible(true);
     return ;
    }

  const handleAction =() =>{
    if(selectedData){
      setElements([...elements, ...addActionButton(selectedData?.id)])
    }
  }

  return (
    <AppLayout header={<Header />}>
      <RenderBreadcrumb />
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        style={{ height: '80vh', border: '1px dotted #ddd' }}
        onConnect={onConnect}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <MiniMap
        nodeStrokeColor={(n:any) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n:any) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
      </ReactFlow>

      <Drawer 
          title="Properties"
          width={520}
          visible={editVisible}
          bodyStyle={{ paddingBottom: 80 }}
          onClose={()=>seteditVisible(false)}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={()=>seteditVisible(false)} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={()=>seteditVisible(false)} type="primary">
                Submit
              </Button>
            </div>
          }
        >

          <Tabs defaultActiveKey="1" >
              <Tabs.TabPane tab="Data" key="1">
                {renderForm() }
              </Tabs.TabPane>
              <Tabs.TabPane tab="Logs" key="2">
                {renderForm() }
              </Tabs.TabPane>
              <Tabs.TabPane tab="Setting" key="3">
                {renderForm() }
              </Tabs.TabPane>
            </Tabs>
   
        </Drawer>
    
        <Modal
          title=""
          visible={addVisible}
          footer={null}
          onCancel={()=>setAddVisible(false)}
        >
         <Space direction="vertical" style={{width:'100%',margin:'1.5rem 0'}}>
            <Button size="large" block type="primary" onClick={handleAction} > + Add a action block</Button> 
            <Button size="large" block > + Add if action block</Button>          
          </Space>
        </Modal>
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

const initialElements = [
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
  { id: '2', data: { label: <PlusOutlined /> ,type:"add"}, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true }
];

const addActionButton = (source: string, animated: boolean = false):Array<any> => {
  const target = source + Math.floor(Math.random() * 100);
  return [
    { id: `e${source}-${target}`, source: source, target: target, animated: animated },
    { id: target, data: { label: <div> + </div> }, position: { x: 100, y: 100 } }
  ];
};


const renderForm =() =>{
  return (
    <Form layout="vertical" hideRequiredMark>
    <Form.Item
      name="name"
      label="Name"
      rules={[{ required: true, message: 'Please enter user name' }]}
    >
      <Input placeholder="Please enter user name" />
    </Form.Item>

    <Form.Item
      name="url"
      label="Url"
      rules={[{ required: true, message: 'Please enter url' }]}
    >
      <Input
        style={{ width: '100%' }}
        addonBefore="http://"
        addonAfter=".com"
        placeholder="Please enter url"
      />
    </Form.Item>
    <Form.Item
      name="owner"
      label="Owner"
      rules={[{ required: true, message: 'Please select an owner' }]}
    >
      <Select placeholder="Please select an owner">
        <Select.Option value="xiao">Xiaoxiao Fu</Select.Option>
        <Select.Option value="mao">Maomao Zhou</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="type"
      label="Type"
      rules={[{ required: true, message: 'Please choose the type' }]}
    >
      <Select placeholder="Please choose the type">
        <Select.Option value="private">Private</Select.Option>
        <Select.Option value="public">Public</Select.Option>
      </Select>
    </Form.Item>
</Form>
  )
}
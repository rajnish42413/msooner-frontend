import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, Card, Drawer, Tabs } from 'antd';
import { ArrowLeftOutlined, SubnodeOutlined, SisternodeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';
import NodeDetail from '../../components/NodeDetail';

export default function CampaignCreate() {
  // const onLoad = (reactFlowInstance: any) => {
  //   reactFlowInstance.fitView();
  // };

  const [elements, setElements] = useState(initialElements);
  const [editVisible, seteditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(Object);

  const updateNodeAction = (id: string, newvalue: string , nodeName?:string) => {
    let index = elements.findIndex(x => x.id === id);
    if (index !== -1) {
      let temporaryarray = elements.slice();
      temporaryarray[index].data.action = newvalue;
      if(nodeName) temporaryarray[index].data.label = <><strong>{nodeName}</strong></>;      
      console.log(temporaryarray);
      setElements(temporaryarray);
    }
    else {
      console.log('no match');
    }
  }

  const onConnect = (params: any) => console.log(params);

  const onElementClick = (event: any, element: any) => {
    setSelectedData(element);
    seteditVisible(true);
    return;
  }

  const handleAction = (count: number = 1) => {
    if (selectedData) {
      updateNodeAction(selectedData.id, 'edit' ,`node ${selectedData.id}`);
      setElements([...elements, ...addActionButton(selectedData, count)]);
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
          nodeStrokeColor={(n: any) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n: any) => {
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
        onClose={() => seteditVisible(false)}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => seteditVisible(false)} style={{ marginRight: 8 }}>
              Cancel
              </Button>
            <Button onClick={() => seteditVisible(false)} type="primary">
              Submit
              </Button>
          </div>
        }
      >

        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane tab="Data" key="1">
            {<NodeDetail />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Actions" key="4">
            <RenderActions handleAction={handleAction} action={selectedData?.data?.action} />
          </Tabs.TabPane>
        </Tabs>

      </Drawer>
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
      ),
      action: "add"
    },
    position: { x: 250, y: 0 }
  }
];


const addActionButton = (selected: any, count: number, animated: boolean = false): Array<any> => {
  const source: string = selected?.id;
  const result: Array<any> = [];
  Array(count).fill(1).map((_, i) => {
    const target = source + i + '-' + Math.floor(Math.random() * 100);
    const position = {
      x: selected.position.x,
      y: selected.position.y + 100,
    }
    result.push(
      { id: `e${source}-${target}`, source: source, target: target, animated: animated, type: 'step' },
      { id: target, data: { label: <div> + </div>, action: 'add' }, position: position }
    );
     // eslint-disable-next-line
    return;
  });
  return result;
};




interface IActionProps {
  handleAction(count?: number): void;
  action: string
}
const RenderActions = ({ handleAction, action }: IActionProps) => {
  return (
    <div>
      {action === 'add' &&
        <Card hoverable title={<span ><SubnodeOutlined /> {" "} Single Action Block</span>} onClick={() => handleAction(1)}>
          Add single action block to this node.
        </Card>}

      <br />
      {action === 'add' &&
        <Card hoverable title={<span ><SisternodeOutlined /> {" "} IF/ELSE Action Block</span>} onClick={() => handleAction(2)}>
          Add if/esle action block to this node.
    </Card>}

      <br />
      {action === 'add' &&
        <Card hoverable title={<span ><SisternodeOutlined /> {" "} Multiple Action Block</span>} onClick={() => handleAction(5)}>
          Add single action block to this node.
    </Card>}

      <br />

    </div>
  )
}
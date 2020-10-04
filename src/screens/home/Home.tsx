import React from 'react';
import { Button, Card, Col, Row, Form, Checkbox, Input } from 'antd';
import AppLayout from '@layout/app';
import './Home.less';
import { useHistory } from 'react-router';

type Props = {};

const Home: React.FC<Props> = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    history.replace('/campaigns');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AppLayout>
      <Row align="middle" justify="center">
        <Col xs={24} sm={24} md={20} lg={10} xl={10}>
          <Card>
            <Form
              name="basic"
              layout="vertical"
              size="large"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Home;

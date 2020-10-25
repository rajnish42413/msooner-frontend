import React from 'react';
import { Form, Input, Select } from 'antd';

export default function NodeDetail() {
  return (
    <Form layout="vertical">
      <Form.Item name="node_name" label="Name" rules={[{ required: true, message: 'Please select a template' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email_template"
        label="Email Template"
        rules={[{ required: true, message: 'Please enter node name' }]}
      >
        <Select placeholder="Please select a template">
          <Select.Option value="t1">Template 1</Select.Option>
          <Select.Option value="t2">Template 2</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="send_at"
        label="Send At"
        rules={[{ required: true, message: 'Please enter url' }]}
        initialValue="t1"
      >
        <Select placeholder="Please select send at">
          <Select.Option value="t1">Instant</Select.Option>
          <Select.Option value="1">After 1h of campaign Start</Select.Option>
          <Select.Option value="3">After 3h of campaign Start</Select.Option>
          <Select.Option value="4">After 1day of campaign Start</Select.Option>
          <Select.Option value="5">After 2day of campaign Start</Select.Option>
          <Select.Option value="6">After 3day of campaign Start</Select.Option>
          <Select.Option value="7">After 4day of campaign Start</Select.Option>
          <Select.Option value="8">After 5day of campaign Start</Select.Option>
          <Select.Option value="9">After 6day of campaign Start</Select.Option>
          <Select.Option value="10">After 7day of campaign Start</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

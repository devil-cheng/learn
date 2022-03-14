/**
 * title: 前置/后置标签
 * desc: 用于配置一些固定组合。
 */

import React from 'react';
import { Input, Select, Space, Cascader } from '@vv-work-desktop-web-core/atoms';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
    </Select>
);
const selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
        <Option value=".com">.com</Option>
        <Option value=".jp">.jp</Option>
        <Option value=".cn">.cn</Option>
        <Option value=".org">.org</Option>
    </Select>
);

export default () => (
    <Space direction="vertical">
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
        <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
        <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
        <Input addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />} defaultValue="mysite" />
    </Space>
);

/**
 * title: 密码框
 * desc: 密码框
 */

import React from 'react';
import { Input, Space } from '@vv-work-desktop-web-core/atoms';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default () => (
    <Space direction="vertical">
        <Input.Password placeholder="input password" />
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
    </Space>
);

/**
 * title: 三种大小
 * desc: 我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。
 */

import React from 'react';
import { Input } from '@vv-work-desktop-web-core/atoms';
import { UserOutlined } from '@ant-design/icons';
import './style.css';

export default () => (
    <div className="example-input">
        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
        <br />
        <br />
        <Input placeholder="default size" prefix={<UserOutlined />} />
        <br />
        <br />
        <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
    </div>
);

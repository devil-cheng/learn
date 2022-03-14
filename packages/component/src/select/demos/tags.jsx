/**
 * title: 标签
 * desc: tags select，随意输入的内容（scroll the menu）
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default function Demo() {
    return (
        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={handleChange}>
            {children}
        </Select>
    );
}

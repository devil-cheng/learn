/**
 * title: 自动分词
 * desc: 试下复制 `露西,杰克` 到输入框里。只在 tags 和 multiple 模式下可用。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i += 1) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(val) {
    console.log(`selected ${val}`);
}

export default function Demo() {
    return (
        <Select mode="tags" style={{ width: '100%' }} onChange={handleChange} tokenSeparators={[',']}>
            {children}
        </Select>
    );
}

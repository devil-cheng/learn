/**
 * title: 分组
 * desc: 用 `OptGroup` 进行选项分组。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option, OptGroup } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default function Demo() {
    return (
        <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
            <OptGroup label="Manager">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
                <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
        </Select>
    );
}

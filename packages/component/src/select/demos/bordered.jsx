/**
 * title: 无边框
 * desc: 无边框样式。
 */

import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;

export default function Demo() {
    return (
        <>
            <Select defaultValue="lucy" style={{ width: 120 }} bordered={false}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Select defaultValue="lucy" style={{ width: 120 }} disabled bordered={false}>
                <Option value="lucy">Lucy</Option>
            </Select>
        </>
    );
}

/**
 * title: 后缀图标
 * desc: 后缀图标可通过 suffixIcon 属性来替换。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';
import { SmileOutlined, MehOutlined } from '@ant-design/icons';

const smileIcon = <SmileOutlined />;
const mehIcon = <MehOutlined />;
const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default function Demo() {
    return (
        <div>
            <Select suffixIcon={smileIcon} defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                    Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Select suffixIcon={mehIcon} defaultValue="lucy" style={{ width: 120, marginLeft: 12 }} disabled>
                <Option value="lucy">Lucy</Option>
            </Select>
        </div>
    );
}

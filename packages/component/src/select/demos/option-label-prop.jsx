/**
 * title: 定制回填内容
 * desc: 使用 `optionLabelProp` 指定回填到选择框的 `Option` 属性。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default function Demo() {
    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="select one country"
            defaultValue={['china']}
            onChange={handleChange}
            optionLabelProp="label"
        >
            <Option value="china" label="China">
                <span role="img" aria-label="China" style={{ marginRight: 6 }}>
                    🇨🇳
                </span>
                China (中国)
            </Option>
            <Option value="usa" label="USA">
                <span role="img" aria-label="USA" style={{ marginRight: 6 }}>
                    🇺🇸
                </span>
                USA (美国)
            </Option>
            <Option value="japan" label="Japan">
                <span role="img" aria-label="Japan" style={{ marginRight: 6 }}>
                    🇯🇵
                </span>
                Japan (日本)
            </Option>
            <Option value="korea" label="Korea">
                <span role="img" aria-label="Korea" style={{ marginRight: 6 }}>
                    🇰🇷
                </span>
                Korea (韩国)
            </Option>
        </Select>
    );
}

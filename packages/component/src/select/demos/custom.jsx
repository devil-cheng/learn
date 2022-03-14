/**
 * title: 自定义 `<Option>`
 * desc: 自定义 `<Option>` 的情况下使用搜索高亮
 */

import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;
const options = [
    { label: 'option1', value: 'value1' },
    { label: 'option2', value: 'value2' },
    { label: 'option3', value: 'value3', disabled: true },
    { label: 'option4', value: 'value4' },
    { label: 'option5', value: 'value5' },
    { label: 'option6', value: 'value6' },
    { label: 'option7', value: 'value7' },
    { label: 'option8', value: 'value8' },
    { label: 'option9', value: 'value9' },
    { label: 'option10', value: 'value10' },
    { label: 'option11', value: 'value11' },
    { label: 'option12', value: 'value12' },
    { label: 'option13', value: 'value13' },
    { label: 'option14', value: 'value14' },
    { label: 'option15', value: 'value15' },
    { label: 'option16', value: 'value16' },
    { label: 'option17', value: 'value17' },
    { label: 'option18', value: 'value18' },
    { label: 'option19', value: 'value19' },
    { label: 'option20', value: 'value20' }
];

export default function Demo() {
    return (
        <>
            <div>自定义Option:</div>
            <Select
                showSearch
                // highlightSearch
                placeholder="请选择"
                style={{ width: 300 }}
            >
                {options.map(item => (
                    <Option value={item.value} key={item.value} disabled={item.disabled ?? false}>
                        <strong>
                            {item.label} <small>a</small>
                        </strong>
                        <small>123</small>
                    </Option>
                ))}
            </Select>
        </>
    );
}

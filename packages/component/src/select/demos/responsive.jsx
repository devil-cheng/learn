/**
 * title: 响应式 maxTagCount
 * desc: 多选下通过响应式布局让选项自动收缩。该功能对性能有所消耗，不推荐在大表单场景下使用。
 */

import React from 'react';
import { Select, Space } from '@vv-work-desktop-web-core/atoms';

const options = [];

for (let i = 10; i < 36; i += 1) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const value = i.toString(36) + i;
    options.push({
        label: `Long Label: ${value}`,
        value
    });
}

export default function Demo() {
    const [value, setValue] = React.useState(['a10', 'c12', 'h17', 'j19', 'k20']);

    const selectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        value,
        options,
        onChange: newValue => {
            setValue(newValue);
        },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive'
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Select {...selectProps} />
            <Select {...selectProps} disabled />
        </Space>
    );
}

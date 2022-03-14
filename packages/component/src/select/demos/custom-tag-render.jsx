/**
 * title: 自定义选择标签
 * desc: 允许自定义选择标签的样式。
 */

import React from 'react';
import { Select, Tag } from '@vv-work-desktop-web-core/atoms';

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

function tagRender(props) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    );
}

export default function Demo() {
    return (
        <>
            <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={['gold', 'cyan']}
                style={{ width: '100%' }}
                options={options}
            />
        </>
    );
}

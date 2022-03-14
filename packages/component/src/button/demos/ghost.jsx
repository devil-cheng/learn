/**
 * title: 幽灵按钮
 * desc: 幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。
 */
/* eslint-disable */
import React from 'react';
import { Button, Space } from '@vv-work-desktop-web-core/atoms';

export default function Demo() {
    return (
        <Space wrap style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Button type="primary" ghost>
                Primary
            </Button>
            <Button ghost>Default</Button>
            <Button type="dashed" ghost>
                Dashed
            </Button>
            <Button type="primary" danger ghost>
                Danger
            </Button>
        </Space>
    );
}

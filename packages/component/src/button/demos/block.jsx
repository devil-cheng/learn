/**
 * title: block 按钮
 * desc: 属性 `block` 将使按钮适合其父宽度。
 */
/* eslint-disable */
import React from 'react';
import { Button, Space } from '@vv-work-desktop-web-core/atoms';

export default function Demo() {
    return (
        <Space wrap>
            <Button type="primary" block>
                Primary
            </Button>
            <Button block>Default</Button>
            <Button type="dashed" block>
                Dashed
            </Button>
            <Button type="link" block>
                Link
            </Button>
        </Space>
    );
}

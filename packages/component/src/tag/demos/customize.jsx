/**
 * title: 自定义关闭按钮
 * desc: 可用 `closeIcon` 自定义关闭按钮。。
 */

import React from 'react';
import { Tag } from '@vv-work-desktop-web-core/atoms';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function Demo() {
    return (
        <div>
            <Tag closable closeIcon="关 闭">
                Tag1
            </Tag>
            <Tag closable closeIcon={<CloseCircleOutlined />}>
                Tag2
            </Tag>
        </div>
    );
}

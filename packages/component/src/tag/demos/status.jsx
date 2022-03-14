/**
 * title: 预设状态的标签
 * desc: 预设五种状态颜色，可以通过设置 `color` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。
 */

import React from 'react';
import { Tag, Divider } from '@vv-work-desktop-web-core/atoms';
import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';

export default function Demo() {
    return (
        <div>
            <Divider orientation="left">Without icon</Divider>
            <div>
                <Tag color="success">success</Tag>
                <Tag color="processing">processing</Tag>
                <Tag color="error">error</Tag>
                <Tag color="warning">warning</Tag>
                <Tag color="default">default</Tag>
            </div>
            <Divider orientation="left">With icon</Divider>
            <div>
                <Tag icon={<CheckCircleOutlined />} color="success">
                    success
                </Tag>
                <Tag icon={<SyncOutlined spin />} color="processing">
                    processing
                </Tag>
                <Tag icon={<CloseCircleOutlined />} color="error">
                    error
                </Tag>
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    warning
                </Tag>
                <Tag icon={<ClockCircleOutlined />} color="default">
                    waiting
                </Tag>
                <Tag icon={<MinusCircleOutlined />} color="default">
                    stop
                </Tag>
            </div>
        </div>
    );
}

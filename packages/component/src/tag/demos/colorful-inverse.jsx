/**
 * title: 多彩标签
 * desc: 我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。
 */

import React from 'react';
import { Tag, Divider } from '@vv-work-desktop-web-core/atoms';
import './style.css';

export default function Demo() {
    return (
        <div>
            <Divider orientation="left">Presets Inverse</Divider>
            <div>
                <Tag color="magenta-inverse">magenta</Tag>
                <Tag color="red-inverse">red</Tag>
                <Tag color="volcano-inverse">volcano</Tag>
                <Tag color="orange-inverse">orange</Tag>
                <Tag color="gold-inverse">gold</Tag>
                <Tag color="lime-inverse">lime</Tag>
                <Tag color="green-inverse">green</Tag>
                <Tag color="cyan-inverse">cyan</Tag>
                <Tag color="blue-inverse">blue</Tag>
                <Tag color="geekblue-inverse">geekblue</Tag>
                <Tag color="purple-inverse">purple</Tag>
            </div>
        </div>
    );
}

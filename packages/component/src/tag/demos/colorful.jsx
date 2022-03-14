/**
 * title: 多彩标签
 * desc: 我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。
 */

import React from 'react';
import { Tag } from '@vv-work-desktop-web-core/atoms';
import './style.css';

export default function Demo() {
    return (
        <div>
            <h4 style={{ margin: '16px 0' }}>自定义文字颜色跟背景颜色及边框:</h4>
            <div>
                <Tag textColor="#2D87FF" bgColor="#F0F7FF">
                    可操作
                </Tag>
                <Tag textColor="#FF5959" bgColor="#FEF5F5">
                    警示
                </Tag>
                <Tag textColor="#F48F10" bgColor="#FDF3E7">
                    提示
                </Tag>
                <Tag textColor="#44C69D" bgColor="#F0FAF6">
                    正向操作
                </Tag>
                <br />
                <Tag textColor="#2D87FF" bgColor="#F0F7FF" border>
                    可操作
                </Tag>
                <Tag textColor="#FF5959" bgColor="#FEF5F5" border>
                    警示
                </Tag>
                <Tag textColor="#F48F10" bgColor="#FDF3E7" border>
                    提示
                </Tag>
                <Tag textColor="#44C69D" bgColor="#F0FAF6" border>
                    正向操作
                </Tag>
            </div>
            <h4 style={{ marginBottom: 16 }}>Presets:</h4>
            <div>
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="gold">gold</Tag>
                <Tag color="lime">lime</Tag>
                <Tag color="green">green</Tag>
                <Tag color="cyan">cyan</Tag>
                <Tag color="blue">blue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="purple">purple</Tag>
            </div>
            <h4 style={{ margin: '16px 0' }}>三种尺寸:</h4>
            <div>
                <Tag size="large">大</Tag>
                <Tag>默认</Tag>
                <Tag size="small">小</Tag>
            </div>
            <h4 style={{ margin: '16px 0' }}>存在点击事件有hover效果</h4>
            <div>
                <Tag
                    onClick={() => {
                        console.log('我点击了');
                    }}
                >
                    可点击
                </Tag>
            </div>
        </div>
    );
}

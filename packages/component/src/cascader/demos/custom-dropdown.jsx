/**
 * title: 扩展菜单
 * desc: 使用 `dropdownRender` 对下拉菜单进行自由扩展。
 */
/* eslint-disable */
import React from 'react';
import { Cascader, Divider } from '@vv-work-desktop-web-core/atoms';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake'
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men'
                    }
                ]
            }
        ]
    }
];

function dropdownRender(menus) {
    return (
        <div>
            {menus}
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: 8 }}>The footer is not very short.</div>
        </div>
    );
}
export default function Demo() {
    return <Cascader options={options} dropdownRender={dropdownRender} placeholder="Please select" />;
}

/**
 * title: 移入展开
 * desc: 通过移入展开下级菜单，点击完成选择。
 */
/* eslint-disable */
import React from 'react';
import { Cascader } from '@vv-work-desktop-web-core/atoms';

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

function onChange(value) {
    console.log(value);
}

// Just show the latest item.
function displayRender(label) {
    return label[label.length - 1];
}

export default function Demo() {
    return <Cascader options={options} expandTrigger="hover" displayRender={displayRender} onChange={onChange} />;
}

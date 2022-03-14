/**
 * title: 大小
 * desc: 不同大小的级联选择器。
 */

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

export default function Demo() {
    return (
        <div>
            <Cascader size="large" options={options} onChange={onChange} />
            <br />
            <br />
            <Cascader options={options} onChange={onChange} />
            <br />
            <br />
            <Cascader size="small" options={options} onChange={onChange} />
            <br />
            <br />
        </div>
    );
}

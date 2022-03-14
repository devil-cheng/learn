/**
 * title: 自定义字段名
 * desc: 自定义字段名。
 */

import React from 'react';
import { Cascader } from '@vv-work-desktop-web-core/atoms';

const options = [
    {
        code: 'zhejiang',
        name: 'Zhejiang',
        items: [
            {
                code: 'hangzhou',
                name: 'Hangzhou',
                items: [
                    {
                        code: 'xihu',
                        name: 'West Lake'
                    }
                ]
            }
        ]
    },
    {
        code: 'jiangsu',
        name: 'Jiangsu',
        items: [
            {
                code: 'nanjing',
                name: 'Nanjing',
                items: [
                    {
                        code: 'zhonghuamen',
                        name: 'Zhong Hua Men'
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
        <Cascader
            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
            options={options}
            onChange={onChange}
            placeholder="Please select"
        />
    );
}

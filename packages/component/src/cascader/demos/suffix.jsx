/**
 * title: 后缀图标
 * desc: 省市区级联。
 */

import React from 'react';
import { Cascader } from '@vv-work-desktop-web-core/atoms';
import { SmileOutlined } from '@ant-design/icons';

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
            <Cascader
                suffixIcon={<SmileOutlined />}
                options={options}
                onChange={onChange}
                placeholder="Please select"
            />
            <br />
            <br />
            <Cascader suffixIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
            <br />
            <br />
            <Cascader
                expandIcon={<SmileOutlined />}
                options={options}
                onChange={onChange}
                placeholder="Please select"
            />
            <br />
            <br />
            <Cascader expandIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
        </div>
    );
}

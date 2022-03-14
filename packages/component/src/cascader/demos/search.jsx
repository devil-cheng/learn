/**
 * title: 搜索
 * desc: 可以直接搜索选项并选择。<br>`Cascader[showSearch]` 暂不支持服务端搜索，更多信息见 [#5547](https://github.com/ant-design/ant-design/issues/5547)
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
                    },
                    {
                        value: 'xiasha',
                        label: 'Xia Sha',
                        disabled: true
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
                        label: 'Zhong Hua men'
                    }
                ]
            }
        ]
    }
];

function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
}

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

export default function Demo() {
    return <Cascader options={options} onChange={onChange} placeholder="Please select" showSearch={{ filter }} />;
}

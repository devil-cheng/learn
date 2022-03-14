/**
 * title: 可以自定义显示
 * desc: 切换按钮和结果分开。
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
                label: 'Hangzhou'
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing'
            }
        ]
    }
];

class CitySwitcher extends React.Component {
    state = {
        text: 'Unselect'
    };

    onChange = (value, selectedOptions) => {
        this.setState({
            text: selectedOptions.map(o => o.label).join(', ')
        });
    };

    render() {
        return (
            <span>
                {this.state.text}
                &nbsp;
                <Cascader options={options} onChange={this.onChange}>
                    <a href="#">Change city</a>
                </Cascader>
            </span>
        );
    }
}

export default CitySwitcher;

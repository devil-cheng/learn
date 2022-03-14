/**
 * title: 多选
 * desc: 一次性选择多个选项。
 */
/* eslint-disable */
import React from 'react';
import { Cascader } from '@vv-work-desktop-web-core/atoms';

const options = [
    {
        label: 'Light',
        value: 'light',
        children: new Array(20).fill(null).map((_, index) => ({ label: `Number ${index}`, value: index }))
    },
    {
        label: 'Bamboo',
        value: 'bamboo',
        children: [
            {
                label: 'Little',
                value: 'little',
                children: [
                    {
                        label: 'Toy Fish',
                        value: 'fish'
                    },
                    {
                        label: 'Toy Cards',
                        value: 'cards'
                    },
                    {
                        label: 'Toy Bird',
                        value: 'bird'
                    }
                ]
            }
        ]
    }
];

function onChange(value) {
    console.log(value);
}

class LazyOptions extends React.Component {
    state = {
        options
    };

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1'
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2'
                }
            ];
            this.setState({
                options: [...this.state.options]
            });
        }, 1000);
    };

    render() {
        return (
            <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} changeOnSelect />
        );
    }
}

export default LazyOptions;

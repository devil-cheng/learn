/**
 * title: 适应文本高度的文本域
 * desc: 属性 `autoSize` 适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autoSize` 可以设定为一个对象，指定最小行数和最大行数。<br>`3.24.0` 后 `autosize` 被废弃，请使用 `autoSize`。
 */
/* eslint-disable */
import React from 'react';
import { Input } from '@vv-work-desktop-web-core/atoms';

const { TextArea } = Input;

class Demo extends React.Component {
    state = {
        value: ''
    };

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <TextArea placeholder="Autosize height based on content lines" autoSize />
                <div style={{ margin: '24px 0' }} />
                <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
                <div style={{ margin: '24px 0' }} />
                <TextArea
                    value={value}
                    onChange={this.onChange}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </div>
        );
    }
}

export default Demo;

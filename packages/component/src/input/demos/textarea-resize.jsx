/**
 * title: 文本域
 * desc: 用于多行输入。
 */
/* eslint-disable */
import React from 'react';
import { Input, Button } from '@vv-work-desktop-web-core/atoms';

const { TextArea } = Input;

const defaultValue =
    'The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows. The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows.';

class Demo extends React.Component {
    state = {
        autoResize: false
    };

    render() {
        const { autoResize } = this.state;

        return (
            <div>
                <Button onClick={() => this.setState({ autoResize: !autoResize })} style={{ marginBottom: 16 }}>
                    Auto Resize: {String(autoResize)}
                </Button>
                <TextArea rows={4} autoSize={autoResize} defaultValue={defaultValue} />
                <TextArea autoSize={autoResize} allowClear />
            </div>
        );
    }
}

export default Demo;

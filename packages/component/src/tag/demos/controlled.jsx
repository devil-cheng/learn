/**
 * title: 控制关闭状态
 * desc: 通过 `visible` 属性控制关闭状态。
 */
/* eslint-disable */

import React from 'react';
import { Tag, Button } from '@vv-work-desktop-web-core/atoms';

class Demo extends React.Component {
    state = {
        visible: true
    };

    render() {
        return (
            <div>
                <Tag closable visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
                    Movies
                </Tag>
                <Button size="small" onClick={() => this.setState({ visible: !this.state.visible })}>
                    Toggle
                </Button>
            </div>
        );
    }
}

export default Demo;

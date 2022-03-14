/**
 * title: 按钮尺寸
 * desc: 按钮有大、中、小三种尺寸。<br>通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。
 */
/* eslint-disable */
import React from 'react';
import { Button, Radio, Space } from '@vv-work-desktop-web-core/atoms';
import { DownloadOutlined } from '@ant-design/icons';

class ButtonSize extends React.Component {
    state = {
        size: 'large'
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const { size } = this.state;
        return (
            <Space wrap>
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <Button type="primary" size={size}>
                    Primary
                </Button>
                <Button size={size}>Default</Button>
                <Button type="dashed" size={size}>
                    Dashed
                </Button>
                <br />
                <Button type="link" size={size}>
                    Link
                </Button>
                <br />
                <Button type="primary" icon={<DownloadOutlined />} size={size} />
                <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
                <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
                <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                    Download
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} size={size}>
                    Download
                </Button>
            </Space>
        );
    }
}

export default ButtonSize;

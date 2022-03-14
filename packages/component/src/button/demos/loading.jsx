/**
 * title: 加载中状态
 * desc: 添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。
 */
/* eslint-disable */
import React from 'react';
import { Button, Space } from '@vv-work-desktop-web-core/atoms';
import { PoweroffOutlined } from '@ant-design/icons';

class Demo extends React.Component {
    state = {
        loadings: []
    };

    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings
                };
            });
        }, 6000);
    };

    render() {
        const { loadings } = this.state;
        return (
            <div>
                <Space style={{ width: '100%' }}>
                    <Button type="primary" loading>
                        Loading
                    </Button>
                    <Button type="primary" size="small" loading>
                        Loading
                    </Button>
                    <Button type="primary" icon={<PoweroffOutlined />} loading />
                </Space>

                <Space style={{ width: '100%' }}>
                    <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadings[1]}
                        onClick={() => this.enterLoading(1)}
                    >
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadings[2]}
                        onClick={() => this.enterLoading(2)}
                    />
                </Space>
            </div>
        );
    }
}

export default Demo;

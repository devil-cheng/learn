/**
 * title: 线性样式
 * desc: 通过 `treeLine` 配置线性样式。
 */
/* eslint-disable */
import React from 'react';
import { TreeSelect, Switch, Space } from '@vv-work-desktop-web-core/atoms';

const { TreeNode } = TreeSelect;

export function Demo() {
    const [treeLine, setTreeLine] = React.useState(true);
    const [showLeafIcon, setShowLeafIcon] = React.useState(false);

    return (
        <Space direction="vertical">
            <Switch
                checkedChildren="treeLine"
                unCheckedChildren="treeLine"
                checked={treeLine}
                onChange={() => setTreeLine(!treeLine)}
            />
            <Switch
                disabled={!treeLine}
                checkedChildren="showLeafIcon"
                unCheckedChildren="showLeafIcon"
                checked={showLeafIcon}
                onChange={() => setShowLeafIcon(!showLeafIcon)}
            />
            <TreeSelect treeLine={treeLine && { showLeafIcon }} style={{ width: 300 }}>
                <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                        <TreeNode value="leaf1" title="my leaf" />
                        <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                        <TreeNode value="sss" title="sss" />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
        </Space>
    );
}

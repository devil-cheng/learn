/**
 * title: 基本
 * desc: 最简单的用法。
 */

import React, { useState } from 'react';
import { TreeSelect } from '@vv-work-desktop-web-core/atoms';

const { TreeNode } = TreeSelect;

export default function Demo() {
    const [value, setValue] = useState(undefined);
    const onChange = () => {
        setValue(value);
    };
    return (
        <>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                optionKeyProp="id"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
            >
                <TreeNode value="parent 1" title="parent 1" key="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="parent 1-0">
                        <TreeNode value="leaf1" title="leaf1" key="leaf1" />
                        <TreeNode value="leaf2" title="leaf2" key="leaf2" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="parent 1-1">
                        <TreeNode value="leaf3" key="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
        </>
    );
}

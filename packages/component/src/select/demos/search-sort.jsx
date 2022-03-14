/**
 * title: 带排序的搜索
 * desc: 在搜索模式下对过滤结果项进行排序。
 */

import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;

export default function Demo() {
    return (
        <>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                // eslint-disable-next-line
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) =>
                    // eslint-disable-next-line
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                <Option value="1">Not Identified</Option>
                <Option value="2">Closed</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
            </Select>
        </>
    );
}

/**
 * title: 多个按钮组合
 * desc: 按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。
 */
/* eslint-disable */
import React from 'react';
import { Button, Menu, Dropdown, Icon } from '@vv-work-desktop-web-core/atoms';

function handleMenuClick(e) {
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

export default function Demo() {
    return (
        <div>
            <Button type="primary">primary</Button>
            <Button>secondary</Button>
            <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
        </div>
    );
}

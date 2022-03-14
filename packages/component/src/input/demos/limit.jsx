/**
 * title: 输入限制
 * desc: 输入限制, 尾部显示允许的字数限制, 默认限制 500。
 */

import React from 'react';
import { Input } from '@vv-work-desktop-web-core/atoms';

const { TextArea } = Input;

export default () => {
    const inputRef = React.useRef(null);
    return (
        <div>
            <Input ref={inputRef} format="/" tips allowClear />
            <br />
            <br />
            <TextArea format="/" />
            <br />
            <Input.Search placeholder="input search text" allowClear enterButton="Search" size="large" />
            <br />
            <br />
            <Input.Password placeholder="input password" />
        </div>
    );
};

/**
 * title: 文本域
 * desc: 这个是不可拖拽例子。
 */

import React from 'react';
import { Input } from '@vv-work-desktop-web-core/atoms';

const { TextArea } = Input;

export default () => (
    <TextArea
        style={{ resize: 'none' }}
        rows={4}
        defaultValue="这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子这个是不可拖拽例子"
    />
);

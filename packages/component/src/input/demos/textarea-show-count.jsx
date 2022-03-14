/**
 * title: 带字数提示的文本域
 * desc: 展示字数提示。
 */
/* eslint-disable */
import React from 'react';
import { Input } from '@vv-work-desktop-web-core/atoms';

const { TextArea } = Input;

const onChange = e => {
    console.log('Change:', e.target.value);
};

export default () => <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} />;

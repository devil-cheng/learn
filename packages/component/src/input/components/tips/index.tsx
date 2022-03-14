import React, { useMemo } from 'react';
import classnames from 'classnames';

import { ITipsProps } from '../../typings';

const Tips = ({ prefixCls, maxLength, format, currentLength, highlight }: ITipsProps) => {
    // 按照设计规则
    // 当数组默认显示 0 灰色
    // 当输入框数字存在值并且小于highlight距离值 显示主题色
    // 当输入框值+highlight距离值大于maxLength显示红色
    const setClassName = useMemo(() => {
        if (currentLength === 0) {
            return null;
        }
        if (maxLength - currentLength < highlight) {
            // return `${prefixCls}-tips-red`;
            return `${prefixCls}-tips-highlight`;
        }
        // if (maxLength - currentLength >= highlight) {
        //     return `${prefixCls}-tips-highlight`;
        // }
        return null;
    }, [currentLength, maxLength, highlight, prefixCls]);
    return (
        <span className={classnames(setClassName)}>
            <span>{currentLength}</span>
            {`${format}${maxLength}`}
        </span>
    );
};

export default Tips;

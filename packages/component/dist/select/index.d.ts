import React from 'react';
import { OptionProps, SelectProps as AntSelectProps, RefSelectProps } from 'antd/es/select';
export interface SelectProps<T> extends AntSelectProps<T> {
    /** 是否高亮搜索项, 默认是 false */
    highlightSearch?: boolean;
    /** 通过数组的形式注入数据 */
    options?: [];
    /** 通过数组注入数据时候, 指定 label 对应的字段, 默认是 label */
    optionLabelProp?: string;
    /** 通过数组注入数据时候, 指定 value 对应的字段, 默认是 value */
    optionValueProp?: string;
}
export interface SelectComponentProps<T> extends React.ForwardRefExoticComponent<{
    ref?: React.Ref<RefSelectProps>;
} & SelectProps<T>> {
    Option: React.FC<OptionProps>;
}
/**
 * 自定义选择器
 * 支持搜索高亮功能
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const Select: SelectComponentProps<any>;
export default Select;

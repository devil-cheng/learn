import React from 'react';
import { TreeSelect as AntTreeSelect, TreeSelectProps as AntTreeSelectProps } from 'antd';
export interface TreeSelectProps extends AntTreeSelectProps<any> {
    /** 是否高亮搜索项, 默认是 false */
    highlightSearch?: boolean;
    /** 自定义渲染树节点 */
    renderTreeNodeTitle?: (node: any, searchContent: string) => React.ReactNode;
    /** 通过数组注入数据时候, 指定 key 对应的字段, 默认是 key */
    optionKeyProp?: string;
    /** 通过数组注入数据时候, 指定 label 对应的字段, 默认是 label */
    optionLabelProp?: string;
    /** 通过数组注入数据时候, 指定 value 对应的字段, 默认是 value */
    optionValueProp?: string;
    /** 通过数组注入数据时候, 指定 pId 对应的字段, 默认是 pId */
    optionPidProp?: string;
    children: React.ReactNode;
}
export declare type TreeSelectComponentProps = typeof AntTreeSelect & React.ForwardRefExoticComponent<TreeSelectProps>;
/**
 * 自定义选择器
 * 支持搜索高亮功能
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
declare const TreeSelect: TreeSelectComponentProps;
export default TreeSelect;

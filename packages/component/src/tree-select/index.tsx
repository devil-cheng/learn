/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { TreeSelect as AntTreeSelect, TreeSelectProps as AntTreeSelectProps } from 'antd';
import type { BaseSelectRef } from 'rc-select';
import { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigContext } from 'antd/es/config-provider/context';
import classNames from 'classnames';

import { debounce } from 'lodash-es';
import { ITreeData } from '@/interface';
import { createTreeFromTreeLikeArray, filterTree, flattenTree } from '@vv-work-desktop-web-core/helpers';
import HighlightText from '../highlight-text';

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

export type TreeSelectComponentProps = typeof AntTreeSelect &
    React.ForwardRefExoticComponent<TreeSelectProps>;

/**
 * 自定义选择器
 * 支持搜索高亮功能
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TreeSelect: TreeSelectComponentProps = React.forwardRef<BaseSelectRef, TreeSelectProps>(
    (
        {
            className,
            highlightSearch = true,
            renderTreeNodeTitle,
            treeData,
            treeDataSimpleMode,
            optionKeyProp = 'key',
            optionLabelProp = 'title',
            optionValueProp = 'value',
            optionPidProp = 'pId',
            multiple,
            treeCheckable,
            showCheckedStrategy,
            children,
            ...rest
        },
        ref
    ) => {
        // options 的引用
        // const treeDataRef = useRef<Record<string, any>[]>(treeData);
        const computedMultiple = Boolean(multiple ?? treeCheckable ?? false);
        const showSearch: boolean = rest.showSearch ?? computedMultiple ?? false;
        // useEffect(() => {
        //     treeDataRef.current = treeData;
        // }, [treeData]);

        const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);
        const prefixCls = getPrefixCls('tree-select-plus');

        // 如果有过滤数据, 需要展开过滤的数据
        const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

        const [searchContent, setSearchContent] = useState(''); // 保存搜索关键字
        const setSearchContentDebounce: (val: string) => void = useCallback(debounce(setSearchContent, 200), []); // 性能优化

        // 是否是 <Option> 注入数据
        const isOptionData = (!treeData || treeData.length === 0) && !!children;
        // 兼容 <Option> 的方式注入 options 的值
        const computedTreeData: Record<string, any>[] = useMemo(() => {
            let childrenOption: Record<string, any>[] | null | undefined = [];
            const transformReactNodeToData = (elements: React.ReactNode) =>
                React.Children.map(elements, (child: any) => {
                    const { children: childData, ...otherProps } = child.props;
                    const result: Record<string, any> = otherProps;
                    result[optionKeyProp] = child.key;
                    if (childData?.length) {
                        result.children = transformReactNodeToData(childData);
                    }
                    return result;
                });
            if (isOptionData) {
                childrenOption = transformReactNodeToData(children);
            }
            if (childrenOption?.length) {
                return childrenOption;
            }
            if (treeData && treeDataSimpleMode) {
                return createTreeFromTreeLikeArray(treeData);
            }
            return treeData || [];
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isOptionData, optionKeyProp, treeData, treeDataSimpleMode]);

        // 避免频繁触发数据过滤
        useEffect(() => {
            // 如果有过滤条件, 就执行过滤
            if (searchContent) {
                // 需要保留查找节点的父级, 所以使用 filterTreeArrayData
                const result = filterTree(computedTreeData as ITreeData, (item: Record<string, string>) =>
                    item[optionLabelProp].includes(searchContent)
                );
                setExpandedKeys(
                  flattenTree(result).map((item: Record<string, string>) => item[optionPidProp] ?? item[optionKeyProp])
                );
            } else {
                setExpandedKeys([]);
            }
        }, [computedTreeData, searchContent, optionKeyProp, optionLabelProp, optionPidProp]);

        const handleTreeNodeClick = (node: Record<string, any>) => {
            if (node.selectable === false) {
                if (expandedKeys.includes(node[optionValueProp])) {
                    setExpandedKeys([...expandedKeys.filter(item => item !== node[optionValueProp])]);
                } else {
                    setExpandedKeys([...expandedKeys, node[optionValueProp]]);
                }
            }
        };

        // 渲染树节点
        const renderTreeNode = (currentTreeData: Record<string, any>[]): React.ReactNode => {
            const getTitle = (node: any): React.ReactNode | string => {
                if (renderTreeNodeTitle) {
                    return renderTreeNodeTitle(node, searchContent);
                }
                if (showSearch && highlightSearch) {
                    return <HighlightText keywords={searchContent}>{node[optionLabelProp]}</HighlightText>;
                }
                return node[optionLabelProp] as string;
            };
            return currentTreeData.map((node: any) => (
                <AntTreeSelect.TreeNode
                    {...node}
                    key={node[optionKeyProp] || node[optionValueProp]}
                    title={
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <span onMouseUp={() => handleTreeNodeClick(node)}>{getTitle(node)}</span>
                    }
                    pureTitle={node[optionLabelProp]}
                >
                    {node.children ? renderTreeNode(node.children) : null}
                </AntTreeSelect.TreeNode>
            ));
        };

        return (
            <AntTreeSelect
                ref={ref}
                allowClear
                treeNodeFilterProp="pureTitle"
                treeNodeLabelProp="pureTitle"
                treeExpandedKeys={expandedKeys}
                onTreeExpand={keys => {
                    setExpandedKeys(keys as []);
                }}
                onSearch={setSearchContentDebounce}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 250, ...rest.style }}
                dropdownClassName={classNames(className, `${prefixCls}-dropdown`)}
                {...rest}
                showCheckedStrategy={showCheckedStrategy}
                treeCheckable={treeCheckable}
                multiple={computedMultiple}
                showSearch={showSearch}
            >
                {renderTreeNode(computedTreeData)}
            </AntTreeSelect>
        );
    }
) as TreeSelectComponentProps;

TreeSelect.displayName = 'TreeSelect';
TreeSelect.TreeNode = AntTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = AntTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = AntTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = AntTreeSelect.SHOW_CHILD;

export default TreeSelect;

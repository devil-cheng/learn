import React, { useEffect, useMemo, useState } from 'react';

import { Icon, Tree, TreeSelect as AntTreeSelect } from '@vv-work-desktop-web-core/atoms';
import { debounce, difference, union, xor } from 'lodash-es';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import { HighlightText } from '@vv-work-desktop-web-core/atoms';
import {
    createTreeFromTreeLikeArray,
    filterTreeWithParentNode,
    findAllInTree,
    findChildrenItemInTreeArray,
    flattenTree
} from '@vv-work-desktop-web-core/helpers';

import { getOptionItemByValue } from './util';
import styles from './index.less';

const { TreeNode } = Tree;

/**
 * 树选择器
 * TODO treeCheckStrictly: true 子节点联动选中还没有实现
 */
const TreeSelect = React.forwardRef((props, ref) => {
    const {
        value: _value,
        onChange: _onChange,
        disabled,
        data,
        loading,
        max,
        multiple,
        showSearch,
        placeholder,
        searchPlaceholder,
        className,
        style,
        treeCheckStrictly,
        optionKeyProp = 'id',
        optionValueProp = 'id',
        optionLabelProp = 'title',
        optionPidProp = 'pId',
        renderTreeNodeTitle,
        treeDefaultExpandedKeys,
        ...otherProps
    } = props;
    const [value, onChange] = useControllableValue(props);
    const treeData = useMemo(() => createTreeFromTreeLikeArray(data), [data]);
    const treeValue = useMemo(() => {
        if (loading) {
            return multiple ? [] : '';
        }
        if (treeCheckStrictly && value) {
            return data
                .filter(item => value.includes(item[optionValueProp]))
                .map(item => ({ label: item[optionLabelProp], value: item[optionValueProp] }));
        }
        // eslint-disable-next-line no-nested-ternary
        return value;
    }, [data, loading, multiple, optionLabelProp, optionValueProp, treeCheckStrictly, value]);
    const groupKeys = useMemo(() => {
        const result = [];
        data.forEach(item => {
            // const parentKeys = parsedArrayData.filter(item => !item.isLeaf).map(item => item[optionKeyProp]);
            if (item.isLeaf !== undefined && item.isLeaf !== null) {
                if (item.isLeaf === false) {
                    result.push(item[optionKeyProp]);
                }
            } else if (optionPidProp) {
                result.push(item[optionPidProp]);
            }
        });
        return Array.from(new Set(result));
    }, [optionKeyProp, optionPidProp, data]);

    // 如果有过滤数据, 需要展开过滤的数据
    const [expandedKeys, setExpandedKeys] = useState(treeDefaultExpandedKeys || []);
    // 搜索关键字
    const [filterKeyword, setFilterKeyword] = useState('');
    // 关键字防抖动
    const setFilterKeywordDebounce = useMemo(() => debounce(setFilterKeyword, 500), []);
    const filteredArray = useMemo(
        () =>
            flattenTree(
                filterTreeWithParentNode(
                    treeData,
                    (node, parentNode) => {
                        if (node.isLeaf && !!parentNode?.[optionLabelProp].match(new RegExp(filterKeyword, 'ig'))) {
                            return true;
                        }
                        return !!node[optionLabelProp].match(new RegExp(filterKeyword, 'ig'));
                    },
                    null,
                    {
                        idKey: optionKeyProp,
                        parentIdKey: optionPidProp
                    }
                )
            ),
        [filterKeyword, optionKeyProp, optionLabelProp, optionPidProp, treeData]
    );
    // 避免频繁触发数据过滤
    useEffect(() => {
        // 如果有过滤条件, 就执行过滤
        if (filterKeyword) {
            setExpandedKeys(filteredArray.map(item => item[optionKeyProp]));
        }
    }, [data, filteredArray, filterKeyword, optionKeyProp, optionLabelProp, optionPidProp]);

    const handleTreeNodeClick = (e, node) => {
        if (node.selectable === false) {
            e.stopPropagation();
            if (expandedKeys.includes(node[optionKeyProp])) {
                setExpandedKeys([...expandedKeys.filter(item => item !== node[optionKeyProp])]);
            } else {
                setExpandedKeys([...expandedKeys, node[optionKeyProp]]);
            }
        }
    };

    // 树选项被选中
    const handleTreeItemCheck = (changeValue, label, extra) => {
        const eventValue = changeValue.map(item => item.value);
        // const eventValue = treeCheckStrictly ? changeValue.map(item => item[optionValueProp]) : val;
        const isChecked = extra.checked;
        const currentNodeKey = extra.triggerNode?.props?.eventKey;
        let currentCheckedValue;
        let result;
        const getValue = () => {
            const needRemove = xor(
                filteredArray.map(item => item[optionValueProp]),
                currentCheckedValue
            );
            // 取差集再取并集
            return union(difference(value, needRemove), currentCheckedValue);
        };
        // 计算新值
        if (treeCheckStrictly) {
            currentCheckedValue = eventValue;
            if (isChecked && currentNodeKey) {
                // 父级选中, 关联选中子节点
                const currentNode = data.find(item => item[optionKeyProp] === currentNodeKey);
                const allChildrenItem = findChildrenItemInTreeArray(data, currentNode, {
                    idKey: optionKeyProp,
                    parentIdKey: optionPidProp
                });
                currentCheckedValue = [...eventValue, ...allChildrenItem.map(item => item?.[optionValueProp])];
            }
            result = getValue();
        } else {
            // 要去掉父节点
            const newValueKeys = eventValue.filter(item => !groupKeys.includes(item)); // 去掉父节点数据的当前数据
            currentCheckedValue = newValueKeys.map(
                newValueKey => data.find(dataItem => dataItem[optionKeyProp] === newValueKey)?.[optionValueProp]
            );
            result = getValue();
            // 解决因为特殊情况下(子节点没有有效子节点)导致半选复选框无法取消选择的问题
            if (result.length === value.length) {
                currentCheckedValue = difference(
                    result,
                    flattenTree(extra.triggerNode.props?.children).map(item => item[optionKeyProp])
                );
                result = getValue();
            }
        }

        if (onChange) {
            if (max) {
                result = result.slice(0, max);
            }
            onChange(
                result,
                findAllInTree(data, node => result.includes(node[optionValueProp]))
            );
        }
    };

    const handleDropdownVisibleChange = () => {
        setFilterKeyword('');
    };

    // 渲染树节点
    const renderTreeNode = currentTreeData => {
        const getTitle = node =>
            renderTreeNodeTitle ? (
                renderTreeNodeTitle(node, filterKeyword)
            ) : (
                <>
                    <HighlightText keywords={filterKeyword}>{node[optionLabelProp]}</HighlightText>
                    {node.statistics !== null && node.statistics !== undefined ? `(${node.statistics})` : ''}
                </>
            );
        return currentTreeData.map(node => (
            <TreeNode
                title={<div onClick={e => handleTreeNodeClick(e, node)}>{getTitle(node)}</div>}
                pureTitle={node[optionLabelProp]}
                value={node[optionValueProp]}
                key={node[optionKeyProp]}
                selectable={multiple ? node.selectable : !(node?.disabled === true) && node.isLeaf !== false}
                disabled={node?.disabled === true}
                isLeaf={node.isLeaf === true ? true : node.isLeaf}
            >
                {node.children ? renderTreeNode(node.children) : null}
            </TreeNode>
        ));
    };

    const treeProps = {};
    if (multiple) {
        treeProps.onChange = (val, nodes) => {
            onChange(val, getOptionItemByValue(data, val, optionKeyProp), nodes);
        };
        treeProps.treeCheckable = true;
        treeProps.multiple = true;
    } else {
        treeProps.onSelect = (val, node) => {
            if (node.isLeaf) {
                onChange(val, getOptionItemByValue(data, val, optionKeyProp), node);
            }
        };
    }

    const changeProp = multiple && treeCheckStrictly ? { onChange: handleTreeItemCheck } : {};

    return (
        <AntTreeSelect
            ref={ref}
            disabled={disabled}
            // eslint-disable-next-line no-nested-ternary
            value={treeValue}
            style={{ width: '100%', ...style }}
            className={classNames(styles.treeSelect, className)}
            showSearch={showSearch}
            allowClear
            clearIcon={() => (
                <Icon type="close-circle" theme="filled" onClick={() => onChange(multiple ? [] : undefined)} />
            )}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            treeNodeFilterProp="pureTitle"
            treeNodeLabelProp="pureTitle"
            treeCheckStrictly={treeCheckStrictly}
            treeExpandedKeys={expandedKeys}
            onSearch={setFilterKeywordDebounce}
            onTreeExpand={setExpandedKeys}
            dropdownStyle={{ maxHeight: 304, overflow: 'auto' }}
            getPopupContainer={trigger => trigger.parentNode}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            {...treeProps}
            {...otherProps}
            {...changeProp}
        >
            {renderTreeNode(treeData)}
        </AntTreeSelect>
    );
});

TreeSelect.propTypes = {
    placeholder: PropTypes.string,
    /** 选项 */
    data: PropTypes.array,
    /** 是否显示搜索 */
    showSearch: PropTypes.bool,
    /** 是否是多选 */
    multiple: PropTypes.bool,
    /** 是否禁用组件 */
    disabled: PropTypes.bool,
    /** 指定数据的 key 值对应字段, 默认是 id */
    optionKeyProp: PropTypes.string,
    /** 指定数据的 value 值对应字段, 默认是 id */
    optionValueProp: PropTypes.string,
    /** 指定数据的 title 值对应字段, 默认是 title */
    optionLabelProp: PropTypes.string,
    /** 指定数据的 pId 值对应字段, 默认是 pId */
    optionPidProp: PropTypes.string,
    /** 可选的最大数量 */
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /** 自定义标题的渲染 */
    renderTreeNodeTitle: PropTypes.func,
    /** 树节点选择策略是否是严格模式, 默认是 false */
    treeCheckStrictly: PropTypes.bool
};
TreeSelect.defaultProps = {
    placeholder: '请选择',
    data: [],
    showSearch: true,
    multiple: false,
    disabled: false,
    optionKeyProp: 'id',
    optionValueProp: 'id',
    optionLabelProp: 'title',
    optionPidProp: 'pId',
    max: false,
    renderTreeNodeTitle: null,
    treeCheckStrictly: false
};
TreeSelect.displayName = 'TreeSelect';

export default TreeSelect;

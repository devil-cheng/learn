import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState, useRef } from 'react';
import { Empty, Input, Tree, HighlightText } from '@vv-work-desktop-web-core/atoms';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { debounce } from 'lodash-es';
import {
    createTreeFromTreeLikeArray,
    closestParentKeysInTreeArray,
    findOneInTree,
    filterTreeWithParentNode
} from '@vv-work-desktop-web-core/helpers';
import { useControllableValue, useOnceByCondition } from '@vv-work-desktop-web-core/hooks';
import styles from './index.less';

const { TreeNode } = Tree;

/**
 * 树选择-展开模式-单选
 */
const TreeSelectTile = React.forwardRef((props, ref) => {
    const {
        disabled,
        data,
        searchPlaceholder,
        className,
        renderTreeNodeTitle,
        optionKeyProp,
        optionValueProp,
        optionLabelProp,
        optionPidProp
    } = props;
    const [value, onChange] = useControllableValue(props);
    const [keyword, setKeyword] = useState();
    const searchInputRef = useRef();
    const setKeywordDebounce = useMemo(() => debounce(setKeyword, 500), []);
    const treeData = useMemo(
        () =>
            createTreeFromTreeLikeArray(data, {
                idKey: optionKeyProp,
                parentIdKey: optionPidProp
            }),
        [data, optionKeyProp, optionPidProp]
    );
    // 过滤后的树数据
    const filteredTreeData = useMemo(
        // () => filterTree(treeData, item => !keyword || item?.[optionLabelProp]?.indexOf(keyword) > -1),
        () =>
            filterTreeWithParentNode(
                treeData,
                (node, parentNode) => {
                    if (node.isLeaf && !!parentNode[optionLabelProp].match(new RegExp(keyword, 'ig'))) {
                        return true;
                    }
                    return !!node[optionLabelProp].match(new RegExp(keyword, 'ig'));
                },
                null,
                {
                    idKey: optionKeyProp,
                    parentIdKey: optionPidProp
                }
            ),
        [keyword, optionKeyProp, optionLabelProp, optionPidProp, treeData]
    );

    const getKeyByValue = useCallback(val => data.find(item => item[optionValueProp] === val)?.[optionKeyProp], [
        data,
        optionKeyProp,
        optionValueProp
    ]);
    const valueOfKey = useMemo(() => getKeyByValue(value), [getKeyByValue, value]);
    // 获取选中数据的展开节点
    const getExpandKeys = useCallback(
        val => {
            if (val) {
                const key = getKeyByValue(val);
                if (key) {
                    const parentKeys = closestParentKeysInTreeArray(data, key, optionKeyProp, optionPidProp);
                    return [...parentKeys, key];
                }
            }
            return [];
        },
        [getKeyByValue, data, optionKeyProp, optionPidProp]
    );

    const [expandedKeys, setExpandedKeys] = useState([]);
    // 动态计算展开的节点
    useEffect(() => {
        if (keyword) {
            const result = [];
            const pickPid = array => {
                array.forEach(item => {
                    if (item.children?.length) {
                        result.push(item[optionKeyProp]);
                        pickPid(item.children);
                    }
                });
            };
            pickPid(filteredTreeData);
            setExpandedKeys(result);
        }
    }, [filteredTreeData, keyword, optionKeyProp]);

    // 首次进入展开第一个折叠
    useOnceByCondition(() => {
        if (expandedKeys?.length === 0 && filteredTreeData?.length === 1) {
            setExpandedKeys([filteredTreeData[0][optionKeyProp]]);
        }
    }, !!filteredTreeData?.length);

    const handleSearchChange = e => {
        setKeywordDebounce(e?.target?.value);
    };

    const handleTreeSelect = keys => {
        if (keys.length) {
            const targetData = findOneInTree(treeData, node => node[optionKeyProp] === keys[0]);
            onChange(targetData[optionValueProp], targetData);
        }
    };

    const handleTreeNodeClick = node => {
        if (node.selectable === false) {
            if (expandedKeys.includes(node[optionKeyProp])) {
                setExpandedKeys([...expandedKeys.filter(item => item !== node[optionKeyProp])]);
            } else {
                setExpandedKeys([...expandedKeys, node[optionKeyProp]]);
            }
        }
    };

    // 渲染树节点
    const renderTreeNode = nodes => {
        const getTitle = node =>
            renderTreeNodeTitle ? (
                renderTreeNodeTitle(node, keyword)
            ) : (
                <>
                    <HighlightText keywords={keyword}>{node[optionLabelProp]}</HighlightText>
                    {node.statistics !== null && node.statistics !== undefined ? `(${node.statistics})` : ''}
                </>
            );
        return nodes.map(node => (
            <TreeNode
                title={<div onClick={() => handleTreeNodeClick(node)}>{getTitle(node)}</div>}
                pureTitle={node[optionLabelProp]}
                value={node[optionValueProp]}
                key={node[optionKeyProp]}
                selectable={!(node?.disabled === true) && node.isLeaf !== false}
                disabled={node?.disabled === true}
                isLeaf={node.isLeaf === true ? true : node.isLeaf}
            >
                {node.children ? renderTreeNode(node.children) : null}
            </TreeNode>
        ));
    };

    useImperativeHandle(
        ref,
        () => ({
            setExpandedNodeByValue: val => {
                setExpandedKeys(getExpandKeys(val));
            },
            resetKeyword: () => {
                setKeyword('');
                searchInputRef.current.value = '';
                searchInputRef.current.state.value = '';
            }
        }),
        [getExpandKeys]
    );

    return (
        <div className={classNames(className, styles.treeSelectTile)}>
            <div className={classNames('search', styles.search)}>
                <Input.Search
                    placeholder={searchPlaceholder}
                    ref={searchInputRef}
                    allowClear
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classNames('tree', styles.tree, filteredTreeData?.length === 1 && styles.hideFirstFold)}>
                {filteredTreeData?.length ? (
                    <Tree
                        disabled={disabled}
                        onExpand={setExpandedKeys}
                        expandedKeys={expandedKeys}
                        autoExpandParent={false}
                        selectedKeys={[valueOfKey]}
                        onSelect={handleTreeSelect}
                    >
                        {renderTreeNode(filteredTreeData)}
                    </Tree>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>
        </div>
    );
});

TreeSelectTile.propTypes = {
    /** 占位符 */
    searchPlaceholder: PropTypes.string,
    /** 可选项 */
    data: PropTypes.array.isRequired,
    /** 是否禁用组件 */
    disabled: PropTypes.bool,
    /** 自定义树节点展示 */
    renderTreeNodeTitle: PropTypes.func,
    /** 指定数据的 key 值对应字段, 默认是 id */
    optionKeyProp: PropTypes.string,
    /** 指定数据的 value 值对应字段, 默认是 id */
    optionValueProp: PropTypes.string,
    /** 指定数据的 title 值对应字段, 默认是 title */
    optionLabelProp: PropTypes.string,
    /** 指定数据的 pId 值对应字段, 默认是 pId */
    optionPidProp: PropTypes.string
};
TreeSelectTile.defaultProps = {
    searchPlaceholder: '请输入关键词',
    disabled: false,
    renderTreeNodeTitle: null,
    optionKeyProp: 'id',
    optionValueProp: 'id',
    optionLabelProp: 'title',
    optionPidProp: 'pId'
};
TreeSelectTile.displayName = 'SearchTree';

export default TreeSelectTile;

import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState, useRef, useLayoutEffect } from 'react';
import { Empty, Input, Tooltip, Tree,HighlightText } from '@vv-work-desktop-web-core/atoms';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce, difference, groupBy, intersection, remove, union, xor } from 'lodash-es';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import {
    createTreeFromTreeLikeArray,
    findChildrenItemInTreeArray,
    closestParentKeysInTreeArray,
    closestParentItemInTree,
    findAllInTree,
    flattenTree,
    filterTreeWithParentNode
} from '@vv-work-desktop-web-core/helpers';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

const { TreeNode } = Tree;

/**
 * 树选择-展开模式-多选
 */
const TreeSelectMultipleTile = React.forwardRef((props, ref) => {
    const {
        data = [],
        disabled,
        checkedText,
        optionKeyProp,
        optionValueProp,
        optionLabelProp,
        optionPidProp,
        max,
        renderTreeNodeTitle,
        renderPreviewNodeTitle,
        treeCheckStrictly,
        isPreviewByGroup,
        previewSortType,
        searchPlaceholder,
        style
    } = props;

    const [value = [], onChange] = useControllableValue(props);
    // 搜索关键字
    const [keyword, setKeyword] = useState('');
    const searchInputRef = useRef();
    // 关键字防抖动
    const setKeywordDebounce = useMemo(() => debounce(setKeyword, 500), []);

    // 转成出树需要的字段
    const parsedArrayData = useMemo(
        () =>
            data.map(item => ({
                ...item,
                key: item[optionKeyProp],
                value: item[optionValueProp],
                title: item[optionLabelProp],
                pId: item[optionPidProp]
            })),
        [data, optionKeyProp, optionLabelProp, optionPidProp, optionValueProp]
    );

    const treeData = useMemo(
        () =>
            createTreeFromTreeLikeArray(parsedArrayData, {
                idKey: optionKeyProp,
                parentIdKey: optionPidProp
            }),
        [optionKeyProp, optionPidProp, parsedArrayData]
    );

    const getKeysByValue = useCallback(
        val => {
            if (optionKeyProp !== optionValueProp) {
                return val.map(
                    valueItem =>
                        parsedArrayData.find(dataItem => dataItem[optionValueProp] === valueItem)?.[optionKeyProp]
                );
            }
            return val;
        },
        [optionKeyProp, optionValueProp, parsedArrayData]
    );
    // 因为id字段和value字段可能不是一个字段. 所以需要重新计算下选中项的key值
    const keysOfValue = useMemo(() => getKeysByValue(value), [getKeysByValue, value]);

    // 数据的 Map 对象, 方便快速取值
    const parsedDataMap = useMemo(() => {
        const result = {};
        parsedArrayData.forEach(item => {
            result[item[optionKeyProp]] = item;
        });
        return result;
    }, [optionKeyProp, parsedArrayData]);

    // 如果有过滤数据, 需要展开过滤的数据
    const [expandedKeys, setExpandedKeys] = useState([]);

    // 分组归类所有选项, 分组判断的依据
    const groupedArrayData = useMemo(() => (isPreviewByGroup ? groupBy(parsedArrayData, optionPidProp) : {}), [
        isPreviewByGroup,
        optionPidProp,
        parsedArrayData
    ]);
    const groupKeys = useMemo(() => {
        const result = [];
        parsedArrayData.forEach(item => {
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
    }, [optionKeyProp, optionPidProp, parsedArrayData]);

    // 已选数据的对象列表
    const previewData = useMemo(() => {
        // 当前值的完整对象列表
        const valueObjectList = keysOfValue?.map(key => parsedDataMap[key]).filter(item => !!item);

        // 如果无需分组直接返回数据即可
        if (!isPreviewByGroup) {
            if (treeCheckStrictly) {
                return valueObjectList;
            }
            // 非严格模式下只允许选择末级节点
            return valueObjectList.filter(item => item.isLeaf !== false);
        }

        // 处理分组数据
        return groupingValue(
            valueObjectList,
            groupedArrayData,
            parsedDataMap,
            optionPidProp,
            optionKeyProp,
            treeCheckStrictly
        );
    }, [
        groupedArrayData,
        isPreviewByGroup,
        keysOfValue,
        optionKeyProp,
        optionPidProp,
        parsedDataMap,
        treeCheckStrictly
    ]);

    // 数据过滤
    const [filteredArrayData, setFilteredArrayData] = useState([]);
    // 避免频繁触发数据过滤
    useEffect(() => {
        let result = parsedArrayData;
        // 如果有过滤条件, 就执行过滤
        if (keyword) {
            // 需要保留查找节点的父级
            // 如果是有叶子节点的树结构, 如果父节点被匹配到, 子节点全部展示
            result = flattenTree(
                filterTreeWithParentNode(
                    treeData,
                    (node, parentNode) => {
                        if (parentNode && parentNode[optionLabelProp].match(new RegExp(keyword, 'ig'))) {
                            return true;
                        }
                        return !!node[optionLabelProp].match(new RegExp(keyword, 'ig'));
                    },
                    null,
                    {
                        idKey: optionKeyProp,
                        parentIdKey: optionPidProp
                    }
                )
            );
            setExpandedKeys(result.map(item => item[optionKeyProp]));
        }
        setFilteredArrayData(result);
    }, [keyword, optionKeyProp, optionLabelProp, optionPidProp, parsedArrayData, treeData]);

    useEffect(() => {
        setFilteredArrayData([...parsedArrayData]);
    }, [parsedArrayData]);

    // 树数据
    const filteredTreeData = useMemo(
        () =>
            createTreeFromTreeLikeArray(filteredArrayData, {
                idKey: optionKeyProp,
                parentIdKey: optionPidProp
            }),
        [filteredArrayData, optionKeyProp, optionPidProp]
    );

    // 当前选项被过滤后的树选中的值
    const currentTreeCheckedValue = useMemo(
        () =>
            intersection(
                keysOfValue,
                filteredArrayData.map(item => item[optionKeyProp])
            ),
        [filteredArrayData, keysOfValue, optionKeyProp]
    );

    // 获取选中数据的展开节点
    const getExpandKeys = useCallback(
        val => {
            let result = getKeysByValue(val || value);
            result.forEach(key => {
                result = result.concat(
                    closestParentKeysInTreeArray(filteredArrayData, key, optionKeyProp, optionPidProp)
                );
            });
            return Array.from(new Set(result));
        },
        [getKeysByValue, value, filteredArrayData, optionKeyProp, optionPidProp]
    );

    // 树选项展开收缩
    const handleTreeItemExpand = val => {
        setExpandedKeys(val);
    };
    // 树选项展开收缩
    const handleTreeSearch = e => {
        setKeywordDebounce(e.target.value);
    };

    const handleClear = () => {
        onChange([]);
    };

    // 首次加载 默认展开已选项
    const [isFirstExpandNodes, setIsFirstExpandNodes] = useState(!value);
    useEffect(() => {
        if (parsedArrayData?.length && value?.length && !isFirstExpandNodes) {
            setIsFirstExpandNodes(true);
            setExpandedKeys(getExpandKeys());
        }
    }, [getExpandKeys, isFirstExpandNodes, parsedArrayData, value]);

    // 第一个节点不允许被折叠
    useLayoutEffect(() => {
        if (filteredTreeData?.length === 1 && !expandedKeys.includes(filteredTreeData[0]?.[optionKeyProp])) {
            setExpandedKeys([filteredTreeData[0][optionKeyProp], ...expandedKeys]);
        }
    }, [expandedKeys, filteredTreeData, optionKeyProp]);

    // 渲染树节点
    const renderTreeNode = currentTreeData => {
        const getTitle = node =>
            renderTreeNodeTitle ? (
                renderTreeNodeTitle(node, keyword)
            ) : (
                <>
                    <HighlightText keywords={keyword}>{node[optionLabelProp]}</HighlightText>
                    {node.statistics ? `(${node.statistics})` : ''}
                </>
            );
        return currentTreeData.map(node => (
            <TreeNode
                title={getTitle(node)}
                key={node[optionKeyProp]}
                checkable={node?.checkable !== false}
                selectable={node?.selectable !== false}
                disabled={node?.disabled === true}
            >
                {node.children ? renderTreeNode(node.children) : null}
            </TreeNode>
        ));
    };

    // 删除已选节点
    const handleRemoveCheckedItem = (currentValue, childrenValue) => {
        let removeValue;
        if (treeCheckStrictly) {
            removeValue = [currentValue, ...childrenValue];
        } else {
            removeValue = childrenValue?.length ? [...childrenValue] : [currentValue];
        }
        if (onChange) {
            onChange(value.filter(key => !removeValue.includes(key)));
        }
    };

    // 树选项被选中
    const handleTreeItemCheck = (val, target) => {
        const eventValue = treeCheckStrictly ? val.checked : val;
        const isChecked = target.checked;
        const currentNodeKey = target.node.props.eventKey;
        let currentCheckedValue;
        let result;
        const getValue = () => {
            const needRemove = xor(
                filteredArrayData.map(item => item[optionValueProp]),
                currentCheckedValue
            );
            // 取差集再取并集
            return union(difference(value, needRemove), currentCheckedValue);
        };
        // 计算新值
        if (treeCheckStrictly) {
            currentCheckedValue = eventValue.map(
                newValueKey =>
                    parsedArrayData.find(dataItem => dataItem[optionKeyProp] === newValueKey)?.[optionValueProp]
            );
            if (isChecked) {
                // 父级选中, 关联选中子节点
                const currentNode = parsedArrayData.find(item => item[optionKeyProp] === currentNodeKey);
                const allChildrenItem = findChildrenItemInTreeArray(parsedArrayData, currentNode, {
                    idKey: optionKeyProp,
                    parentIdKey: optionPidProp
                });
                currentCheckedValue = [...currentCheckedValue, ...allChildrenItem.map(item => item?.[optionValueProp])];
            }
            result = getValue();
        } else {
            // 要去掉父节点
            const newValueKeys = eventValue.filter(item => !groupKeys.includes(item)); // 去掉父节点数据的当前数据
            currentCheckedValue = newValueKeys.map(
                newValueKey =>
                    parsedArrayData.find(dataItem => dataItem[optionKeyProp] === newValueKey)?.[optionValueProp]
            );
            result = getValue();
            // 解决因为特殊情况下(子节点没有有效子节点)导致半选复选框无法取消选择的问题
            if (result.length === value.length) {
                currentCheckedValue = difference(result, getChildrenTreeItemId(target.node.props?.children));
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

    const sortedPreviewData = previewSortType === 'asc' ? previewData : [...previewData].reverse();
    return (
        <div className={styles.treeSelectMultipleTile} style={style}>
            <div className={styles.treeContainer}>
                <Input.Search
                  placeholder={searchPlaceholder}
                    ref={searchInputRef}
                    allowClear
                    onChange={handleTreeSearch}
                />
                {(!filteredTreeData || filteredTreeData.length === 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                <Tree
                    className={classNames(
                        'tree',
                        styles.treeMain,
                        filteredTreeData?.length === 1 && styles.hideFirstFold
                    )}
                    expandedKeys={expandedKeys}
                    checkable={!disabled}
                    selectable={false}
                    checkedKeys={currentTreeCheckedValue}
                    onCheck={handleTreeItemCheck}
                    onExpand={handleTreeItemExpand}
                    checkStrictly={treeCheckStrictly}
                >
                    {renderTreeNode(filteredTreeData)}
                </Tree>
            </div>
            <div className={styles.previewContainer}>
                <div className={styles.checkedTotal}>
                    {checkedText}: {value.length}
                    {max && `/${max}`}
                    <a onClick={handleClear}>清空</a>
                </div>
                <div className={styles.checkedList}>
                    {sortedPreviewData?.map(item => (
                        <div key={item[optionKeyProp]} className={styles.checkedItem}>
                            <PopoverPathTitle
                                node={item}
                                treeData={treeData}
                                optionValueProp={optionValueProp}
                                optionLabelProp={optionLabelProp}
                            >
                                {renderPreviewNodeTitle ? (
                                    renderPreviewNodeTitle(item)
                                ) : (
                                    <div className={styles.checkedItemTitle}>
                                        {item[optionLabelProp]}
                                        {item.previewDataChildren ? `(${item.previewDataChildren})` : ''}
                                    </div>
                                )}
                            </PopoverPathTitle>
                            {!disabled && (
                                <CloseOutlined
                                    className={styles.checkedItemTitleClose}
                                    style={{ fontSize: 18 }}
                                    onClick={() =>
                                        handleRemoveCheckedItem(
                                            item[optionValueProp],
                                            item.previewDataChildren
                                                ? groupedArrayData[item[optionKeyProp]].map(m => m[optionValueProp])
                                                : []
                                        )
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

TreeSelectMultipleTile.propTypes = {
    /** 已选的文字 */
    checkedText: PropTypes.string.isRequired,
    /** 可选项数据, 数组格式 */
    data: PropTypes.array.isRequired,
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
    /** 自定义树节点展示 */
    renderTreeNodeTitle: PropTypes.func,
    /** 自定义预览节点展示 */
    renderPreviewNodeTitle: PropTypes.func,
    /** 树节点选择策略是否是严格模式, 默认是 false */
    treeCheckStrictly: PropTypes.bool,
    /** 结果预览是否开启分组展示 */
    isPreviewByGroup: PropTypes.bool,
    /** 结果的排序, 默认是 desc */
    previewSortType: PropTypes.oneOf(['asc', 'desc']),
    /** 搜索占位文字 */
    searchPlaceholder: PropTypes.string.isRequired
};

TreeSelectMultipleTile.defaultProps = {
    disabled: false,
    optionKeyProp: 'id',
    optionValueProp: 'id',
    optionLabelProp: 'title',
    optionPidProp: 'pId',
    max: false,
    renderTreeNodeTitle: null,
    renderPreviewNodeTitle: null,
    treeCheckStrictly: false,
    isPreviewByGroup: false,
    previewSortType: 'desc'
};

TreeSelectMultipleTile.displayName = 'TreeSelectMultipleTile';

export default TreeSelectMultipleTile;

// 数据分组算法
function groupingValue(
    valueObjectList,
    groupedArrayData,
    parsedDataMap,
    optionPidProp,
    optionKeyProp,
    treeCheckStrictly
) {
    let result = [];
    // 当前值的分组数据
    const groupedValueData = groupBy(valueObjectList, optionPidProp);
    // 取出第一个数据
    const queue = [...valueObjectList];
    let current = queue.shift();
    while (current) {
        // 判断是否满足分组显示的条件
        const currentSameGroupDataLength = groupedValueData[current[optionPidProp]].length;
        const originSameGroupDataLength = groupedArrayData[current[optionPidProp]].length;
        // eslint-disable-next-line no-loop-func
        const currentParentNode = valueObjectList.find(item => item[optionKeyProp] === current[optionPidProp]);

        if (currentSameGroupDataLength === originSameGroupDataLength && (!treeCheckStrictly || !!currentParentNode)) {
            // 记录被分组的项, 严格选择的模式下, 要删除掉
            if (treeCheckStrictly) {
                // 剔除掉重复的分组项
                // eslint-disable-next-line no-loop-func
                result = result.filter(item => item[optionKeyProp] !== current[optionPidProp]);
                // eslint-disable-next-line no-loop-func
                result = result.filter(item => item[optionPidProp] !== current[optionKeyProp]);
            }

            // 满足的话, 把组信息插入到结果中
            result.push({
                ...parsedDataMap[current[optionPidProp]],
                previewDataChildren: treeCheckStrictly
                    ? groupedValueData[current[optionPidProp]].length + 1
                    : groupedValueData[current[optionPidProp]].length // 显示该分组有几条数据
            });
            // 把 valueObjectList 中该分组的数据删除
            // eslint-disable-next-line no-loop-func
            remove(queue, item => item[optionPidProp] === current[optionPidProp]);
            // eslint-disable-next-line no-loop-func
        } else if (!result.some(item => item[optionKeyProp] === current[optionKeyProp])) {
            result.push(current);
        }
        current = queue.shift();
    }
    return result;
}

// 获取当前节点的子节点
function getChildrenTreeItemId(nodes = []) {
    let result = [];
    if (nodes) {
        for (let i = 0; i < nodes.length; i += 1) {
            result.push(nodes[i].key);
            if (nodes[i].props.children?.length) {
                result = result.concat(getChildrenTreeItemId(nodes[i].props.children));
            }
        }
    }
    return result;
}

// 显示路径的标题
function PopoverPathTitle({ node, treeData, children, optionValueProp, optionLabelProp }) {
    const path = closestParentItemInTree(treeData, item => item[optionValueProp] === node[optionValueProp], true)
        ?.map(item => item[optionLabelProp])
        ?.join('/');
    return (
        <Tooltip placement="top" title={path} mouseEnterDelay={0.5}>
            {children}
        </Tooltip>
    );
}

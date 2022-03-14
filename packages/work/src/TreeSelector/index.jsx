import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TreeSelect from './TreeSelect';
import TreeSelectModal from './TreeSelectModal';

const TreeSelector = React.forwardRef((props, ref) => {
    const { type, data, exclude, loading, modal, manual, renderTreeNodeTitle, optionKeyProp, ...otherProps } = props;
    const modalProp = otherProps.children || manual ? true : modal; // 自定义子节点模式下, 一律为弹框模式
    const manualProp = modalProp ? manual : false; // 只有弹框展示的情况下才允许手动控制
    const currentData = useMemo(() => data?.filter(item => !exclude.includes(item[optionKeyProp])) || [], [
        data,
        exclude,
        optionKeyProp
    ]);
    if (modalProp) {
        return (
            <TreeSelectModal
                ref={ref}
                data={currentData}
                loading={loading}
                manual={manualProp}
                renderTreeNodeTitle={renderTreeNodeTitle}
                optionKeyProp={optionKeyProp}
                {...otherProps}
            />
        );
    }
    return (
        <TreeSelect
            ref={ref}
            data={data}
            loading={loading}
            renderTreeNodeTitle={renderTreeNodeTitle}
            optionKeyProp={optionKeyProp}
            {...otherProps}
        />
    );
});

TreeSelector.propTypes = {
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    checkedText: PropTypes.string,
    /** 外部注入的数据 */
    data: PropTypes.array,
    /** 要排除的数据项 */
    exclude: PropTypes.array,
    /** 是否禁用组件 */
    disabled: PropTypes.bool,
    /** 不渲染触发器, 编码方式控制弹框展示 */
    manual: PropTypes.bool,
    /** 可选的最大数量, multiple: true 情况下可用 */
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /** 是否使用弹框的交互形式 */
    modal: PropTypes.bool,
    /** 是否是多选 */
    multiple: PropTypes.bool,
    /** 指定数据的 key 值对应字段, 默认是 id */
    optionKeyProp: PropTypes.string,
    /** 指定数据的 value 值对应字段, 默认是 id */
    optionValueProp: PropTypes.string,
    /** 指定数据的 title 值对应字段, 默认是 title */
    optionLabelProp: PropTypes.string,
    /** 指定数据的 pId 值对应字段, 默认是 pId */
    optionPidProp: PropTypes.string,
    /** 自定义树节点展示 */
    renderTreeNodeTitle: PropTypes.func,
    /** 自定义预览节点展示 */
    renderPreviewNodeTitle: PropTypes.func,
    /** 树节点选择策略是否是严格模式, 默认是 false */
    treeCheckStrictly: PropTypes.bool,
    /** 结果预览是否开启分组展示 */
    isPreviewByGroup: PropTypes.bool,
    /** 结果的排序, 默认是 desc */
    previewSortType: PropTypes.oneOf(['asc', 'desc'])
};
TreeSelector.defaultProps = {
    placeholder: '请选择',
    searchPlaceholder: '请输入关键词',
    checkedText: '已选',
    disabled: false,
    data: null,
    exclude: [],
    max: false,
    manual: false,
    modal: false,
    multiple: false,
    optionKeyProp: 'id',
    optionValueProp: 'id',
    optionLabelProp: 'title',
    optionPidProp: 'pId',
    renderTreeNodeTitle: null,
    renderPreviewNodeTitle: null,
    treeCheckStrictly: false,
    isPreviewByGroup: false,
    previewSortType: 'desc'
};
TreeSelector.displayName = 'TreeSelector';

export default TreeSelector;

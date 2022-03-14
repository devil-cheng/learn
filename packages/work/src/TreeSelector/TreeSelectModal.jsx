import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from '@vv-work-desktop-web-core/atoms';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import { findAllInTree } from '@vv-work-desktop-web-core/helpers';
import TreeSelectMultipleTile from './TreeSelectMultipleTile';
import TreeSelectTile from './TreeSelectTile';
import { getOptionItemByValue } from './util';
import styles from './index.less';

/**
 * 弹框模式的树选中组件
 */
const TreeSelectModal = React.forwardRef((props, ref) => {
    const {
        value: _value,
        onChange: _onChange,
        data,
        manual,
        multiple,
        maxTagCount,
        optionKeyProp,
        optionValueProp,
        optionLabelProp,
        optionPidProp,
        disabled,
        placeholder,
        searchPlaceholder,
        checkedText,
        style,
        className,
        children,
        ...otherProps
    } = props;
    const [value, onChange] = useControllableValue(props);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalValue, setModalValue] = useState();
    const selectRef = useRef();
    const treeSelectTileRef = useRef();

    useEffect(() => {
        setModalValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)]);

    const handleOk = () => {
        setModalVisible(false);
        const targetData = getOptionItemByValue(data, modalValue, optionValueProp);
        onChange(modalValue, targetData);
    };

    const handleCancel = () => {
        setModalVisible(false);
        // 弹框关闭的时候要取消select的focus状态
        if (selectRef.current) {
            setTimeout(() => {
                selectRef.current.blur();
            });
        }
        // if (treeSelectTileRef.current) {
        //     treeSelectTileRef.current.resetKeyword();
        // }
    };

    const handleChange = val => {
        onChange(
            val,
            val !== null && val !== undefined ? findAllInTree(data, node => val.includes(node[optionValueProp])) : null
        );
    };

    const handleDropdownVisibleChange = open => {
        if (open) {
            setModalValue(value);
            setModalVisible(true);
            if (treeSelectTileRef.current) {
                treeSelectTileRef.current.resetKeyword();
            }
        }
    };

    const renderSelectOption = () =>
        data?.map(item => (
            <Select.Option key={item[optionKeyProp]} title={item[optionLabelProp]} value={item[optionValueProp]} />
        ));

    // 获取第一个节点
    const getFirstChildren = () => {
        if (children instanceof Array) {
            return children[0];
        }
        return children;
    };

    const renderTriggerElement = () => {
        if (children) {
            if (children instanceof Function) {
                return children(value, getOptionItemByValue(data, value, optionValueProp), disabled);
            }
            const firstChildren = getFirstChildren();
            return firstChildren
                ? React.cloneElement(firstChildren, {
                      // 点击打开弹框
                      onClick: !manual && !disabled ? () => handleDropdownVisibleChange(true) : null,
                      disabled
                  })
                : null;
        }
        if (manual) {
            return null;
        }
        return (
            <Select
                allowClear
                className={classNames(styles.treeSelect, className)}
                disabled={disabled}
                style={style}
                ref={selectRef}
                mode={multiple ? 'multiple' : ''}
                maxTagCount={maxTagCount}
                optionLabelProp="title"
                value={value}
                onChange={handleChange}
                getPopupContainer={trigger => trigger.parentNode}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                dropdownMenuStyle={{ display: 'none' }}
                placeholder={placeholder}
            >
                {renderSelectOption()}
            </Select>
        );
    };

    useImperativeHandle(
        ref,
        () => ({
            open: val => {
                setModalVisible(true);
                if (val) {
                    setModalValue(val);
                    setTimeout(() => {
                        if (treeSelectTileRef.current) {
                            treeSelectTileRef.current.setExpandedNodeByValue(val);
                        }
                    });
                }
            },
            close: () => {
                setModalVisible(false);
            }
        }),
        []
    );

    return (
        <>
            {renderTriggerElement()}
            <Modal
                title={placeholder}
                width={multiple ? 640 : 480}
                visible={modalVisible}
                okButtonProps={{
                    disabled: isEqual(modalValue, value)
                }}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {multiple && (
                    <TreeSelectMultipleTile
                        ref={treeSelectTileRef}
                        style={{ width: '100%' }}
                        data={data}
                        value={modalValue}
                        onChange={setModalValue}
                        optionKeyProp={optionKeyProp}
                        optionValueProp={optionValueProp}
                        optionLabelProp={optionLabelProp}
                        optionPidProp={optionPidProp}
                        checkedText={checkedText}
                        searchPlaceholder={searchPlaceholder}
                        {...otherProps}
                    />
                )}
                {!multiple && (
                    <TreeSelectTile
                        ref={treeSelectTileRef}
                        style={{ width: '100%' }}
                        data={data}
                        value={modalValue}
                        onChange={setModalValue}
                        optionKeyProp={optionKeyProp}
                        optionValueProp={optionValueProp}
                        optionLabelProp={optionLabelProp}
                        optionPidProp={optionPidProp}
                        searchPlaceholder={searchPlaceholder}
                        {...otherProps}
                    />
                )}
            </Modal>
        </>
    );
});

TreeSelectModal.propTypes = {
    /** 可选项 */
    data: PropTypes.array.isRequired,
    /** 占位符 */
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    checkedText: PropTypes.string,
    /** 是否禁用组件 */
    disabled: PropTypes.bool,
    /** 不渲染触发器, 编码方式控制弹框展示 */
    manual: PropTypes.bool,
    /** 是否是多选 */
    multiple: PropTypes.bool,
    /** 指定数据的 key 值对应字段, 默认是 id */
    optionKeyProp: PropTypes.string,
    /** 指定数据的 value 值对应字段, 默认是 id */
    optionValueProp: PropTypes.string,
    /** 指定数据的 title 值对应字段, 默认是 title */
    optionLabelProp: PropTypes.string,
    /** 指定数据的 pId 值对应字段, 默认是 pId */
    optionPidProp: PropTypes.string
};
TreeSelectModal.defaultProps = {
    placeholder: '请选择',
    searchPlaceholder: '请输入关键词',
    checkedText: '已选',
    disabled: false,
    manual: false,
    multiple: false,
    optionKeyProp: 'id',
    optionValueProp: 'id',
    optionLabelProp: 'title',
    optionPidProp: 'pId'
};
TreeSelectModal.displayName = 'TreeSelectModal';

export default TreeSelectModal;

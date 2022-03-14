/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Checkbox, Select as AntSelect } from 'antd';
import { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigContext } from 'antd/es/config-provider/context';
import { OptionProps, SelectProps as AntSelectProps, SelectValue, RefSelectProps } from 'antd/es/select';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import HighlightText from '../highlight-text';

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

export interface SelectComponentProps<T>
    extends React.ForwardRefExoticComponent<{ ref?: React.Ref<RefSelectProps> } & SelectProps<T>> {
    Option: React.FC<OptionProps>;
}

type PropsIncludeChildren = {
  props: {
    children: [] | string;
  };
};

// 获取富文本节点的所有文本(去空格)
const getOptionLabel = (labelProp: [] | string | PropsIncludeChildren): string => {
  let result = '';
  if (typeof labelProp === 'string') {
    result = labelProp;
  } else if (labelProp instanceof Array) {
    labelProp.forEach(item => {
      result += getOptionLabel(item);
    });
  } else if (labelProp.props?.children) {
    result = getOptionLabel(labelProp.props.children);
  }
  return result.trim();
};

/**
 * 自定义选择器
 * 支持搜索高亮功能
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Select: SelectComponentProps<any> = React.forwardRef<any, SelectProps<any>>(
    (
        {
            className,
            showSearch = false,
            highlightSearch = false,
            onSearch,
            options = [],
            optionLabelProp = 'children',
            optionValueProp = 'value',
            children,
            ...rest
        },
        ref
    ) => {
        const [value = rest.mode === 'multiple' ? [] : undefined, onChange] = useControllableValue<SelectValue>(rest);
        // options 的引用
        const optionRef = useRef<Record<string, any>[]>(options);
        useEffect(() => {
            optionRef.current = options;
        }, [options]);

        const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);
        const prefixCls = getPrefixCls('select-plus');

        const [searchContent, setSearchContent] = useState(''); // 保存搜索关键字
        const setSearchContentDebounce: (val: string) => void = useCallback(debounce(setSearchContent, 200), []); // 性能优化
        // 拦截 onSearch 函数, 在此基础上搜集搜索关键字
        const onSearchProxy = (val: string): void => {
            setSearchContentDebounce(val);
            if (onSearch) {
                onSearch(val);
            }
        };
        // 拦截 onChange 函数, 在此基础上清楚搜索关键字
        const onChangeProxy = (val: any, option: React.ReactElement | React.ReactElement[]): void => {
            setSearchContent('');
            return onChange?.(val, option);
        };

        // 是否是 <Option> 注入数据
        const isOptionData = (!optionRef.current || optionRef.current.length === 0) && !!children;
        // 兼容 <Option> 的方式注入 options 的值
        const computedOptions: Record<string, any>[] = useMemo(() => {
            let childrenOption: Record<string, any>[] | null | undefined = null;
            if (isOptionData) {
                childrenOption = React.Children.map(children, (child: any) => {
                    const result: Record<string, any> = {};
                    if (optionLabelProp) {
                        result[optionLabelProp] = child.props[optionLabelProp] || child.props.children;
                    }
                    result[optionValueProp] = child.props[optionValueProp] || child.props.children;
                    result.disabled = child.props.disabled;
                    result.children = child.props.children;
                    return result;
                });
            }
            return childrenOption || optionRef.current;
        }, [children, isOptionData, optionLabelProp, optionValueProp]);

        // 过滤后的 options
        const filteredOptions: Record<string, any>[] = useMemo(() => {
            if (searchContent) {
                return computedOptions.filter(
                    item => getOptionLabel(item[optionLabelProp]).indexOf(searchContent) >= 0
                );
            }
            return computedOptions;
        }, [optionLabelProp, computedOptions, searchContent]);

        // 渲染选项节点
        const renderOption = (item: Record<string, any>) => {
            const labelProp =
                optionLabelProp !== 'children'
                    ? {
                          [optionLabelProp]: item[optionLabelProp]
                      }
                    : {
                          label: item[optionLabelProp]
                      };
            return (
                <AntSelect.Option
                    value={item[optionValueProp]}
                    {...labelProp}
                    key={item[optionValueProp]}
                    disabled={item.disabled ?? false}
                >
                    {rest?.mode === 'multiple' && Array.isArray(value) && (
                        <Checkbox
                            className={`${prefixCls}-multiple-item-checkbox`}
                            checked={(value as string[]).includes(item[optionValueProp] as string)}
                        />
                    )}
                    {showSearch && highlightSearch ? (
                        <HighlightText keywords={searchContent}>{item.children ?? item[optionLabelProp]}</HighlightText>
                    ) : (
                        item[optionLabelProp]
                    )}
                </AntSelect.Option>
            );
        };

        const renderOptions = filteredOptions.map(item => renderOption(item));
        // !isOptionData || highlightSearch ? filteredOptions.map(item => renderOption(item)) : children;

        // 开启搜索时, 覆盖组件属性
        const customSearchProp: Pick<SelectProps<any>, any> = showSearch && highlightSearch
            ? {
                  optionLabelProp, // 回填到输入框的值, 要取 <Option> 的 label 属性
                  optionFilterProp: optionLabelProp, // 因为 children 有格式化问题, 所以取 label 属性做过滤依据
                  filterOption: (input: string, option: any) =>
                      getOptionLabel(option.props[optionLabelProp]).toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  onSearch: onSearchProxy,
                  onChange: onChangeProxy
              }
            : {
                  // 因为多选的样式要用到复选框, 显示的结果不需要显示这个, 在 optionLabelProp 为 children 的情况下会有问题, 所以要特殊处理
                  optionLabelProp: optionLabelProp === 'children' ? 'label' : optionLabelProp,
                  onChange
              };
        return (
            <AntSelect
                ref={ref}
                showSearch={showSearch}
                {...rest}
                {...customSearchProp}
                value={value}
                menuItemSelectedIcon={<></>}
                dropdownClassName={classNames(className, `${prefixCls}-dropdown`)}
            >
                {renderOptions}
            </AntSelect>
        );
    }
) as SelectComponentProps<any>;

Select.displayName = 'Select';
Select.Option = AntSelect.Option;

export default Select;

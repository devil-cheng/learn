import React, { useContext, useMemo } from 'react';
import { Tag as AntdTag } from 'antd';
import { TagProps } from 'antd/es/tag';
import { ConfigContext } from 'antd/es/config-provider/context';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import classnames from 'classnames';
import parse from 'color-parse';

export interface IExtendProps {
    size?: 'small' | 'default' | 'large';
    textColor?: string;
    bgColor?: string;
    border?: boolean;
}

const Tag = ({
    className,
    size,
    children,
    textColor,
    color,
    border = false,
    bgColor,
    ...reset
}: TagProps & IExtendProps) => {
    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);

    const prefixCls = getPrefixCls('tag');

    const style = useMemo(() => {
        if (color) {
            return {};
        }
        let defaultStyle = { color: textColor || '', backgroundColor: bgColor || '' };
        if (border) {
            let borderColor = '0,0,0,.25';

            const setBorderColor = (value: string) => {
                if (value.indexOf('rgb') > -1) {
                    borderColor = value;
                } else {
                    borderColor = `${parse(value)?.values.join()},.45`;
                }
            };

            if (color) {
                setBorderColor(color);
            }

            if (textColor) {
                setBorderColor(textColor);
            }

            defaultStyle = { ...defaultStyle, ...{ borderColor: `rgba(${borderColor})` } };
        }
        return { style: defaultStyle };
    }, [bgColor, border, color, textColor]);

    return (
        <AntdTag
            className={classnames(size && `${prefixCls}-${size}`, reset?.onClick && `${prefixCls}-click`, className)}
            color={color}
            {...style}
            {...reset}
        >
            {children}
        </AntdTag>
    );
};
Tag.CheckableTag = AntdTag.CheckableTag;
export default Tag;

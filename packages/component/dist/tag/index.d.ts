import React from 'react';
import { TagProps } from 'antd/es/tag';
export interface IExtendProps {
    size?: 'small' | 'default' | 'large';
    textColor?: string;
    bgColor?: string;
    border?: boolean;
}
declare const Tag: {
    ({ className, size, children, textColor, color, border, bgColor, ...reset }: TagProps & IExtendProps): JSX.Element;
    CheckableTag: React.FC<import("antd/lib/tag").CheckableTagProps>;
};
export default Tag;

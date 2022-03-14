import React, { CSSProperties, ReactNode } from 'react';
export declare type PropsIncludeChildren = {
    props: {
        children: [] | string | ReactNode;
    };
};
/**
 * 关键词高亮
 * @param {string|ReactNode} text 需要匹配的文本
 * @param {string} keywords 关键词
 * @param {object} highlightStyle 高亮样式
 * @param {boolean} ignoreCase 忽略大小写
 */
export declare const highlightText: (text: string, keywords: string | [], highlightStyle?: React.CSSProperties | undefined, ignoreCase?: boolean | undefined) => string | [] | ReactNode;
export declare const highlightChildComponent: (item: PropsIncludeChildren, keywords: string | [], highlightStyle: CSSProperties, ignoreCase: boolean) => React.ReactNode;

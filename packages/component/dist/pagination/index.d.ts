import React from 'react';
export declare type PaginationValue = {
    current: number;
    pageSize?: number;
};
export declare type PaginationProps = {
    current: number;
    total: number;
    pageSize?: number;
    pageSizes?: number[];
    onChange: (value: PaginationValue) => void;
};
declare const _default: React.MemoExoticComponent<(props: PaginationProps) => JSX.Element>;
export default _default;

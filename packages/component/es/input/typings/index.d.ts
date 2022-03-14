export interface IExtendProps {
    format?: string;
    tips?: boolean;
    highlight?: number;
}

export interface ITipsProps {
    prefixCls: string;
    maxLength: number;
    format: string;
    currentLength: number;
    highlight: number;
}

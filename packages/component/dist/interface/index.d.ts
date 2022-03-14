export interface IPrefixCls {
    prefixCls: string;
}
export declare type ITreeDataItem = Record<string, any> & {
    children: ITreeData | null | undefined;
};
export declare type ITreeData = ITreeDataItem[];

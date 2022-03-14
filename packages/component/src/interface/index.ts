export interface IPrefixCls {
    prefixCls: string;
}

export type ITreeDataItem = Record<string, any> & {
    children: ITreeData | null | undefined;
};

export type ITreeData = ITreeDataItem[];

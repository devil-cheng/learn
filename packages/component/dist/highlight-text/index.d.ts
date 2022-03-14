import { CSSProperties, FC, ReactElement } from 'react';
export interface HighlightTextProp {
    keywords: [] | string | null;
    highlightStyle?: CSSProperties;
    ignoreCase?: boolean;
    children?: ReactElement;
}
declare const HighlightText: FC<HighlightTextProp>;
export default HighlightText;

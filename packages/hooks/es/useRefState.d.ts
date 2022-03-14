import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
/**
 * useState 的加强版本, 第三个参数 ref 保证引用地址不会变更
 * @param initialState
 */
declare function useRefState<S>(initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S | undefined>>, MutableRefObject<S | undefined>];
export default useRefState;

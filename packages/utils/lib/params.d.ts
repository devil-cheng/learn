/**
 * 返回url参考的对象格式
 */
export declare const getPageQuery: () => import("query-string").ParsedQuery<string>;
/**
 * 将Object值中的null转换为undefined
 */
export declare const nullTransformationToUndefined: (value: any) => any;
/**
 * 过滤请求参数, 去掉空值/null/undefined
 * @param params
 * @returns params
 */
export declare function filterUsefulRequestParams(params: {
    [x: string]: any;
}): {} | null;

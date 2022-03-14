/**
 * 获取值的对象
 * @param array
 * @param value
 * @param optionValueProp
 * @returns {null|*}
 */
export const getOptionItemByValue = (array, value, optionValueProp) => {
    if (!value) {
        return null;
    }
    const valueIsArray = value instanceof Array;
    const target = valueIsArray ? value : [value];
    const result = array.filter(item => target.includes(item[optionValueProp]));
    return valueIsArray ? result : result?.[0];
};

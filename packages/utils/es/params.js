import { parse } from 'query-string';
import { cloneDeep } from 'lodash-es';
/**
 * 返回url参考的对象格式
 */

export var getPageQuery = function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
};
/**
 * 将Object值中的null转换为undefined
 */

export var nullTransformationToUndefined = function nullTransformationToUndefined(value) {
  var cloneObj = cloneDeep(value);

  var transformationFunc = function transformationFunc(obj) {
    if (obj instanceof Object) {
      var ary = Array.isArray(obj) ? obj : Object.keys(obj);
      ary.forEach(function (it, index) {
        var key = Array.isArray(obj) ? index : it;

        if (obj[key] === null) {
          // eslint-disable-next-line no-param-reassign
          obj[key] = undefined;
        } else if (obj[key] instanceof Object) {
          transformationFunc(obj[key]);
        }
      });
    }
  };

  transformationFunc(cloneObj);
  return cloneObj;
};
/**
 * 过滤请求参数, 去掉空值/null/undefined
 * @param params
 * @returns params
 */

export function filterUsefulRequestParams(params) {
  var result = {};

  if (!params) {
    return null;
  }

  Object.keys(params).forEach(function (key) {
    var value = params[key];

    if (value !== '' && value !== undefined && value !== null) {
      // 是否要判断空数组?  !(value instanceof Array && value.length === 0)
      result[key] = value;
    }
  });
  return result;
}
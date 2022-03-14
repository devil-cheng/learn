"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUsefulRequestParams = filterUsefulRequestParams;
exports.nullTransformationToUndefined = exports.getPageQuery = void 0;

var _queryString = require("query-string");

var _lodashEs = require("lodash-es");

/**
 * 返回url参考的对象格式
 */
var getPageQuery = function getPageQuery() {
  return (0, _queryString.parse)(window.location.href.split('?')[1]);
};
/**
 * 将Object值中的null转换为undefined
 */


exports.getPageQuery = getPageQuery;

var nullTransformationToUndefined = function nullTransformationToUndefined(value) {
  var cloneObj = (0, _lodashEs.cloneDeep)(value);

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


exports.nullTransformationToUndefined = nullTransformationToUndefined;

function filterUsefulRequestParams(params) {
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
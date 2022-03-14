"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;
exports.diffArray = diffArray;

var _lodashEs = require("lodash-es");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 判断是否是空值
 * @param key
 * @param record
 */
function isEmpty(key, record) {
  if (key in record) {
    return record[key] === null || record[key] === undefined || record[key].length === 0;
  }

  return true;
}
/**
 * 比较两个对象的差异
 * @param oldObj
 * @param newObj
 */


function diff(oldObj, newObj) {
  var $diff = {};
  var aKeys = Object.keys(oldObj);
  var bKeys = Object.keys(newObj);
  var queue = Array.from(new Set([].concat(_toConsumableArray(aKeys), _toConsumableArray(bKeys))));

  while (queue.length) {
    var currentKey = queue.shift();

    if (currentKey) {
      if (isEmpty(currentKey, oldObj) && !isEmpty(currentKey, newObj)) {
        $diff[currentKey] = {
          type: 'add'
        };
      } else if (!isEmpty(currentKey, oldObj) && isEmpty(currentKey, newObj)) {
        $diff[currentKey] = {
          type: 'delete',
          oldValue: oldObj[currentKey]
        };
      } else if (!(0, _lodashEs.isEqual)(oldObj[currentKey], newObj[currentKey])) {
        $diff[currentKey] = {
          type: 'update',
          oldValue: oldObj[currentKey]
        };
      }
    }
  }

  return Object.assign(Object.assign(Object.assign({}, oldObj), newObj), {
    $diff: $diff
  });
}
/**
 * 比较两个数组的差异
 * @param oldArr
 * @param newArr
 * @param strategy
 */


function diffArray(oldArr, newArr) {
  var strategy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    compareField: 'id'
  };

  var _a, _b, _c, _d; // 全部新增的情况


  if ((!oldArr || (oldArr === null || oldArr === void 0 ? void 0 : oldArr.length) === 0) && (newArr === null || newArr === void 0 ? void 0 : newArr.length)) {
    return (newArr === null || newArr === void 0 ? void 0 : newArr.map(function (item) {
      return Object.assign(Object.assign({}, item), {
        $diff: {
          type: 'array-add'
        }
      });
    })) || [];
  } // 全部删除的情况


  if ((!newArr || (newArr === null || newArr === void 0 ? void 0 : newArr.length) === 0) && (oldArr === null || oldArr === void 0 ? void 0 : oldArr.length)) {
    return (oldArr === null || oldArr === void 0 ? void 0 : oldArr.map(function (item) {
      return Object.assign(Object.assign({}, item), {
        $diff: {
          type: 'array-delete'
        }
      });
    })) || [];
  } // 通过不同的策略来比较数组数据


  var result = [];

  if (strategy === 'index') {
    var maxLength = oldArr.length > newArr.length ? oldArr.length : newArr.length;

    for (var i = 0; i < maxLength; i += 1) {
      var itemA = oldArr[i];
      var itemB = newArr[i];

      if (!itemA && itemB) {
        result.push(Object.assign(Object.assign({}, itemB), {
          $diff: {
            type: 'array-add'
          }
        }));
      } else if (itemA && !itemB) {
        result.push(Object.assign(Object.assign({}, itemA), {
          $diff: {
            type: 'array-delete'
          }
        }));
      } else {
        var difference = (_a = diff(itemA, itemB)) === null || _a === void 0 ? void 0 : _a.$diff; // 判断是否有差异

        if (((_b = Object.keys(difference)) === null || _b === void 0 ? void 0 : _b.length) > 0) {
          result.push(Object.assign(Object.assign({}, itemB), {
            $diff: {
              type: 'array-update',
              difference: difference
            }
          }));
        } else {
          result.push(Object.assign(Object.assign({}, itemB), {
            $diff: {
              type: 'array-no-change'
            }
          }));
        }
      }
    }
  } else if (strategy === null || strategy === void 0 ? void 0 : strategy.compareField) {
    (function () {
      var field = strategy === null || strategy === void 0 ? void 0 : strategy.compareField;

      var queue1 = _toConsumableArray(oldArr);

      var queue2 = _toConsumableArray(newArr);

      var currentQueue1Item;
      var currentQueue2Item;

      while (queue1.length || queue2.length) {
        if (queue2.length > 0) {
          currentQueue2Item = queue2.shift(); // eslint-disable-next-line no-loop-func

          var itemInQueue1Index = queue1.findIndex(function (item) {
            return currentQueue2Item[field] === item[field];
          });

          if (itemInQueue1Index > -1) {
            // 可能有更新
            // eslint-disable-next-line prefer-destructuring
            currentQueue1Item = queue1.splice(itemInQueue1Index, 1)[0];
            var diffDetail = (_c = diff(currentQueue1Item, currentQueue2Item)) === null || _c === void 0 ? void 0 : _c.$diff; // 判断是否有差异

            if (((_d = Object.keys(diffDetail)) === null || _d === void 0 ? void 0 : _d.length) > 0) {
              result.push(Object.assign(Object.assign({}, Object.assign(Object.assign({}, currentQueue1Item), currentQueue2Item)), {
                $diff: {
                  type: 'array-update',
                  difference: diffDetail
                }
              }));
            } else {
              result.push(Object.assign({}, currentQueue2Item));
            }
          } else {
            // 新增
            result.push(Object.assign(Object.assign({}, currentQueue2Item), {
              $diff: {
                type: 'array-add'
              }
            }));
          }
        } else {
          // 删除
          result = result.concat(queue1.map(function (item) {
            return Object.assign(Object.assign({}, item), {
              $diff: {
                type: 'array-delete'
              }
            });
          }) || []);
          queue1 = [];
        }
      }
    })();
  }

  return result;
}
/**
```js
const a = {
  a: 1,
  b: "1", // del
  c: [1, 2, 3],
  d: { foo: "bar" },
  e: [{ foo: "bar" }],
  list: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
  ],
};
const b = {
  a: 1,
  c: [1, 2], // update
  d: { bar: "2222" }, // update
  e: [{ foo: 1, bar: 2 }], // update
  f: 2, // add
  list: [
    { id: 1, name: "2" },
    { id: 3, name: "3" },
  ], // update
};

const diffObj = {
  a: 1,
  b: "1",
  c: [1, 2],
  d: { bar: "2222" },
  e: [{ foo: 1, bar: 2 }],
  f: 2,
  list: [
    { id: 1, name: "2" },
    { id: 3, name: "3" },
  ],
  $diff: {
    b: { type: "delete" },
    c: { type: "update", oldValue: [1, 2, 3] },
    d: { type: "update", oldValue: { foo: "bar" } },
    e: { type: "update", oldValue: [{ foo: "bar" }] },
    f: { type: "add" },
    list: {
      type: "update",
      oldValue: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
      ]
    },
  },
};

////////////////////////////////////////////////////

const array1 = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
];
const array2 = [
  { id: 1, name: "2" },
  { id: 3, name: "3" },
];
const diffArr = [
  {
    id: 1,
    name: "2",
    $diff: {
      type: "array-update",
      difference: {
        name: { type: "update", oldValue: "1" },
      },
    },
  },
  {
    id: 2,
    name: "2",
    $diff: {
      type: "array-delete",
    },
  },
  {
    id: 3,
    name: "3",
    $diff: {
      type: "array-add",
    },
  },
];
``` */
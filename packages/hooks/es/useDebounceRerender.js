function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useEffect, useReducer, useRef } from 'react';
/**
 * 监听依赖，当依赖变化时触发重渲染防抖，返回值用于判断是否显示重渲染的节点
 * @param dependency 依赖（如果是引用数据类型，需要注意数据不变时保持引用不变）
 * @param wait 等待时间（毫秒，默认值 500）
 * @returns 是否渲染
 */

export function useDebounceRerender(dependency) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  var _useReducer = useReducer(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forcedToRender = _useReducer2[1];

  var dependencyRef = useRef(dependency);
  var triggered = false;

  if (dependency !== dependencyRef.current) {
    triggered = true;
  }

  dependencyRef.current = dependency;
  var visibleRef = useRef(true);

  if (triggered) {
    visibleRef.current = false;
  }

  useEffect(function () {
    var timer = setTimeout(function () {
      if (!visibleRef.current) {
        visibleRef.current = true;
        forcedToRender();
      }
    }, wait);
    return function () {
      clearTimeout(timer);
    };
  });
  return visibleRef.current;
}
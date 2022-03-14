var _excluded = ["format", "className", "tips", "maxLength", "suffix", "highlight"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, forwardRef } from 'react';
import { Input as AntdInput } from 'antd';
import { ConfigContext } from 'antd/es/config-provider/context';
import classnames from 'classnames';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import { Tips } from './components';
var Input = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$format = _ref.format,
      format = _ref$format === void 0 ? '/' : _ref$format,
      className = _ref.className,
      _ref$tips = _ref.tips,
      tips = _ref$tips === void 0 ? false : _ref$tips,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? 500 : _ref$maxLength,
      suffix = _ref.suffix,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? 20 : _ref$highlight,
      reset = _objectWithoutProperties(_ref, _excluded);

  var _useControllableValue = useControllableValue(reset),
      _useControllableValue2 = _slicedToArray(_useControllableValue, 2),
      value = _useControllableValue2[0],
      onChange = _useControllableValue2[1];

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('input');

  var handleChange = function handleChange(event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value);
  };

  return /*#__PURE__*/React.createElement(AntdInput, _extends({
    className: classnames(tips && "".concat(prefixCls, "-tips"), className),
    ref: ref,
    onChange: handleChange,
    value: value,
    maxLength: maxLength
  }, reset, {
    suffix: tips ? /*#__PURE__*/React.createElement(Tips, _extends({
      prefixCls: prefixCls,
      format: format,
      currentLength: (value === null || value === void 0 ? void 0 : value.length) || 0,
      maxLength: maxLength,
      highlight: highlight
    }, reset)) : suffix
  }));
});
export default Input;
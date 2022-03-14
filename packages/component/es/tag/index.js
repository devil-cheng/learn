var _excluded = ["className", "size", "children", "textColor", "color", "border", "bgColor"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useMemo } from 'react';
import { Tag as AntdTag } from 'antd';
import { ConfigContext } from 'antd/es/config-provider/context';
import classnames from 'classnames';
import parse from 'color-parse';

var Tag = function Tag(_ref) {
  var className = _ref.className,
      size = _ref.size,
      children = _ref.children,
      textColor = _ref.textColor,
      color = _ref.color,
      _ref$border = _ref.border,
      border = _ref$border === void 0 ? false : _ref$border,
      bgColor = _ref.bgColor,
      reset = _objectWithoutProperties(_ref, _excluded);

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('tag');
  var style = useMemo(function () {
    if (color) {
      return {};
    }

    var defaultStyle = {
      color: textColor || '',
      backgroundColor: bgColor || ''
    };

    if (border) {
      var borderColor = '0,0,0,.25';

      var setBorderColor = function setBorderColor(value) {
        if (value.indexOf('rgb') > -1) {
          borderColor = value;
        } else {
          var _parse;

          borderColor = "".concat((_parse = parse(value)) === null || _parse === void 0 ? void 0 : _parse.values.join(), ",.45");
        }
      };

      if (color) {
        setBorderColor(color);
      }

      if (textColor) {
        setBorderColor(textColor);
      }

      defaultStyle = _objectSpread(_objectSpread({}, defaultStyle), {
        borderColor: "rgba(".concat(borderColor, ")")
      });
    }

    return {
      style: defaultStyle
    };
  }, [bgColor, border, color, textColor]);
  return /*#__PURE__*/React.createElement(AntdTag, _extends({
    className: classnames(size && "".concat(prefixCls, "-").concat(size), (reset === null || reset === void 0 ? void 0 : reset.onClick) && "".concat(prefixCls, "-click"), className),
    color: color
  }, style, reset), children);
};

Tag.CheckableTag = AntdTag.CheckableTag;
export default Tag;
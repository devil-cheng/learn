var _excluded = ["className", "showSearch", "highlightSearch", "onSearch", "options", "optionLabelProp", "optionValueProp", "children"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Checkbox, Select as AntSelect } from 'antd';
import { ConfigContext } from 'antd/es/config-provider/context';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import HighlightText from '../highlight-text';

// ????????????????????????????????????(?????????)
var getOptionLabel = function getOptionLabel(labelProp) {
  var _labelProp$props;

  var result = '';

  if (typeof labelProp === 'string') {
    result = labelProp;
  } else if (labelProp instanceof Array) {
    labelProp.forEach(function (item) {
      result += getOptionLabel(item);
    });
  } else if ((_labelProp$props = labelProp.props) === null || _labelProp$props === void 0 ? void 0 : _labelProp$props.children) {
    result = getOptionLabel(labelProp.props.children);
  }

  return result.trim();
};
/**
 * ??????????????????
 * ????????????????????????
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


var Select = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      _ref$showSearch = _ref.showSearch,
      showSearch = _ref$showSearch === void 0 ? false : _ref$showSearch,
      _ref$highlightSearch = _ref.highlightSearch,
      highlightSearch = _ref$highlightSearch === void 0 ? false : _ref$highlightSearch,
      onSearch = _ref.onSearch,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$optionLabelProp = _ref.optionLabelProp,
      optionLabelProp = _ref$optionLabelProp === void 0 ? 'children' : _ref$optionLabelProp,
      _ref$optionValueProp = _ref.optionValueProp,
      optionValueProp = _ref$optionValueProp === void 0 ? 'value' : _ref$optionValueProp,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useControllableValue = useControllableValue(rest),
      _useControllableValue2 = _slicedToArray(_useControllableValue, 2),
      _useControllableValue3 = _useControllableValue2[0],
      value = _useControllableValue3 === void 0 ? rest.mode === 'multiple' ? [] : undefined : _useControllableValue3,
      onChange = _useControllableValue2[1]; // options ?????????


  var optionRef = useRef(options);
  useEffect(function () {
    optionRef.current = options;
  }, [options]);

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('select-plus');

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchContent = _useState2[0],
      setSearchContent = _useState2[1]; // ?????????????????????


  var setSearchContentDebounce = useCallback(debounce(setSearchContent, 200), []); // ????????????
  // ?????? onSearch ??????, ????????????????????????????????????

  var onSearchProxy = function onSearchProxy(val) {
    setSearchContentDebounce(val);

    if (onSearch) {
      onSearch(val);
    }
  }; // ?????? onChange ??????, ????????????????????????????????????


  var onChangeProxy = function onChangeProxy(val, option) {
    setSearchContent('');
    return onChange === null || onChange === void 0 ? void 0 : onChange(val, option);
  }; // ????????? <Option> ????????????


  var isOptionData = (!optionRef.current || optionRef.current.length === 0) && !!children; // ?????? <Option> ??????????????? options ??????

  var computedOptions = useMemo(function () {
    var childrenOption = null;

    if (isOptionData) {
      childrenOption = React.Children.map(children, function (child) {
        var result = {};

        if (optionLabelProp) {
          result[optionLabelProp] = child.props[optionLabelProp] || child.props.children;
        }

        result[optionValueProp] = child.props[optionValueProp] || child.props.children;
        result.disabled = child.props.disabled;
        result.children = child.props.children;
        return result;
      });
    }

    return childrenOption || optionRef.current;
  }, [children, isOptionData, optionLabelProp, optionValueProp]); // ???????????? options

  var filteredOptions = useMemo(function () {
    if (searchContent) {
      return computedOptions.filter(function (item) {
        return getOptionLabel(item[optionLabelProp]).indexOf(searchContent) >= 0;
      });
    }

    return computedOptions;
  }, [optionLabelProp, computedOptions, searchContent]); // ??????????????????

  var renderOption = function renderOption(item) {
    var _item$disabled, _item$children;

    var labelProp = optionLabelProp !== 'children' ? _defineProperty({}, optionLabelProp, item[optionLabelProp]) : {
      label: item[optionLabelProp]
    };
    return /*#__PURE__*/React.createElement(AntSelect.Option, _extends({
      value: item[optionValueProp]
    }, labelProp, {
      key: item[optionValueProp],
      disabled: (_item$disabled = item.disabled) !== null && _item$disabled !== void 0 ? _item$disabled : false
    }), (rest === null || rest === void 0 ? void 0 : rest.mode) === 'multiple' && Array.isArray(value) && /*#__PURE__*/React.createElement(Checkbox, {
      className: "".concat(prefixCls, "-multiple-item-checkbox"),
      checked: value.includes(item[optionValueProp])
    }), showSearch && highlightSearch ? /*#__PURE__*/React.createElement(HighlightText, {
      keywords: searchContent
    }, (_item$children = item.children) !== null && _item$children !== void 0 ? _item$children : item[optionLabelProp]) : item[optionLabelProp]);
  };

  var renderOptions = filteredOptions.map(function (item) {
    return renderOption(item);
  }); // !isOptionData || highlightSearch ? filteredOptions.map(item => renderOption(item)) : children;
  // ???????????????, ??????????????????

  var customSearchProp = showSearch && highlightSearch ? {
    optionLabelProp: optionLabelProp,
    // ????????????????????????, ?????? <Option> ??? label ??????
    optionFilterProp: optionLabelProp,
    // ?????? children ??????????????????, ????????? label ?????????????????????
    filterOption: function filterOption(input, option) {
      return getOptionLabel(option.props[optionLabelProp]).toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    onSearch: onSearchProxy,
    onChange: onChangeProxy
  } : {
    // ???????????????????????????????????????, ????????????????????????????????????, ??? optionLabelProp ??? children ????????????????????????, ?????????????????????
    optionLabelProp: optionLabelProp === 'children' ? 'label' : optionLabelProp,
    onChange: onChange
  };
  return /*#__PURE__*/React.createElement(AntSelect, _extends({
    ref: ref,
    showSearch: showSearch
  }, rest, customSearchProp, {
    value: value,
    menuItemSelectedIcon: /*#__PURE__*/React.createElement(React.Fragment, null),
    dropdownClassName: classNames(className, "".concat(prefixCls, "-dropdown"))
  }), renderOptions);
});
Select.displayName = 'Select';
Select.Option = AntSelect.Option;
export default Select;
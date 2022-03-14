var _excluded = ["className", "highlightSearch", "renderTreeNodeTitle", "treeData", "treeDataSimpleMode", "optionKeyProp", "optionLabelProp", "optionValueProp", "optionPidProp", "multiple", "treeCheckable", "showCheckedStrategy", "children"],
    _excluded2 = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TreeSelect as AntTreeSelect } from 'antd';
import { ConfigContext } from 'antd/es/config-provider/context';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import { createTreeFromTreeLikeArray, filterTree, flattenTree } from '@vv-work-desktop-web-core/helpers';
import HighlightText from '../highlight-text';

/**
 * 自定义选择器
 * 支持搜索高亮功能
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
var TreeSelect = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref2, _ref3, _rest$showSearch;

  var className = _ref.className,
      _ref$highlightSearch = _ref.highlightSearch,
      highlightSearch = _ref$highlightSearch === void 0 ? true : _ref$highlightSearch,
      renderTreeNodeTitle = _ref.renderTreeNodeTitle,
      treeData = _ref.treeData,
      treeDataSimpleMode = _ref.treeDataSimpleMode,
      _ref$optionKeyProp = _ref.optionKeyProp,
      optionKeyProp = _ref$optionKeyProp === void 0 ? 'key' : _ref$optionKeyProp,
      _ref$optionLabelProp = _ref.optionLabelProp,
      optionLabelProp = _ref$optionLabelProp === void 0 ? 'title' : _ref$optionLabelProp,
      _ref$optionValueProp = _ref.optionValueProp,
      optionValueProp = _ref$optionValueProp === void 0 ? 'value' : _ref$optionValueProp,
      _ref$optionPidProp = _ref.optionPidProp,
      optionPidProp = _ref$optionPidProp === void 0 ? 'pId' : _ref$optionPidProp,
      multiple = _ref.multiple,
      treeCheckable = _ref.treeCheckable,
      showCheckedStrategy = _ref.showCheckedStrategy,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, _excluded);

  // options 的引用
  // const treeDataRef = useRef<Record<string, any>[]>(treeData);
  var computedMultiple = Boolean((_ref2 = multiple !== null && multiple !== void 0 ? multiple : treeCheckable) !== null && _ref2 !== void 0 ? _ref2 : false);
  var showSearch = (_ref3 = (_rest$showSearch = rest.showSearch) !== null && _rest$showSearch !== void 0 ? _rest$showSearch : computedMultiple) !== null && _ref3 !== void 0 ? _ref3 : false; // useEffect(() => {
  //     treeDataRef.current = treeData;
  // }, [treeData]);

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('tree-select-plus'); // 如果有过滤数据, 需要展开过滤的数据

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      expandedKeys = _useState2[0],
      setExpandedKeys = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      searchContent = _useState4[0],
      setSearchContent = _useState4[1]; // 保存搜索关键字


  var setSearchContentDebounce = useCallback(debounce(setSearchContent, 200), []); // 性能优化
  // 是否是 <Option> 注入数据

  var isOptionData = (!treeData || treeData.length === 0) && !!children; // 兼容 <Option> 的方式注入 options 的值

  var computedTreeData = useMemo(function () {
    var _childrenOption;

    var childrenOption = [];

    var transformReactNodeToData = function transformReactNodeToData(elements) {
      return React.Children.map(elements, function (child) {
        var _child$props = child.props,
            childData = _child$props.children,
            otherProps = _objectWithoutProperties(_child$props, _excluded2);

        var result = otherProps;
        result[optionKeyProp] = child.key;

        if (childData === null || childData === void 0 ? void 0 : childData.length) {
          result.children = transformReactNodeToData(childData);
        }

        return result;
      });
    };

    if (isOptionData) {
      childrenOption = transformReactNodeToData(children);
    }

    if ((_childrenOption = childrenOption) === null || _childrenOption === void 0 ? void 0 : _childrenOption.length) {
      return childrenOption;
    }

    if (treeData && treeDataSimpleMode) {
      return createTreeFromTreeLikeArray(treeData);
    }

    return treeData || []; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOptionData, optionKeyProp, treeData, treeDataSimpleMode]); // 避免频繁触发数据过滤

  useEffect(function () {
    // 如果有过滤条件, 就执行过滤
    if (searchContent) {
      // 需要保留查找节点的父级, 所以使用 filterTreeArrayData
      var result = filterTree(computedTreeData, function (item) {
        return item[optionLabelProp].includes(searchContent);
      });
      setExpandedKeys(flattenTree(result).map(function (item) {
        var _item$optionPidProp;

        return (_item$optionPidProp = item[optionPidProp]) !== null && _item$optionPidProp !== void 0 ? _item$optionPidProp : item[optionKeyProp];
      }));
    } else {
      setExpandedKeys([]);
    }
  }, [computedTreeData, searchContent, optionKeyProp, optionLabelProp, optionPidProp]);

  var handleTreeNodeClick = function handleTreeNodeClick(node) {
    if (node.selectable === false) {
      if (expandedKeys.includes(node[optionValueProp])) {
        setExpandedKeys(_toConsumableArray(expandedKeys.filter(function (item) {
          return item !== node[optionValueProp];
        })));
      } else {
        setExpandedKeys([].concat(_toConsumableArray(expandedKeys), [node[optionValueProp]]));
      }
    }
  }; // 渲染树节点


  var renderTreeNode = function renderTreeNode(currentTreeData) {
    var getTitle = function getTitle(node) {
      if (renderTreeNodeTitle) {
        return renderTreeNodeTitle(node, searchContent);
      }

      if (showSearch && highlightSearch) {
        return /*#__PURE__*/React.createElement(HighlightText, {
          keywords: searchContent
        }, node[optionLabelProp]);
      }

      return node[optionLabelProp];
    };

    return currentTreeData.map(function (node) {
      return /*#__PURE__*/React.createElement(AntTreeSelect.TreeNode, _extends({}, node, {
        key: node[optionKeyProp] || node[optionValueProp],
        title:
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        React.createElement("span", {
          onMouseUp: function onMouseUp() {
            return handleTreeNodeClick(node);
          }
        }, getTitle(node)),
        pureTitle: node[optionLabelProp]
      }), node.children ? renderTreeNode(node.children) : null);
    });
  };

  return /*#__PURE__*/React.createElement(AntTreeSelect, _extends({
    ref: ref,
    allowClear: true,
    treeNodeFilterProp: "pureTitle",
    treeNodeLabelProp: "pureTitle",
    treeExpandedKeys: expandedKeys,
    onTreeExpand: function onTreeExpand(keys) {
      setExpandedKeys(keys);
    },
    onSearch: setSearchContentDebounce,
    dropdownStyle: {
      maxHeight: 400,
      overflow: 'auto'
    },
    style: _objectSpread({
      width: 250
    }, rest.style),
    dropdownClassName: classNames(className, "".concat(prefixCls, "-dropdown"))
  }, rest, {
    showCheckedStrategy: showCheckedStrategy,
    treeCheckable: treeCheckable,
    multiple: computedMultiple,
    showSearch: showSearch
  }), renderTreeNode(computedTreeData));
});
TreeSelect.displayName = 'TreeSelect';
TreeSelect.TreeNode = AntTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = AntTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = AntTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = AntTreeSelect.SHOW_CHILD;
export default TreeSelect;
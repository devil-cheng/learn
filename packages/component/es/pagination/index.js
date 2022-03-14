function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useContext } from 'react';
import { ConfigContext } from 'antd/es/config-provider/context';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';

var Pagination = function Pagination(props) {
  var _props$current = props.current,
      current = _props$current === void 0 ? 1 : _props$current,
      _props$total = props.total,
      total = _props$total === void 0 ? 0 : _props$total,
      _props$pageSize = props.pageSize,
      pageSize = _props$pageSize === void 0 ? 10 : _props$pageSize,
      _props$pageSizes = props.pageSizes,
      pageSizes = _props$pageSizes === void 0 ? [10, 20, 50, 100, 200] : _props$pageSizes,
      onChange = props.onChange;

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('pagination');
  var ref = React.useRef(null);
  var pageSizeRef = React.useRef(null);
  var totalPages = React.useMemo(function () {
    return (total % pageSize === 0 ? parseInt((total / pageSize).toString(), 10) : parseInt((total / pageSize).toString(), 10) + 1) || 1;
  }, [total, pageSize]);
  var pagerList = React.useMemo(function () {
    return [new Array(totalPages)].concat().map(function (_, index) {
      return index + 1;
    });
  }, [totalPages]);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isPageSizesVisible = _React$useState2[0],
      setPageSizeVisible = _React$useState2[1];

  var handleSelectPageSize = function handleSelectPageSize(value) {
    return function () {
      setPageSizeVisible(false);
      onChange({
        pageSize: Number(value),
        current: 1
      });
    };
  };

  var handleSelectPage = function handleSelectPage(item) {
    return function () {
      onChange({
        current: Number(item)
      });
    };
  };

  var handlePrev = function handlePrev() {
    var currentPage = current === 1 ? 1 : current - 1;
    onChange({
      current: currentPage
    });
  };

  var handleNext = function handleNext() {
    var currentPage = current === totalPages ? totalPages : current + 1;
    onChange({
      current: currentPage
    });
  };

  var pages = /*#__PURE__*/React.createElement(Menu, {
    className: "".concat(prefixCls, "-menu")
  }, pagerList.map(function (item) {
    return /*#__PURE__*/React.createElement(Menu.Item, {
      key: item,
      className: "".concat(Number(item) === current ? 'ant-dropdown-menu-item-active' : ''),
      onClick: handleSelectPage(item)
    }, item);
  }));
  var pageSizesMenu = /*#__PURE__*/React.createElement(Menu, {
    className: "".concat(prefixCls, "-menu")
  }, pageSizes.map(function (item) {
    return /*#__PURE__*/React.createElement(Menu.Item, {
      key: item,
      className: "".concat(item === pageSize ? 'ant-dropdown-menu-item-active' : ''),
      onClick: handleSelectPageSize(item)
    }, "".concat(item, " \u6761/\u9875"));
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls),
    style: {
      display: total === 0 ? 'none' : 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-total")
  }, "\u5171 ".concat(total, " \u6761")), /*#__PURE__*/React.createElement(Dropdown, {
    visible: isPageSizesVisible,
    onVisibleChange: function onVisibleChange(val) {
      return setPageSizeVisible(val);
    },
    placement: "topLeft",
    overlay: pageSizesMenu,
    getPopupContainer: function getPopupContainer(dom) {
      var _pageSizeRef$current;

      return (pageSizeRef === null || pageSizeRef === void 0 ? void 0 : (_pageSizeRef$current = pageSizeRef.current) === null || _pageSizeRef$current === void 0 ? void 0 : _pageSizeRef$current.appendChild) ? pageSizeRef.current : dom;
    },
    trigger: ['click'],
    overlayStyle: {
      border: '1px solid #ddd',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    className: "".concat(prefixCls, "-pageSize"),
    ref: pageSizeRef
  }, "".concat(pageSize, " \u6761/\u9875"), " ", /*#__PURE__*/React.createElement(DownOutlined, {
    rotate: isPageSizesVisible ? 180 : 0
  }))), /*#__PURE__*/React.createElement(Button.Group, {
    className: "".concat(prefixCls, "-pageBtn")
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(LeftOutlined, null),
    className: "".concat(prefixCls, "-pageSize-prevBtn"),
    onClick: handlePrev,
    disabled: current === 1
  }), /*#__PURE__*/React.createElement(Dropdown, {
    placement: "topLeft",
    overlay: pages,
    trigger: ['click'],
    getPopupContainer: function getPopupContainer(dom) {
      var _ref$current;

      return (ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.appendChild) ? ref.current : dom;
    },
    overlayStyle: {
      maxHeight: 160,
      overflowY: pagerList.length > 5 ? 'scroll' : 'hidden',
      border: '1px solid #ddd',
      borderRadius: 4
    },
    disabled: totalPages === 1
  }, /*#__PURE__*/React.createElement(Button, {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-pageWrap")
  }, /*#__PURE__*/React.createElement("div", null, current), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-iconGroup")
  }, /*#__PURE__*/React.createElement(UpOutlined, null), /*#__PURE__*/React.createElement(DownOutlined, null))))), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(RightOutlined, null),
    className: "".concat(prefixCls, "-pageSize-nextBtn"),
    onClick: handleNext,
    disabled: current === totalPages
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-totalPage")
  }, "\u5171 ".concat(totalPages, " \u9875")));
};

export default /*#__PURE__*/React.memo(Pagination);
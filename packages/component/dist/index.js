'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var affix = require('antd/es/affix');
var anchor = require('antd/es/anchor');
var autoComplete = require('antd/es/auto-complete');
var alert = require('antd/es/alert');
var avatar = require('antd/es/avatar');
var backTop = require('antd/es/back-top');
var badge = require('antd/es/badge');
var breadcrumb = require('antd/es/breadcrumb');
var button = require('antd/es/button');
var calendar = require('antd/es/calendar');
var card = require('antd/es/card');
var collapse = require('antd/es/collapse');
var carousel = require('antd/es/carousel');
var cascader = require('antd/es/cascader');
var checkbox = require('antd/es/checkbox');
var col = require('antd/es/col');
var comment = require('antd/es/comment');
var configProvider = require('antd/es/config-provider');
var datePicker = require('antd/es/date-picker');
var descriptions = require('antd/es/descriptions');
var divider = require('antd/es/divider');
var dropdown = require('antd/es/dropdown');
var drawer = require('antd/es/drawer');
var empty = require('antd/es/empty');
var form = require('antd/es/form');
var image = require('antd/es/image');
var Group = require('antd/es/input/Group');
var Search = require('antd/es/input/Search');
var Password = require('antd/es/input/Password');
var React = require('react');
var antd = require('antd');
var context = require('antd/es/config-provider/context');
var classnames = require('classnames');
var hooks = require('@vv-work-desktop-web-core/hooks');
var AntdTextArea = require('antd/es/input/TextArea');
var inputNumber = require('antd/es/input-number');
var layout = require('antd/es/layout');
var list = require('antd/es/list');
var localeProvider = require('antd/es/locale-provider');
var message = require('antd/es/message');
var menu = require('antd/es/menu');
var mentions = require('antd/es/mentions');
var modal = require('antd/es/modal');
var statistic = require('antd/es/statistic');
var notification = require('antd/es/notification');
var pageHeader = require('antd/es/page-header');
var popconfirm = require('antd/es/popconfirm');
var popover = require('antd/es/popover');
var progress = require('antd/es/progress');
var radio = require('antd/es/radio');
var rate = require('antd/es/rate');
var result = require('antd/es/result');
var row = require('antd/es/row');
var select = require('antd/es/select');
var skeleton = require('antd/es/skeleton');
var slider = require('antd/es/slider');
var space = require('antd/es/space');
var spin = require('antd/es/spin');
var steps = require('antd/es/steps');
var _switch = require('antd/es/switch');
var table = require('antd/es/table');
var transfer = require('antd/es/transfer');
var tree = require('antd/es/tree');
var tabs = require('antd/es/tabs');
var parse = require('color-parse');
var timePicker = require('antd/es/time-picker');
var timeline = require('antd/es/timeline');
var tooltip = require('antd/es/tooltip');
var typography = require('antd/es/typography');
var upload = require('antd/es/upload');
var version = require('antd/es/version');
var icons = require('@ant-design/icons');
var treeSelect = require('antd/es/tree-select');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var affix__default = /*#__PURE__*/_interopDefaultLegacy(affix);
var anchor__default = /*#__PURE__*/_interopDefaultLegacy(anchor);
var autoComplete__default = /*#__PURE__*/_interopDefaultLegacy(autoComplete);
var alert__default = /*#__PURE__*/_interopDefaultLegacy(alert);
var avatar__default = /*#__PURE__*/_interopDefaultLegacy(avatar);
var backTop__default = /*#__PURE__*/_interopDefaultLegacy(backTop);
var badge__default = /*#__PURE__*/_interopDefaultLegacy(badge);
var breadcrumb__default = /*#__PURE__*/_interopDefaultLegacy(breadcrumb);
var button__default = /*#__PURE__*/_interopDefaultLegacy(button);
var calendar__default = /*#__PURE__*/_interopDefaultLegacy(calendar);
var card__default = /*#__PURE__*/_interopDefaultLegacy(card);
var collapse__default = /*#__PURE__*/_interopDefaultLegacy(collapse);
var carousel__default = /*#__PURE__*/_interopDefaultLegacy(carousel);
var cascader__default = /*#__PURE__*/_interopDefaultLegacy(cascader);
var checkbox__default = /*#__PURE__*/_interopDefaultLegacy(checkbox);
var col__default = /*#__PURE__*/_interopDefaultLegacy(col);
var comment__default = /*#__PURE__*/_interopDefaultLegacy(comment);
var configProvider__default = /*#__PURE__*/_interopDefaultLegacy(configProvider);
var datePicker__default = /*#__PURE__*/_interopDefaultLegacy(datePicker);
var descriptions__default = /*#__PURE__*/_interopDefaultLegacy(descriptions);
var divider__default = /*#__PURE__*/_interopDefaultLegacy(divider);
var dropdown__default = /*#__PURE__*/_interopDefaultLegacy(dropdown);
var drawer__default = /*#__PURE__*/_interopDefaultLegacy(drawer);
var empty__default = /*#__PURE__*/_interopDefaultLegacy(empty);
var form__default = /*#__PURE__*/_interopDefaultLegacy(form);
var image__default = /*#__PURE__*/_interopDefaultLegacy(image);
var Group__default = /*#__PURE__*/_interopDefaultLegacy(Group);
var Search__default = /*#__PURE__*/_interopDefaultLegacy(Search);
var Password__default = /*#__PURE__*/_interopDefaultLegacy(Password);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);
var AntdTextArea__default = /*#__PURE__*/_interopDefaultLegacy(AntdTextArea);
var inputNumber__default = /*#__PURE__*/_interopDefaultLegacy(inputNumber);
var layout__default = /*#__PURE__*/_interopDefaultLegacy(layout);
var list__default = /*#__PURE__*/_interopDefaultLegacy(list);
var localeProvider__default = /*#__PURE__*/_interopDefaultLegacy(localeProvider);
var message__default = /*#__PURE__*/_interopDefaultLegacy(message);
var menu__default = /*#__PURE__*/_interopDefaultLegacy(menu);
var mentions__default = /*#__PURE__*/_interopDefaultLegacy(mentions);
var modal__default = /*#__PURE__*/_interopDefaultLegacy(modal);
var statistic__default = /*#__PURE__*/_interopDefaultLegacy(statistic);
var notification__default = /*#__PURE__*/_interopDefaultLegacy(notification);
var pageHeader__default = /*#__PURE__*/_interopDefaultLegacy(pageHeader);
var popconfirm__default = /*#__PURE__*/_interopDefaultLegacy(popconfirm);
var popover__default = /*#__PURE__*/_interopDefaultLegacy(popover);
var progress__default = /*#__PURE__*/_interopDefaultLegacy(progress);
var radio__default = /*#__PURE__*/_interopDefaultLegacy(radio);
var rate__default = /*#__PURE__*/_interopDefaultLegacy(rate);
var result__default = /*#__PURE__*/_interopDefaultLegacy(result);
var row__default = /*#__PURE__*/_interopDefaultLegacy(row);
var select__default = /*#__PURE__*/_interopDefaultLegacy(select);
var skeleton__default = /*#__PURE__*/_interopDefaultLegacy(skeleton);
var slider__default = /*#__PURE__*/_interopDefaultLegacy(slider);
var space__default = /*#__PURE__*/_interopDefaultLegacy(space);
var spin__default = /*#__PURE__*/_interopDefaultLegacy(spin);
var steps__default = /*#__PURE__*/_interopDefaultLegacy(steps);
var _switch__default = /*#__PURE__*/_interopDefaultLegacy(_switch);
var table__default = /*#__PURE__*/_interopDefaultLegacy(table);
var transfer__default = /*#__PURE__*/_interopDefaultLegacy(transfer);
var tree__default = /*#__PURE__*/_interopDefaultLegacy(tree);
var tabs__default = /*#__PURE__*/_interopDefaultLegacy(tabs);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);
var timePicker__default = /*#__PURE__*/_interopDefaultLegacy(timePicker);
var timeline__default = /*#__PURE__*/_interopDefaultLegacy(timeline);
var tooltip__default = /*#__PURE__*/_interopDefaultLegacy(tooltip);
var typography__default = /*#__PURE__*/_interopDefaultLegacy(typography);
var upload__default = /*#__PURE__*/_interopDefaultLegacy(upload);
var version__default = /*#__PURE__*/_interopDefaultLegacy(version);
var treeSelect__default = /*#__PURE__*/_interopDefaultLegacy(treeSelect);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Tips = function Tips(_ref) {
  var prefixCls = _ref.prefixCls,
      maxLength = _ref.maxLength,
      format = _ref.format,
      currentLength = _ref.currentLength,
      highlight = _ref.highlight;
  // 按照设计规则
  // 当数组默认显示 0 灰色
  // 当输入框数字存在值并且小于highlight距离值 显示主题色
  // 当输入框值+highlight距离值大于maxLength显示红色
  var setClassName = React.useMemo(function () {
    if (currentLength === 0) {
      return null;
    }

    if (maxLength - currentLength < highlight) {
      // return `${prefixCls}-tips-red`;
      return "".concat(prefixCls, "-tips-highlight");
    } // if (maxLength - currentLength >= highlight) {
    //     return `${prefixCls}-tips-highlight`;
    // }


    return null;
  }, [currentLength, maxLength, highlight, prefixCls]);
  return /*#__PURE__*/React__default['default'].createElement("span", {
    className: classnames__default['default'](setClassName)
  }, /*#__PURE__*/React__default['default'].createElement("span", null, currentLength), "".concat(format).concat(maxLength));
};

var _excluded = ["format", "className", "tips", "maxLength", "suffix", "highlight"];
var Input = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
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

  var _useControllableValue = hooks.useControllableValue(reset),
      _useControllableValue2 = _slicedToArray(_useControllableValue, 2),
      value = _useControllableValue2[0],
      onChange = _useControllableValue2[1];

  var _useContext = React.useContext(context.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('input');

  var handleChange = function handleChange(event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value);
  };

  return /*#__PURE__*/React__default['default'].createElement(antd.Input, _objectSpread2(_objectSpread2({
    className: classnames__default['default'](tips && "".concat(prefixCls, "-tips"), className),
    ref: ref,
    onChange: handleChange,
    value: value,
    maxLength: maxLength
  }, reset), {}, {
    suffix: tips ? /*#__PURE__*/React__default['default'].createElement(Tips, _objectSpread2({
      prefixCls: prefixCls,
      format: format,
      currentLength: (value === null || value === void 0 ? void 0 : value.length) || 0,
      maxLength: maxLength,
      highlight: highlight
    }, reset)) : suffix
  }));
});

var _excluded$1 = ["format", "className", "tips", "maxLength", "highlight"];

var TextArea = function TextArea(_ref, ref) {
  var _ref$format = _ref.format,
      format = _ref$format === void 0 ? '/' : _ref$format,
      className = _ref.className,
      _ref$tips = _ref.tips,
      tips = _ref$tips === void 0 ? true : _ref$tips,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? 500 : _ref$maxLength,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? 20 : _ref$highlight,
      reset = _objectWithoutProperties(_ref, _excluded$1);

  var _useContext = React.useContext(context.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('textarea');

  var _useControllableValue = hooks.useControllableValue(reset),
      _useControllableValue2 = _slicedToArray(_useControllableValue, 2),
      value = _useControllableValue2[0],
      onChange = _useControllableValue2[1];

  var handleChange = function handleChange(event) {
    return onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-warp")
  }, /*#__PURE__*/React__default['default'].createElement(AntdTextArea__default['default'], _objectSpread2({
    className: classnames__default['default'](className, tips && "".concat(prefixCls, "-input")),
    ref: ref,
    onChange: handleChange,
    value: value,
    maxLength: maxLength
  }, reset)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-tips-num")
  }, tips && /*#__PURE__*/React__default['default'].createElement(Tips, _objectSpread2({
    prefixCls: prefixCls,
    format: format,
    currentLength: (value === null || value === void 0 ? void 0 : value.length) || 0,
    maxLength: maxLength,
    highlight: highlight
  }, reset))));
};

var TextArea$1 = /*#__PURE__*/React.forwardRef(TextArea);

Input.Group = Group__default['default'];
Input.Search = Search__default['default'];
Input.TextArea = TextArea$1;
Input.Password = Password__default['default'];

var _excluded$2 = ["className", "size", "children", "textColor", "color", "border", "bgColor"];

var Tag = function Tag(_ref) {
  var className = _ref.className,
      size = _ref.size,
      children = _ref.children,
      textColor = _ref.textColor,
      color = _ref.color,
      _ref$border = _ref.border,
      border = _ref$border === void 0 ? false : _ref$border,
      bgColor = _ref.bgColor,
      reset = _objectWithoutProperties(_ref, _excluded$2);

  var _useContext = React.useContext(context.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('tag');
  var style = React.useMemo(function () {
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

          borderColor = "".concat((_parse = parse__default['default'](value)) === null || _parse === void 0 ? void 0 : _parse.values.join(), ",.45");
        }
      };

      if (color) {
        setBorderColor(color);
      }

      if (textColor) {
        setBorderColor(textColor);
      }

      defaultStyle = _objectSpread2(_objectSpread2({}, defaultStyle), {
        borderColor: "rgba(".concat(borderColor, ")")
      });
    }

    return {
      style: defaultStyle
    };
  }, [bgColor, border, color, textColor]);
  return /*#__PURE__*/React__default['default'].createElement(antd.Tag, _objectSpread2(_objectSpread2({
    className: classnames__default['default'](size && "".concat(prefixCls, "-").concat(size), (reset === null || reset === void 0 ? void 0 : reset.onClick) && "".concat(prefixCls, "-click"), className),
    color: color
  }, style), reset), children);
};

Tag.CheckableTag = antd.Tag.CheckableTag;

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

  var _useContext = React.useContext(context.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('pagination');
  var ref = React__default['default'].useRef(null);
  var pageSizeRef = React__default['default'].useRef(null);
  var totalPages = React__default['default'].useMemo(function () {
    return (total % pageSize === 0 ? parseInt((total / pageSize).toString(), 10) : parseInt((total / pageSize).toString(), 10) + 1) || 1;
  }, [total, pageSize]);
  var pagerList = React__default['default'].useMemo(function () {
    return [new Array(totalPages)].concat().map(function (_, index) {
      return index + 1;
    });
  }, [totalPages]);

  var _React$useState = React__default['default'].useState(false),
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

  var pages = /*#__PURE__*/React__default['default'].createElement(antd.Menu, {
    className: "".concat(prefixCls, "-menu")
  }, pagerList.map(function (item) {
    return /*#__PURE__*/React__default['default'].createElement(antd.Menu.Item, {
      key: item,
      className: "".concat(Number(item) === current ? 'ant-dropdown-menu-item-active' : ''),
      onClick: handleSelectPage(item)
    }, item);
  }));
  var pageSizesMenu = /*#__PURE__*/React__default['default'].createElement(antd.Menu, {
    className: "".concat(prefixCls, "-menu")
  }, pageSizes.map(function (item) {
    return /*#__PURE__*/React__default['default'].createElement(antd.Menu.Item, {
      key: item,
      className: "".concat(item === pageSize ? 'ant-dropdown-menu-item-active' : ''),
      onClick: handleSelectPageSize(item)
    }, "".concat(item, " \u6761/\u9875"));
  }));
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls),
    style: {
      display: total === 0 ? 'none' : 'flex'
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-total")
  }, "\u5171 ".concat(total, " \u6761")), /*#__PURE__*/React__default['default'].createElement(antd.Dropdown, {
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
  }, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    className: "".concat(prefixCls, "-pageSize"),
    ref: pageSizeRef
  }, "".concat(pageSize, " \u6761/\u9875"), " ", /*#__PURE__*/React__default['default'].createElement(icons.DownOutlined, {
    rotate: isPageSizesVisible ? 180 : 0
  }))), /*#__PURE__*/React__default['default'].createElement(antd.Button.Group, {
    className: "".concat(prefixCls, "-pageBtn")
  }, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    icon: /*#__PURE__*/React__default['default'].createElement(icons.LeftOutlined, null),
    className: "".concat(prefixCls, "-pageSize-prevBtn"),
    onClick: handlePrev,
    disabled: current === 1
  }), /*#__PURE__*/React__default['default'].createElement(antd.Dropdown, {
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
  }, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    ref: ref
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-pageWrap")
  }, /*#__PURE__*/React__default['default'].createElement("div", null, current), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-iconGroup")
  }, /*#__PURE__*/React__default['default'].createElement(icons.UpOutlined, null), /*#__PURE__*/React__default['default'].createElement(icons.DownOutlined, null))))), /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    icon: /*#__PURE__*/React__default['default'].createElement(icons.RightOutlined, null),
    className: "".concat(prefixCls, "-pageSize-nextBtn"),
    onClick: handleNext,
    disabled: current === totalPages
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(prefixCls, "-totalPage")
  }, "\u5171 ".concat(totalPages, " \u9875")));
};

var index = /*#__PURE__*/React__default['default'].memo(Pagination);

/**
 * 关键词高亮
 * @param {string|ReactNode} text 需要匹配的文本
 * @param {string} keywords 关键词
 * @param {object} highlightStyle 高亮样式
 * @param {boolean} ignoreCase 忽略大小写
 */

var highlightText = function highlightText(text, keywords, highlightStyle, ignoreCase) {
  var keywordRegExp;

  if (!text) {
    return '';
  } // 把字符串类型的关键字转换成正则


  if (keywords) {
    if (keywords instanceof Array) {
      if (keywords.length === 0) {
        return text;
      }

      keywordRegExp = new RegExp(keywords.filter(function (item) {
        return !!item;
      }).join('|'), ignoreCase ? 'ig' : 'g');
    } else if (typeof keywords === 'string') {
      keywordRegExp = new RegExp(keywords, ignoreCase ? 'ig' : 'g');
    }
  }

  if (text && keywordRegExp) {
    var newData = text.split(keywordRegExp); //  通过关键字的位置开始截取，结果为一个数组
    // eslint-disable-next-line

    var matchWords = text.match(keywordRegExp); // 获取匹配的文本

    var len = newData.length;
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, newData.map(function (item, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React__default['default'].createElement(React__default['default'].Fragment, {
          key: index
        }, item, index !== len - 1 && /*#__PURE__*/React__default['default'].createElement("mark", {
          style: highlightStyle
        }, matchWords === null || matchWords === void 0 ? void 0 : matchWords[index]))
      );
    }));
  }

  return text;
}; // 递归子组件

var highlightChildComponent = function highlightChildComponent(item, keywords, highlightStyle, ignoreCase) {
  var _item$props, _item$props2, _item$props3, _item$props4;

  if (typeof item === 'string') {
    return highlightText(item, keywords, highlightStyle, ignoreCase);
  } // children 如果是文本, item.props.children 会等于 'string'


  if (((_item$props = item.props) === null || _item$props === void 0 ? void 0 : _item$props.children) && typeof ((_item$props2 = item.props) === null || _item$props2 === void 0 ? void 0 : _item$props2.children) === 'string') {
    var newItem = _objectSpread2({}, item);

    newItem.props = _objectSpread2(_objectSpread2({}, newItem.props), {}, {
      children: highlightText(newItem.props.children, keywords, highlightStyle, ignoreCase)
    });
    return newItem;
  } // 如果还有其他元素, 会返回一个数组, 遍历做判断


  if (((_item$props3 = item.props) === null || _item$props3 === void 0 ? void 0 : _item$props3.children) && ((_item$props4 = item.props) === null || _item$props4 === void 0 ? void 0 : _item$props4.children) instanceof Array) {
    var _item$props5;

    var _newItem = _objectSpread2({}, item);

    _newItem.props = _objectSpread2(_objectSpread2({}, _newItem.props), {}, {
      children: (_item$props5 = item.props) === null || _item$props5 === void 0 ? void 0 : _item$props5.children.map(function (child, index) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React__default['default'].createElement(React__default['default'].Fragment, {
            key: index
          }, highlightChildComponent(child, keywords, highlightStyle, ignoreCase))
        );
      })
    });
    return _newItem;
  }

  return item;
};

var HighlightText = function HighlightText(_ref) {
  var keywords = _ref.keywords,
      _ref$highlightStyle = _ref.highlightStyle,
      highlightStyle = _ref$highlightStyle === void 0 ? {
    color: '#ffa22d',
    backgroundColor: 'transparent',
    padding: 0
  } : _ref$highlightStyle,
      _ref$ignoreCase = _ref.ignoreCase,
      ignoreCase = _ref$ignoreCase === void 0 ? true : _ref$ignoreCase,
      children = _ref.children;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, children ? React__default['default'].Children.map(children, function (item) {
    return highlightChildComponent(item, keywords || '', highlightStyle, ignoreCase);
  }) : '');
};

HighlightText.displayName = 'HighlightText';

Object.defineProperty(exports, 'Affix', {
  enumerable: true,
  get: function () {
    return affix__default['default'];
  }
});
Object.defineProperty(exports, 'Anchor', {
  enumerable: true,
  get: function () {
    return anchor__default['default'];
  }
});
Object.defineProperty(exports, 'AutoComplete', {
  enumerable: true,
  get: function () {
    return autoComplete__default['default'];
  }
});
Object.defineProperty(exports, 'Alert', {
  enumerable: true,
  get: function () {
    return alert__default['default'];
  }
});
Object.defineProperty(exports, 'Avatar', {
  enumerable: true,
  get: function () {
    return avatar__default['default'];
  }
});
Object.defineProperty(exports, 'BackTop', {
  enumerable: true,
  get: function () {
    return backTop__default['default'];
  }
});
Object.defineProperty(exports, 'Badge', {
  enumerable: true,
  get: function () {
    return badge__default['default'];
  }
});
Object.defineProperty(exports, 'Breadcrumb', {
  enumerable: true,
  get: function () {
    return breadcrumb__default['default'];
  }
});
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () {
    return button__default['default'];
  }
});
Object.defineProperty(exports, 'Calendar', {
  enumerable: true,
  get: function () {
    return calendar__default['default'];
  }
});
Object.defineProperty(exports, 'Card', {
  enumerable: true,
  get: function () {
    return card__default['default'];
  }
});
Object.defineProperty(exports, 'Collapse', {
  enumerable: true,
  get: function () {
    return collapse__default['default'];
  }
});
Object.defineProperty(exports, 'Carousel', {
  enumerable: true,
  get: function () {
    return carousel__default['default'];
  }
});
Object.defineProperty(exports, 'Cascader', {
  enumerable: true,
  get: function () {
    return cascader__default['default'];
  }
});
Object.defineProperty(exports, 'Checkbox', {
  enumerable: true,
  get: function () {
    return checkbox__default['default'];
  }
});
Object.defineProperty(exports, 'Col', {
  enumerable: true,
  get: function () {
    return col__default['default'];
  }
});
Object.defineProperty(exports, 'Comment', {
  enumerable: true,
  get: function () {
    return comment__default['default'];
  }
});
Object.defineProperty(exports, 'ConfigProvider', {
  enumerable: true,
  get: function () {
    return configProvider__default['default'];
  }
});
Object.defineProperty(exports, 'DatePicker', {
  enumerable: true,
  get: function () {
    return datePicker__default['default'];
  }
});
Object.defineProperty(exports, 'Descriptions', {
  enumerable: true,
  get: function () {
    return descriptions__default['default'];
  }
});
Object.defineProperty(exports, 'Divider', {
  enumerable: true,
  get: function () {
    return divider__default['default'];
  }
});
Object.defineProperty(exports, 'Dropdown', {
  enumerable: true,
  get: function () {
    return dropdown__default['default'];
  }
});
Object.defineProperty(exports, 'Drawer', {
  enumerable: true,
  get: function () {
    return drawer__default['default'];
  }
});
Object.defineProperty(exports, 'Empty', {
  enumerable: true,
  get: function () {
    return empty__default['default'];
  }
});
Object.defineProperty(exports, 'Form', {
  enumerable: true,
  get: function () {
    return form__default['default'];
  }
});
Object.defineProperty(exports, 'Image', {
  enumerable: true,
  get: function () {
    return image__default['default'];
  }
});
Object.defineProperty(exports, 'InputNumber', {
  enumerable: true,
  get: function () {
    return inputNumber__default['default'];
  }
});
Object.defineProperty(exports, 'Layout', {
  enumerable: true,
  get: function () {
    return layout__default['default'];
  }
});
Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function () {
    return list__default['default'];
  }
});
Object.defineProperty(exports, 'LocaleProvider', {
  enumerable: true,
  get: function () {
    return localeProvider__default['default'];
  }
});
Object.defineProperty(exports, 'message', {
  enumerable: true,
  get: function () {
    return message__default['default'];
  }
});
Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function () {
    return menu__default['default'];
  }
});
Object.defineProperty(exports, 'Mention', {
  enumerable: true,
  get: function () {
    return mentions__default['default'];
  }
});
Object.defineProperty(exports, 'Mentions', {
  enumerable: true,
  get: function () {
    return mentions__default['default'];
  }
});
Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function () {
    return modal__default['default'];
  }
});
Object.defineProperty(exports, 'Statistic', {
  enumerable: true,
  get: function () {
    return statistic__default['default'];
  }
});
Object.defineProperty(exports, 'notification', {
  enumerable: true,
  get: function () {
    return notification__default['default'];
  }
});
Object.defineProperty(exports, 'PageHeader', {
  enumerable: true,
  get: function () {
    return pageHeader__default['default'];
  }
});
Object.defineProperty(exports, 'Popconfirm', {
  enumerable: true,
  get: function () {
    return popconfirm__default['default'];
  }
});
Object.defineProperty(exports, 'Popover', {
  enumerable: true,
  get: function () {
    return popover__default['default'];
  }
});
Object.defineProperty(exports, 'Progress', {
  enumerable: true,
  get: function () {
    return progress__default['default'];
  }
});
Object.defineProperty(exports, 'Radio', {
  enumerable: true,
  get: function () {
    return radio__default['default'];
  }
});
Object.defineProperty(exports, 'Rate', {
  enumerable: true,
  get: function () {
    return rate__default['default'];
  }
});
Object.defineProperty(exports, 'Result', {
  enumerable: true,
  get: function () {
    return result__default['default'];
  }
});
Object.defineProperty(exports, 'Row', {
  enumerable: true,
  get: function () {
    return row__default['default'];
  }
});
Object.defineProperty(exports, 'Select', {
  enumerable: true,
  get: function () {
    return select__default['default'];
  }
});
Object.defineProperty(exports, 'Skeleton', {
  enumerable: true,
  get: function () {
    return skeleton__default['default'];
  }
});
Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function () {
    return slider__default['default'];
  }
});
Object.defineProperty(exports, 'Space', {
  enumerable: true,
  get: function () {
    return space__default['default'];
  }
});
Object.defineProperty(exports, 'Spin', {
  enumerable: true,
  get: function () {
    return spin__default['default'];
  }
});
Object.defineProperty(exports, 'Steps', {
  enumerable: true,
  get: function () {
    return steps__default['default'];
  }
});
Object.defineProperty(exports, 'Switch', {
  enumerable: true,
  get: function () {
    return _switch__default['default'];
  }
});
Object.defineProperty(exports, 'Table', {
  enumerable: true,
  get: function () {
    return table__default['default'];
  }
});
Object.defineProperty(exports, 'Transfer', {
  enumerable: true,
  get: function () {
    return transfer__default['default'];
  }
});
Object.defineProperty(exports, 'Tree', {
  enumerable: true,
  get: function () {
    return tree__default['default'];
  }
});
Object.defineProperty(exports, 'Tabs', {
  enumerable: true,
  get: function () {
    return tabs__default['default'];
  }
});
Object.defineProperty(exports, 'TimePicker', {
  enumerable: true,
  get: function () {
    return timePicker__default['default'];
  }
});
Object.defineProperty(exports, 'Timeline', {
  enumerable: true,
  get: function () {
    return timeline__default['default'];
  }
});
Object.defineProperty(exports, 'Tooltip', {
  enumerable: true,
  get: function () {
    return tooltip__default['default'];
  }
});
Object.defineProperty(exports, 'Typography', {
  enumerable: true,
  get: function () {
    return typography__default['default'];
  }
});
Object.defineProperty(exports, 'Upload', {
  enumerable: true,
  get: function () {
    return upload__default['default'];
  }
});
Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function () {
    return version__default['default'];
  }
});
Object.defineProperty(exports, 'TreeSelect', {
  enumerable: true,
  get: function () {
    return treeSelect__default['default'];
  }
});
exports.HighlightText = HighlightText;
exports.Input = Input;
exports.Pagination = index;
exports.Tag = Tag;

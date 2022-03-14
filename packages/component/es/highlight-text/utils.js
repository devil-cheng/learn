function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

/**
 * 关键词高亮
 * @param {string|ReactNode} text 需要匹配的文本
 * @param {string} keywords 关键词
 * @param {object} highlightStyle 高亮样式
 * @param {boolean} ignoreCase 忽略大小写
 */
export var highlightText = function highlightText(text, keywords, highlightStyle, ignoreCase) {
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, newData.map(function (item, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(React.Fragment, {
          key: index
        }, item, index !== len - 1 && /*#__PURE__*/React.createElement("mark", {
          style: highlightStyle
        }, matchWords === null || matchWords === void 0 ? void 0 : matchWords[index]))
      );
    }));
  }

  return text;
}; // 递归子组件

export var highlightChildComponent = function highlightChildComponent(item, keywords, highlightStyle, ignoreCase) {
  var _item$props, _item$props2, _item$props3, _item$props4;

  if (typeof item === 'string') {
    return highlightText(item, keywords, highlightStyle, ignoreCase);
  } // children 如果是文本, item.props.children 会等于 'string'


  if (((_item$props = item.props) === null || _item$props === void 0 ? void 0 : _item$props.children) && typeof ((_item$props2 = item.props) === null || _item$props2 === void 0 ? void 0 : _item$props2.children) === 'string') {
    var newItem = _objectSpread({}, item);

    newItem.props = _objectSpread(_objectSpread({}, newItem.props), {}, {
      children: highlightText(newItem.props.children, keywords, highlightStyle, ignoreCase)
    });
    return newItem;
  } // 如果还有其他元素, 会返回一个数组, 遍历做判断


  if (((_item$props3 = item.props) === null || _item$props3 === void 0 ? void 0 : _item$props3.children) && ((_item$props4 = item.props) === null || _item$props4 === void 0 ? void 0 : _item$props4.children) instanceof Array) {
    var _item$props5;

    var _newItem = _objectSpread({}, item);

    _newItem.props = _objectSpread(_objectSpread({}, _newItem.props), {}, {
      children: (_item$props5 = item.props) === null || _item$props5 === void 0 ? void 0 : _item$props5.children.map(function (child, index) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React.createElement(React.Fragment, {
            key: index
          }, highlightChildComponent(child, keywords, highlightStyle, ignoreCase))
        );
      })
    });
    return _newItem;
  }

  return item;
};
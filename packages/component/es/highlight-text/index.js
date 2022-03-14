import React from 'react';
import { highlightChildComponent } from './utils';

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
  return /*#__PURE__*/React.createElement(React.Fragment, null, children ? React.Children.map(children, function (item) {
    return highlightChildComponent(item, keywords || '', highlightStyle, ignoreCase);
  }) : '');
};

HighlightText.displayName = 'HighlightText';
export default HighlightText;
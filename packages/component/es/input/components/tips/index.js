import React, { useMemo } from 'react';
import classnames from 'classnames';

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
  var setClassName = useMemo(function () {
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
  return /*#__PURE__*/React.createElement("span", {
    className: classnames(setClassName)
  }, /*#__PURE__*/React.createElement("span", null, currentLength), "".concat(format).concat(maxLength));
};

export default Tips;
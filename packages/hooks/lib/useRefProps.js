"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

/**
 * 引用最新的props
 * @param props
 * @example
   const propsRef = useRefProps(props)
   const handleClick = useCallback(() => {
     const { onClick } = propsRef.current
   }, [])
 */
function useRefProps(props) {
  var ref = (0, _react.useRef)(props);
  ref.current = props;
  return ref;
}

var _default = useRefProps;
exports.default = _default;
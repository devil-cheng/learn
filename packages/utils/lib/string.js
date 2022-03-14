"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstCapitalizedLetter = void 0;

var _pinyin = _interopRequireDefault(require("pinyin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取文本拼音的第一个字母并大写
 * @param word
 */
var getFirstCapitalizedLetter = function getFirstCapitalizedLetter(word) {
  var _a;

  if (word) {
    return (_a = (0, _pinyin.default)(word, {
      style: _pinyin.default.STYLE_NORMAL,
      heteronym: false
    })) === null || _a === void 0 ? void 0 : _a[0][0].slice(0, 1).toLocaleUpperCase();
  }

  return null;
};

exports.getFirstCapitalizedLetter = getFirstCapitalizedLetter;
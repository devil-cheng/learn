import pinyin from 'pinyin';
/**
 * 获取文本拼音的第一个字母并大写
 * @param word
 */

export var getFirstCapitalizedLetter = function getFirstCapitalizedLetter(word) {
  var _a;

  if (word) {
    return (_a = pinyin(word, {
      style: pinyin.STYLE_NORMAL,
      heteronym: false
    })) === null || _a === void 0 ? void 0 : _a[0][0].slice(0, 1).toLocaleUpperCase();
  }

  return null;
};
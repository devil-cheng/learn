"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSign = exports.getDecrypt = exports.encrypt = exports.decrypt = void 0;

var _core = _interopRequireDefault(require("crypto-js/core"));

var _cryptoJs = require("crypto-js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEncryptKey = 'VVuucs_sec201906'; // TODO, 这个配置应该后置到项目当中
// 获取解密后数据

var getDecrypt = function getDecrypt(params, secrets) {
  return JSON.parse(_cryptoJs.AES.decrypt(params, _core.default.enc.Utf8.parse(secrets), {
    iv: _core.default.enc.Utf8.parse(secrets),
    mode: _core.default.mode.CBC,
    padding: _core.default.pad.Pkcs7
  }).toString(_core.default.enc.Utf8));
}; // 生成Hash


exports.getDecrypt = getDecrypt;

var getSign = function getSign(timestamp, apiKeys, params) {
  return (0, _cryptoJs.MD5)("".concat(timestamp).concat(apiKeys).concat(params)).toString().toUpperCase();
}; // 加密数据


exports.getSign = getSign;

var encrypt = function encrypt(data) {
  var secrets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEncryptKey;
  return _cryptoJs.AES.encrypt(JSON.stringify(data), _core.default.enc.Utf8.parse(secrets), {
    iv: _core.default.enc.Utf8.parse(secrets),
    mode: _core.default.mode.CBC,
    padding: _core.default.pad.Pkcs7
  }).toString();
}; // 解密数据


exports.encrypt = encrypt;

var decrypt = function decrypt(params) {
  var secrets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEncryptKey;
  var encryption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (typeof params !== 'string' || encryption === false) return params;

  try {
    return params && !(0, _lodashEs.isEmpty)(params) ? getDecrypt(params, secrets) : params;
  } catch (error) {
    console.error('解密失败--->', error);
    return params;
  }
};

exports.decrypt = decrypt;
import CryptoJS from 'crypto-js/core';
import { AES, MD5 } from 'crypto-js';
import { isEmpty } from 'lodash-es';
var defaultEncryptKey = 'VVuucs_sec201906'; // TODO, 这个配置应该后置到项目当中
// 获取解密后数据

export var getDecrypt = function getDecrypt(params, secrets) {
  return JSON.parse(AES.decrypt(params, CryptoJS.enc.Utf8.parse(secrets), {
    iv: CryptoJS.enc.Utf8.parse(secrets),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8));
}; // 生成Hash

export var getSign = function getSign(timestamp, apiKeys, params) {
  return MD5("".concat(timestamp).concat(apiKeys).concat(params)).toString().toUpperCase();
}; // 加密数据

export var encrypt = function encrypt(data) {
  var secrets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEncryptKey;
  return AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(secrets), {
    iv: CryptoJS.enc.Utf8.parse(secrets),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}; // 解密数据

export var decrypt = function decrypt(params) {
  var secrets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEncryptKey;
  var encryption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (typeof params !== 'string' || encryption === false) return params;

  try {
    return params && !isEmpty(params) ? getDecrypt(params, secrets) : params;
  } catch (error) {
    console.error('解密失败--->', error);
    return params;
  }
};
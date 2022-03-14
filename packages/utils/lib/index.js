"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getUuid: true
};
exports.getUuid = void 0;

var _diff = require("./diff");

Object.keys(_diff).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _diff[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _diff[key];
    }
  });
});

var _encrypt = require("./encrypt");

Object.keys(_encrypt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _encrypt[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _encrypt[key];
    }
  });
});

var _locale = require("./locale");

Object.keys(_locale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _locale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _locale[key];
    }
  });
});

var _params = require("./params");

Object.keys(_params).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _params[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _params[key];
    }
  });
});

var _string = require("./string");

Object.keys(_string).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _string[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _string[key];
    }
  });
});

var _tree = require("./tree");

Object.keys(_tree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tree[key];
    }
  });
});

// const isProd = process.env.ENV === 'production';
var getUuid = function getUuid(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};

exports.getUuid = getUuid;
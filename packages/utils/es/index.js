// const isProd = process.env.ENV === 'production';
export var getUuid = function getUuid(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
export * from './diff';
export * from './encrypt';
export * from './locale';
export * from './params';
export * from './string';
export * from './tree';
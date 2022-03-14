import * as diff from './diff';
import * as encrypt from './encrypt';
import * as locale from './locale';
import * as params from './params';
import * as string from './string';
import * as tree from './tree';

// const isProd = process.env.ENV === 'production';
const getUuid = (length: number | undefined) =>
  Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);

export default {
  getUuid,
  ...diff,
  ...encrypt,
  ...locale,
  ...params,
  ...string,
  ...tree,
}

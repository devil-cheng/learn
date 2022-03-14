/* eslint-disable no-unused-vars,no-param-reassign,no-underscore-dangle */
import { isEqual } from 'lodash-es';

type DiffInfoItemType = { type: string; oldValue?: any };
type DiffInfoType = Record<string, DiffInfoItemType>;
type DiffDataType = Record<string, any> & { $diff: DiffInfoType };
type ArrayStrategyType = { compareField: string } | 'index';
type DiffArrayType = Record<string, any> & {
    $diff?: { type: string };
    difference?: Record<string, { type: string; oldValue: any }>;
};

/**
 * 判断是否是空值
 * @param key
 * @param record
 */
function isEmpty(key: string, record: Record<string, any>) {
    if (key in record) {
        return record[key] === null || record[key] === undefined || record[key].length === 0;
    }
    return true;
}

/**
 * 比较两个对象的差异
 * @param oldObj
 * @param newObj
 */
export function diff(oldObj: Record<string, any>, newObj: Record<string, any>): DiffDataType {
    const $diff: DiffInfoType = {};
    const aKeys: string[] = Object.keys(oldObj);
    const bKeys: string[] = Object.keys(newObj);
    const queue = Array.from(new Set([...aKeys, ...bKeys]));
    while (queue.length) {
        const currentKey = queue.shift();
        if (currentKey) {
            if (isEmpty(currentKey, oldObj) && !isEmpty(currentKey, newObj)) {
                $diff[currentKey] = { type: 'add' };
            } else if (!isEmpty(currentKey, oldObj) && isEmpty(currentKey, newObj)) {
                $diff[currentKey] = { type: 'delete', oldValue: oldObj[currentKey] };
            } else if (!isEqual(oldObj[currentKey], newObj[currentKey])) {
                $diff[currentKey] = { type: 'update', oldValue: oldObj[currentKey] };
            }
        }
    }
    return { ...oldObj, ...newObj, $diff };
}

/**
 * 比较两个数组的差异
 * @param oldArr
 * @param newArr
 * @param strategy
 */
export function diffArray(
    oldArr: any[],
    newArr: any[],
    strategy: ArrayStrategyType = { compareField: 'id' }
): DiffArrayType[] {
    // 全部新增的情况
    if ((!oldArr || oldArr?.length === 0) && newArr?.length) {
        return newArr?.map(item => ({ ...item, $diff: { type: 'array-add' } })) || [];
    }
    // 全部删除的情况
    if ((!newArr || newArr?.length === 0) && oldArr?.length) {
        return oldArr?.map(item => ({ ...item, $diff: { type: 'array-delete' } })) || [];
    }
    // 通过不同的策略来比较数组数据
    let result: any[] = [];
    if (strategy === 'index') {
        const maxLength = oldArr.length > newArr.length ? oldArr.length : newArr.length;
        for (let i = 0; i < maxLength; i += 1) {
            const itemA = oldArr[i];
            const itemB = newArr[i];
            if (!itemA && itemB) {
                result.push({ ...itemB, $diff: { type: 'array-add' } });
            } else if (itemA && !itemB) {
                result.push({ ...itemA, $diff: { type: 'array-delete' } });
            } else {
                const difference = diff(itemA, itemB)?.$diff;
                // 判断是否有差异
                if (Object.keys(difference)?.length > 0) {
                    result.push({
                        ...itemB,
                        $diff: { type: 'array-update', difference }
                    });
                } else {
                    result.push({ ...itemB, $diff: { type: 'array-no-change' } });
                }
            }
        }
    } else if (strategy?.compareField) {
        const field = strategy?.compareField;
        let queue1 = [...oldArr];
        const queue2 = [...newArr];
        let currentQueue1Item;
        let currentQueue2Item: Record<string, any>;
        while (queue1.length || queue2.length) {
            if (queue2.length > 0) {
                currentQueue2Item = queue2.shift();
                // eslint-disable-next-line no-loop-func
                const itemInQueue1Index = queue1.findIndex(item => currentQueue2Item[field] === item[field]);
                if (itemInQueue1Index > -1) {
                    // 可能有更新
                    // eslint-disable-next-line prefer-destructuring
                    currentQueue1Item = queue1.splice(itemInQueue1Index, 1)[0];
                    const diffDetail = diff(currentQueue1Item, currentQueue2Item)?.$diff;
                    // 判断是否有差异
                    if (Object.keys(diffDetail)?.length > 0) {
                        result.push({
                            ...{ ...currentQueue1Item, ...currentQueue2Item },
                            $diff: {
                                type: 'array-update',
                                difference: diffDetail
                            }
                        });
                    } else {
                        result.push({ ...currentQueue2Item });
                    }
                } else {
                    // 新增
                    result.push({
                        ...currentQueue2Item,
                        $diff: { type: 'array-add' }
                    });
                }
            } else {
                // 删除
                result = result.concat(
                    queue1.map(item => ({
                        ...item,
                        $diff: { type: 'array-delete' }
                    })) || []
                );
                queue1 = [];
            }
        }
    }
    return result;
}

/**
```js
const a = {
  a: 1,
  b: "1", // del
  c: [1, 2, 3],
  d: { foo: "bar" },
  e: [{ foo: "bar" }],
  list: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
  ],
};
const b = {
  a: 1,
  c: [1, 2], // update
  d: { bar: "2222" }, // update
  e: [{ foo: 1, bar: 2 }], // update
  f: 2, // add
  list: [
    { id: 1, name: "2" },
    { id: 3, name: "3" },
  ], // update
};

const diffObj = {
  a: 1,
  b: "1",
  c: [1, 2],
  d: { bar: "2222" },
  e: [{ foo: 1, bar: 2 }],
  f: 2,
  list: [
    { id: 1, name: "2" },
    { id: 3, name: "3" },
  ],
  $diff: {
    b: { type: "delete" },
    c: { type: "update", oldValue: [1, 2, 3] },
    d: { type: "update", oldValue: { foo: "bar" } },
    e: { type: "update", oldValue: [{ foo: "bar" }] },
    f: { type: "add" },
    list: {
      type: "update",
      oldValue: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
      ]
    },
  },
};

////////////////////////////////////////////////////

const array1 = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
];
const array2 = [
  { id: 1, name: "2" },
  { id: 3, name: "3" },
];
const diffArr = [
  {
    id: 1,
    name: "2",
    $diff: {
      type: "array-update",
      difference: {
        name: { type: "update", oldValue: "1" },
      },
    },
  },
  {
    id: 2,
    name: "2",
    $diff: {
      type: "array-delete",
    },
  },
  {
    id: 3,
    name: "3",
    $diff: {
      type: "array-add",
    },
  },
];
``` */

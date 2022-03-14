declare type DiffInfoItemType = {
    type: string;
    oldValue?: any;
};
declare type DiffInfoType = Record<string, DiffInfoItemType>;
declare type DiffDataType = Record<string, any> & {
    $diff: DiffInfoType;
};
declare type ArrayStrategyType = {
    compareField: string;
} | 'index';
declare type DiffArrayType = Record<string, any> & {
    $diff?: {
        type: string;
    };
    difference?: Record<string, {
        type: string;
        oldValue: any;
    }>;
};
/**
 * 比较两个对象的差异
 * @param oldObj
 * @param newObj
 */
export declare function diff(oldObj: Record<string, any>, newObj: Record<string, any>): DiffDataType;
/**
 * 比较两个数组的差异
 * @param oldArr
 * @param newArr
 * @param strategy
 */
export declare function diffArray(oldArr: any[], newArr: any[], strategy?: ArrayStrategyType): DiffArrayType[];
export {};
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

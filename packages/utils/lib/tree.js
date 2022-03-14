"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraverseType = void 0;
exports.closestParentItemInTree = closestParentItemInTree;
exports.closestParentItemInTreeArray = closestParentItemInTreeArray;
exports.closestParentKeysInTreeArray = closestParentKeysInTreeArray;
exports.completionTreeNodePid = completionTreeNodePid;
exports.createTreeFromTreeLikeArray = createTreeFromTreeLikeArray;
exports.effectParentNode = effectParentNode;
exports.effectSubNode = effectSubNode;
exports.everyTree = everyTree;
exports.filterTree = filterTree;
exports.filterTreeArray = filterTreeArray;
exports.filterTreeWithParentNode = filterTreeWithParentNode;
exports.findAllChildrenInTree = findAllChildrenInTree;
exports.findAllInTree = findAllInTree;
exports.findChildrenItemInTreeArray = findChildrenItemInTreeArray;
exports.findIndexInSiblingNode = findIndexInSiblingNode;
exports.findOneInTree = findOneInTree;
exports.findParentTreeNode = findParentTreeNode;
exports.findSiblingNodes = findSiblingNodes;
exports.flattenTree = flattenTree;
exports.getAllLeftNode = getAllLeftNode;
exports.getAllRightNode = getAllRightNode;
exports.getFromTree = getFromTree;
exports.getLeftNode = getLeftNode;
exports.getRightNode = getRightNode;
exports.getTreeDepth = getTreeDepth;
exports.getTreeNodeByPath = getTreeNodeByPath;
exports.hasChildrenNode = hasChildrenNode;
exports.mapTree = mapTree;
exports.mapTreeWithParent = mapTreeWithParent;
exports.removeEmptyChildren = removeEmptyChildren;
exports.removeEmptyChildrenTreeNode = removeEmptyChildrenTreeNode;
exports.replaceTreeNode = replaceTreeNode;
exports.setToTree = setToTree;
exports.someTree = someTree;
exports.sortTree = sortTree;
exports.statisticsTreeNodeChildren = statisticsTreeNodeChildren;
exports.traverseTree = traverseTree;

var _lodashEs = require("lodash-es");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TraverseType;
exports.TraverseType = TraverseType;

(function (TraverseType) {
  TraverseType["Depth"] = "depth";
  TraverseType["Breath"] = "breath";
})(TraverseType || (exports.TraverseType = TraverseType = {}));
/**
 * 将List结构的对象数组转化为树形结构
 * @param array {Array<TreeLikeArrayItem>} 源数据
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function createTreeFromTreeLikeArray(array, options) {
  var _ref = options || {},
      _ref$idKey = _ref.idKey,
      idKey = _ref$idKey === void 0 ? 'id' : _ref$idKey,
      _ref$parentIdKey = _ref.parentIdKey,
      parentIdKey = _ref$parentIdKey === void 0 ? 'pId' : _ref$parentIdKey,
      _ref$childrenKey = _ref.childrenKey,
      childrenKey = _ref$childrenKey === void 0 ? 'children' : _ref$childrenKey;

  var idMapTemp = Object.create(null);
  var cloneData = (0, _lodashEs.cloneDeep)(array);
  cloneData.forEach(function (row) {
    idMapTemp[row[idKey]] = row;
  });
  var result = [];
  cloneData.forEach(function (row) {
    var parent = idMapTemp[row[parentIdKey]];

    if (parent) {
      var v = parent[childrenKey] || (parent[childrenKey] = []);
      v.push(row);
    } else {
      result.push(row);
    }
  });
  return result;
}
/**
 * 过滤树数据. 如果子节点有匹配数据, 会连带父节点一起返回
 * @param array 要过滤的数组数据
 * @param predicate 过滤函数
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function filterTreeArray(array, predicate, options) {
  var _ref2 = options || {},
      _ref2$idKey = _ref2.idKey,
      idKey = _ref2$idKey === void 0 ? 'id' : _ref2$idKey,
      _ref2$parentIdKey = _ref2.parentIdKey,
      parentIdKey = _ref2$parentIdKey === void 0 ? 'pId' : _ref2$parentIdKey;

  var result = array.filter(predicate);

  var needCheekPidArr = _toConsumableArray(result); // 查找父级


  var _loop = function _loop() {
    // 从末尾截取一个节点, (从末尾是因为 array 大概率是排序过的数据, 从末尾查找速度快)
    var currentItemTemp = needCheekPidArr.splice(needCheekPidArr.length - 1, 1);
    var currentItem = currentItemTemp && currentItemTemp.length && currentItemTemp[0];

    if (currentItem[parentIdKey]) {
      // 判断是否有父节点, 有父节点把父节点找出来添加进结果中
      var parentItem = array.filter(function (item) {
        return item[idKey] === currentItem[parentIdKey];
      });

      if (parentItem.length && !result.some(function (item) {
        return item[idKey] === parentItem[0][idKey];
      })) {
        result.unshift(parentItem[0]); // 重新丢回队列, 去查找父级的父级

        needCheekPidArr.push(parentItem[0]);
      }
    }
  };

  while (needCheekPidArr.length) {
    _loop();
  }

  return result;
}
/**
 * 向上查找所有父节点, 返回节点的数组
 * @param array 数组类型数据
 * @param node 要查找的节点
 * @param depth 遍历的深度
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function closestParentItemInTreeArray(array, node) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _ref3 = options || {},
      _ref3$idKey = _ref3.idKey,
      idKey = _ref3$idKey === void 0 ? 'id' : _ref3$idKey,
      _ref3$parentIdKey = _ref3.parentIdKey,
      parentIdKey = _ref3$parentIdKey === void 0 ? 'pId' : _ref3$parentIdKey;

  var result = [];
  var currentItem = node;
  var deepLoopCount = typeof depth === 'number' ? depth : Infinity;

  var findItem = function findItem() {
    var pId = currentItem === null || currentItem === void 0 ? void 0 : currentItem[parentIdKey];

    if (pId) {
      return array.find(function (item) {
        return item[idKey] === pId;
      });
    }

    return undefined;
  };

  do {
    currentItem = findItem();

    if (currentItem) {
      result.unshift(currentItem);
    }

    deepLoopCount -= 1;
  } while (currentItem && currentItem[parentIdKey] && deepLoopCount > 0);

  return result;
}
/**
 * 向上查找所有父节点 key 值, 返回 key 值的数组
 * @param array 数组类型数据
 * @param key 要查找的节点
 * @param depth 遍历的深度
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function closestParentKeysInTreeArray(array, key) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _ref4 = options || {},
      _ref4$idKey = _ref4.idKey,
      idKey = _ref4$idKey === void 0 ? 'id' : _ref4$idKey,
      _ref4$parentIdKey = _ref4.parentIdKey,
      parentIdKey = _ref4$parentIdKey === void 0 ? 'pId' : _ref4$parentIdKey;

  var result = [];
  var currentItem = array.find(function (item) {
    return item[idKey] === key;
  });
  var deepLoopCount = typeof depth === 'number' ? depth : Infinity;

  if (!currentItem) {
    return result;
  }

  var findItem = function findItem() {
    var pId = currentItem === null || currentItem === void 0 ? void 0 : currentItem[parentIdKey];

    if (pId) {
      return array.find(function (item) {
        return item[idKey] === pId;
      });
    }

    return undefined;
  };

  do {
    currentItem = findItem();

    if (currentItem) {
      result.unshift(currentItem[idKey]);
    }

    deepLoopCount -= 1;
  } while (currentItem && currentItem[parentIdKey] && deepLoopCount > 0);

  return result;
}
/**
 * 向下查找所有子节点, 返回节点的数组
 * @param array 数组类型数据
 * @param targetNode 要查找的节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function findChildrenItemInTreeArray(array, targetNode, options) {
  var _ref5 = options || {},
      _ref5$idKey = _ref5.idKey,
      idKey = _ref5$idKey === void 0 ? 'id' : _ref5$idKey,
      _ref5$parentIdKey = _ref5.parentIdKey,
      parentIdKey = _ref5$parentIdKey === void 0 ? 'pId' : _ref5$parentIdKey;

  var result = [];

  var findChildren = function findChildren(pId) {
    return array.filter(function (item) {
      return item[parentIdKey] === pId;
    });
  };

  var queue = findChildren(targetNode[idKey]);

  while (queue.length) {
    var currentItem = queue.shift();

    if (currentItem) {
      var children = findChildren(currentItem[idKey]);
      result.push(currentItem);
      queue = queue.concat(children);
    }
  }

  return result;
}
/**
 * 判断是否有子节点
 * @param array 数组类型数据
 * @param targetNode 要查找的节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function hasChildrenNode(array, targetNode, options) {
  var _ref6 = options || {},
      _ref6$idKey = _ref6.idKey,
      idKey = _ref6$idKey === void 0 ? 'id' : _ref6$idKey,
      _ref6$parentIdKey = _ref6.parentIdKey,
      parentIdKey = _ref6$parentIdKey === void 0 ? 'pId' : _ref6$parentIdKey;

  return array.some(function (item) {
    return item[parentIdKey] === targetNode[idKey];
  });
}

function _normalizeObjectPath(path) {
  if (path instanceof Array) return path;
  return path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(function (p) {
    return p !== '';
  });
}

function _normalizeTreePath(path, pathSeparator, childrenKey) {
  if (path instanceof Array) return path;
  var fullChildren = new RegExp(childrenKey, 'gi');
  return path.replace(fullChildren, '').replace(/\[(\d+)]/g, '.$1').split(pathSeparator).filter(function (p) {
    return p !== '';
  });
}
/**
 * 按路径查找目标值
 * @param {object} tree
 * @param {string|string[]} path
 * @param {TreePathOptions} [options]
 * @returns {*}
 *
 * @example
 *   path = ''                 return treeRoot
 *   path = 'child1'           return treeRoot.children[title === 'child1']
 *   path = 'children[1]'      return treeRoot.children[1]
 *   path = 'child1.child11'   return treeRoot.children[title === 'child1'].children[title === 'child11']
 *   path = 'child1[0]'        return treeRoot.children[title === 'child1'].children[0]
 */


function getTreeNodeByPath(tree, path) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref7 = options || {},
      _ref7$pathSeparator = _ref7.pathSeparator,
      pathSeparator = _ref7$pathSeparator === void 0 ? '.' : _ref7$pathSeparator,
      _ref7$fieldName = _ref7.fieldName,
      fieldName = _ref7$fieldName === void 0 ? 'title' : _ref7$fieldName,
      _ref7$childrenKey = _ref7.childrenKey,
      childrenKey = _ref7$childrenKey === void 0 ? 'children' : _ref7$childrenKey;

  var pathNodes = _normalizeTreePath(path, pathSeparator, childrenKey);

  return pathNodes.reduce(function (branch, pathPart) {
    if (!branch) return branch;
    var children = branch[childrenKey] || []; // eslint-disable-next-line no-restricted-globals

    var childIndex = isFinite(Number(pathPart)) ? pathPart : children.findIndex(function (node) {
      return node[fieldName] === pathPart;
    });
    return children[childIndex];
  }, tree);
}
/**
 * 模拟 lodash.get, 但是没有默认值的参数
 * @param tree 树数据
 * @param path 路径
 */


function getFromTree(tree, path) {
  var pathArray = _normalizeObjectPath(path);

  return pathArray.reduce(function (node, pathPart) {
    if (!node) return node;
    return node[pathPart];
  }, tree);
}
/**
 * 模拟 lodash.set
 * @param tree 树数据
 * @param path 路径
 * @param value 要设置的值
 */


function setToTree(tree, path, value) {
  var pathArray = _normalizeObjectPath(path);

  pathArray.reduce(function (node, pathPart, index, arr) {
    if (index + 1 === arr.length) {
      // eslint-disable-next-line no-param-reassign
      node[pathPart] = value;
      return;
    } // eslint-disable-next-line consistent-return


    if (node[pathPart]) return node[pathPart]; // eslint-disable-next-line consistent-return,no-restricted-globals,no-return-assign

    return node[pathPart] = isFinite(Number(arr[index + 1])) ? [] : {};
  }, (0, _lodashEs.cloneDeep)(tree));
  return tree;
}
/**
 * 扁平化树结构
 * @param tree 树结构数据
 * @param keepChildrenField 是否保留 children 字段
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function flattenTree(tree) {
  var keepChildrenField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var treeDataClone = tree ? (0, _lodashEs.cloneDeep)(tree) : null;

  var _ref8 = options || {},
      _ref8$childrenKey = _ref8.childrenKey,
      childrenKey = _ref8$childrenKey === void 0 ? 'children' : _ref8$childrenKey;

  var result = [];

  var deep = function deep(data) {
    for (var i = 0; i < data.length; i += 1) {
      var node = data[i];
      result.push(node);

      if (node[childrenKey]) {
        deep(node[childrenKey]);

        if (!keepChildrenField) {
          delete node[childrenKey];
        }
      }
    }
  };

  if (tree instanceof Array) {
    deep(treeDataClone);
  } else if (treeDataClone) {
    deep([treeDataClone]);
  }

  return result;
}
/**
 * 遍历树数据的方法
 * @param tree 树数据
 * @param fn 遍历函数
 * @param queueMethod shift: 深度优先 | unshift: 广度优先
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
// eslint-disable-next-line consistent-return


function _traverse(tree, // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
fn, queueMethod, options) {
  var _ref9 = options || {},
      some = _ref9.some,
      every = _ref9.every,
      returnBoolean = _ref9.returnBoolean,
      returnArray = _ref9.returnArray,
      _ref9$childrenKey = _ref9.childrenKey,
      childrenKey = _ref9$childrenKey === void 0 ? 'children' : _ref9$childrenKey;

  var queue = tree instanceof Array ? _toConsumableArray(tree) : [Object.assign({}, tree)];
  var results = [];
  var didBreak = false;
  var lastResult;

  while (queue.length) {
    var node = queue.shift();

    if (!node) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (node[childrenKey] && node[childrenKey].length) {
      // 广度优先还是深度优先
      queue[queueMethod].apply(queue, _toConsumableArray(node[childrenKey]));
    }

    if (some || every) {
      var result = fn(node, options);

      if (returnArray) {
        if (result) {
          results.push(node);
        }
      } else if (every && !result || some && result) {
        didBreak = true;
        lastResult = result || undefined;
        break;
      }
    } else if (fn(node, options) === false) {
      break;
    }
  }

  if (every) {
    if (returnBoolean) {
      return !didBreak;
    }

    if (returnArray) {
      return results;
    }
  } else if (some) {
    if (returnBoolean) {
      return Boolean(lastResult);
    }

    if (returnArray) {
      return results;
    }
  }
}
/**
 * 遍历树数据
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param traverseType 遍历方式, 默认是广度优先
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function traverseTree(tree, callbackFn) {
  var traverseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TraverseType.Breath;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  _traverse(tree, callbackFn, traverseType === TraverseType.Depth ? 'unshift' : 'push', options);
}
/**
 * 遍历树数据, 如果有一个节点匹配, 则返回 true
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function someTree(tree, predicate) {
  var traverseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TraverseType.Breath;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  return _traverse(tree, predicate, traverseType === TraverseType.Depth ? 'unshift' : 'push', Object.assign(Object.assign({}, options), {
    some: true,
    returnBoolean: true
  }));
}
/**
 * 遍历树数据, 所有的节点都匹配, 则返回 true
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function everyTree(tree, predicate) {
  var traverseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TraverseType.Breath;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  return _traverse(tree, predicate, traverseType === TraverseType.Depth ? 'unshift' : 'push', Object.assign(Object.assign({}, options), {
    every: true,
    returnBoolean: true
  }));
}
/**
 * 查找树数据, 所有第一个匹配的节点
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式 breath|depth, 默认 breath (广度优先)
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function findOneInTree(tree, predicate) {
  var traverseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TraverseType.Breath;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _a, _b;

  return (_b = (_a = _traverse(tree, predicate, traverseType === TraverseType.Depth ? 'unshift' : 'push', Object.assign(Object.assign({}, options), {
    some: true,
    returnArray: true
  }))) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
}
/**
 * 查找树数据, 返回所有匹配的数据
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式 breath|depth, 默认 breath (广度优先)
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function findAllInTree(tree, predicate) {
  var traverseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TraverseType.Breath;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _a;

  return (_a = _traverse(tree, predicate, traverseType === TraverseType.Depth ? 'unshift' : 'push', Object.assign(Object.assign({}, options), {
    every: true,
    returnArray: true
  }))) !== null && _a !== void 0 ? _a : [];
}
/**
 * 查找父节点
 * @param tree 树结构数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function findParentTreeNode(tree, targetNode, options) {
  var _ref10 = options || {},
      _ref10$idKey = _ref10.idKey,
      idKey = _ref10$idKey === void 0 ? 'id' : _ref10$idKey,
      _ref10$parentIdKey = _ref10.parentIdKey,
      parentIdKey = _ref10$parentIdKey === void 0 ? 'pId' : _ref10$parentIdKey;

  if (targetNode[parentIdKey]) {
    return findOneInTree(tree, function (node) {
      return node[idKey] === targetNode[parentIdKey];
    }, TraverseType.Breath, options);
  }

  return null;
}
/**
 * 获取目标节点所在兄弟节点中的索引
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function findIndexInSiblingNode(tree, targetNode, options) {
  var _ref11 = options || {},
      _ref11$idKey = _ref11.idKey,
      idKey = _ref11$idKey === void 0 ? 'id' : _ref11$idKey,
      _ref11$childrenKey = _ref11.childrenKey,
      childrenKey = _ref11$childrenKey === void 0 ? 'children' : _ref11$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode) {
    return parentNode ? parentNode[childrenKey].findIndex(function (node) {
      return node[idKey] === targetNode[idKey];
    }) : -1;
  }

  return 0;
}
/**
 * 获取所有兄弟节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function findSiblingNodes(tree, targetNode, options) {
  var _ref12 = options || {},
      _ref12$idKey = _ref12.idKey,
      idKey = _ref12$idKey === void 0 ? 'id' : _ref12$idKey,
      _ref12$childrenKey = _ref12.childrenKey,
      childrenKey = _ref12$childrenKey === void 0 ? 'children' : _ref12$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode) {
    return parentNode[childrenKey].filter(function (item) {
      return item[idKey] !== targetNode[idKey];
    });
  }

  return [targetNode];
}
/**
 * 遍历树类型数据, 并返回新的对象
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function mapTree(tree, callbackFn, options) {
  var _ref13 = options || {},
      _ref13$childrenKey = _ref13.childrenKey,
      childrenKey = _ref13$childrenKey === void 0 ? 'children' : _ref13$childrenKey;

  var treeClone = tree instanceof Array ? (0, _lodashEs.cloneDeep)(tree) : [(0, _lodashEs.cloneDeep)(tree)];
  return treeClone.map(function (child) {
    if (child[childrenKey]) {
      child[childrenKey] = mapTree(child[childrenKey], callbackFn, options);
    }

    return callbackFn(child);
  });
}
/**
 * 遍历树类型数据, 并返回新的对象
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param parentNode 父级节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function mapTreeWithParent(tree, callbackFn, parentNode, options) {
  var _ref14 = options || {},
      _ref14$childrenKey = _ref14.childrenKey,
      childrenKey = _ref14$childrenKey === void 0 ? 'children' : _ref14$childrenKey;

  var treeClone = tree instanceof Array ? (0, _lodashEs.cloneDeep)(tree) : [(0, _lodashEs.cloneDeep)(tree)];
  return treeClone.map(function (child) {
    var currentNode = callbackFn(child, parentNode);

    if (currentNode[childrenKey]) {
      currentNode[childrenKey] = mapTreeWithParent(currentNode[childrenKey], callbackFn, currentNode, options);
    }

    return currentNode;
  });
}
/**
 * 遍历树类型数据
 * @param tree
 * @param compareFn
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function sortTree(tree, compareFn, options) {
  var _ref15 = options || {},
      _ref15$childrenKey = _ref15.childrenKey,
      childrenKey = _ref15$childrenKey === void 0 ? 'children' : _ref15$childrenKey;

  var treeClone = tree instanceof Array ? (0, _lodashEs.cloneDeep)(tree) : [(0, _lodashEs.cloneDeep)(tree)];
  treeClone = treeClone.map(function (item) {
    if (item[childrenKey]) {
      item[childrenKey] = sortTree(item[childrenKey], compareFn, options);
    }

    return item;
  });
  return treeClone.sort(compareFn);
}
/**
 * 替换树节点数据
 * @param tree 树类型数据
 * @param predicate 匹配的方法
 * @param replaceNode 要替换的值
 * @returns {[]}
 */


function replaceTreeNode(tree, predicate, replaceNode) {
  return mapTree(tree, function (node) {
    if (predicate(node)) {
      if (replaceNode instanceof Function) {
        return replaceNode(node);
      }

      return replaceNode;
    }

    return node;
  });
}
/**
 * 删除空的 children 节点
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function removeEmptyChildrenTreeNode(tree, options) {
  var _ref16 = options || {},
      _ref16$childrenKey = _ref16.childrenKey,
      childrenKey = _ref16$childrenKey === void 0 ? 'children' : _ref16$childrenKey;

  return mapTree(tree, function (node) {
    if (Array.isArray(node[childrenKey]) && node[childrenKey].length) {
      node[childrenKey] = removeEmptyChildrenTreeNode(node[childrenKey], options);
    } else if (node[childrenKey]) {
      delete node[childrenKey];
    }

    return node;
  });
}
/**
 * 统计所有节点的子节点的数量
 * @param tree 树类型数据
 * @param deep 是否统计所有子节点
 * @param statisticsKey 统计好的数字保存在哪个字段
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function statisticsTreeNodeChildren(tree) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var statisticsKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'statistics';
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _ref17 = options || {},
      _ref17$childrenKey = _ref17.childrenKey,
      childrenKey = _ref17$childrenKey === void 0 ? 'children' : _ref17$childrenKey;

  return mapTree(tree, function (node) {
    if (node[childrenKey] && node[childrenKey].length) {
      if (deep) {
        node[statisticsKey] = node[childrenKey].reduce(function (prev, child) {
          return prev + child[statisticsKey] || 0;
        }, 0);
        node[statisticsKey] += node[childrenKey].length;
      } else {
        node[statisticsKey] = node[childrenKey].length;
      }
    }

    return node;
  });
}
/**
 * 向上查找所有父节点
 * @param tree 树数据
 * @param predicate 查找的节点的方法
 * @param isContainerTarget 是否包含匹配的节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function closestParentItemInTree(tree, predicate) {
  var isContainerTarget = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  var _ref18 = options || {},
      _ref18$childrenKey = _ref18.childrenKey,
      childrenKey = _ref18$childrenKey === void 0 ? 'children' : _ref18$childrenKey;

  var result = [];

  var traverseFn = function traverseFn(node) {
    var hasExist = false;

    if (node[childrenKey] && node[childrenKey].length) {
      hasExist = node[childrenKey].filter(function (childrenNode) {
        return traverseFn(childrenNode);
      }).length > 0;
    }

    if (hasExist) {
      result.unshift(node);
      return true;
    }

    var matchResult = predicate(node);

    if (matchResult && isContainerTarget) {
      result.unshift(node);
    }

    return matchResult;
  };

  if (tree instanceof Array) {
    tree.forEach(function (item) {
      return traverseFn(item);
    });
  } else {
    traverseFn(tree);
  }

  return result;
}
/**
 * 查找所有子节点
 * @param tree
 * @param predicate
 * @param options
 */


function findAllChildrenInTree(tree, predicate, options) {
  var _a;

  var _ref19 = options || {},
      _ref19$childrenKey = _ref19.childrenKey,
      childrenKey = _ref19$childrenKey === void 0 ? 'children' : _ref19$childrenKey;

  return flattenTree(((_a = findOneInTree(tree, predicate, 'breath', options)) === null || _a === void 0 ? void 0 : _a[childrenKey]) || []);
}
/**
 * 过滤树类型数据, 保留匹配节点的父级
 * @param tree 树数据
 * @param predicate 匹配的方法
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 * @returns {*}
 */


function filterTree(tree, predicate, options) {
  var _ref20 = options || {},
      _ref20$childrenKey = _ref20.childrenKey,
      childrenKey = _ref20$childrenKey === void 0 ? 'children' : _ref20$childrenKey;

  return (0, _lodashEs.cloneDeep)(tree).filter(function (child) {
    if (child[childrenKey]) {
      child[childrenKey] = filterTree(child[childrenKey], predicate, options); // 如果子节点有匹配的结果, 就直接返回父节点

      if (child[childrenKey] && child[childrenKey].length) {
        return child;
      }
    }

    return predicate(child);
  });
}
/**
 * 过滤树类型数据, 保留匹配节点的父级. 遍历函数的第二个参数是父节点
 * @param tree 树数据
 * @param predicate 匹配的方法
 * @param parentNode 父节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 * @returns {*}
 */


function filterTreeWithParentNode(tree, predicate, parentNode, options) {
  var _ref21 = options || {},
      _ref21$childrenKey = _ref21.childrenKey,
      childrenKey = _ref21$childrenKey === void 0 ? 'children' : _ref21$childrenKey;

  return (0, _lodashEs.cloneDeep)(tree).filter(function (child) {
    if (child[childrenKey]) {
      child[childrenKey] = filterTreeWithParentNode(child[childrenKey], predicate, child, options); // 如果子节点有匹配的结果, 就直接返回父节点

      if (child[childrenKey] && child[childrenKey].length) {
        return child;
      }
    }

    return predicate(child, parentNode);
  });
}
/**
 * 为没有父节点的树数据添加父节点
 * @param tree
 * @param options 别名配置, 默认值为 { idKey: 'id', parentIdKey: 'pId', childrenKey: 'children' }
 */


function completionTreeNodePid(tree, options) {
  var _ref22 = options || {},
      _ref22$idKey = _ref22.idKey,
      idKey = _ref22$idKey === void 0 ? 'id' : _ref22$idKey,
      _ref22$parentIdKey = _ref22.parentIdKey,
      parentIdKey = _ref22$parentIdKey === void 0 ? 'pId' : _ref22$parentIdKey,
      _ref22$childrenKey = _ref22.childrenKey,
      childrenKey = _ref22$childrenKey === void 0 ? 'children' : _ref22$childrenKey;

  var treeDataClone = (0, _lodashEs.cloneDeep)(tree);

  var _loop2 = function _loop2(i) {
    treeDataClone[i][childrenKey] = completionTreeNodePid(treeDataClone[i][childrenKey] && treeDataClone[i][childrenKey].length && treeDataClone[i][childrenKey].map(function (item) {
      return Object.assign(Object.assign({}, item), _defineProperty({}, parentIdKey, item[parentIdKey] || treeDataClone[i][idKey]));
    }));
  };

  for (var i = 0; i < treeDataClone.length; i += 1) {
    _loop2(i);
  }

  return treeDataClone;
}
/**
 * 获取目标节点的右侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function getRightNode(tree, targetNode, options) {
  var _a;

  var _ref23 = options || {},
      _ref23$idKey = _ref23.idKey,
      idKey = _ref23$idKey === void 0 ? 'id' : _ref23$idKey,
      _ref23$childrenKey = _ref23.childrenKey,
      childrenKey = _ref23$childrenKey === void 0 ? 'children' : _ref23$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode) {
    var targetIndex = parentNode ? parentNode[childrenKey].findIndex(function (node) {
      return node[idKey] === targetNode[idKey];
    }) : -1;
    return (_a = parentNode[childrenKey].slice(targetIndex + 1, targetIndex + 2)) === null || _a === void 0 ? void 0 : _a[0];
  }

  return null;
}
/**
 * 获取目标节点的所有右侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function getAllRightNode(tree, targetNode, options) {
  var _ref24 = options || {},
      _ref24$idKey = _ref24.idKey,
      idKey = _ref24$idKey === void 0 ? 'id' : _ref24$idKey,
      _ref24$childrenKey = _ref24.childrenKey,
      childrenKey = _ref24$childrenKey === void 0 ? 'children' : _ref24$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode) {
    var targetIndex = parentNode ? parentNode[childrenKey].findIndex(function (node) {
      return node[idKey] === targetNode[idKey];
    }) : -1;
    return parentNode[childrenKey].slice(targetIndex + 1);
  }

  return [];
}
/**
 * 获取目标节点的左侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function getLeftNode(tree, targetNode, options) {
  var _a;

  var _ref25 = options || {},
      _ref25$idKey = _ref25.idKey,
      idKey = _ref25$idKey === void 0 ? 'id' : _ref25$idKey,
      _ref25$childrenKey = _ref25.childrenKey,
      childrenKey = _ref25$childrenKey === void 0 ? 'children' : _ref25$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode) {
    var targetIndex = parentNode ? parentNode[childrenKey].findIndex(function (node) {
      return node[idKey] === targetNode[idKey];
    }) : -1;
    return (_a = parentNode[childrenKey].slice(targetIndex - 1, targetIndex - 2)) === null || _a === void 0 ? void 0 : _a[0];
  }

  return null;
}
/**
 * 获取目标节点的所有左侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */


function getAllLeftNode(tree, targetNode, options) {
  var _ref26 = options || {},
      _ref26$idKey = _ref26.idKey,
      idKey = _ref26$idKey === void 0 ? 'id' : _ref26$idKey,
      _ref26$childrenKey = _ref26.childrenKey,
      childrenKey = _ref26$childrenKey === void 0 ? 'children' : _ref26$childrenKey;

  var parentNode = findParentTreeNode(tree, targetNode, options);

  if (parentNode && parentNode[childrenKey] instanceof Array) {
    var targetIndex = parentNode ? parentNode[childrenKey].findIndex(function (node) {
      return node[idKey] === targetNode[idKey];
    }) : -1;
    return parentNode[childrenKey].slice(0, targetIndex);
  }

  return [];
}
/**
 * 删除空的 children 节点
 *
 * @export
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function removeEmptyChildren() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 ? arguments[1] : undefined;

  var _ref27 = options || {},
      _ref27$childrenKey = _ref27.childrenKey,
      childrenKey = _ref27$childrenKey === void 0 ? 'children' : _ref27$childrenKey;

  return Array.isArray(tree) ? (0, _lodashEs.cloneDeep)(tree).map(function (item) {
    var result = Object.assign({}, item);
    var children = result.children;

    if (Array.isArray(children) && children.length) {
      result[childrenKey] = removeEmptyChildren(children, options);
    } else {
      delete result[childrenKey];
    }

    return result;
  }) : [];
}
/**
 * 获取树的深度
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */


function getTreeDepth(tree, options) {
  var _ref28 = options || {},
      _ref28$childrenKey = _ref28.childrenKey,
      childrenKey = _ref28$childrenKey === void 0 ? 'children' : _ref28$childrenKey;

  var deep = 0;

  var fn = function fn(data, index) {
    data.forEach(function (elem) {
      var _a;

      if (index > deep) {
        deep = index;
      }

      if (((_a = elem[childrenKey]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        fn(elem[childrenKey], deep + 1);
      }
    });
  };

  if (tree instanceof Array) {
    fn(tree, 1);
  } else {
    fn([tree], 0);
  }

  return deep;
}
/**
 * 父节点影响子节点
 */


function effectSubNode() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fieldName = arguments.length > 1 ? arguments[1] : undefined;
  var fieldValue = arguments.length > 2 ? arguments[2] : undefined;
  var effectObj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var options = arguments.length > 4 ? arguments[4] : undefined;

  var _ref29 = options || {},
      _ref29$childrenKey = _ref29.childrenKey,
      childrenKey = _ref29$childrenKey === void 0 ? 'children' : _ref29$childrenKey;

  return (0, _lodashEs.cloneDeep)(tree).map(function (item) {
    var result = Object.assign({}, item);
    var children = result[childrenKey];

    if (item[fieldName] === fieldValue) {
      result = Object.assign(Object.assign({}, result), effectObj);

      if (Array.isArray(children) && children.length) {
        result[childrenKey] = mapTree(children, function (data) {
          return Object.assign(Object.assign({}, data), effectObj);
        });
      }
    } else if (Array.isArray(children) && children.length) {
      result[childrenKey] = effectSubNode(children, fieldName, fieldValue, effectObj, options);
    }

    return result;
  });
}
/**
 * 子节点影响父节点
 */


function effectParentNode() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fieldName = arguments.length > 1 ? arguments[1] : undefined;
  var fieldValue = arguments.length > 2 ? arguments[2] : undefined;
  var effectObj = arguments.length > 3 ? arguments[3] : undefined;
  var options = arguments.length > 4 ? arguments[4] : undefined;
  var parentPathArray = closestParentItemInTree(tree, function (item) {
    return item[fieldName] === fieldValue;
  }, true, options);

  var _ref30 = options || {},
      _ref30$idKey = _ref30.idKey,
      idKey = _ref30$idKey === void 0 ? 'id' : _ref30$idKey;

  var result = (0, _lodashEs.cloneDeep)(tree);
  parentPathArray.forEach(function (item) {
    result = replaceTreeNode(result, function (node) {
      return node[idKey] === item[idKey];
    }, function (node) {
      return Object.assign(Object.assign({}, node), effectObj);
    });
  });
  return result;
}
export declare type TreeLikeArrayItem = Record<string, any>;
export declare type TreeLikeArray = TreeLikeArrayItem[];
export declare type TreeNode = Record<string, any> & {
    children?: Tree;
};
export declare type Tree = TreeNode[] | TreeNode;
export interface TreeNodeFieldAlias {
    idKey?: string;
    parentIdKey?: string;
    childrenKey?: string;
}
export interface TreePathOptions {
    pathSeparator?: string;
    fieldName?: string;
    childrenKey?: string;
}
export interface TraverseOptions {
    some?: boolean;
    every?: boolean;
    returnBoolean?: boolean;
    returnArray?: boolean;
}
export declare enum TraverseType {
    Depth = "depth",
    Breath = "breath"
}
/**
 * 将List结构的对象数组转化为树形结构
 * @param array {Array<TreeLikeArrayItem>} 源数据
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function createTreeFromTreeLikeArray(array: TreeLikeArray, options?: TreeNodeFieldAlias): TreeLikeArray;
/**
 * 过滤树数据. 如果子节点有匹配数据, 会连带父节点一起返回
 * @param array 要过滤的数组数据
 * @param predicate 过滤函数
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function filterTreeArray(array: TreeLikeArray, predicate: (item: TreeLikeArrayItem) => boolean, options?: TreeNodeFieldAlias): TreeLikeArray;
/**
 * 向上查找所有父节点, 返回节点的数组
 * @param array 数组类型数据
 * @param node 要查找的节点
 * @param depth 遍历的深度
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function closestParentItemInTreeArray(array: TreeLikeArray, node: TreeLikeArrayItem, depth?: false | number, options?: TreeNodeFieldAlias): TreeLikeArray;
/**
 * 向上查找所有父节点 key 值, 返回 key 值的数组
 * @param array 数组类型数据
 * @param key 要查找的节点
 * @param depth 遍历的深度
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function closestParentKeysInTreeArray(array: TreeLikeArray, key: keyof any, depth?: false | number, options?: TreeNodeFieldAlias): string[];
/**
 * 向下查找所有子节点, 返回节点的数组
 * @param array 数组类型数据
 * @param targetNode 要查找的节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function findChildrenItemInTreeArray(array: TreeLikeArray, targetNode: TreeLikeArrayItem, options?: TreeNodeFieldAlias): TreeLikeArray;
/**
 * 判断是否有子节点
 * @param array 数组类型数据
 * @param targetNode 要查找的节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function hasChildrenNode(array: TreeLikeArray, targetNode: TreeLikeArrayItem, options?: TreeNodeFieldAlias): boolean;
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
export declare function getTreeNodeByPath(tree: TreeNode, path: string, options?: TreePathOptions): unknown;
/**
 * 模拟 lodash.get, 但是没有默认值的参数
 * @param tree 树数据
 * @param path 路径
 */
export declare function getFromTree(tree: Tree, path: string | string[]): unknown;
/**
 * 模拟 lodash.set
 * @param tree 树数据
 * @param path 路径
 * @param value 要设置的值
 */
export declare function setToTree(tree: Tree, path: string | string[], value: unknown): Tree;
/**
 * 扁平化树结构
 * @param tree 树结构数据
 * @param keepChildrenField 是否保留 children 字段
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function flattenTree(tree: Tree, keepChildrenField?: boolean, options?: TreeNodeFieldAlias): TreeNode[];
/**
 * 遍历树数据
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param traverseType 遍历方式, 默认是广度优先
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function traverseTree(tree: Tree, callbackFn: (node: TreeNode) => void, traverseType?: TraverseType | string, options?: TreePathOptions): void;
/**
 * 遍历树数据, 如果有一个节点匹配, 则返回 true
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function someTree(tree: Tree, predicate: (node: TreeNode) => boolean, traverseType?: TraverseType | string, options?: TreePathOptions): boolean;
/**
 * 遍历树数据, 所有的节点都匹配, 则返回 true
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function everyTree(tree: Tree, predicate: (node: TreeNode) => boolean, traverseType?: TraverseType | string, options?: TreePathOptions): boolean;
/**
 * 查找树数据, 所有第一个匹配的节点
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式 breath|depth, 默认 breath (广度优先)
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function findOneInTree(tree: Tree, predicate: (node: TreeNode) => boolean, traverseType?: TraverseType | string, options?: TreePathOptions): TreeNode | null;
/**
 * 查找树数据, 返回所有匹配的数据
 * @param tree 树数据
 * @param predicate 遍历函数
 * @param traverseType 遍历方式 breath|depth, 默认 breath (广度优先)
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function findAllInTree(tree: Tree, predicate: (node: TreeNode) => boolean, traverseType?: TraverseType, options?: TreePathOptions): TreeNode[];
/**
 * 查找父节点
 * @param tree 树结构数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function findParentTreeNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): TreeNode | null;
/**
 * 获取目标节点所在兄弟节点中的索引
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function findIndexInSiblingNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): number;
/**
 * 获取所有兄弟节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function findSiblingNodes(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): any[];
/**
 * 遍历树类型数据, 并返回新的对象
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function mapTree(tree: Tree, callbackFn: (node: TreeNode) => TreeNode, options?: TreeNodeFieldAlias): Tree;
/**
 * 遍历树类型数据, 并返回新的对象
 * @param tree 树数据
 * @param callbackFn 遍历函数
 * @param parentNode 父级节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function mapTreeWithParent(tree: Tree, callbackFn: (node: TreeNode, parentNode: TreeNode | null | undefined) => TreeNode, parentNode?: TreeNode | null, options?: TreeNodeFieldAlias): Tree;
/**
 * 遍历树类型数据
 * @param tree
 * @param compareFn
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function sortTree(tree: Tree, compareFn: (a: TreeNode, b: TreeNode) => number, options?: TreeNodeFieldAlias): Tree;
/**
 * 替换树节点数据
 * @param tree 树类型数据
 * @param predicate 匹配的方法
 * @param replaceNode 要替换的值
 * @returns {[]}
 */
export declare function replaceTreeNode(tree: Tree, predicate: (node: TreeNode) => boolean, replaceNode: ((node: TreeNode) => TreeNode) | TreeNode): Tree;
/**
 * 删除空的 children 节点
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function removeEmptyChildrenTreeNode(tree: Tree, options?: TreeNodeFieldAlias): Tree;
/**
 * 统计所有节点的子节点的数量
 * @param tree 树类型数据
 * @param deep 是否统计所有子节点
 * @param statisticsKey 统计好的数字保存在哪个字段
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function statisticsTreeNodeChildren(tree: Tree, deep?: boolean, statisticsKey?: string, options?: TreeNodeFieldAlias): Tree;
/**
 * 向上查找所有父节点
 * @param tree 树数据
 * @param predicate 查找的节点的方法
 * @param isContainerTarget 是否包含匹配的节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function closestParentItemInTree(tree: Tree, predicate: (node: TreeNode) => boolean, isContainerTarget?: boolean, options?: TreeNodeFieldAlias): TreeNode[];
/**
 * 查找所有子节点
 * @param tree
 * @param predicate
 * @param options
 */
export declare function findAllChildrenInTree(tree: Tree, predicate: (node: TreeNode) => boolean, options?: TreeNodeFieldAlias): TreeNode[];
/**
 * 过滤树类型数据, 保留匹配节点的父级
 * @param tree 树数据
 * @param predicate 匹配的方法
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 * @returns {*}
 */
export declare function filterTree(tree: Tree, predicate: (node: TreeNode) => boolean, options?: TreeNodeFieldAlias): Tree;
/**
 * 过滤树类型数据, 保留匹配节点的父级. 遍历函数的第二个参数是父节点
 * @param tree 树数据
 * @param predicate 匹配的方法
 * @param parentNode 父节点
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 * @returns {*}
 */
export declare function filterTreeWithParentNode(tree: Tree, predicate: (node: TreeNode, parentNode: TreeNode | null | undefined) => boolean, parentNode?: TreeNode | null, options?: TreeNodeFieldAlias): Tree;
/**
 * 为没有父节点的树数据添加父节点
 * @param tree
 * @param options 别名配置, 默认值为 { idKey: 'id', parentIdKey: 'pId', childrenKey: 'children' }
 */
export declare function completionTreeNodePid(tree: Tree, options?: TreeNodeFieldAlias): Tree;
/**
 * 获取目标节点的右侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function getRightNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): TreeNode | null;
/**
 * 获取目标节点的所有右侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function getAllRightNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): TreeNode[];
/**
 * 获取目标节点的左侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function getLeftNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): TreeNode | null;
/**
 * 获取目标节点的所有左侧节点
 * @param tree 树数据
 * @param targetNode 目标节点
 * @param options 别名配置, 默认值为 { idKey: 'id', childrenKey: 'children' }
 */
export declare function getAllLeftNode(tree: Tree, targetNode: TreeNode, options?: TreeNodeFieldAlias): TreeNode[];
/**
 * 删除空的 children 节点
 *
 * @export
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function removeEmptyChildren(tree?: Tree, options?: TreeNodeFieldAlias): Tree;
/**
 * 获取树的深度
 * @param tree 树类型数据
 * @param options 别名配置, 默认值为 { childrenKey: 'children' }
 */
export declare function getTreeDepth(tree: Tree, options?: TreeNodeFieldAlias): number;
/**
 * 父节点影响子节点
 */
export declare function effectSubNode(tree: Tree | undefined, fieldName: string, fieldValue: any, effectObj?: {}, options?: TreeNodeFieldAlias): Tree;
/**
 * 子节点影响父节点
 */
export declare function effectParentNode(tree: Tree | undefined, fieldName: string, fieldValue: any, effectObj: Record<string, any>, options?: TreeNodeFieldAlias): Tree;

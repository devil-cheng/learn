# TreeSelector 岗位选择组件

## 使用方法

```jsx
<Form.Item>
    {form.getFieldDecorator('xxx', {
        initialValue: []
    })(<TreeSelector multiple manual />)}
</Form.Item>

// 或者
<TreeSelector onChange={handleOnChange} />
<TreeSelector value={value} onChange={handleOnChange} />

// 外部传入数据
<TreeSelector data={customData} />

// 如果需要排除掉某些数据
<TreeSelector data={customData} exclude={['id1', 'id2']} />

// 如果是非表单的场景, 需要自定义触发器, 可以添加 children
<TreeSelector data={customData} modal onChange={(value, obj) => {}}>
    <Button>Click me!</Button>
</TreeSelector>

<TreeSelector data={customData} manual modal onChange={(value, obj) => {}}>
    {(value, obj) => {
        <div>{value?.length}</div>
    }}
    <Button>Click me!</Button>
</TreeSelector>

// 不展示组件, 外部按钮手动展开弹框
const selectorRef = useRef();
<TreeSelector
    modal
    manual
    multiple
    ref={selectorRef}
    onChange={(val, obj) => {
        console.log(val, obj);
    }}
/>
<Button onClick={() => selectorRef.current.open(['默认值'])}>
    Click me
</Button>

// 禁用可以用 disabled
<TreeSelector disabled />

// 多选场景
<TreeSelector multiple />

// 如果要限制个数, 加 max
<TreeSelector multiple max={5} />

// 多选模式下, 通过 treeCheckStrictly 来区分选择的模式, 是否是严格模式(严格模式下, 父节点可被单独选中)
<TreeSelector multiple treeCheckStrictly />

// 弹框显示选择器
<TreeSelector modal />

// 弹框多选模式下支持:
// 自定义已选项的标题
<TreeSelector modal renderPreviewNodeTitle={(item) => <div>{item.title}</div>} />
// 分组展示
<TreeSelector modal isPreviewByGroup />
// 选择结果的排序方式 'asc' | 'desc'
<TreeSelector modal previewSortType="desc" />
```

## 参数

| Name                | Type        | Default | Description                                |
| :------------------ | :---------- | :------ | :----------------------------------------- |
| data                | array       | []      | 可选项数据                               |
| exclude             | array       | []      | 要排除掉的选项                               |
| showSearch          | bool        | true    | 是否显示搜索                               |
| multiple            | bool        | false   | 是否是多选                                 |
| disabled            | bool        | false   | 是否禁用组件                               |
| optionKeyProp       | bool        | 'id'    | 指定数据的 key 值对应字段, 默认是 id       |
| optionValueProp     | string      | 'id'    | 指定数据的 value 值对应字段, 默认是 id     |
| optionLabelProp     | bool        | 'title' | 指定数据的 title 值对应字段, 默认是 title  |
| optionPidProp       | string      | 'pId'   | 指定数据的 pId 值对应字段, 默认是 pId      |
| max                 | number/bool | false   | 可选的最大数量                             |
| renderTreeNodeTitle | fun         | -       | 自定义标题的渲染                           |
| treeCheckStrictly   | bool        | false   | 树节点选择策略是否是严格模式, 默认是 false |

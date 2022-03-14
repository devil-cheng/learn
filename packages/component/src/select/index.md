---
title: Select 选择器 🐤
group:
    title: 数据录入
    path: /components/data-entry
    order: 4
nav:
    title: 组件
    path: /components
---

# Select

## 说明

自定义 `Select` 组件, 实现搜索高亮功能, 并调整样式符合 VV-GMS-UI 规范  
目前的改造暂不支持`分组选项`功能

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/) 是更好的选择。


## 代码演示

<div class='waterfall'>
    <code src="./demos/basic.jsx"></code>
    <code src="./demos/bordered.jsx"></code>
    <code src="./demos/big-data.jsx"></code>
    <code src="./demos/multiple.jsx"></code>
    <code src="./demos/custom.jsx"></code>
    <code src="./demos/search.jsx"></code>
    <code src="./demos/tags.jsx"></code>
    <code src="./demos/size.jsx"></code>
    <code src="./demos/option-label-prop.jsx"></code>
    <code src="./demos/coordinate.jsx"></code>
    <code src="./demos/search-box.jsx"></code>
    <code src="./demos/search-sort.jsx"></code>
    <code src="./demos/label-in-value.jsx"></code>
    <code src="./demos/automatic-tokenization.jsx"></code>
    <code src="./demos/select-users.jsx"></code>
    <code src="./demos/suffix.jsx"></code>
    <code src="./demos/custom-tag-render.jsx"></code>
    <code src="./demos/custom-dropdown-menu.jsx"></code>
    <code src="./demos/hide-selected.jsx"></code>
    <code src="./demos/responsive.jsx"></code>
</div>

## API

| Name            | Type    | Default | Description                                 |
| :-------------- | :------ | :------ | :------------------------------------------ |
| highlightSearch | boolean | false   | 是否高亮搜索项, 默认是 false                |
| options         | array   | -       | 通过数组的形式注入数据                      |
| optionLabelProp | string  | 'label' | 通过数组注入数据时候, 指定 label 对应的字段 |
| optionValueProp | string  | 'value' | 通过数组注入数据时候, 指定 value 对应的字段 |

其他选项和 `antd` 的 `Select` 属性一致


| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false |  |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效 | boolean | true |  |
| autoFocus | 默认获取焦点 | boolean | false |  |
| bordered | 是否有边框 | boolean | true |  |
| clearIcon | 自定义的多选框清空图标 | ReactNode | - |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |  |
| defaultValue | 指定默认选中的条目 | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | - |  |
| disabled | 是否禁用 | boolean | false |  |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |  |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 | boolean \| number | true |  |
| dropdownRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - |  |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - |  |
| fieldNames | 自定义节点 label、key、options 的字段 | object | { label: `label`, key: `key`, options: `options` } | 4.17.0 |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | boolean \| function(inputValue, option) | true |  |
| filterSort | 搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction | (optionA: Option, optionB: Option) => number | - | 4.9.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式 | boolean | false |  |
| listHeight | 设置弹窗滚动高度 | number | 256 |  |
| loading | 加载中状态 | boolean | false |  |
| maxTagCount | 最多显示多少个 tag，响应式模式会对性能产生损耗 | number \| `responsive` | - | responsive: 4.10 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - |  |
| maxTagTextLength | 最大显示的 tag 文本长度 | number | - |  |
| menuItemSelectedIcon | 自定义多选时当前选中的条目图标 | ReactNode | - |  |
| mode | 设置 Select 的模式为多选或标签 | `multiple` \| `tags` | - |  |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` |  |
| open | 是否展开下拉菜单 | boolean | - |  |
| optionFilterProp | 搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。 | string | `value` |  |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。[示例](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | `children` |  |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - |  |
| placeholder | 选择框默认文本 | string | - |  |
| removeIcon | 自定义的多选框清除图标 | ReactNode | - |  |
| searchValue | 控制搜索文本 | string | - |  |
| showArrow | 是否显示下拉小箭头 | boolean | 单选为 true，多选为 false |  |
| showSearch | 使单选模式可搜索 | boolean | false |  |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - |  |
| tagRender | 自定义 tag 内容 render，仅在 `mode` 为 `multiple` 或 `tags` 时生效 | (props) => ReactNode | - |  |
| tokenSeparators | 在 `tags` 和 `multiple` 模式下自动分词的分隔符 | string\[] | - |  |
| value | 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新） | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | - |  |
| virtual | 设置 false 时关闭虚拟滚动 | boolean | true | 4.1.0 |
| onBlur | 失去焦点时回调 | function | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value, option:Option \| Array&lt;Option>) | - |  |
| onClear | 清除内容时回调 | function | - | 4.6.0 |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效 | function(string \| number \| LabeledValue) | - |  |
| onDropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - |  |
| onFocus | 获得焦点时回调 | function | - |  |
| onInputKeyDown | 按键按下时回调 | function | - |  |
| onMouseEnter | 鼠标移入时回调 | function | - |  |
| onMouseLeave | 鼠标移出时回调 | function | - |  |
| onPopupScroll | 下拉列表滚动时的回调 | function | - |  |
| onSearch | 文本框值变化时回调 | function(value: string) | - |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(string \| number \| LabeledValue, option: Option) | - |  |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentElement}` 将下拉弹层渲染节点固定在触发器的父元素中。

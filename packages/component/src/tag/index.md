---
title: Tag 标签 🐤
group:
    title: 数据展示
    path: /components/data-display
    order: 5
nav:
    title: 组件
    path: /components
---

# Tag 标签

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

<div class='waterfall'>
    <code src="./demos/basic.jsx"></code>
    <code src="./demos/colorful.jsx"></code>
    <code src="./demos/colorful-inverse.jsx"></code>
    <code src="./demos/control.jsx"></code>
    <code src="./demos/customize.jsx"></code>
    <code src="./demos/checkable.jsx"></code>
    <code src="./demos/hot-tags.jsx"></code>
    <code src="./demos/controlled.jsx"></code>
    <code src="./demos/animation.jsx"></code>
    <code src="./demos/icon.jsx"></code>
    <code src="./demos/status.jsx"></code>
</div>

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterClose | 关闭动画完成后的回调，请使用 `onClose`, 我们将在下个版本删除此项 | () => void | - |  |
| closable | 标签是否可以关闭 | boolean | false |  |
| onClose | 关闭时的回调 | (e) => void | - |  |
| visible | 是否显示标签 | boolean | `true` | 3.7.0 |
| size | 设置按钮大小，可选值为 small large 或者不设  | string | `default` | VV |
| color | antd默认功能，避免与下面俩属性一起用  | string |  |  |
| textColor | 标签字体颜色  | string |  | VV |
| bgColor | 标签背景颜色  | string |  | VV |
| border | 由于vv规范，tag不带边框，当有存在这个属性时，取color或textColor 的45%值  | boolean | false | VV |

### Tag.CheckableTag

| 参数     | 说明                 | 类型              | 默认值 | 版本 |
| -------- | -------------------- | ----------------- | ------ | ---- |
| checked  | 设置标签的选中状态   | boolean           | false  |      |
| onChange | 点击标签时触发的回调 | (checked) => void | -      |      |

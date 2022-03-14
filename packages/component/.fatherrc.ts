// const NpmImportPlugin = require('less-plugin-npm-import');

export default {
    esm: { type: 'babel', importLibToEs: true },
    cjs: 'rollup',
    disableTypeCheck: true,
    extractCSS: true
    // 在 babel 模式下做 less 编译，基于 gulp-less，默认不开启
    // 会编译成 css, 但是 less文件应该需要保留. 所以放弃这个方案
    // lessInBabelMode: {
    //   javascriptEnabled: true,
    //   plugins: [new NpmImportPlugin({ prefix: '~' })],
    // },
    // 开发阶段，如何配置 md 文件中的样式按需引入？ # https://d.umijs.org/zh-CN/guide/faq
    // extraBabelPlugins: [
    //   ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    // ],
};

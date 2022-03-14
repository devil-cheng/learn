// const NpmImportPlugin = require('less-plugin-npm-import');

export default {
    esm: { type: 'babel', importLibToEs: true },
    cjs: 'rollup',
    disableTypeCheck: true,
};

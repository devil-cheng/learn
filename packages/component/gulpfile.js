const cwd = process.cwd();
const path = require('path');
// const rimraf = require('rimraf');
const gulp = require('gulp');
const concat = require('gulp-concat');
const through2 = require('through2');
const transformLess = require('./scripts/transformLess.js');

const distDir = path.join(cwd, 'dist');

function compileLess() {
    // rimraf.sync(distDir); // 删除 dist 下的文件
    return gulp
        .src(['src/styles/index.less'])
        .pipe(
            through2.obj(function (file, encoding, next) {
                // if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
                transformLess(file.path) // 解决 ~antd 的路径找不到问题
                    .then(css => {
                        file.contents = Buffer.from(css);
                        file.path = file.path.replace(/\.less$/, '.css');
                        this.push(file);
                        next();
                    })
                    .catch(e => {
                        console.error(e);
                    });
                // } else {
                //   next();
                // }
            })
        )
        .pipe(concat('vv-design.css'))
        .pipe(gulp.dest(distDir));
}

gulp.task('default', done => {
    compileLess().on('finish', done);
});

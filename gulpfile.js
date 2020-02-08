const gulp = require('gulp')
const ejs = require('gulp-ejs')
const rename = require('gulp-rename')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')

const { camelCase } = require('camel-case')

const pkgConfig = require('./package')
const ejsConfig = require('./src/pluginConfig')

/**
 * 移除 dist 文件夹
 */
gulp.task('clean-dist', () => {
  return gulp.src('./dist')
    .pipe(rimraf())
})

/**
 * 渲染 ejs 文件
 */
gulp.task('render-ejs', () => {
  return gulp.src('./src/**/*.ejs')
    .pipe(ejs({
      pluginName: camelCase(pkgConfig.name),
      pkg: pkgConfig,
      data: ejsConfig,
    }))
    .pipe(rename({
      extname: '',
    }))
    .pipe(prettier({
      editorconfig: true,
    }))
    .pipe(gulp.dest('./dist'))
})


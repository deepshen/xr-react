const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const through2 = require('through2')

const path = {
  dest: {
    lib: 'lib',
    esm: 'esm',
    dist: 'dist'
  },
  styles: 'src/components/**/*.less',
  scripts:['src/components/**/*.{ts,tsx,js}']
}

function compileJs() {
  // commonjs
  const {dest,scripts} = path
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(gulp.dest(dest.lib))
}
function compileEsm() {
  // esm
  const {dest,scripts} = path
  process.env.BABEL_ENV = 'esm'
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(gulp.dest(dest.esm))
}

function compileStyle() {
  return gulp
    .src(path.styles)
    .pipe(gulp.dest(path.dest.lib))
    .pipe(gulp.dest(path.dest.esm))
}

function compile2css() {
  return gulp
    .src(path.styles)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssnano({zindex: false,reduceIdents: false}))
    .pipe(gulp.dest(path.dest.lib))
    .pipe(gulp.dest(path.dest.esm))
}

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, '/style/css')
    .replace(/\/style\/?"/g, 'style.css')
    .replace(/\.less/g,'.css')
}
function compileScripts() {
  return gulp
    .src(path.scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function (file,encodeing,next) {
        this.push(file.clone())
        if(file.path.match(/(\/|\\)style(\/|\\)index.jsx/)){
          const content = file.contents.toString(encodeing)
          file.contents = Buffer.from(cssInjection(content))
          file.path = file.path.replace(/index\.js/,'css.js')
          this.push(file)
          next()
        }else {
          next()
        }
      })
    )
    .pipe(gulp.dest(path.dest.lib))
    .pipe(gulp.dest(path.dest.esm))
}

const build = gulp.series(compileJs,compileEsm)
const buildRun = gulp.parallel(build,compileStyle,compile2css, compileScripts)

exports.build = buildRun

exports.default = buildRun

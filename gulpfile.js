const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

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

const build = gulp.series(compileJs,compileEsm)
const buildRun = gulp.parallel(build,compileStyle,compile2css)

exports.build = buildRun

exports.default = buildRun

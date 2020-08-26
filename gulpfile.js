const gulp = require('gulp')
const babel = require('gulp-babel')

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
  const {dest,scripts} = path
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(gulp.dest(dest.lib))
}

const build = gulp.parallel(compileJs)

exports.build = build

exports.default = build

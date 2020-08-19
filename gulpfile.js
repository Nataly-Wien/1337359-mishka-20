const gulp = require('gulp');
const plumber = require('gulp-plumber');
const htmlValidator = require('gulp-w3c-html-validator');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const sync = require("browser-sync").create();

const path = {
  src: {
    html: 'source/*.html',
    css: 'source/sass/style.scss',
    fonts: 'source/fonts/**/*',
    img: 'source/img/*.*',
    js: 'source/js/**',
    favicon: 'source/*.ico'
  },
  dest: {
    html: 'build',
    css: 'build/css',
    img: 'build/img'
  },
  watch: {
    scss: 'source/sass/**/*.scss',
    html: 'source/*.html',
    js: 'source/js/**/*.js'
  },
  basedir: 'build'
}

const html = () => {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(htmlValidator())
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
}

exports.html = html;

const styles = () => {
  return gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.dest.css))
    .pipe(sync.stream())
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.dest.css))
    .pipe(sync.stream());
}

exports.styles = styles;

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img/result'));
}

exports.images = images;

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.dest.img));
}

exports.sprite = sprite;

const webps = () => {
  return gulp.src('source/img/**/*.jpg')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
}

exports.webp = webps;

const clean = () => {
  return del('build');
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    'source/fonts/**',
    'source/img/*.*',
    'source/js/**',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

exports.copy = copy;

const build = gulp.series(
  clean,
  copy,
  styles,
  sprite,
  html
);

exports.build = build;

const server = (done) => {
  sync.init({
    server: {
      baseDir: path.basedir
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const watcher = () => {
  gulp.watch(path.watch.scss, gulp.series(styles));
  gulp.watch(path.watch.html, gulp.series(html));
}

exports.watcher = watcher;

exports.default = gulp.series(
  build,
  server,
  watcher
);

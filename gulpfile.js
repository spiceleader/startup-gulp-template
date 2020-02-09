'use strict';

// Plug in Modules

// Gulp Modules
const
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  del = require('del'),
  path = require('path'),

  // CSS Modules
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('gulp-autoprefixer'),

  // JS Modules
  babel = require('gulp-babel'),
  terser = require('gulp-terser'),

  // Image Modules
  imagemin = require('gulp-imagemin'),
  webp = require('imagemin-webp'),
  svgstore = require('gulp-svgstore'),

  // Font Modules
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),

  // Other
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  sourcemap = require('gulp-sourcemaps'),
  htmlmin = require('gulp-htmlmin');

// Gulp Tasks

// Custom Styles
gulp.task('styles', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 10 versions']
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function () {
  return gulp.src([
    // 'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
    'source/js/**/*.js', // JS libraries
    'node_modules/picturefill/dist/picturefill.min.js', //
    'node_modules/svg4everybody/dist/svg4everybody.min.js',
    'node_modules/@babel/polyfill/dist/polyfill.min.js',
    'source/js/main.js', // Custom scripts. Always at the end
  ])
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(terser()) // Minify js (opt.)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({ stream: true }))
});

// Images
// Responsive Images
var quality = 90; // Responsive images quality

// Image Optimization
gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(newer('build/img/'))
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ quality: quality, progressive: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeTitle: true },
          { cleanupNumericValues: { floatPrecision: 1 } }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

// Converting images to WebP
gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(newer('build/img/'))
    .pipe(imagemin([
      webp({ quality: quality })
    ]))
    .pipe(gulp.dest('source/img'));

  // return gulp.src('source/img/*.{jpg,png}')
  //   .pipe(newer('build/img/'))
  //   .pipe(webp({ quality: quality }))
  //   .pipe(gulp.dest('build/img'));
});

// SVG Sprite
gulp.task('svgsprite', function () {
  return gulp
    .src('source/img/for-sprite/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeTitle: true },
          { cleanupNumericValues: { floatPrecision: 1 } }
        ]
      })
    ]))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

// Clean Images
gulp.task('cleanimg', function () {
  return del(['build/img'], { force: true })
});

// Font Modules
// Font Converter
gulp.task('fonts', function () {
  gulp.src('source/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(ttf2woff2())
    .pipe(gulp.dest('build/fonts/'))
});

// Optimizing HTML
gulp.task('html', function () {
  return gulp.src('source/**/*.html')
    .pipe(newer('build/'))
    .pipe(htmlmin({
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('build/'))
});

// Deleting 'build' folder
gulp.task("clean", function () {
  return del("build");
});

// Deploy
gulp.task('rsync', function () {
  return gulp.src('app/')
    .pipe(rsync({
      root: 'app/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // include: ['*.htaccess'], // Included files
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
      recursive: true,
      archive: true,
      silent: false,
      compress: true
    }))
});

// Local Server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: 'build/'
    },
    notify: false,
    open: true,
    cors: true,
    ui: false,
    reloadOnRestart: true,
    // online: false, // Work offline without internet connection
    // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
  });

  done();
});

// Watching files
gulp.task('watch', function () {
  watch('source/*.html').on('all', series('html', browserSync.reload));
  watch('source/fonts/**/*.{ttf,woff,woff2}').on('all', series('fonts', browserSync.reload));
  watch('source/js/**/*.js').on('all', series('scripts', browserSync.reload));
  watch('source/sass/**/*.{sass,scss}').on('all', series('styles'));
  watch('source/**/*.{jpg,png,svg}').on('all', series('images', browserSync.reload));
  watch('source/img/for-sprite/**/*.svg').on('all', series('svgsprite', browserSync.reload));
  watch('source/img/content').on('all', series('webp', browserSync.reload));
});

// Building project
gulp.task('build', series('clean', parallel('fonts', 'html', 'styles', 'scripts', 'images', 'webp', 'svgsprite')));

// Building project in dev mode and starting local server
gulp.task('default', gulp.series('build', 'server', 'watch'));

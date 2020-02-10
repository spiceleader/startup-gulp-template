'use strict';

// Plug in Modules

// Gulp Modules
const
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  del = require('del'),

  // CSS Modules
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),

  // JS Modules
  babel = require('gulp-babel'),
  terser = require('gulp-terser'),

  // Image Modules
  imagemin = require('gulp-imagemin'),
  jpegoptim = require('imagemin-jpegoptim'),
  webp = require('gulp-webp'),
  svgstore = require('gulp-svgstore'),

  // Font Modules
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),

  // Other
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  sourcemap = require('gulp-sourcemaps'),
  lintspaces = require('gulp-lintspaces'),
  htmlmin = require('gulp-htmlmin'),
  zip = require('gulp-zip'),
  gulpif = require('gulp-if');

// Gulp Tasks

// Defining enviroment
const isDev = !process.env.NODE_ENV;
const isProd = !!process.env.NODE_ENV;

// Custom Styles
gulp.task('styles', function () {
  return gulp.src('./source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ grid: true })
    ]))
    .pipe(gulp.dest('./build/css'))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(isDev, sourcemap.write('.')))
    .pipe(gulp.dest('./build/css'))
    .pipe(gulpif(isDev, browserSync.stream()));
});

// Scripts & JS Libraries
gulp.task('scripts', function () {
  return gulp.src([
    './source/js/**/*.js', // JS libraries
    './source/js/main.js', // Custom scripts. Always at the end
  ])
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(terser()) // Minify js (opt.)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(isDev, sourcemap.write('.')))
    .pipe(gulp.dest('./build/js'));
});

// Images
// Responsive Images
var quality = 80; // Responsive images quality

// Image Optimization
gulp.task('images', function () {
  return gulp.src('./source/img/**/*.{png,jpg,svg}')
    .pipe(newer('./build/img/'))
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      jpegoptim({ quality: quality, progressive: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeTitle: true },
          { cleanupNumericValues: { floatPrecision: 1 } }
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img'));
});

// Converting images to WebP
gulp.task('webp', function () {
  return gulp.src('./source/img/content/**/*.{jpg,png}')
    .pipe(newer('./build/img/content'))
    .pipe(webp({ quality: quality }))
    .pipe(gulp.dest('./build/img/content'));
});

// SVG Sprite
gulp.task('svgsprite', function () {
  return gulp.src('./source/img/icons/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeTitle: true },
          { removeAttrs: { attrs: '(stroke|fill)' } },
          { cleanupNumericValues: { floatPrecision: 1 } }
        ]
      })
    ]))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/img'));
});

// Clean Images
gulp.task('cleanimg', function () {
  return del(['./build/img'], { force: true });
});

// Font Modules
// Font Converter
gulp.task('fonts', function () {
  return gulp.src('./source/fonts/**/*.ttf')
    .pipe(newer('./build/fonts/'))
    .pipe(ttf2woff())
    .pipe(gulp.dest('./build/fonts/'))
    .pipe(gulp.src('./source/fonts/**/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./build/fonts/'));
});

// Coping fonts
gulp.task('copyfonts', function () {
  return gulp.src('./source/fonts/**/*.{woff,woff2}')
    .pipe(newer('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'));
});

// Optimizing HTML
gulp.task('html', function () {
  return gulp.src('./source/**/*.html')
    .pipe(newer('./build/'))
    .pipe(gulpif(isProd,
      htmlmin({
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true
      })
    ))
    .pipe(gulp.dest('./build/'));
});

// Defining Vendor Files Paths
const vendorFiles = {
  scripts: [
    // './node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
    // './node_modules/bootstrap/dist/bootstrap.min.js', // Optional Bootstrap plug-in (npm i --save-dev bootstrap)
    './node_modules/picturefill/dist/picturefill.min.js',
    './node_modules/svg4everybody/dist/svg4everybody.min.js',
    './node_modules/@babel/polyfill/dist/polyfill.min.js',
  ],
  styles: [
    // './node_modules/bootstrap/dist/bootstrap.min.css', // Optional Bootstrap plug-in (npm i --save-dev bootstrap)
    './node_modules/normalize.css/normalize.css'
  ]
};

// Copying Vendor Scripts
gulp.task('vendorscripts', function () {
  return gulp.src(vendorFiles.scripts)
    .pipe(newer('./build/js'))
    .pipe(gulp.dest('./build/js'));
});

// Copying Vendor Styles
gulp.task('vendorstyles', function () {
  return gulp.src(vendorFiles.styles)
    .pipe(newer('./build/css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'));
});

// Deleting 'build' folder
gulp.task('clean', function () {
  return del('./build');
});

// Local Server
gulp.task('server', function (done) {
  browserSync.init({
    server: {
      baseDir: './build/'
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

// Achieving project
const leadingZero = number => number < 10 ? `0${number}` : number;

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = leadingZero(now.getMonth() + 1);
  const day = leadingZero(now.getDate());
  const hours = leadingZero(now.getHours());
  const minutes = leadingZero(now.getMinutes());
  const seconds = leadingZero(now.getSeconds());

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
};

gulp.task('zip', function () {
  let dateTime = getDateTime();
  let fileName = `dist-${dateTime}.zip`;

  return gulp.src('./build/**/*.*')
    .pipe(zip(fileName))
    .pipe(gulp.dest('./dist'));
});

// Linting according to editorconfig
gulp.task('lintspaces', function () {
  return gulp.src([
    '*.json',
    '*.md',
    './gulpfile.js',
    './source/*.html',
    './source/js/**/*.js',
    './source/img/**/*.svg',
    './source/sass/**/*.{scss,sass}'
  ])
    .pipe(lintspaces({ editorconfig: '.editorconfig' }))
    .pipe(lintspaces.reporter());
});

// Watching files
gulp.task('watch', function () {
  gulp.watch('./source/*.html').on('all', gulp.series('html', browserSync.reload));
  gulp.watch('./source/fonts/**/*.{ttf,woff,woff2}').on('all', gulp.series('fonts', 'copyfonts', browserSync.reload));
  gulp.watch('./source/js/**/*.js').on('all', gulp.series('scripts', browserSync.reload));
  gulp.watch('./source/sass/**/*.{sass,scss}').on('all', gulp.series('styles'));
  gulp.watch('./source/img/**/*.{jpg,png,svg}').on('all', gulp.series('images', browserSync.reload));
  gulp.watch('./source/img/icons/**/*.svg').on('all', gulp.series('svgsprite', browserSync.reload));
  gulp.watch('./source/img/content/**/*.{png,jpg}').on('all', gulp.series('webp', browserSync.reload));
});

// Building project
gulp.task('build', gulp.series('clean', gulp.parallel('fonts', 'copyfonts', 'html', 'vendorstyles', 'styles', 'vendorscripts', 'scripts', 'images', 'webp', 'svgsprite')));

// Building project in dev mode and starting local server
gulp.task('default', gulp.series('build', 'server', 'watch'));

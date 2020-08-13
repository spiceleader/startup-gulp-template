'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').get('Local Server');

const isDev = !process.env.NODE_ENV;

const styles = () => {
  const sassOptions = {
    outputStyle: 'expanded',
    sourceComments: true,
    includePaths: ['.']
  };
  const postCssPlugins = [autoprefixer()];
  const cssoOptions = {
    forceMediaMerge: true,
    comments: false
  };

  return src(`${source.styles}style.{scss,sass}`, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass(sassOptions)).on('error', sass.logError)
    .pipe(postcss(postCssPlugins))
    .pipe(csso(cssoOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(destination.styles, { sourcemaps: true }), dest(destination.styles)))
    .pipe(gulpIf(isDev, browserSync.stream()));
};

module.exports = styles;

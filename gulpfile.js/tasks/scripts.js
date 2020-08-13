'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV;

const scripts = () =>
  src([
    `${source.scripts}libs/**/*.js`,
    `${source.scripts}utils/**/*.js`,
    `${source.scripts}modules/**/*.js`,
    `${source.scripts}**/*.js`,
    `${source.scripts}main.js`], { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(destination.scripts, { sourcemaps: true }), dest(destination.scripts)));

module.exports = scripts;

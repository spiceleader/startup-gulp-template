import {paths} from '../paths.js';
import pkg from 'gulp';
import gulpIf from 'gulp-if';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

const {source, destination} = paths;
const {src, dest} = pkg;
const isDev = !process.env.NODE_ENV;

export const scripts = () =>
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

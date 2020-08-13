'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const convertfonts = done => {
  src(`${source.fonts}**/*.ttf`)
    .pipe(ttf2woff())
    .pipe(dest(destination.fonts));
  src(`${source.fonts}**/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(dest(destination.fonts));

  done();
};


module.exports = convertfonts;

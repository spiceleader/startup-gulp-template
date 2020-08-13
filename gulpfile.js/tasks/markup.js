'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');

const markup = () => {
  const htmlminOptions = {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true
  };

  return src(`${source.root}*.html`)
    .pipe(changed(destination.root))
    .pipe(htmlmin(htmlminOptions))
    .pipe(dest(destination.root));
};

module.exports = markup;

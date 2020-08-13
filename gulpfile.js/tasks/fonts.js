'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');

const fonts = () =>
  src(`${source.fonts}**/*.{woff,woff2}`)
    .pipe(changed(destination.fonts))
    .pipe(dest(destination.fonts));

module.exports = fonts;

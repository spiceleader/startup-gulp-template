'use strict';

const { paths: { vendor, destination } } = require('../paths');
const { src, dest } = require('gulp');

const copy = () =>
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));

module.exports = copy;

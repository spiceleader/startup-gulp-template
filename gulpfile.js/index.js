'use strict';

const dir = require('require-dir')('./tasks');
const { clean, convertfonts, fonts, markup, images, styles, scripts, webp, icons, copy } = dir;
const { zip, lintspaces, server, watcher } = dir;

const { series, parallel } = require('gulp');

const build = series(
  clean,
  convertfonts,
  parallel(copy, fonts, markup, styles, scripts, images, webp, icons)
);

exports.zip = series(zip);
exports.lintspaces = series(lintspaces);
exports.build = build;
exports.default = series(build, server, watcher);

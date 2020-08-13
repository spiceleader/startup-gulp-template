'use strict';

const { paths: { source, destination } } = require('../paths');
const { images: { quality } } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

const images = () => {
  const svgoPlugins = [
    { removeViewBox: false },
    { removeTitle: true },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  const imageminPlugins = [
    imagemin.optipng(),
    imageminJpegoptim({ max: quality, progressive: true }),
    imagemin.svgo({
      plugins: svgoPlugins
    })
  ];

  return src([
    `${source.images.all}**/*.{jpeg,jpg,png,svg}`,
    `!${source.images.icons}**/*.{jpeg,jpg,png,svg}`
  ])
    .pipe(changed(destination.images.all))
    .pipe(imagemin(imageminPlugins))
    .pipe(dest(destination.images.all));
};

module.exports = images;

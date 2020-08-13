'use strict';

const { paths: { source, destination } } = require('../paths');
const { icons: { sprite } } = require('../settings');
const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

// Сборка SVG спрайта
const icons = done => {
  if (!sprite) return done();

  const svgoPlugins = [
    { removeViewBox: false },
    { removeTitle: true },
    { removeAttrs: { attrs: '(stroke|fill)' } },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  const pluginsImagemin = [imagemin.svgo({ plugins: svgoPlugins })];

  return src(`${source.images.icons}**/*.svg`)
    .pipe(imagemin(pluginsImagemin))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(dest(destination.images.all));
};

module.exports = icons;

'use strict';

const { paths: { source, destination } } = require('../paths');
const { images } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const gulpWebp = require('gulp-webp');

// Конвертация контентных изображений в формат WebP
const webp = done => {
  if (!images.webp) return done();

  return src(`${source.images.content}**/*.{jpg,jpeg,png}`)
    .pipe(changed(destination.images.content, { extension: '.webp' }))
    .pipe(gulpWebp({ quality: images.quality }))
    .pipe(dest(destination.images.content));
};

module.exports = webp;

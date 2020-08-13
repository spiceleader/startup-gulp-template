'use strict';

const { paths: { source } } = require('../paths');
const { series, watch } = require('gulp');
const browserSync = require('browser-sync').get('Local Server');
const dir = require('require-dir')('.');

const { fonts, convertfonts, markup, styles, scripts, images, webp, icons } = dir;

const watcher = () => {
  watch(`${source.root}*.html`)
    .on('all', series(markup, browserSync.reload));
  watch(`${source.fonts}**/*.ttf`)
    .on('all', series(convertfonts, browserSync.reload));
  watch(`${source.fonts}**/*.{woff,woff2}`)
    .on('all', series(fonts, browserSync.reload));
  watch(`${source.styles}**/*.{scss,sass}`)
    .on('all', series(styles));
  watch(`${source.scripts}**/*.js`)
    .on('all', series(scripts, browserSync.reload));
  watch(`${source.images.icons}**/*.svg`)
    .on('all', series(icons, browserSync.reload));
  watch(`${source.images.content}**/*.{jpg,jpeg}`)
    .on('all', series(webp, browserSync.reload));
  watch([
    `${source.images.all}**/*.{jpeg,jpg,png,svg}`,
    `!${source.images.icons}**/*.{jpeg,jpg,png,svg}`
  ])
    .on('all', series(images, browserSync.reload));
};

module.exports = watcher;

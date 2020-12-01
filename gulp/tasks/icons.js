import {paths} from '../paths.js';
import pkg from 'gulp';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import svgstore from 'gulp-svgstore';

const {source, destination} = paths;
const {src, dest} = pkg;

export const icons = (done) => {
  const svgoPlugins = [
    { removeViewBox: false },
    { removeTitle: true },
    { removeAttrs: { attrs: '(stroke|fill)' } },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  const pluginsImagemin = [imagemin.svgo({ plugins: svgoPlugins })];

  src(`${source.images.icons}**/*.svg`)
    .pipe(imagemin(pluginsImagemin))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(dest(destination.images.all));

  done();
};

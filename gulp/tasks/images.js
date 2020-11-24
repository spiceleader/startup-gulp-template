import {paths} from '../paths.js';
import {settings} from '../settings.js';
import pkg from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminJpegoptim from 'imagemin-jpegoptim';

const {source, destination} = paths;
const {images: {quality}} = settings;
const {src, dest} = pkg;

export const images = () => {
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

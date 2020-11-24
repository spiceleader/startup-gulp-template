import {paths} from '../paths.js';
import {settings} from '../settings.js';
import pkg from 'gulp';
import changed from 'gulp-changed';
import gulpWebp from 'gulp-webp';

const {source, destination} = paths;
const {images} = settings;
const {src, dest} = pkg;

export const webp = (done) => {
  if (!images.webp) return done();

  return src(`${source.images.content}**/*.{jpg,jpeg,png}`)
    .pipe(changed(destination.images.content, { extension: '.webp' }))
    .pipe(gulpWebp({ quality: images.quality }))
    .pipe(dest(destination.images.content));
};

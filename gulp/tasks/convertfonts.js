import {paths} from '../paths.js';
import pkg from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const {source, destination} = paths;
const {src, dest} = pkg;

export const convertfonts = (done) => {
  src(`${source.fonts}**/*.ttf`)
    .pipe(ttf2woff())
    .pipe(dest(destination.fonts));
  src(`${source.fonts}**/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(dest(destination.fonts));

  done();
};

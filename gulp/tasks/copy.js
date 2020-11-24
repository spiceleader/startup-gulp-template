import {paths} from '../paths.js';
import pkg from 'gulp';

const {vendor, destination} = paths;
const {src, dest} = pkg;

export const copy = () =>
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));

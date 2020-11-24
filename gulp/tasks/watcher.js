import {paths} from '../paths.js';
import {fonts} from './fonts.js';
import {convertfonts} from './convertfonts.js';
import {markup} from './markup.js';
import {styles} from './styles.js';
import {scripts} from './scripts.js';
import {images} from './images.js';
import {webp} from './webp.js';
import {icons} from './icons.js';
import browserSync from 'browser-sync';
import pkg from 'gulp';

const {source} = paths;
const {watch, series} = pkg;

export const watcher = () => {
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

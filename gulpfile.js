import {clean} from './gulp/tasks/clean.js';
import {convertfonts} from './gulp/tasks/convertfonts.js';
import {copy} from './gulp/tasks/copy.js';
import {fonts} from './gulp/tasks/fonts.js';
import {icons} from './gulp/tasks/icons.js';
import {images} from './gulp/tasks/images.js';
import {lintspaces as lintspacesTask} from './gulp/tasks/lintspaces.js';
import {markup} from './gulp/tasks/markup.js';
import {scripts} from './gulp/tasks/scripts.js';
import {server} from './gulp/tasks/server.js';
import {styles} from './gulp/tasks/styles.js';
import {watcher} from './gulp/tasks/watcher.js';
import {webp} from './gulp/tasks/webp.js';
import {zip as zipTask} from './gulp/tasks/zip.js';
import pkg from 'gulp';

const {series, parallel} = pkg;

export const build = series(
  clean,
  convertfonts,
  parallel(copy, fonts, markup, styles, scripts, images, webp, icons)
);

export const zip = series(zipTask);
export const lintspaces = series(lintspacesTask);
export default series(build, server, watcher);

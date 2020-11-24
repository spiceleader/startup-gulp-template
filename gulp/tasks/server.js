import {paths} from '../paths.js';
import browserSync from 'browser-sync';

export const server = (done) => {
  browserSync.init({
    server: paths.destination.root,
    cors: true,
    open: true,
    notify: false,
    ui: false,
    reloadOnRestart: true,
    port: 1337,
    // online: false, // Work offline without internet connection
    // tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
  });

  done();
};

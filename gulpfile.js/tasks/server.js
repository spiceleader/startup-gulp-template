'use strict';

const { paths: { destination } } = require('../paths');
const browserSync = require('browser-sync').create('Local Server');

const server = done => {
  browserSync.init({
    server: destination.root,
    cors: true,
    open: true,
    notify: false,
    ui: false,
    reloadOnRestart: true,
    // online: false, // Work offline without internet connection
    // tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
  });

  done();
};

module.exports = server;

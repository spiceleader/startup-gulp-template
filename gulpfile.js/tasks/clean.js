'use strict';

const { paths: { destination } } = require('../paths');
const del = require('del');

const clean = () => del(destination.root);

module.exports = clean;

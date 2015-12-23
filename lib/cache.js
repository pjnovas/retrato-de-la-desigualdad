
const debug = require('debug')('retrato-de-la-desigualdad:cache');

import fs from 'fs-extra';
import path from 'path';

const cachePath = path.resolve('./cache');
debug('Using cache dir: ' + cachePath);

const getters = {
  sections: (data, done) => {
    fs.readJson(cachePath + '/sections.json', function (err, sections) {
      if (err && err.code === 'ENOENT'){
        return done(null, null);
      }

      done(err, sections);
    });
  },
  articles: (data, done) => {

  },
};

const setters = {
  sections: (data, done) => {
    fs.writeJson(cachePath + '/sections.json', data, { spaces: 2 }, done);
  },
  articles: (data, done) => {

  },
};

const clear = () => {

};

export default {
  get: (type, data, done) => {
    getters[type](data, done);
  },
  set: (type, data, done) => {
    setters[type](data, done);
  },
  clear
};

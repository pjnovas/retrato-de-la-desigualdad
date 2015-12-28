
const debug = require('debug')('retrato-de-la-desigualdad:cache');

import fs from 'fs-extra';
import path from 'path';
import async from 'async';

const cachePath = path.resolve('./cache');
debug(`Using cache dir ${cachePath}`);

const getters = {
  sections: (data, done) => {
    fs.readJson(`${cachePath}/sections.json`, (err, sections) => {
      if (err && err.code === 'ENOENT'){
        return done(null, null);
      }

      done(err, sections);
    });
  },
  articles: (data, done) => {
    fs.readJson(`${cachePath}/articles_${data.section}.json`,
      (err, articles) => {
        if (err && err.code === 'ENOENT'){
          return done(null, null);
        }

        done(err, articles);
    });
  },
};

const setters = {
  sections: (data, done) => {
    fs.writeJson(`${cachePath}/sections.json`, data, { spaces: 2 }, done);
  },
  articles: (data, done) => {
    fs.writeJson(`${cachePath}/articles_${data.section}.json`,
      data.articles, { spaces: 2 }, done);
  },
};

const clear = (done) => {
  fs.readdir(`${cachePath}`, (err, files) => {
    console.dir(files);
    async.parallel(
      files.map( file => {
        return function(_done){
          if (file.indexOf('.json') > -1){
            return fs.remove(`${cachePath}/${file}`, _done);
          }

          done();
        };
      })
    , done);

  });
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

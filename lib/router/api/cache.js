const debug = require('debug')('retrato-de-la-desigualdad:router');

import { get, set, clear } from 'lib/cache';

const checkError = (err, res) => {
  if (err){
    debug('Cache Access Error > ');
    debug(err);

    if (res){
      res.sendStatus(500);
    }

    return true;
  }

  return false;
};

const getSections = (req, res, next) => {
  debug('cache getSections() > START');
  get('sections', null, (err, sections) => {
    debug('cache getSections() > END');
    if (checkError(err, res)) return;
    if (!sections || sections.length === 0){
      return next();
    }

    res.send(sections);
  });
};

const setSections = (req, res, next) => {
  debug('cache setSections() > START');
  set('sections', req.sections, err => {
    debug('cache setSections() > END');
    checkError(err);
    next();
  });
};

export default {
  getSections,
  setSections
};

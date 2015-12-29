const debug = require('debug')('retrato-de-la-desigualdad:router');

import { get, set, clear } from 'lib/cache';
import { buildSections, buildArticles } from './controller';

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

    req.sections = sections;
    res.send(buildSections(req));
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

const getArticles = (req, res, next) => {
  debug('cache getArticles() > START');
  get('articles', {
    section: req.params.section
  }, (err, articles) => {
    debug('cache getArticles() > END');
    if (checkError(err, res)) return;
    if (!articles || articles.length === 0){
      return next();
    }

    req.articles = articles;
    res.send(buildArticles(req));
  });
};

const setArticles = (req, res, next) => {
  debug('cache setArticles() > START');
  set('articles', {
    section: req.params.section,
    articles: req.articles
  }, err => {
    debug('cache setArticles() > END');
    checkError(err);
    next();
  });
};

export default {
  getSections,
  setSections,
  getArticles,
  setArticles
};

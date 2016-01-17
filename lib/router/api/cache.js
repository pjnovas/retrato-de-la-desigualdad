const debug = require('debug')('retrato-de-la-desigualdad:router');

import { get, set } from 'lib/cache';
import { buildArticles } from './controller';

import data from 'data.json';

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

const getArticles = (req, res, next) => {
  debug('cache getArticles() > START');

  if (!data.hasOwnProperty(req.params.section)){
    debug('Cache Access NotFound > ' + req.params.section);
    res.sendStatus(404);
    return;
  }

  let section = data[req.params.section].section;

  get('articles', { section }, (err, articles) => {
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

  let section = data[req.params.section].section;

  set('articles', { section, articles: req.articles }, err => {
    debug('cache setArticles() > END');
    checkError(err);
    next();
  });
};

export default {
  getArticles,
  setArticles
};

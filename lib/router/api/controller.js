const debug = require('debug')('retrato-de-la-desigualdad:router');
import superagent from 'superagent';
import async from 'async';

import {
  baseURL,
  apiPath,
  imagePath,
  publication,
  issue,
  language
} from 'config.json';

const apiURL = baseURL + apiPath;
const imageURL = baseURL + imagePath;

const checkError = (err, res) => {
  if (err){
    debug('API Controller Error > ');
    debug(err);

    if (res){
      res.sendStatus(500);
    }

    return true;
  }

  return false;
};

const fetchSections = (req, res, next) => {
  debug('fetchSections() > START');

  superagent
    .get(`${apiURL}sections.json`)
    .query({
      access_token: req.auth.access_token,
      publication,
      issue
    })
    .end((err, _res) => {
      debug('fetchSections() > END');
      if (checkError(err, res)) return;
      req.sections = mapSections(_res.body.items);
      next();
    });
};

const fetchArticles = (req, res, next) => {
  debug('fetchArticles() > START');

  superagent
    .get(`${apiURL}search/articles.json`)
    .query({
      access_token: req.auth.access_token,
      publication,
      issue,
      section: parseInt(req.params.section, 10)
    })
    .end((err, _res) => {
      debug('fetchArticles() > END');
      if (checkError(err, res)) return;
      req.articles = mapArticles(_res.body.items);
      next();
    });
};

const fetchArticlesImages = (req, res, next) => {
  debug('fetchArticlesImages() > START');

  let fetchers = req.articles.map( article => {
    return function(done){
      superagent
        .get(`${apiURL}articles/${article.number}/${language}/images.json`)
        .query({ access_token: req.auth.access_token })
        .end( (err, _res) => done(err, _res.body.items));
    };
  });

  async.parallel(fetchers, (err, result) => {
    debug('fetchArticlesImages() > END');
    if (checkError(err)) return next();

    req.articles.forEach( (article, i) => {

      article.images = result[i].map( img => {
        img.url = imageURL + img.basename;
        return img;
      });
    });

    next();
  });

};

const mapSections = sections => {
  return sections.map(section => {
    return {
      number: section.number,
      title: section.title
    };
  });
};

const mapArticles = articles => {
  return articles.map(article => {
    return {
      number: article.number,
      title: article.title,
      subtitle: article.fields.Antetitulo,
      body: article.fields.Full_text,
      updated: article.updated,
      created: article.created,
      published: article.published
    };
  });
};

export default {
  fetchSections,
  fetchArticles,
  fetchArticlesImages
};

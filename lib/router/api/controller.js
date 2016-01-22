const debug = require('debug')('retrato-de-la-desigualdad:router');
import superagent from 'superagent';
import async from 'async';

import {
  baseURL,
  apiPath,
  imagePath,
  publication,
  issue,
  language,
  itemsPerPage as items_per_page
} from 'config.json';

import data from 'data.json';

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

const fetchArticles = (req, res, next) => {
  debug('fetchArticles() > START');

  if (!data.hasOwnProperty(req.params.section)){
    debug('fetchArticles() > NotFound > ' + req.params.section);
    res.sendStatus(404);
    return;
  }

  let section = parseInt(data[req.params.section].section, 10);

  superagent
    .get(`${apiURL}search/articles.json`)
    .query({
      access_token: req.auth.access_token,
      publication,
      issue,
      section,
      items_per_page
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

  if (!data[req.params.section].useImages){
    debug('fetchArticlesImages() > END [NO IMAGES]');
    return next();
  }

  //TODO: Fetch Picture by parts so GET won't fail

  let fetchers = req.articles.map( article => {
    return function(done){
      superagent
        .get(`${apiURL}articles/${article.number}/${language}/images.json`)
        .query({ access_token: req.auth.access_token })
        .end( (err, _res) => {
          if (err){
            debug('fetchArticlesImages() > ERROR > Article Number: ' + article.number);
            debug(err);
            return done();
          }

          article.images = _res.body.items.map( img => {
            img.url = imageURL + img.basename;
            return img;
          });

          done();
        });
    };
  });

  async.parallel(fetchers, (err, result) => {
    debug('fetchArticlesImages() > END');
    next();
  });

};

const createMetaData = article => {
  const metaStart = "[#meta]";
  const metaEnd = "[/meta]";

  let body = article.body;

  let len = metaStart.length;

  let idxStart = body.indexOf(metaStart);
  let idxEnd = body.indexOf(metaEnd);

  if (idxStart > -1 && idxEnd > -1){
    let meta;

    try {
      meta = JSON.parse(body.substring(idxStart + len,idxEnd));
    }
    catch (e) {
      console.error("Failed to parse meta data for " + article.number);
      return;
    }

    article.body = body.substring(0, idxStart);
    article.body += body.substring(idxEnd + len);

    article.meta = meta;
  }
};

const mapArticles = articles => {
  return articles.map(article => {
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //console.dir(article);
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    let authors = article.authors && article.authors.map(
      author => author.name
    );

    let art = {
      number: article.number,
      title: article.title,
      subtitle: article.fields.Antetitulo,
      intro: article.fields.intro,
      body: article.fields.Full_text,
      updated: article.updated,
      created: article.created,
      published: article.published,
      authors
    };

    createMetaData(art);
    return art;
  });
};

const buildArticles = req => {
  let cfg = data[req.params.section];

  if (req.params.section === "publishers"){
    // Configure Articles for Publishers
    // TODO: move this away from here to store already cached

    let toRemove = [];
    req.articles.forEach( article => {
      let nbo = +article.number;
      if (cfg.articles.indexOf(nbo) === -1){
        // it is an Analysis article so avoid it
        return;
      }

      let artAnalysis = +cfg.analysis[nbo];

      if (artAnalysis){
        let [found] = req.articles.filter( a => +a.number === artAnalysis );
        article.analysis = found;

        if (toRemove.indexOf(artAnalysis) === -1){
          toRemove.push(artAnalysis);
        }
      }

      article.map = cfg.maps[nbo];
    });

    //remove analysis articles
    for (let i=0; i<req.articles.length;i++){
      if (toRemove.indexOf(+req.articles[i].number) > -1){
        req.articles.splice(i, 1);
        i--;
      }
    }
  }

  // Sort Articles
  let articles = [];
  let hasSort = (cfg.articles && cfg.articles.length ? true : false);

  if (hasSort){
    let noSorted = [];

    req.articles.forEach( article => {
      let nbo = article.number;
      let idx = cfg.articles.indexOf(+article.number);

      if (idx > -1){
        articles[idx] = article;
      }
      else {
        noSorted.push(article);
      }
    });

    for (let i=0; i<articles.length;i++){
      if (!articles[i]){
        articles.splice(i, 1);
        i--;
      }
    }

    noSorted.forEach( art => articles.push(art));
  }

  if (!articles.length){
    articles = req.articles;
  }

  return articles;
};

export default {
  fetchArticles,
  fetchArticlesImages,
  buildArticles
};


const debug = require('debug')('retrato-de-la-desigualdad:router');

import { Router } from 'express';
import superagent from 'superagent';
import cache from './cache';

import {
  clientID,
  clientSecret,
  baseURL,
  tokenPath,
  apiPath,
  imagePath,
  publication,
  issue,
  language
} from 'config.json';

//const render = (path, options) => (req, res) => res.render(path, options);

//const tokenURL = baseURL + tokenPath;
const apiURL = baseURL + apiPath;
/*
const fillToken = (req, res, next) => {

  debug('fillToken() > ' + tokenURL);

  superagent
    .get(tokenURL)
    .query({
      grant_type: 'client_credentials',
      client_id: clientID,
      client_secret: clientSecret
    })
    .type('application/json')
    .end(function (err, _res) {
      if (err) {
        debug('fillToken() Error');
        debug.error(err);
      }

      /* Example authData
      { access_token: 'YYY',
        expires_in: 3600,
        token_type: 'bearer',
        scope: 'standard_access' }
      */
/*
      debug('fillToken() AccessToken > ' + _res.body.access_token);
      req.auth = _res.body;
      next();
    });
};
*/
/*
const getSections = (req, res) => {

  superagent
    .get(apiURL + 'sections.json')
    .query({
      access_token: req.auth.access_token,
      publication,
      issue
    })
    .end(function (err, _res) {
      if (err) {
        console.log('Error on Fetch');
        console.dir(err);
        return res.send(err);
      }

      /*
      items: [{
        language: "es", // language
        number: 30, // section id
        title: "Title"
      }]
      *//*
      res.send(_res.body);
    });
};
*/
const getSectionArticles = (req, res) => {

  // Only published articles comes from this end point
  superagent
    .get(apiURL + 'search/articles.json')
    .query({
      access_token: req.auth.access_token,
      publication,
      issue,
      section: parseInt(req.params.section, 10)
    })
    .end(function (err, _res) {
      if (err) {
        console.log('Error on Fetch');
        console.dir(err);
        return res.send(err);
      }

      /*
      items: [{
        number: "17661",
        title: "Prueba de fotos",
        authors: []
        issue: { title, number }
        section: { title, number }
        fields: {
          Antetitulo
          Intro,
          Full_text
        },

        type
        published
        created
        updated
        keywords
      }]
      */

      res.send(_res.body);
    });
};

const getArticleImages = (req, res) => {

  superagent
    .get(apiURL + 'articles/'+req.params.article+'/'+language+'/images.json')
    .query({ access_token: req.auth.access_token })
    .end(function (err, _res) {
      if (err) {
        console.log('Error on Fetch');
        console.dir(err);
        return res.send(err);
      }

      /*
      items: [{
        id: 23432,
        basename: "cms-image-000023432.jpg"
      }]
      */

      res.send(_res.body);
    });
};

const getImage = (req, res) => {

  superagent
    .get(apiURL + 'images/' + req.params.image + '.json')
    .query({ access_token: req.auth.access_token })
    .end(function (err, _res) {
      if (err) {
        console.log('Error on Fetch');
        console.dir(err);
        return res.send(err);
      }

      // http://www.elfaro.net/images/cms-image-000023432.jpg

      /*
      if (location === 'local') {
        path = imagePath + items[0].basename;
        //imagePath + items[0].thumbnailPath >> Dont work
      }
      else {
        path = items[0].basename;
      }

      /*
      items: [{
        id: 23432,
        location: "local",
        basename: "cms-image-000023432.jpg",
        thumbnailPath: "cms-thumb-000023432.jpg",
        description: "<p>1. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>",
        width: "960",
        height: "960",
        photographer: "",
        place: ""
      }]
      */

      res.send(_res.body);
    });
};

const getCacheSections = (req, res, next) => {

};

const getCacheArticles = (req, res, next) => {

};

const setCacheSections = (req, res, next) => {

};

const setCacheArticles = (req, res, next) => {

};

// API ROUTES
const apiRouter = Router();

apiRouter.get('/sections',
  getCacheSections, fillToken, getSections, setCacheSections, sendSections);

apiRouter.get('/sections/:section/articles',
  getCacheArticles, fillToken, getSectionArticles, setCacheArticles, sendSerticles);

apiRouter.get('/articles/:article/images', fillToken, getArticleImages);
apiRouter.get('/images/:image', fillToken, getImage);

// MAIN ROUTES
const appRouter = Router();

appRouter.get('/', render('index'));
appRouter.use('/api', apiRouter);

export default appRouter;

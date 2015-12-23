const debug = require('debug')('retrato-de-la-desigualdad:router');
import superagent from 'superagent';

import {
  baseURL,
  apiPath,
  imagePath,
  publication,
  issue,
  language
} from 'config.json';

const apiURL = baseURL + apiPath;

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
    .get(apiURL + 'sections.json')
    .query({
      access_token: req.auth.access_token,
      publication,
      issue
    })
    .end(function (err, _res) {
      debug('fetchSections() > END');
      if (checkError(err, res)) return;
      req.sections = _res.body.items;
      next();
    });
};

/* Example response
items: [{
  language: "es", // language
  number: 30, // section id
  title: "Title"
}]
*/

export default {
  fetchSections
};

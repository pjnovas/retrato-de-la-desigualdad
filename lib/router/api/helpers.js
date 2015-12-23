const debug = require('debug')('retrato-de-la-desigualdad:router');

import superagent from 'superagent';

import {
  clientID,
  clientSecret,
  baseURL,
  tokenPath
} from 'config.json';

const tokenURL = baseURL + tokenPath;

const getToken = (req, res, next) => {

  debug('getToken() > ' + tokenURL);

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
        debug('getToken() Error');
        debug(err);
      }

      debug('getToken() AccessToken > ' + _res.body.access_token);
      req.auth = _res.body;
      next();
    });
};

/* Example response body
{ access_token: 'YYY',
  expires_in: 3600,
  token_type: 'bearer',
  scope: 'standard_access' }
*/

export default {
  getToken
};

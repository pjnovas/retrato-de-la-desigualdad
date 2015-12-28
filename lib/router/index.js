
import { Router } from 'express';
import api from './api';
import { clear } from 'lib/cache';

import {
  cachePassword
} from 'config.json';

const app = Router();

const render = (path, options) => (req, res) => res.render(path, options);

const clearCache = (req, res, next) => {
  if (req.body.password !== cachePassword){
    res.render('cache', {
      error: 'Password invalid'
    });
    return;
  }

  clear( (err) => {
    if (err){
      res.render('cache', {
        error: 'internal server error'
      });
      return;
    }

    next();
  });
};

app.get('/', render('index'));

app.get('/cache', render('cache'));
app.post('/cache/clear', clearCache, render('cache', { success: true }));

app.use('/api', api);

app.get('/:section', render('index'));
app.get('/:section/:article', render('index'));

export default app;

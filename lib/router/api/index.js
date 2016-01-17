
import { Router } from 'express';

import { getToken } from './helpers';
import cache from './cache';
import { fetchArticles, fetchArticlesImages, buildArticles } from './controller';

const api = Router();

api.get('/articles/:section',
  cache.getArticles, // if found articles will send response here.
  getToken,
  fetchArticles,
  fetchArticlesImages,
  cache.setArticles,
  (req, res) => {
    res.send(buildArticles(req));
  }
);

export default api;

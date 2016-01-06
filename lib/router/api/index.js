
import { Router } from 'express';

import { getToken } from './helpers';
import cache from './cache';
import { fetchSections, fetchArticles, fetchArticlesImages, buildSections, buildArticles } from './controller';

const api = Router();

api.get('/sections',
  cache.getSections, // if found sections will send response here.
  getToken,
  fetchSections,
  cache.setSections,
  (req, res) => res.send(buildSections(req))
);

api.get('/sections/:section/articles',
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

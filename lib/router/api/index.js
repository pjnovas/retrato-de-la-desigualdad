
import { Router } from 'express';

import { getToken } from './helpers';
import cache from './cache';
import { fetchSections, fetchArticles, fetchArticlesImages } from './controller';

const api = Router();

api.get('/sections',
  cache.getSections, // if found sections will send response here.
  getToken,
  fetchSections,
  cache.setSections,
  (req, res) => res.send(req.sections)
);

api.get('/sections/:section/articles',
  cache.getArticles, // if found articles will send response here.
  getToken,
  fetchArticles,
  fetchArticlesImages,
  cache.setArticles,
  (req, res) => res.send(req.articles)
);

export default api;

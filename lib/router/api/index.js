
import { Router } from 'express';

import { getToken } from './helpers';
import cache from './cache';
import { fetchSections } from './controller';

const api = Router();

api.get('/sections',
  cache.getSections, // if found sections will send response here.
  getToken,
  fetchSections,
  cache.setSections,
  (req, res) => res.send(req.sections)
);

export default api;

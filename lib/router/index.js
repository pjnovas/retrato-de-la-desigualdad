
import { Router } from 'express';
import api from './api';

const app = Router();

const render = (path, options) => (req, res) => res.render(path, options);

app.get('/', render('index'));
app.use('/api', api);

app.get('/:section', render('index'));
app.get('/:section/:article', render('index'));

export default app;

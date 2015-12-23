
import { Router } from 'express';
import api from './api';

const app = Router();

const render = (path, options) => (req, res) => res.render(path, options);

app.get('/', render('index'));
app.use('/api', api);

export default app;

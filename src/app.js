import express from 'express';
import { rateLimit } from 'express-rate-limit';
import routes from './routes/index.js';
import { loggerMiddleware } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  limit: 100
});
app.use(limiter);

app.use(loggerMiddleware);

app.use('/api', routes);

app.use('/', (req, res) => {
  res.send('Blogging Platform API');
});

app.use(errorHandler);

export default app;
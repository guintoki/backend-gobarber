import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import uploadConfig from '../../../config/upload';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';
import AppError from '../../errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Backend iniciado');
});

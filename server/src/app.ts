import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import mongoose from 'mongoose';

import { config } from 'dotenv';

import options from './config/defaultOptions';
import rootRouter from './routes';

const app = express();
config();

app.use(helmet());
const LIMIT = '15mb';

app.use(bodyParser.json({ limit: LIMIT }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(cors(options.cors));
app.use(cookieParser());

app.use('/api/v1', rootRouter);

const PORT: number = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch(({ message }) => console.log(message));

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import postRoutes from './routes/posts.js';

config()

const app = express();
const LIMIT = '15mb';

app.use(bodyParser.json({ limit: LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
.catch(({message}) => console.log(message));

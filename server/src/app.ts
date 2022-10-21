import express from 'express';
import helmet from 'helmet';

import { config } from 'dotenv';

const app = express();
config();

app.use(helmet());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server running on port 3000');
});

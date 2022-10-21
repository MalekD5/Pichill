import express from 'express';

import registerRouer from './auth/registerRoute';

const router = express.Router();

router.use('/', registerRouer);

export default router;

import express from 'express';

import registerRouer from './auth/registerRoute';
import loginRouter from './auth/loginRoute';

const router = express.Router();

router.use('/', registerRouer);
router.use('/', loginRouter);

export default router;

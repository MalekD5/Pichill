import express from 'express';

import registerRoute from './auth/registerRoute';
import loginRoute from './auth/loginRoute';
import refreshRoute from './auth/refreshRoute';
const router = express.Router();

router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);

export default router;

import express from 'express';

import { generateLink, getUser } from '../controller/user.controller.js';

const router = express.Router();

router.get('/users/:id', getUser);

router.post('/link', generateLink);

export default router;

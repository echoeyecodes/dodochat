import { Router } from 'express';
import { validate } from '../../common/middlewares/validate';
import { LoginSchema } from './req-schema';
import { login, logout, refreshAccessToken } from './actions';

const router = Router();

router.post('/login', validate(LoginSchema), login);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logout);

export default router;

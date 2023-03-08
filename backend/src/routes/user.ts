import express from 'express';
import * as UserController from '../controller/users';
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

//requires auth checks for authenticated user before calling the user

router.get('/', requiresAuth, UserController.getAuthenticatedUser);

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logOut);

export default router;

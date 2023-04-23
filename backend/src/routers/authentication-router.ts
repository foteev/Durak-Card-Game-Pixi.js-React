import { Router } from 'express';
import authController from '../controllers/authentication-controller.js';
import checkValidation from '../middlewares/validation-middleware.js';
import validation from '../tools/validation.js';

const authRouter = Router();

authRouter.post('/auth/login', authController.loginUser);
authRouter.post('/auth/logout', authController.logoutUser);
authRouter.post('/auth/register', validation, checkValidation, authController.registerUser);

export default authRouter;
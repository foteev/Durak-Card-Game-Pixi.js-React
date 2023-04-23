import authService from '../services/authentication-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class AuthController {
    async loginUser(request: Request, response: Response) {
        try {
            const token = await authService.login(request.body.email, request.body.password)
            response.json(token);
        } catch (error: any) {
            console.error('Login error');
            response.json(formatError(error));
        }
    };

    async registerUser(request: Request, response: Response) {
        try {
            const user = await authService.register(request.body);
            response.json(user);
        } catch (error: any) {
            console.error('Register error');
            response.json(formatError(error));
        }
    };

    async logoutUser(request: Request, response: Response) {
        try {
            const exitValue = await authService.logout();
            response.json(exitValue);
        } catch (error: any) {
            console.error('Logout error');
            response.json(formatError(error));
        }
    };
}

export default new AuthController();
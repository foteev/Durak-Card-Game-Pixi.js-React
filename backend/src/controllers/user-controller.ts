import userService from '../services/user-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class UserController {
    async createUser(request: Request, response: Response) {
        try {
            const user = await userService.create(request.body);
            response.json(user);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getUser(request: Request, response: Response) {
        try {
            const user = await userService.get(request.params.id);
            response.json(user);
        } catch (error: any) {
            console.error('Get one error');
            response.json(formatError(error));
        }
    };

    async getUserByEmail(request: Request, response: Response) {
        try {
            const user = await userService.getByEmail(request.query.email as string);
            response.json(user);
        } catch (error: any) {
            console.error('Get one error');
            response.json(formatError(error));
        }
    };

    async getUsers(request: Request, response: Response) {
        try {
            const user = await userService.getAll();
            response.json(user);
        } catch (error: any) {
            console.error('Get all error');
            response.json(formatError(error));
        }
    };

    async updateUser(request: Request, response: Response) {
        try {
            const user = await userService.update(request.params.id, request.body);
            response.json(user);
        } catch (error: any) {
            console.error('Update error');
            response.json(formatError(error));
        }
    };

    async deleteUser(request: Request, response: Response) {
        try {
            const user = await userService.delete(request.params.id);
            response.json(user);
        } catch (error: any) {
            console.error('Delete error');
            response.json(formatError(error));
        }
    };
}

export default new UserController();
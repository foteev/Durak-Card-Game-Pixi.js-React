import orderService from '../services/order-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class OrderController {
    async createOrder(request: Request, response: Response) {
        try {
            const order = await orderService.create(request.body);
            response.json(order);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getOrder(request: Request, response: Response) {
        try {
            const order = await orderService.get(request.params.id);
            response.json(order);
        } catch (error: any) {
            console.error('Get one error');
            response.json(formatError(error));
        }
    };

    async updateOrder(request: Request, response: Response) {
        try {
            const order = await orderService.update(request.params.id, request.body);
            response.json(order);
        } catch (error: any) {
            console.error('Update error');
            response.json(formatError(error));
        }
    };

    async deleteOrder(request: Request, response: Response) {
        try {
            const order = await orderService.delete(request.params.id);
            response.json(order);
        } catch (error: any) {
            console.error('Delete error');
            response.json(formatError(error));
        }
    };

    async getByStatus(request: Request, response: Response) {
        try {
            const sortedOrders = await orderService.sortByStatus(request.query.status as string);
            response.json(sortedOrders);
        } catch (error: any) {
            console.error('Get sorted by status error');
            response.json(formatError(error));
        }
    };

    async getByUser(request: Request, response: Response) {
        try {
            const sortedOrders = await orderService.sortByUser(request.query.email as string);
            response.json(sortedOrders);
        } catch (error: any) {
            console.error('Get sorted by user error');
            response.json(formatError(error));
        }
    };
}

export default new OrderController();
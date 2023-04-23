import offerService from '../services/offer-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class OfferController {
    async createOffer(request: Request, response: Response) {
        try {
            const offer = await offerService.create(request.body);
            response.json(offer);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getOffer(request: Request, response: Response) {
        try {
            const order = await offerService.get(request.params.id);
            response.json(order);
        } catch (error: any) {
            console.error('Get one error');
            response.json(formatError(error));
        }
    };

    async updateOffer(request: Request, response: Response) {
        try {
            const offer = await offerService.update(request.params.id, request.body);
            response.json(offer);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async deleteOffer(request: Request, response: Response) {
        try {
            const offer = await offerService.delete(request.params.id);
            response.json(offer);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async createOfferImage(request: Request, response: Response) {
        try {
            console.log(request.params.id);
            response.json('OK');
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getByStatus(request: Request, response: Response) {
        try {
            const sortedOrders = await offerService.sortByStatus(request.query.status as string);
            response.json(sortedOrders);
        } catch (error: any) {
            console.error('Get sorted by status error');
            response.json(formatError(error));
        }
    };

    async getByUser(request: Request, response: Response) {
        try {
            const sortedOrders = await offerService.sortByUser(request.query.email as string);
            response.json(sortedOrders);
        } catch (error: any) {
            console.error('Get sorted by user error');
            response.json(formatError(error));
        }
    };
}

export default new OfferController();
import productService from '../services/product-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class ProductController {
    async createProduct(request: Request, response: Response) {
        try {
            const product = await productService.create(request.body);
            response.json(product);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getProduct(request: Request, response: Response) {
        try {
            const product = await productService.get(request.params.id);
            response.json(product);
        } catch (error: any) {
            console.error('Get error');
            response.json(formatError(error));
        }
    };

    async updateProduct(request: Request, response: Response) {
        try {
            const product = await productService.update(request.params.id, request.body);
            response.json(product);
        } catch (error: any) {
            console.error('Update error');
            response.json(formatError(error));
        }
    };

    async deleteProduct(request: Request, response: Response) {
        try {
            const product = await productService.delete(request.params.id);
            response.json(product);
        } catch (error: any) {
            console.error('Delete error');
            response.json(formatError(error));
        }
    };

    async getProducts(request: Request, response: Response) {
        try {
            const products = await productService.getAll();
            response.json(products);
        } catch (error: any) {
            console.error('Get error');
            response.json(formatError(error));
        }
    };
}

export default new ProductController();
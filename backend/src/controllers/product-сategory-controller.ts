import productCategoryService from '../services/product-сategory-service.js';
import formatError from '../tools/errorFormatter.js';
import { Request, Response } from 'express';

class ProductCategoryController {
    async createProductCategory(request: Request, response: Response) {
        try {
            const productCategory = await productCategoryService.create(request.body);
            response.json(productCategory);
        } catch (error: any) {
            console.error('Create error');
            response.json(formatError(error));
        }
    };

    async getProductCategory(request: Request, response: Response) {
        try {
            const productCategory = await productCategoryService.get(request.params.id);
            response.json(productCategory);
        } catch (error: any) {
            console.error('Get error');
            response.json(formatError(error));
        }
    };

    async updateProductCategory(request: Request, response: Response) {
        try {
            const productCategory = await productCategoryService.update(request.params.id, request.body);
            response.json(productCategory);
        } catch (error: any) {
            console.error('Update error');
            response.json(formatError(error));
        }
    };

    async deleteProductCategory(request: Request, response: Response) {
        try {
            const productCategory = await productCategoryService.delete(request.params.id);
            response.json(productCategory);
        } catch (error: any) {
            console.error('Delete error');
            response.json(formatError(error));
        }
    };

    async getProductCategories(request: Request, response: Response) {
        try {
            const productCategories = await productCategoryService.getAll();
            response.json(productCategories);
        } catch (error: any) {
            console.error('Get error');
            response.json(formatError(error));
        }
    };
}

export default new ProductCategoryController();
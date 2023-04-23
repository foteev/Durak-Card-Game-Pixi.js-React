import { Router } from 'express';
import productCategoryController from '../controllers/product-сategory-controller.js';
import checkAuth from '../middlewares/auth-middleware.js';

const productCategoryRouter = Router();

productCategoryRouter.post('/productCategories', checkAuth, productCategoryController.createProductCategory);
productCategoryRouter.get('/productCategories/:id',  productCategoryController.getProductCategory);
productCategoryRouter.post('/productCategories/:id', productCategoryController.updateProductCategory);
productCategoryRouter.delete('/productCategories/:id', checkAuth, productCategoryController.deleteProductCategory);
productCategoryRouter.get('/productCategories', productCategoryController.getProductCategories);


export default productCategoryRouter;
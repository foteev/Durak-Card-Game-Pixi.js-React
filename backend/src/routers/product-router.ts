import { Router } from 'express';
import productController from '../controllers/product-controller.js';
import checkAuth from '../middlewares/auth-middleware.js';

const productRouter = Router();

productRouter.post('/products', checkAuth, productController.createProduct);
productRouter.get('/products/:id', productController.getProduct);
productRouter.post('/products/:id', productController.updateProduct);
productRouter.delete('/products/:id', checkAuth, productController.deleteProduct);
productRouter.get('/products', productController.getProducts);


export default productRouter;
import { Router } from 'express';
import orderController from '../controllers/order-controller.js';
import checkAuth from '../middlewares/auth-middleware.js';

const orderRouter = Router();

orderRouter.post('/orders', checkAuth, orderController.createOrder);
orderRouter.get('/orders/:id', orderController.getOrder);
orderRouter.post('/orders/:id', orderController.updateOrder);
orderRouter.delete('/orders/:id', checkAuth, orderController.deleteOrder);
orderRouter.get('/orders/find/findByStatus', orderController.getByStatus);
orderRouter.get('/orders/find/findByUser/', orderController.getByUser);

export default orderRouter;

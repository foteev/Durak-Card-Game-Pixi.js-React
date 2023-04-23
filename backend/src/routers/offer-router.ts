import { Router } from 'express';
import offerController from '../controllers/offer-controller.js';
import checkAuth from '../middlewares/auth-middleware.js';

const offerRouter = Router();

offerRouter.post('/offers', checkAuth, offerController.createOffer);
offerRouter.get('/offers/:id', offerController.getOffer);
offerRouter.post('/offers/:id', offerController.updateOffer);
offerRouter.delete('/offers/:id', checkAuth, offerController.deleteOffer);
offerRouter.post('/offers/:id/uploadImage', offerController.createOfferImage);
offerRouter.get('/offers/find/findByStatus', offerController.getByStatus);
offerRouter.get('/offers/find/findByUser', offerController.getByUser);


export default offerRouter;

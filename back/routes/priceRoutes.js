import express from 'express';
import priceController from '../controllers/priceController.js';

const router = express.Router();

router.get('/allPrices', priceController.getAllPrices);
router.get('/priceById/:id', priceController.getPriceById);
router.post('/addPrice', priceController.createPrice);
router.put('/updatePrice/:id', priceController.updatePrice);
router.delete('/deletePrice/:id', priceController.deletePrice)

export default router;
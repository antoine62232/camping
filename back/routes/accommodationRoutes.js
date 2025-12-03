import express from 'express';
import accommodationController from '../controllers/accommodationController.js';

const router = express.Router();

router.get('/allAccommodations', accommodationController.getAllAccommodations);
router.get('/accommodationById/:id', accommodationController.getAccommodationById);
router.post('/addAccommodation', accommodationController.createAccommodation);
router.put('/updateAccommodation/:id', accommodationController.updateAccommodation);
router.delete('/deleteAccommodation/:id', accommodationController.deleteAccommodation)

export default router;
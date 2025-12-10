import express from 'express';
import optionsControllers from '../controllers/optionsControllers.js';

const router = express.Router();

router.post('/add', optionsControllers.createOption);
router.get('/', optionsControllers.getAllOptions);
router.get('/:id', optionsControllers.getOptionById);
router.put('/update/:id', optionsControllers.updateOption);
router.delete('/delete/:id', optionsControllers.deleteOption);

export default router;
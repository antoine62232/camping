import express from 'express';
import noticesControllers from '../controllers/noticesControllers.js';

const router = express.Router();

router.post('/add', noticesControllers.createNotice);
router.get('/', noticesControllers.getAllNotices);
router.get('/:idNotice', noticesControllers.getNoticeById);
router.put('/:idNotice', noticesControllers.updateNotice);
router.delete('/:idNotice', noticesControllers.deleteNotice);

export default router;
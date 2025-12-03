import express from 'express';
import usersControllers from '../controllers/usersControllers.js'

const router = express.Router();

router.post('/register', usersControllers.createUser);
router.get('/', usersControllers.getAllUsers);
router.get('/:email', usersControllers.getUserByEmail);
router.post('/login', usersControllers.login);
router.put('update/:id', usersControllers.updateUser);
router.delete('delete/:id', usersControllers.deleteUser);


export default router;
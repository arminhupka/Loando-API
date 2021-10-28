import express from 'express';
import { userRegister, userLogin, updatePassword, loadUser, changeAccountNumber } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.put('/change-password', authMiddleware, updatePassword);
router.get('/auth', authMiddleware, loadUser);
router.put('/change-account-number', authMiddleware, changeAccountNumber);

export default router;

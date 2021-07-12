import express from 'express';
import { userRegister, userLogin, updatePassword } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.put('/change-password', authMiddleware, updatePassword);
router.get('/auth', authMiddleware, (req, res) => res.send('AUTH'));

export default router;

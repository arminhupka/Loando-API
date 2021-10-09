import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getAllUsersLoans, getLoans, loanDetails, payLoan, takeLoan } from '../controllers/loanController.js';

const router = express.Router();

router.get('/all', authMiddleware, getAllUsersLoans);
router.post('/new', authMiddleware, takeLoan);
router.put('/pay', authMiddleware, payLoan);
router.get('/:id', authMiddleware, loanDetails);
router.get('/user', authMiddleware, getLoans);

export default router;

import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getLoans, payLoan, takeLoan } from '../controllers/loanController.js';

const router = express.Router();

router.get('/all', authMiddleware, getLoans);
router.post('/new', authMiddleware, takeLoan);
router.put('/pay', authMiddleware, payLoan);

export default router;

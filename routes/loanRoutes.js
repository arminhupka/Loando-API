import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getLoans, loanDetails, payLoan, takeLoan } from '../controllers/loanController.js';

const router = express.Router();

router.get('/all', authMiddleware, getLoans);
router.post('/new', authMiddleware, takeLoan);
router.put('/pay', authMiddleware, payLoan);
router.get('/:id', authMiddleware, loanDetails);

export default router;

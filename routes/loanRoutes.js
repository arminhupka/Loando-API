import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  getAllUsersLoans,
  getLoans,
  getPaymentStatus,
  getPayNotify,
  loanDetails,
  payLoan,
  takeLoan,
} from '../controllers/loanController.js';

const router = express.Router();

router.get('/all', authMiddleware, getAllUsersLoans);
router.post('/new', authMiddleware, takeLoan);
router.put('/pay', authMiddleware, payLoan);
router.post('/pay/notification/:id', getPayNotify);
router.get('/pay/status/:id', getPaymentStatus);
router.get('/:id', authMiddleware, loanDetails);
router.get('/', authMiddleware, getLoans);

export default router;

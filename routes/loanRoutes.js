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
  calulate,
} from '../controllers/loanController.js';

const router = express.Router();

router.post('/calculator', calulate);
router.get('/pay/status/:id', getPaymentStatus);
router.post('/pay/notification/:id', getPayNotify);
router.get('/all', authMiddleware, getAllUsersLoans);
router.post('/new', authMiddleware, takeLoan);
router.put('/pay', authMiddleware, payLoan);
router.get('/:id', authMiddleware, loanDetails);
router.get('/', authMiddleware, getLoans);

export default router;

import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getLoans, takeLoan } from '../controllers/loanController.js';

const router = express.Router();

router.get('/', authMiddleware, getLoans);
router.post('/new', authMiddleware, takeLoan);

export default router;

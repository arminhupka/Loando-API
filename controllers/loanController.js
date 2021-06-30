import asyncHandler from 'express-async-handler';
import Loan from '../models/LoanModel.js';
import User from '../models/UserModel.js';

export const getLoans = asyncHandler(async (req, res) => {
  res.send('all loans');
});

export const takeLoan = asyncHandler(async (req, res) => {
  const { value } = req.body;
  const userId = req.user._id;

  const newLoan = await Loan.create({
    user: userId,
    value,
  });

  res.status(201).json(newLoan);
});

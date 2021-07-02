import asyncHandler from 'express-async-handler';
import Loan from '../models/LoanModel.js';
import User from '../models/UserModel.js';

export const getLoans = asyncHandler(async (req, res) => {
  const user = req.user;

  const userLoans = await Loan.find({ user: user._id });

  res.json(userLoans);
});

export const takeLoan = asyncHandler(async (req, res) => {
  const { value, days } = req.body;
  const userId = req.user._id;

  const newLoan = await Loan.create({
    user: userId,
    days,
    value,
  });

  res.status(201).json(newLoan);
});

export const payLoan = asyncHandler(async (req, res) => {
  const { value, id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error('Loan ID not provided');
  }

  if (!value || value === 0) {
    res.status(400);
    throw new Error('Value must be grater then 0');
  }

  if (typeof value === 'string') {
    res.status(400);
    throw new Error(`Value cannot be string`);
  }

  const updatedLoan = await Loan.updateOne({ _id: id }, { $inc: { paid: value } });

  const loan = await Loan.findById(id);

  if (loan.paid >= loan.value) {
    await Loan.updateOne({ _id: id }, { isActive: false });
    const closedLoan = await Loan.findById(id);
    res.status(201).json(closedLoan);
    return;
  }

  res.status(201).json(loan);
});

export const loanDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const foundLoan = await Loan.findById(id);

  res.json(foundLoan);
});

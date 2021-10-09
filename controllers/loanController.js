import asyncHandler from 'express-async-handler';
import Loan from '../models/LoanModel.js';
import User from '../models/UserModel.js';

export const getAllUsersLoans = asyncHandler(async (req, res) => {
  const user = req.user;

  const userLoans = await Loan.find({ user: user._id });

  res.json(userLoans);
});

export const takeLoan = asyncHandler(async (req, res) => {
  const { value, days } = req.body;
  const userId = req.user._id;

  const userLoans = await User.findById(userId);

  if (userLoans.loans.length >= 5) {
    res.status(400);
    throw new Error('To many loans');
  }

  const commission = () => (days * value) / 100;

  const overallPayment = () => value + commission();

  const newLoan = await Loan.create({
    user: userId,
    days,
    value,
    toPay: overallPayment(),
  });

  await User.findByIdAndUpdate(userId, { $push: { loans: newLoan._id } });

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

  await Loan.updateOne({ _id: id }, { $inc: { paid: value } });

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

export const getLoans = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const loans = await Loan.find({ user: userId });

  res.json(loans);
});

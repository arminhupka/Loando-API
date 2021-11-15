import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

// Models
import Loan from '../models/LoanModel.js';
import User from '../models/UserModel.js';

// Utils
import loanCalculator from '../lib/loanCalculator.js';

dotenv.config();

import { PayU, Currency } from '@ingameltd/payu';

const payU = new PayU(process.env.PAYU_CLIENT_ID, process.env.PAYU_SECRET, process.env.PAYU_POS_ID, process.env.PAYU_SECOND_KEY, {
  sandbox: true,
});

export const getAllUsersLoans = asyncHandler(async (req, res) => {
  const userLoans = await Loan.find();

  res.json(userLoans);
});

export const takeLoan = asyncHandler(async (req, res) => {
  const { value, days } = req.body;
  const userId = req.user._id;

  const { loans } = await User.findById(userId).populate('loans');

  const activeLoans = loans.filter((loan) => loan.isActive === true);

  if (activeLoans.length >= 3) {
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

  res.status(201).json('xd');
});

export const payLoan = asyncHandler(async (req, res) => {
  const { value, id } = req.body;
  const userId = req.user._id;

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

  const user = await User.findById(userId);

  const order = await payU.createOrder({
    notifyUrl: `${process.env.HOST}/loan/pay/notification/${id}`,
    customerIp: '127.0.0.1',
    continueUrl: `${process.env.FRONTEND_DOMAIN}/konto/status/${id}`,
    description: `Spłata pożyczki #${id}`,
    currencyCode: Currency.PLN,
    totalAmount: value * 100,
    buyer: {
      email: `${user.email}`,
    },
    products: [{ name: `Spłata pożyczki #${id}`, quantity: 1, unitPrice: value * 100 }],
  });

  res.status(200).json(order);

  // await Loan.updateOne({ _id: id }, { $inc: { paid: value } });

  // const loan = await Loan.findById(id);

  // if (loan.paid >= loan.toPay) {
  //   await Loan.updateOne({ _id: id }, { isActive: false });
  //   const closedLoan = await Loan.findById(id);
  //   res.status(201).json(closedLoan);
  //   return;
  // }
  //
  // res.status(201).json(loan);
});

export const getPayNotify = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notif = req.body;

  console.log(`LOAN ${id} PAYMENT STATUS: ${notif.order.status}`);

  if (notif.order.status === 'COMPLETED') {
    await Loan.updateOne({ _id: id }, { $inc: { paid: notif.order.totalAmount / 100 }, $push: { payments: notif.order } });

    const loan = await Loan.findById(id);

    if (loan.paid >= loan.toPay) {
      await Loan.updateOne({ _id: id }, { isActive: false });
      return;
    }
  }

  await Loan.updateOne({ _id: id }, { $push: { payments: notif.order } });
  console.log(`LOAN #${id} UPDATED`);

  res.status(200).json('Notification');
});

export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loan = await Loan.findById(id);

  res.json(loan.payments[loan.payments.length - 1].status);
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

export const calulate = (req, res) => {
  const { amount, interest, period, commission, others } = req.body;

  const calcValues = loanCalculator(amount, interest, period, commission, others);

  res.json(calcValues);
};

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import Loan from '../models/LoanModel.js';
import jwtGen from '../lib/jwtGen.js';

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, pesel, street, city, postalCode, phone, houseNumber, flatNumber, id } = req.body;

  const userEmailExist = await User.findOne({ email });
  const userPeselExist = await User.findOne({ pesel });
  const userIdExist = await User.findOne({ id });

  if (userEmailExist || userPeselExist || userIdExist) {
    res.status(409);
    throw new Error('User already exist');
  }

  const user = await User.create({
    email,
    password: await bcrypt.hash(password, 12),
    firstName,
    lastName,
    pesel,
    street,
    city,
    postalCode,
    phone,
    houseNumber,
    flatNumber,
    id,
  });

  const userData = await User.findById(user._id).select('-password');

  res.status(201).json(userData);
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('Email or password not correct');
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    res.status(404);
    throw new Error('Email or password not correct');
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    pesel: user.pesel,
    street: user.street,
    houseNumber: user.houseNumber,
    flatNumber: user.flatNumber,
    id: user.id,
    city: user.city,
    postalCode: user.postalCode,
    accountNumber: user.accountNumber,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: jwtGen(user._id),
  });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { currentPassword, password: newPassword } = req.body;

  // Check current password
  const user = await User.findById(userId);

  if (await bcrypt.compare(currentPassword, user.password)) {
    const hashedPw = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPw });

    res.status(200).json({
      message: 'Password updated',
    });
  } else {
    return res.status(403).json({
      message: 'Password not match',
    });
  }
});

export const loadUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select('-password');

  res.status(200).json(user);
});

export const changeAccountNumber = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { number } = req.body;

  await User.findByIdAndUpdate(userId, { accountNumber: number });

  res.status(200).json({
    message: 'Account Number Updated',
  });
});

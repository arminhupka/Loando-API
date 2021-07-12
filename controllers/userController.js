import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import Loan from '../models/LoanModel.js';
import jwtGen from '../lib/jwtGen.js';

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, pesel, street, city, postalCode } = req.body;

  const user = await User.create({
    email,
    password: await bcrypt.hash(password, 10),
    firstName,
    lastName,
    pesel,
    street,
    city,
    postalCode,
  });

  res.status(201).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: jwtGen(user._id),
  });
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
    address: {
      street: user.street,
      city: user.city,
      postalCode: user.postalCode,
    },
    isAdmin: user.isAdmin,
    token: jwtGen(user._id),
  });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;

  const hashedPw = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(userId, { password: hashedPw });

  res.status(201).json({
    message: 'Password has been updated',
  });
});

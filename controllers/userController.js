import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, pesel, street, city, postalCode } = req.body;

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    pesel,
    street,
    city,
    postalCode,
  });

  if (user) {
    const { password, ...responseUser } = user._doc;
    res.status(201).json(responseUser);
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  res.send('login');
});

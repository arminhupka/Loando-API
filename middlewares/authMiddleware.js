import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';

import User from '../models/UserModel.js';

dotenv.config();

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  if (req.header('x-auth-token')) {
    try {
      const token = req.header('x-auth-token');
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(id).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Token has expired or is invalid');
    }
  } else {
    res.status(401);
    throw new Error('Token not provided');
  }
});

export default authMiddleware;

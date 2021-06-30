import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtGen = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '30d' });
};

export default jwtGen;

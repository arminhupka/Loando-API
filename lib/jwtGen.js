import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtGen = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '10min' });
};

export default jwtGen;
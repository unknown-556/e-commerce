import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { errorHandler } from '../../error.js';

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Decoded Token: ${JSON.stringify(decoded)}`);

    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ error: 'User not found. Please authenticate.' });
    }

    req.token = token;
    req.user = user;
    console.log(`Authenticated User: ${user.email}`);
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

export default auth;
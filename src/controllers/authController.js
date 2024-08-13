import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from '../../error.js';
import { generateToken } from '../utils/jwt.js';

export const signUp = async (req, res) => {
  const registerResults = signUpValidator.safeParse(req.body);
  if (!registerResults) {
    return res.status(400).json(formatZodError(registerResults.error.issues));
  }

  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', user: existingUser });
    } else {
      const { name, phoneNumber, password, email } = req.body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        phoneNumber,
        password: hashedPassword,
        email,
      });

      await newUser.save();
      console.log('User registered succesfully', newUser);
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};


export const signIn = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body);
    if (!loginResults.success) {
      return res.status(400).json(formatZodError(loginResults.error.issues));
    }
  
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User with email not found' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Password is incorrect' });
      }
  
      const accessToken = generateToken(user._id, user.name);
  
      user.token = accessToken;
      await user.save();
      main.io.emit('user-login', { userId: user._id, name: user.name, email: user.email });
  
      console.log('Login successful', user, accessToken);
      return res.json({ accessToken });
    } catch (error) {
      errorHandler(error, res);
    }
  };
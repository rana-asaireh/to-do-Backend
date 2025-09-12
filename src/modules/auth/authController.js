import * as service from './authService.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/tokenUtils.js'




export const register = async (req, res) => {
  const { fullName,userPassword, email} = req.body;

  try {
    const existingUser = await service.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

 
    const newUser = await service.createUser({
      fullName,
      userPassword,
      email
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};






export const login = async (req, res) => {
  console.log('Login payload:', req.body);
  const { email,userPassword } = req.body;

  try {
    const user = await service.findUserByEmail(email);
     console.log('User found:', user); 
    if (!user || !(await service.validateUserPassword(user, userPassword))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await service.updateRefreshToken(user, refreshToken);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};



export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const user = await service.findUserByRefreshToken(token);
    if (!user) return res.sendStatus(403);

    verifyRefreshToken(token);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token invalid or expired' });
  }
};



export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  const user = await service.findUserByRefreshToken(token);

  if (user) {
    await service.updateRefreshToken(user, null);
  }

  res.clearCookie('refreshToken').json({ message: 'Logged out' });
};




export const getMyProfile = (req, res) => {
  const user = { ...req.user }; 
   res.json(user);
}




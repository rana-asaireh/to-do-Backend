import * as service from './authService.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/tokenUtils.js'




export const register = async (req, res) => {
  const { fullName, userPassword, email } = req.body;

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






// export const login = async (req, res) => {
//   console.log('Login payload:', req.body);
//   const { email,userPassword } = req.body;

//   try {
//     const user = await service.findUserByEmail(email);
//      console.log('User found:', user); 
//     if (!user || !(await service.validateUserPassword(user, userPassword))) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     await service.updateRefreshToken(user, refreshToken);

//     res
//       .cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'lax',
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .json({ accessToken });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };
export const login = async (req, res) => {
  const { email, userPassword } = req.body;

  try {
    const user = await service.findUserByEmail(email);
    if (!user || !(await service.validateUserPassword(user, userPassword))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await service.updateRefreshToken(user, refreshToken);

    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: 7 * 24 * 60 * 60 * 1000, 
    //   path: '/',
    // };
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // must be HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };

    
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


// export const refreshAccessToken = async (req, res) => {
//   const token = req.cookies.refreshToken;
//   if (!token) return res.sendStatus(401);

//   try {
//     const user = await service.findUserByRefreshToken(token);
//     if (!user) return res.sendStatus(403);

//     verifyRefreshToken(token);
//     const newAccessToken = generateAccessToken(user);
//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Token invalid or expired' });
//   }
// };
// export const refreshAccessToken = async (req, res) => {
//   const token = req.cookies.refreshToken;
//   if (!token) return res.status(401).json({ message: 'No refresh token provided' });

//   try {
//     const user = await service.findUserByRefreshToken(token);
//     if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

//     verifyRefreshToken(token);
//     const newAccessToken = generateAccessToken(user);
//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error('Refresh token error:', err);
//     res.status(403).json({ message: 'Token invalid or expired' });
//   }
// };
export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const user = await service.findUserByRefreshToken(token);
    if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

    // Verify existing token
    verifyRefreshToken(token);

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Update refresh token in DB
    await service.updateRefreshToken(user, newRefreshToken);

    // Cookie options (same as login)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: '/',
    };

    // Set new refresh token in cookie
    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    // Send new access token
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(403).json({ message: 'Token invalid or expired' });
  }
};



// export const logout = async (req, res) => {
//   const token = req.cookies.refreshToken;
//   const user = await service.findUserByRefreshToken(token);

//   if (user) {
//     await service.updateRefreshToken(user, null);
//   }

//   res.clearCookie('refreshToken').json({ message: 'Logged out' });
// };
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ message: 'No refresh token provided' });

    const user = await service.findUserByRefreshToken(token);
    if (user) {
      await service.updateRefreshToken(user, null);
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    };

    res.clearCookie('refreshToken', cookieOptions);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed' });
  }
};



export const getMyProfile = (req, res) => {
  const user = { ...req.user };
  res.json(user);
}




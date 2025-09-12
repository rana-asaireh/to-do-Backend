import bcrypt from 'bcrypt';
import { sequelize } from '../../config/db.js'
import  initModels  from '../../sequelize-models/init-models.js';


const models = initModels(sequelize);
const User = models.users;





export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.userPassword);
  
  const newUser = await User.create({
    fullName: userData.fullName,
    userPassword: hashedPassword,
    email: userData.email
  });

  return newUser;
};



export const findUserById = async (userId) => {
  return await User.findByPk(userId);
};



const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

export const findUserByEmail = async (identifier) => {
  if (isEmail(identifier)) {
    return await User.findOne({
      where: { email: identifier }
    });
  } 
};


export const validateUserPassword = async (user, password) => {
  return await bcrypt.compare(password, user.userPassword); 
};

export const updateRefreshToken = async (user, refreshToken) => {
  user.refreshToken = refreshToken;
  await user.save();
};

export const findUserByRefreshToken = async (token) => {
  return await User.findOne({ where: { refreshToken: token } });
};








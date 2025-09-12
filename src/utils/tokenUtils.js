import jwt from "jsonwebtoken";
import { accessTokenSecret ,refreshTokenSecret } from "../config/config.js"

const payload = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email
});

export const generateAccessToken = (user) => {
  return jwt.sign(payload(user), accessTokenSecret, { expiresIn: "15m" }); 
};

export const generateRefreshToken = (user) => {
  return jwt.sign(payload(user), refreshTokenSecret, { expiresIn: "7d" }); 
};

export function verifyAccessToken(token) {
  return jwt.verify(token, accessTokenSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, refreshTokenSecret);
}

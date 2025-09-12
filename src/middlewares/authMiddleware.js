import { verifyAccessToken } from '../utils/tokenUtils.js'

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "Access denied" });


    try {
    const payload = verifyAccessToken(token); 
    req.user = payload; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
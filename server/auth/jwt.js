import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config;

const authorization = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = userData;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export default authorization;

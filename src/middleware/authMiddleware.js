import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import responseHelper from '../response/responseHelper.js';

dotenv.config();
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return responseHelper.sendErrorResponse(
      res,
      'Access Denied. No token provided!',
      403
    );
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return responseHelper.sendErrorResponse(
        res,
        'Invalid or expired token',
        403
      );
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};
export default auth;

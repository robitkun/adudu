import responseHelper from '../response/responseHelper.js';

const adminOnly = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'ADMIN') {
    return responseHelper.sendErrorResponse(
      res,
      'Access denied. Admins only.',
      403
    );
  }
  next();
};
export default adminOnly;

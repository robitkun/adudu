const sendSuccesResponse = (
  res,
  data,
  message = 'success',
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendErrorResponse = (res, message, statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

const sendNotFoundResponse = (res, message = 'Resource not found') => {
  sendErrorResponse(res, message, 404);
};

export const sendServerErrorResponse = (
  res,
  message = 'Internal Server Error'
) => {
  res.status(500).json({
    success: false,
    message,
  });
};

export default {
  sendErrorResponse,
  sendNotFoundResponse,
  sendServerErrorResponse,
  sendSuccesResponse,
};

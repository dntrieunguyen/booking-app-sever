import { STATUS_CODE } from '../utils/STATUS_CODE.js';

const notFound = (req, res, next) => {
   const error = new Error(`Route ${req.originalURL} not found`);
   res.status(STATUS_CODE.NOT_FOUND);
   next();
};

const errHandler = (error, req, res, next) => {
   const statusCode = error?.status || STATUS_CODE.INTERFACE_SERVER_ERROR;
   const errMsg = error.message || 'Some thing went wrong';
   return res.status(statusCode).json({
      success: false,
      status: statusCode,
      msg: errMsg,
      stack: error?.stack,
   });
};

export { notFound, errHandler };

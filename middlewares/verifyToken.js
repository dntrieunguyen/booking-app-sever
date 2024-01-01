import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '../utils/STATUS_CODE.js';

// Access Token
const verifyAccessToken = async (req, res, next) => {
   try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
         const token = req?.headers?.authorization.split(' ')[1];
         //check token
         jwt.verify(token, process.env.JWT, (err, decode) => {
            if (err)
               return res.status(STATUS_CODE.UNAUTHORIZED).json({
                  success: false,
                  msg: 'Invalid token',
               });
            req.user = decode;
            next();
         });
      } else
         return res.status(STATUS_CODE.UNAUTHORIZED).json({
            success: false,
            msg: 'Require authentication',
         });
   } catch (error) {
      next(error);
   }
};

export { verifyAccessToken };

import { generateAccessToken } from '../middlewares/jwt.js';
import User from '../model/User.js';
import { STATUS_CODE } from '../utils/STATUS_CODE.js';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const getUserInfo = async (req, res, next) => {
   try {
      // Lấy id từ req
      const { id } = req.user;
      // Lấy user từ db bằng id
      const user = await User.findById(id).select(
         '-refreshToken -password -isAdmin ',
      );
      return res.status(STATUS_CODE.OK).json({
         success: user ? true : false,
         data: user ? user : 'user not found',
      });
   } catch (err) {
      next(err);
   }
};

const getAllUser = async (req, res, next) => {
   try {
      const users = await User.find().select(
         '-refreshToken -password -isAdmin ',
      );
      return res.status(STATUS_CODE.OK).json({
         success: true,
         data: users,
      });
   } catch (err) {
      next(err);
   }
};

const newRefreshAccessToken = async (req, res) => {
   try {
      // Lấy token từ cookies
      const cookie = req.cookies;

      // Check xem có token hay không
      if (!cookie && !cookie.refresh_token)
         throw new Error('No refresh token in cookies');
      // Check token có hợp lệ hay không
      const result = await jwt.verify(cookie.refresh_token, process.env.JWT);

      const response = await User.findOne({
         _id: result._id,
         refreshToken: cookie.refresh_token,
      });

      return res.status(STATUS_CODE.OK).json({
         success: response ? true : false,
         newAccessToken: response
            ? generateAccessToken(response._id, response.isAdmin)
            : 'Refresh token not matched',
      });
   } catch (error) {}
};

export { getUserInfo, getAllUser, newRefreshAccessToken };

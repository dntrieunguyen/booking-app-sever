import User from '../model/User.js';
import { createError } from '../utils/error.js';
import {
   generateAccessToken,
   generateRefreshToken,
} from '../middlewares/jwt.js';
import { STATUS_CODE } from '../utils/STATUS_CODE.js';

//Register
const register = async (req, res, next) => {
   try {
      const { userName, password, email, phoneNumber } = req.body;

      //Check blank fields
      if (!userName || !password || !email || !phoneNumber) {
         return next(
            createError(STATUS_CODE.BAD_REQUEST, 'Missing required fields!'),
         );
      }
      //Check existance account
      const existingUser = await User.findOne().or([
         { email },
         { phoneNumber },
         { userName },
      ]);

      // Nếu user đã tồn tại ==>  thông báo lỗi
      if (existingUser) {
         const conflictField =
            existingUser.email === email
               ? 'Email'
               : existingUser.phoneNumber === phoneNumber
               ? 'Phone number'
               : 'Username';

         return next(
            createError(
               STATUS_CODE.CONFLICT,
               `${conflictField} has already been taken!`,
            ),
         );
      }
      // Thông tin user đăng ký hợp lệ ==> tạo user mới
      else {
         const newUser = await User.create(req.body);
         return res.status(STATUS_CODE.CREATED).json({
            success: newUser ? true : false,
            msg: newUser
               ? 'Register successfully, please login'
               : 'Something went wrong !!!',
         });
      }
   } catch (err) {
      next(err);
   }
};

//Login
const login = async (req, res, next) => {
   try {
      // Check user
      const user = await User.findOne({
         userName: req.body.userName,
      });

      if (!user) {
         return next(createError(STATUS_CODE.NOT_FOUND, 'user not found'));
      }

      // check password
      const isPassword = await user.isCorrectPassword(req.body.password); // True/false

      // Đăng nhập thất bại
      if (!isPassword) {
         return next(
            createError(STATUS_CODE.UNAUTHORIZED, 'Password is not correct'),
         );
      }

      // Đăng nhập thành công => Lấy password và isAdmin của user
      const { password, isAdmin, phoneNumber, ...others } = user._doc;

      //Tạo Access token
      const accessToken = generateAccessToken(user._id, user.isAdmin);

      //Tạo refresh Token
      const refreshToken = generateRefreshToken(user._id);
      await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
      //Tạo cookies
      res.cookie('refresh_token', refreshToken, {
         httpOnly: true,
         maxAge: 7 * 24 * 60 * 60 * 1000, // Lưu refresh Token trong 7 ngày
      });
      return res.status(STATUS_CODE.CREATED).json({
         success: true,
         accessToken,
         userData: others,
      });
   } catch (err) {
      next(err);
   }
};

// Logout
const logout = async (req, res, next) => {
   try {
      const cookie = req.cookies;
      if (!cookie && !cookie.refresh_token) throw new Error('invalid token');
      const response = await User.findOneAndUpdate(
         { refreshToken: cookie.refresh_token },
         { $set: { refreshToken: null } },
         { new: true },
      );

      res.clearCookie('refresh_token', {
         httpOnly: true,
         secure: true,
      });
      return res.status(STATUS_CODE.OK).json({
         success: true,
         msg: 'log out successfully',
      });
   } catch (error) {
      next(error);
   }
};

export { register, login, logout };

import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//Register
export const register = async (req, res, next) => {
   try {
      // hashing password using bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      //Tạo new user
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hash,
      });

      // Lưu user
      await newUser.save();
      res.status(201).send('User has been created');
   } catch (err) {
      next(err);
   }
};
//Login
export const login = async (req, res, next) => {
   try {
      // Check user
      const user = await User.findOne({
         username: req.body.username,
      });
      if (!user) {
         return next(createError(404, 'user not found'));
      }

      // check password
      const isPassword = await bcrypt.compare(req.body.password, user.password);

      if (!isPassword) {
         return next(createError(400, 'Password not correct'));
      }

      // Đăng nhập thành công => Lấy password và isAdmin của user
      const { password, isAdmin, ...others } = user._doc;

      //Tạo token
      const token = jwt.sign(
         {
            id: user._id,
            isAdmin: user.isAdmin,
         },
         process.env.JWT,
      );
      //Tạo cookies
      res.cookie('access-token', token, {
         httpOnly: true,
      })
         .status(200)
         .json({ ...others });
   } catch (err) {
      next(err);
   }
};

import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//Register
export const register = async (req, res, next) => {
   try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new UserModel({
         username: req.body.username,
         email: req.body.email,
         password: hash,
      });

      await newUser.save();
      res.status(201).send('User has been created');
   } catch (err) {
      next(err);
   }
};
//Login
export const login = async (req, res, next) => {
   try {
      const user = await UserModel.findOne({
         username: req.body.username,
      });

      if (!user) {
         return next(createError(404, 'user not found'));
      }

      const isPassword = await bcrypt.compare(req.body.password, user.password);

      if (!isPassword) {
         return next(createError(400, 'Password not correct'));
      }

      const { password, isAdmin, ...others } = user._doc;
      const token = jwt.sign(
         {
            id: user._id,
            isAdmin: user.isAdmin,
         },
         process.env.JWT,
      );
      res.cookie('access-token', token, {
         httpOnly: true,
      })
         .status(200)
         .json({ ...others });
   } catch (err) {
      next(err);
   }
};

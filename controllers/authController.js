import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
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

      if (isPassword === false) {
         return next(createError(400, 'Password not correct'));
      }
      res.status(200).json(user);
   } catch (err) {
      next(err);
   }
};

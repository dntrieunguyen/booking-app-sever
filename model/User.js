import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         require: true,
      },
      fullName: {
         type: String,
         require: true,
      },
      phoneNumber: {
         type: Number,
         require: true,
         unique: true,
      },
      email: {
         type: String,
         require: true,
         unique: true,
      },
      password: {
         type: String,
         require: true,
      },
      accessToken: {
         type: String,
      },
      refreshToken: {
         type: String,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) next();

   const salt = bcrypt.genSaltSync(10);

   this.password = await bcrypt.hashSync(this.password, salt);
});

UserSchema.methods = {
   // compare password when loggin
   isCorrectPassword: async function (password) {
      return await bcrypt.compare(password, this.password);
   },
};

export default mongoose.model('user', UserSchema);

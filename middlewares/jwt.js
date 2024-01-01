import jwt from 'jsonwebtoken';
//Hàm tạo access token ==> authentication/authorication
const generateAccessToken = (user_id, isAdmin) =>
   jwt.sign(
      {
         id: user_id,
         isAdmin,
      },
      process.env.JWT,
      { expiresIn: '2d' },
   );
//Hàm tạo refresh token ==> câp mới access Token
const generateRefreshToken = uid =>
   jwt.sign(
      {
         _id: uid,
      },
      process.env.JWT,
      { expiresIn: '7d' },
   );

export { generateAccessToken, generateRefreshToken };

import express from 'express';
import {
   getAllUser,
   getUserInfo,
   newRefreshAccessToken,
} from '../controllers/user.js';
import { verifyAccessToken } from '../middlewares/verifyToken.js';

const router = express.Router();

//UPDATE

//GET
router.get('/userinfo', verifyAccessToken, getUserInfo);

//GET ALL
router.get('/', verifyAccessToken, getAllUser);
// Make new refresh Token

router.post('/refreshToken', newRefreshAccessToken);

export default router;

import express from 'express';
import { login, logout, register } from '../controllers/auth.js';

const router = express.Router();

//register
router.post('/register', register);

//login
router.post('/login', login);

//logout
router.put('/logout', logout);

//GET

//GET ALL

export default router;

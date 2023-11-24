import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

//register
router.post('/register', register);

//login
router.post('/login', login);

//DELETE

//GET

//GET ALL

export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js'; // Adjust the path as needed
import {verifyJWT} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;

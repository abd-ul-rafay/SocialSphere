import express from 'express';
import { login, register } from '../controllers/auth.js';
import upload from '../utils/multer_upload.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(upload.single('image'), register);

export default router;

import express from 'express';
import { addRemoveFriend, fetchUser } from '../controllers/user.js';
const router = express.Router();

router.route('/:userId').get(fetchUser);
router.route('/friends/:friendId').patch(addRemoveFriend);

export default router;

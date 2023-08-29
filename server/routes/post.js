import express from 'express';
import { addPost, commentPost, fetchAllPosts, fetchUserPosts, likeUnlikePost } from '../controllers/post.js';
import upload from '../utils/multer_upload.js';

const router = express.Router();

router.route('/').get(fetchAllPosts).post(upload.single('image'), addPost);
router.route('/:userId').get(fetchUserPosts);
router.route('/:postId/like').patch(likeUnlikePost);
router.route('/:postId/comment').post(commentPost);

export default router;

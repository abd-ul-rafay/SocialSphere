import Post from '../models/post.js';
import CustomError from '../errors/custom_error.js';

export const fetchAllPosts = async (req, res) => {
    const { searchTags } = req.query;

    let query = {};

    if (searchTags) {
        query.searchTags = { $regex: searchTags, $options: 'i' };
    }

    const posts = await Post.find(query).sort('-createdAt').populate([
        {
            path: 'userId',
            select: 'fullName imagePath'
        },
        {
            path: 'comments.user',
            select: 'fullName imagePath'
        }
    ]);

    res.status(200).json(posts);
}

export const fetchUserPosts = async (req, res) => {
    const { userId } = req.params;

    const posts = await Post.find({ userId }).sort('-createdAt').populate([
        {
            path: 'userId',
            select: 'fullName imagePath'
        },
        {
            path: 'comments.user',
            select: 'fullName imagePath'
        }
    ]);

    res.status(200).json(posts);
}

export const addPost = async (req, res) => {
    const { userId } = req.user;

    const post = await Post.create({ userId, ...req.body });

    if (!post) {
        throw new CustomError('Failed to add post', 500);
    }

    const populatedPost = await Post.findById(post._id).populate([
        {
            path: 'userId',
            select: 'fullName imagePath'
        },
        {
            path: 'comments.user',
            select: 'fullName imagePath'
        }
    ]);

    res.status(201).json(populatedPost);
}

export const likeUnlikePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await Post.findById({ _id: postId });

    if (!post) {
        throw new CustomError('Post not found', 404);
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
        post.likes.pop(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ _id: post._id, likes: post.likes });
}

export const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.user;
    const { text } = req.body;

    const post = await Post.findById(postId);

    const existingComment = post.comments.find(comment => comment.user.toString() === userId);

    if (existingComment) {
        existingComment.text = text;
    } else {
        post.comments.push({ user: userId, text });
    }

    await post.save();

    const comments = await Post.findById(postId).select('comments').populate(
        {
            path: 'comments.user',
            select: 'fullName imagePath'
        }
    );

    res.status(200).json(comments);
}

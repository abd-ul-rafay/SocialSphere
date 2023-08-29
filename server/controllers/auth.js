import User from '../models/user.js';
import CustomError from '../errors/custom_error.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).populate({
        path: 'friends',
        select: '_id fullName bio imagePath'
    });

    if (!user) {
        throw new CustomError('User not found', 404);
    }

    const isValidPassword = await user.comparePasswords(password);

    if (!isValidPassword) {
        throw new CustomError('Invalid credentials', 401);
    }

    const token = user.createToken();

    const createdUser = user.toObject();
    delete createdUser.password;

    res.status(200).json({ user: createdUser, token });
}

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new CustomError('Please provide name, email and password', 400);
    }

    const user = await User.create({ ...req.body });
    const token = user.createToken();

    const createdUser = user.toObject();
    delete createdUser.password;

    res.status(201).json({ user: createdUser, token });
}

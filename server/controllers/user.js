import User from '../models/user.js';
import CustomError from '../errors/custom_error.js';

export const fetchUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
        path: 'friends',
        select: '_id fullName bio imagePath'
    });

    const fetchedUser = user.toObject();
    delete fetchedUser.password;

    res.status(200).json(fetchedUser);
}

export const addRemoveFriend = async (req, res) => {
    const { userId } = req.user;
    const { friendId } = req.params;

    if (userId === friendId) {
        throw new CustomError('User can not be his own friend', 404);
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
        throw new CustomError('Users not found', 404);
    }

    const isAlreadyFriend = user.friends.includes(friendId);

    if (isAlreadyFriend) {
        user.friends.pop(friendId);
        friend.friends.pop(userId);
    } else {
        user.friends.push(friendId);
        friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const userFriends = await Promise.all(
        user.friends.map(id => User.findById(id).select('fullName bio imagePath'))
    )

    res.status(200).json(userFriends);
}

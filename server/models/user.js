import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your name'],
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: [true, 'This email is already taken'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        min: 5
    },
    imagePath: {
        type: String,
        default: ''
    },
    friends: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    bio: String,
    location: String,
    dob: String,
    gender: String,
    contact: String,

}, { timestamps: true });

UserSchema.pre('save', async function () {
    // commenting because not working correctly
    // const salt = await bcrypt.genSalt(12);
    // this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    // not comparing correctly
    // const result = await bcrypt.compare(candidatePassword, this.password);
    // return result;

    return candidatePassword === this.password;
}

UserSchema.methods.createToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export default mongoose.model('User', UserSchema);

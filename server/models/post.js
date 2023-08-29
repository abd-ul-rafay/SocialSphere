import mongoose, { Mongoose } from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    _id: false 
});

const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id']
    },
    desc: {
        type: String,
        required: [true, 'Please provide post description'],
        max: 300
    },
    imagePath: {
        type: String,
        default: ''
    },
    searchTags: String,
    likes: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    comments: {
        type: [commentSchema],
        default: []
    }
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);

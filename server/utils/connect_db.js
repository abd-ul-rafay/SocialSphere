import mongoose from "mongoose";

const connectDb = async (url) => {
    try {
        const res = await mongoose.connect(url);
        return console.log('connected to db');
    } catch (err) {
        return console.log(`error: ${err}`);
    }
}

export default connectDb;

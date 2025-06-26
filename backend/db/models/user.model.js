import mongoose from "mongoose";

const options = {
    collection: 'users',
    strict: true,
    collation: {
        locale: "en",
        strength: 1
    }
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profileimg: String,
    movies: [
        {
          title: String,
          poster: String,
          value: Number,
          apimovieid: Number
        }
      ]
}, options);

export const User = mongoose.model('User', userSchema);
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [30, "Name should be less than 30 char"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
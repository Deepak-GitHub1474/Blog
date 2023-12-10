const UserModel = require("../models/user-model");
const PostModel = require("../models/post-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Sign Up
exports.userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(401).json({ message: 'Email Id already register! 🥴' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ message: 'User registered successfully 😊' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while signup 🥴' });
    }
}

// Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not exist! 🥴' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password is wrong! 🥴' });
        }

        const token = jwt.sign({
            username: user.username,
            email: user.email,
            userId: user._id
        }, secretKey);

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successfully 😊' });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while lofin 🥴' });
    }
}

// Sending data on client side
exports.userActionController = (req, res) => {
    // Access user data attached by the middleware
    const userData = req.userData;
    // Sending the user data as part of the response
    res.json({ message: 'Authenticated User', user: userData });
}

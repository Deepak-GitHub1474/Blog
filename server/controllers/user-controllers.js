const UserModel = require("../models/user-model");
const PostModel = require("../models/post-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// Upload Avatar
exports.uploadImage = (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    const image = req.body.image;
    try {
      cloudinary.uploader.upload(image, (error, result) => {
        if (result && result.secure_url) {
          res.send(result.secure_url);
        } else {
          res.status(500).send(`Error while uploading image: ${error.message}`);
        }
      });
    } catch (error) {
      res.status(500).send(`Error while processing image upload: ${error.message}`);
    }
};

// User Register
exports.userRegister = (req, res) => {
    const {avatar, username, email, password } = req.body;

    // Check if the email already exists in the database
    UserModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                // If email already exists, send a response indicating it
                res.status(400).json({ msg: "Email already exists" })
            } else {
                // If email is unique, hash the password and create the new user
                bcrypt.hash(password, 10)
                    .then(hash => {
                        UserModel.create({avatar, username, email, password: hash })
                            .then(user => {
                                // If user is created successfully, send the success response
                                res.status(200).json({ msg: "Successfully registered", user: user });
                            })
                            .catch(err => res.json(err))
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};


// User login controller
exports.userLogin = (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, username: user.username, avatar:user.avatar },
                        process.env.JWT_SECRET, { expiresIn: "1d" })
                        res.cookie("token", token, {
                            httpOnly: true,
                            sameSite: process.env.CORS_SAME_SITE,
                            secure: true,
                            path: '/'
                        });
                        res.status(200).json({ msg: "Success", user: user })

                    } else {
                        res.status(401).json({ msg: "Wrong Password" })
                    }
                })
            } else {
                res.status(404).json({ msg: "No Account associated with this email" })
            }
        })
}

// Add new blog
exports.addNewBlog = (req, res) => {
    const { title, description, file, blog, email, username } = req.body;

    PostModel.create({
        title: title,
        description: description,
        file: file,
        blog: blog,
        email: email,
        username: username
    })
        .then(result => res.status(200).json("Success"))
        .catch(err => res.status(500).json(err))
}

// Get all blog
exports.getAllBlog = (req, res) => {
    PostModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
}

// get blog by id
exports.getBlogByID = (req, res) => {
    const blogID = req.params.blogID
    PostModel.findById({ _id: blogID })
        .then(post => res.json(post))
        .catch(err => console.log(err))
}

// read blog by id
exports.readBlogByID = (req, res) => {
    const blogID = req.params.blogID
    PostModel.findById({ _id: blogID })
        .then(post => res.json(post))
        .catch(err => console.log(err))
}

// New User blog update delete controll
exports.userActionController = (req, res) => {
    return res.status(200).json({ email: req.email, username: req.username, avatar: req.avatar });
}

// Update blog by id
exports.updateBlogByID = (req, res) => {
    PostModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
            title: req.body.title,
            file: req.body.file,
            description: req.body.description,
            blog: req.body.blog
        }
    ).then(result => res.status(200).json("Success"))
     .catch(err => res.status(500).json(err))
}

// Delete Blog
exports.deleteBlogID = (req, res) => {
    PostModel.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.status(200).json("Success"))
        .catch(err => res.status(500).json(err))
}

// User Logout
exports.UserLogout = (req, res) => {

    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: process.env.CORS_SAME_SITE,
        secure: true,
        path: '/'
    });
    return res.status(200).json({ msg: "Success" });
};

// Get all users [Filter username and avatar]
exports.getAllUsers = (req, res) => {
    UserModel.find()
        .then(users => {
            const uniqueUsers = users.reduce((acc, cur) => {
                const { username, avatar } = cur;
                const existingUser = acc.find(user => user.username === username);

                if (!existingUser) {
                    acc.push({ username, avatar });
                }

                return acc;
            }, []);

            res.status(200).json(uniqueUsers);
        })
        .catch(err => res.status(500).json("Error while finding users",err));
}

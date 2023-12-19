const express = require("express");
const route = express.Router();
const { registerValidation, loginValidation, verifyUser } = require("../middlewares/user-validation");
const userController = require("../controllers/user-controllers");

// Test
route.get("/test", (req, res) => {
  res.json({ message: "Server is up!" });
});

// Home
route.get("/", verifyUser, userController.userActionController);

// User Register
route.post("/signup", registerValidation, userController.userRegister);

// Upload Avatar
route.post("/uploadImage", userController.uploadImage);

// User Login
route.post("/signin", loginValidation, userController.userLogin);

// Add New Blog
route.post("/addBlog", verifyUser, userController.addNewBlog);

// Get All Blog
route.get("/blog", userController.getAllBlog);

// Get Blog by ID
route.get("/blog/:blogID", userController.getBlogByID);

// Update Blog 
route.patch("/blog/:id", verifyUser, userController.updateBlogByID);

// Delete Blog
route.delete('/blog/:id', verifyUser, userController.deleteBlogID);

// User Logout
route.get("/logout", userController.UserLogout);

// Get All Users
route.get("/users", userController.getAllUsers);

module.exports = route;



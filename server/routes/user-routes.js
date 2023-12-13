const express = require("express");
const route = express.Router();
const { registerValidation, loginValidation, verifyUser } = require("../middlewares/user-validation");
const userController = require("../controllers/user-controllers");

// User Action Controller
// Test
route.get("/test", (req, res) => {
  res.json({ message: "Server is up!" });
});

route.get("/", verifyUser, userController.userActionController);

// User Register
route.post("/signup", registerValidation, userController.userRegister);

// User Login
route.post("/signin", loginValidation, userController.userLogin);

// Add New Blog
route.post("/addBlog", verifyUser, userController.addNewBlog);

// Get All Blog
route.get("/blog", userController.getAllBlog);

// Get Blog by ID
route.get("/blog/:blogID", userController.getBlogByID);

// Get Blog by ID
route.get("/readblog/:blogID", userController.readBlogByID);

// Update Blog 
route.patch("/blog/:id", verifyUser, userController.updateBlogByID);

// Delete Blog
route.delete('/blog/:id', verifyUser, userController.deleteBlogID);

// User Logout
route.get("/logout", userController.UserLogout);

module.exports = route;



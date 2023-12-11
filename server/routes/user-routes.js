const express = require("express");
const route = express.Router();
const { registerValidation, loginValidation, authenticateUser } = require("../middlewares/user-validation");
const userController = require("../controllers/user-controllers");

// Test
route.get("/test", (req, res) => {
  res.json({ message: "Server is up!" });
});

// User Action Controller
route.get("/",authenticateUser, userController.userActionController);

// User Register
route.post("/signup", registerValidation, userController.userRegister);

// User Login
route.post("/signin", loginValidation, userController.userLogin);

module.exports = route;



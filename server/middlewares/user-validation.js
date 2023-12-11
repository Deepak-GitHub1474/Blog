// Register Validation
exports.registerValidation = (req, res, next) => {
    const { username, email, password } = req.body;

    if (req.body && username && email && password) {
        next()
    } else {
        res.status(404).send({ msg: "All input fields are required" });
    }
}

// Login Validation
exports.loginValidation = (req, res, next) => {
    const { email, password } = req.body;

    if (req.body && email && password) {
        next()
    } else {
        res.status(404).send({ msg: "All input fields are required" });
    }
}

// User Validation
const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};





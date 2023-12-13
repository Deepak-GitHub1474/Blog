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

exports.verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.json("The token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("The token is wrong")
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next()
            }
        })
    }
}



// Dependencies:
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Express Instance
const server = express();

// Middlewares
server.use(express.json({ limit: "25mb" }));
server.use(express.urlencoded({ limit: "25mb", extended: true  }));
server.use(cookieParser());
server.use(express.static("public"));

server.use(cors({
    origin: process.env.LOCALHOST_ORIGIN,
    // origin: process.env.HOSTED_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: [process.env.CORS_EXPOSED_HEADER],
    cookie: {
        sameSite: process.env.CORS_SAME_SITE,
        secure: true,
    },
}));

// User Routing
const userRoutes = require("./routes/user-routes");
server.use("/", userRoutes);

// DB
const connectDB = require('./config/db');

// Listening to server
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});


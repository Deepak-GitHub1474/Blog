const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(process.env.DB_URL)
        .then((con) => {
            console.log(`Connected to DB: ${con.connection.host}`);
        }).catch((err) => {
            console.log("Error While Connecting to DB", err.message);
        })
};

module.exports = connectDB;

